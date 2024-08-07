﻿using FM.PAP.UTILS;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace Dynamics365.attendance
{
    public class PostUpdate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            ITracingService tracingService =
            (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            IPluginExecutionContext context = (IPluginExecutionContext)
            serviceProvider.GetService(typeof(IPluginExecutionContext));

            if (context.InputParameters.Contains("Target") &&
                context.InputParameters["Target"] is Entity)
            {
                Entity target = (Entity)context.InputParameters["Target"];
                Entity preImage = (Entity)context.PreEntityImages["PreImage"];

                IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
                try
                {
                    EntityReference erLesson = Utils.GetAttributeFromTargetOrPreImage<EntityReference>("res_classroombooking", target, preImage);
                    Entity lesson = service.Retrieve("res_classroombooking", erLesson.Id, new ColumnSet("res_classroomid"));

                    EntityReference erClassroom = lesson.Contains("res_classroomid") ? lesson.GetAttributeValue<EntityReference>("res_classroomid") : null;
                    Entity classroom = erClassroom != null ? service.Retrieve("res_classroom", erClassroom.Id, new ColumnSet("res_seats")) : null;

                    int classroomSeats = classroom?.GetAttributeValue<int?>("res_seats") ?? 0;

                    var fetchInPersonAttendancesCount = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                    <fetch returntotalrecordcount=""true"">
                                      <entity name=""res_attendance"">
                                        <filter>
                                          <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                          <condition attribute=""res_classroombooking"" operator=""eq"" value=""{erLesson.Id}"" />
                                          <condition attribute=""res_participationmode"" operator=""eq"" value=""1"" />
                                        </filter>
                                      </entity>
                                    </fetch>";

                    var fetchRemoteAttendancesCount = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                    <fetch returntotalrecordcount=""true"">
                                      <entity name=""res_attendance"">
                                        <filter>
                                          <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                          <condition attribute=""res_classroombooking"" operator=""eq"" value=""{erLesson.Id}"" />
                                          <condition attribute=""res_participationmode"" operator=""eq"" value=""0"" />
                                        </filter>
                                      </entity>
                                    </fetch>";

                    EntityCollection inPersonAttendances = service.RetrieveMultiple(new FetchExpression(fetchInPersonAttendancesCount));
                    EntityCollection remoteAttendances = service.RetrieveMultiple(new FetchExpression(fetchRemoteAttendancesCount));

                    int inPersonAttendancesCount = inPersonAttendances.TotalRecordCount != -1 ? inPersonAttendances.TotalRecordCount : 0;
                    int remoteAttendancesCount = remoteAttendances.TotalRecordCount != -1 ? remoteAttendances.TotalRecordCount : 0;

                    lesson["res_attendees"] = inPersonAttendancesCount + remoteAttendancesCount;
                    lesson["res_takenseats"] = inPersonAttendancesCount;
                    lesson["res_availableseats"] = classroomSeats - inPersonAttendancesCount;
                    lesson["res_remoteattendees"] = remoteAttendancesCount;

                    service.Update(lesson);
                }
                catch (FaultException<OrganizationServiceFault> ex)
                {
                    throw new InvalidPluginExecutionException("An error occurred in FollowUpPlugin.", ex);
                }
                catch (ApplicationException ex)
                {
                    throw new InvalidPluginExecutionException(ex.Message);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
}

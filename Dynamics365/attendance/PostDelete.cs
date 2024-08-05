using FM.PAP.LESSON;
using FM.PAP.UTILS;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace FM.PAP.ATTENDANCE
{
    public class PostDelete : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            ITracingService tracingService =
            (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            IPluginExecutionContext context = (IPluginExecutionContext)
            serviceProvider.GetService(typeof(IPluginExecutionContext));

            if (context.PreEntityImages.Contains("PreImage") &&
                context.PreEntityImages["PreImage"] is Entity preImage)
            {
                IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
                try
                {
                    if (preImage.Contains("res_classroombooking") && preImage["res_classroombooking"] is EntityReference erLesson)
                    {
                        Entity lesson = service.Retrieve("res_classroombooking", erLesson.Id, new ColumnSet("res_classroomid", "res_takenseats", "res_availableseats", "res_attendees", "res_remoteattendees"));

                        EntityReference erClassroom = lesson.Contains("res_classroomid") ? lesson.GetAttributeValue<EntityReference>("res_classroomid") : null;
                        Entity classroom = erClassroom != null ? service.Retrieve("res_classroom", erClassroom.Id, new ColumnSet("res_seats")) : null;

                        bool participationMode = preImage.GetAttributeValue<bool>("res_participationmode");

                        #region AGGIORNO NELLA LEZIONE IL NUMERO DI POSTI DISPONIBILI E PARTECIPANTI

                        int classroomSeats = classroom?.GetAttributeValue<int?>("res_seats") ?? 0;
                        int takenSeats = lesson.GetAttributeValue<int?>("res_takenseats") ?? 0;
                        int availableSeats = lesson.GetAttributeValue<int?>("res_availableseats") ?? 0;
                        int attendees = lesson.GetAttributeValue<int?>("res_attendees") ?? 0;
                        int remoteAttendees = lesson.GetAttributeValue<int?>("res_remoteattendees") ?? 0;

                        if (availableSeats < classroomSeats)
                        {
                            lesson["res_takenseats"] = --takenSeats;
                            lesson["res_availableseats"] = classroomSeats - takenSeats;
                        }
                        if (!participationMode) lesson["res_remoteattendees"] = --remoteAttendees;
                        lesson["res_attendees"] = --attendees;

                        service.Update(lesson);
                        #endregion
                    }
                    else
                    {
                        tracingService.Trace("res_classroombooking non trovato nel preImage.");
                    }
                }
                catch (FaultException<OrganizationServiceFault> ex)
                {
                    throw new InvalidPluginExecutionException("An error occurred in FollowUpPlugin.", ex);
                }
                catch (ApplicationException ex)
                {
                    tracingService.Trace("ApplicationException: {0}", ex.ToString());
                    throw new InvalidPluginExecutionException(ex.Message);
                }
                catch (Exception ex)
                {
                    tracingService.Trace("FollowUpPlugin: {0}", ex.ToString());
                    throw ex;
                }
            }
            else
            {
                tracingService.Trace("PreImage non trovato nel contesto.");
            }
        }
    }
}

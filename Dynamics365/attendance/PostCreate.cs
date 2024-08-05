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
using System.Security.Policy;

namespace FM.PAP.ATTENDANCE
{
    public class PostCreate : IPlugin
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

                IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
                try
                {
                    Utils.CheckMandatoryFieldsOnCreate(UtilsAttendance.mandatoryFields, target);

                    EntityReference erLesson = target.GetAttributeValue<EntityReference>("res_classroombooking");
                    Entity lesson = service.Retrieve("res_classroombooking", erLesson.Id, new ColumnSet("res_code", "res_classroomid", "res_takenseats", "res_availableseats", "res_attendees", "res_remoteattendees", "res_inpersonparticipation", "res_remoteparticipationurl"));

                    EntityReference erAttendee = target.GetAttributeValue<EntityReference>("res_subscriberid");
                    Entity attendee = service.Retrieve("res_subscriber", erAttendee.Id, new ColumnSet("res_fullname"));

                    EntityReference erClassroom = lesson.Contains("res_classroomid") && lesson.GetAttributeValue<EntityReference>("res_classroomid") != null ? lesson.GetAttributeValue<EntityReference>("res_classroomid") : null;
                    Entity classroom = erClassroom != null ? service.Retrieve("res_classroom", erClassroom.Id, new ColumnSet("res_seats")) : null;
                    int classroomSeats = classroom != null ? classroom.GetAttributeValue<int>("res_seats") : 0;

                    bool participationMode = target.GetAttributeValue<bool>("res_participationmode");

                    #region AGGIORNO NELLA LEZIONE IL NUMERO DI POSTI DISPONIBILI E PARTECIPANTI

                    int attendees = lesson.GetAttributeValue<int?>("res_attendees") ?? 0;
                    int remoteAttendees = lesson.GetAttributeValue<int?>("res_remoteattendees") ?? 0;
                    int availableSeats = lesson.GetAttributeValue<int?>("res_availableseats") ?? 0;
                    int takenSeats = lesson.GetAttributeValue<int?>("res_takenseats") ?? 0;

                    if (takenSeats < classroomSeats)
                    {
                        if (participationMode) lesson["res_takenseats"] = ++takenSeats;
                        lesson["res_availableseats"] = classroomSeats - takenSeats;
                    }
                    else
                    {
                        string remoteParticipationUrl = Utils.RandomUrlGenerator.GenerateRandomUrl();
                        lesson["res_remoteparticipationurl"] = remoteParticipationUrl;
                    }

                    if (!participationMode) lesson["res_remoteattendees"] = ++remoteAttendees;
                    lesson["res_attendees"] = ++attendees;

                    service.Update(lesson);
                    #endregion
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
        }

    }
}

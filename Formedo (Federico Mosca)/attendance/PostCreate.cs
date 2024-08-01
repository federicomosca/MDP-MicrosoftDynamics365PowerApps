using FORMEDO.LESSON;
using FORMEDO.UTILS;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace RSMNG.FORMEDO.ATTENDANCE
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
                    Entity lesson = service.Retrieve("res_classroombooking", erLesson.Id, new ColumnSet("res_code", "res_classroomid", "res_takenseats", "res_availableseats", "res_attendees", "res_inpersonparticipation"));

                    EntityReference erAttendee = target.GetAttributeValue<EntityReference>("res_subscriberid");
                    Entity attendee = service.Retrieve("res_subscriber", erAttendee.Id, new ColumnSet("res_fullname"));

                    EntityReference erClassroom = lesson["res_classroomid"] != null ? lesson.GetAttributeValue<EntityReference>("res_classroomid") : null;
                    Entity classroom = service.Retrieve("res_classroom", erClassroom.Id, new ColumnSet("res_seats"));
                    int classroomSeats = classroom.GetAttributeValue<int>("res_seats");

                    #region AGGIORNO NELLA LEZIONE IL NUMERO DI POSTI DISPONIBILI E PARTECIPANTI

                    int attendees = lesson["res_attendees"] != null ? lesson.GetAttributeValue<int>("res_attendees") : 0;
                    int availableSeats = lesson["res_availableseats"] != null ? lesson.GetAttributeValue<int>("res_availableseats") : 0;
                    int takenSeats = lesson["res_takenseats"] != null ? lesson.GetAttributeValue<int>("res_takenseats") : 0;

                    if (!(takenSeats > classroomSeats))
                    {
                        takenSeats++;
                        availableSeats = classroomSeats - takenSeats;
                    }
                        lesson["res_attendees"] = attendees + 1;
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

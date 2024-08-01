using RSMNG.FORMEDO.LESSON;
using FORMEDO.UTILS;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace RSMNG.FORMEDO.ATTENDANCE
{
    public class PreCreate : IPlugin
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
                    ColumnSet lessonColumnSet = new ColumnSet("res_code", "res_classroomid", "res_inpersonparticipation", "res_takenseats", "res_availableseats", "res_attendees", "res_inpersonparticipation", "res_remoteparticipationurl");
                    Entity lesson = service.Retrieve("res_classroombooking", erLesson.Id, lessonColumnSet);

                    EntityReference erAttendee = target.GetAttributeValue<EntityReference>("res_subscriberid");
                    Entity attendee = service.Retrieve("res_subscriber", erAttendee.Id, new ColumnSet("res_fullname"));

                    EntityReference erClassroom = lesson["res_classroomid"] != null ? lesson.GetAttributeValue<EntityReference>("res_classroomid") : null;
                    Entity classroom = service.Retrieve("res_classroom", erClassroom.Id, new ColumnSet("res_seats"));

                    int classroomSeats = classroom.GetAttributeValue<int>("res_seats");
                    int attendees = lesson.GetAttributeValue<int?>("res_attendees") ?? 0;
                    int availableSeats = lesson.GetAttributeValue<int?>("res_availableseats") ?? 0;
                    int takenSeats = lesson.GetAttributeValue<int?>("res_takenseats") ?? 0;

                    #region GENERO IL CODICE
                    string[] codeSegments = new string[2];
                    codeSegments[0] = lesson["res_code"] != null ? lesson.GetAttributeValue<string>("res_code") : string.Empty;
                    codeSegments[1] = attendee["res_fullname"] != null ? attendee.GetAttributeValue<string>("res_fullname") : string.Empty;

                    target["res_code"] = UtilsAttendance.GenerateCode(codeSegments);
                    #endregion

                    #region DETERMINO LA MODALITÀ DI PARTECIPAZIONE DEGLI ISCRITTI ALLA LEZIONE
                    bool isMandatoryInPerson = lesson.Contains("res_inpersonparticipation") ? lesson.GetAttributeValue<bool>("res_inpersonparticipation") : false;

                    //se ci sono ancora posti e la presenza è obbligatoria
                    //if (takenSeats < classroomSeats && isMandatoryInPerson)
                    //{
                    //    //allora di default l'iscritto partecipa in presenza
                    //    target["res_participationmode"] = true;
                    //}
                    //else
                    //{
                    //    Url remoteParticipationUrl = new Url("https://teams.microsoft.com/l/meetup-join/19%3ameeting_XYZ1234567890%40thread.v2/0\r\n");
                    //    lesson["res_remoteparticipationurl"] = remoteParticipationUrl;
                    //    service.Update(lesson);
                    //    //se non ci sono più posti oppure ci sono ma la presenza è facoltativa, di default l'iscritto partecipa da remoto
                    //    target["res_participationmode"] = false;
                    //}
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

using FM.MDP.LESSON;
using FM.MDP.UTILS;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Security.Policy;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace FM.MDP.ATTENDANCE
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
                    ColumnSet lessonColumnSet = new ColumnSet("res_code", "res_classroomid", "res_inpersonparticipation", "res_takenseats", "res_availableseats", "res_attendees", "res_inpersonparticipation", "res_remoteparticipationurl", "res_intendedstartingtime", "res_intendedendingtime");
                    Entity lesson = service.Retrieve("res_classroombooking", erLesson.Id, lessonColumnSet);

                    EntityReference erAttendee = target.GetAttributeValue<EntityReference>("res_subscriberid");
                    Entity attendee = service.Retrieve("res_subscriber", erAttendee.Id, new ColumnSet("res_fullname"));

                    EntityReference erClassroom = lesson.Contains("res_classroomid") && lesson.GetAttributeValue<EntityReference>("res_classroomid") != null ? lesson.GetAttributeValue<EntityReference>("res_classroomid") : null;
                    Entity classroom = erClassroom != null ? service.Retrieve("res_classroom", erClassroom.Id, new ColumnSet("res_seats")) : null;

                    int classroomSeats = classroom != null ? classroom.GetAttributeValue<int>("res_seats") : 0;

                    var fetchAttendancesCount = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                                <fetch returntotalrecordcount=""true"">
                                                  <entity name=""res_attendance"">
                                                    <attribute name=""res_participationmode"" />
                                                    <attribute name=""res_code"" />
                                                    <attribute name=""res_startingtime"" />
                                                    <attribute name=""res_endingtime"" />
                                                    <filter>
                                                      <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                                      <condition attribute=""res_classroombooking"" operator=""eq"" value=""{erLesson.Id}"" />
                                                    </filter>
                                                  </entity>
                                                </fetch>";

                    EntityCollection attendances = service.RetrieveMultiple(new FetchExpression(fetchAttendancesCount));

                    int inPersonAttendancesCount = attendances.Entities.Count(attendance => attendance.GetAttributeValue<bool>("res_participationmode") == true);
                    int remoteAttendancesCount = attendances.Entities.Count(attendance => attendance.GetAttributeValue<bool>("res_participationmode") == false);

                    #region GENERO IL CODICE
                    string[] codeSegments = new string[2];
                    codeSegments[0] = lesson["res_code"] != null ? lesson.GetAttributeValue<string>("res_code") : string.Empty;
                    codeSegments[1] = attendee["res_fullname"] != null ? attendee.GetAttributeValue<string>("res_fullname") : string.Empty;

                    target["res_code"] = UtilsAttendance.GenerateCode(codeSegments);
                    #endregion

                    #region DETERMINO LA MODALITÀ DI PARTECIPAZIONE DEGLI ISCRITTI ALLA LEZIONE
                    bool isMandatoryInPerson = lesson.GetAttributeValue<bool>("res_inpersonparticipation");

                    if (inPersonAttendancesCount < classroomSeats)
                    {
                        /**
                         * se è obbligatoria la presenza = true
                         * altrimenti l'utente può scegliere ma di default è true
                         * per incoraggiare a partecipare in presenza
                         */
                        if (isMandatoryInPerson) target["res_participationmode"] = true;
                    }
                    else
                    {
                        /**
                         * se non ci sono posti = false
                         * se la presenza in aula è obbligatoria, però,
                         * viene inviata una mail all'utente per avvertirlo che i posti sono esauriti
                         * e che potrebbero liberarsene in futuro e gli verrà notificato sempre per mail
                         */
                        target["res_participationmode"] = false;

                        if (isMandatoryInPerson)
                        {
                            string subscriberFullName;
                            string subscriberEmail;
                            string lessonCode;
                            string url;

                            EntityReference erSubscriber = target.GetAttributeValue<EntityReference>("res_subscriberid");
                            Entity subscriber = erSubscriber != null ? service.Retrieve("res_subscriber", erSubscriber.Id, new ColumnSet("res_fullname", "res_emailaddress")) : null;

                            if (subscriber != null)
                            {
                                subscriberFullName = subscriber.GetAttributeValue<string>("res_fullname") ?? string.Empty;
                                subscriberEmail = subscriber.GetAttributeValue<string>("res_emailaddress") ?? string.Empty;
                                lessonCode = lesson.GetAttributeValue<string>("res_code") ?? string.Empty;
                                url = lesson.GetAttributeValue<string>("res_remoteparticipationurl") ?? string.Empty;

                                var task = Task.Run(async () => await CallPowerAutomateFlow(tracingService, subscriberFullName, subscriberEmail, lessonCode, url));

                                task.Wait();
                            }
                            else
                            {
                                throw new Exception("Subscriber cannot be null");
                            }
                        }
                    }
                    #endregion

                    #region CONTROLLO CHE ORARIO PRESENZA SIA NEL RANGE DELLA LEZIONE
                    string intendedStartingTimeString = lesson.GetAttributeValue<string>("res_intendedstartingtime") ?? null;
                    string intendedEndingTimeString = lesson.GetAttributeValue<string>("res_intendedendingtime") ?? null;

                    string attendanceStartingTimeString = target.GetAttributeValue<string>("res_startingtime") ?? null;
                    string attendanceEndingTimeString = target.GetAttributeValue<string>("res_endingtime") ?? null;

                    if (!Utils.IsInRange(intendedStartingTimeString, intendedEndingTimeString, attendanceStartingTimeString))
                        throw new ApplicationException("L'ora di inizio della presenza non pu\u00F2 cadere fuori dall'orario della lezione.");

                    if (!Utils.IsInRange(intendedStartingTimeString, intendedEndingTimeString, attendanceEndingTimeString))
                        throw new ApplicationException("L'ora di fine della presenza non pu\u00F2 cadere fuori dall'orario della lezione.");

                    if (Utils.StringTimeToInt(attendanceStartingTimeString) > Utils.StringTimeToInt(attendanceEndingTimeString))
                        throw new ApplicationException("L'ora di inizio della presenza non pu\u00F2 essere antecedente all'ora di fine.");

                    #endregion

                    #region CONTROLLO CHE NON CI SIANO DUE PRESENZE CON LO STESSO CODICE E STESSE ORA INIZIO OD ORA FINE

                    if (attendances.Entities.Count > 0)
                    {
                        string targetCode = target.GetAttributeValue<string>("res_code") ?? null;

                        foreach (Entity entity in attendances.Entities)
                        {
                            string entityCode = entity.GetAttributeValue<string>("res_code") ?? null;

                            string entityStartingTimeString = entity.GetAttributeValue<string>("res_startingtime") ?? null;
                            string entityEndingTimeString = entity.GetAttributeValue<string>("res_endingtime") ?? null;

                            int entityStartingTime = Utils.StringTimeToInt(entityStartingTimeString);
                            int entityEndingTime = Utils.StringTimeToInt(entityEndingTimeString);


                            if (entityCode != null)
                            {
                                if (entityCode == targetCode)
                                {
                                    if (entityStartingTime == Utils.StringTimeToInt(attendanceStartingTimeString) ||
                                        entityEndingTime == Utils.StringTimeToInt(attendanceEndingTimeString))
                                    {
                                        throw new ApplicationException("Non possono esistere due presenze dello stesso iscritto con gli stessi orari");
                                    }
                                }
                            }
                        }

                    }
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

        private async Task CallPowerAutomateFlow(ITracingService tracingService, string subscriberFullName, string contactEmail, string lessonCode, string url)
        {
            string flowUrl = "https://prod-51.northeurope.logic.azure.com:443/workflows/43054e79d1364589a2cca95b0ae5c1bf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VGK8qOuaqcaYcOYWgSIO6DH57J-kKxQmsBdwk3-b8wU";

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var data = new
                    {
                        subscriberFullName,
                        contactEmail,
                        lessonCode,
                        url
                    };
                    var json = JsonConvert.SerializeObject(data);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(flowUrl, content);
                    string responseContent = await response.Content.ReadAsStringAsync();

                    if (response.IsSuccessStatusCode)
                    {
                        tracingService.Trace("Power Automate Flow called successfully. Response: {0}", responseContent);
                    }
                    else
                    {
                        tracingService.Trace("Error calling Power Automate Flow. Status Code: {0}. Response: {1}", response.StatusCode, responseContent);
                    }
                }
            }
            catch (Exception ex)
            {
                tracingService.Trace("Exception occurred while calling Power Automate Flow: {0}", ex.ToString());
            }
        }

    }
}

using FM.PAP.CLIENTACTION;
using FM.PAP.LESSON;
using FM.PAP.UTILS;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
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
                        Entity lesson = service.Retrieve("res_classroombooking", erLesson.Id, new ColumnSet("res_code", "res_classroomid"));

                        EntityReference erClassroom = lesson.Contains("res_classroomid") ? lesson.GetAttributeValue<EntityReference>("res_classroomid") : null;
                        Entity classroom = erClassroom != null ? service.Retrieve("res_classroom", erClassroom.Id, new ColumnSet("res_seats")) : null;

                        bool isInPerson = preImage.GetAttributeValue<bool>("res_participationmode");

                        #region AGGIORNO NELLA LEZIONE IL NUMERO DI POSTI DISPONIBILI E PARTECIPANTI

                        int classroomSeats = classroom?.GetAttributeValue<int?>("res_seats") ?? 0;

                        var fetchAttendancesCount = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                                <fetch returntotalrecordcount=""true"">
                                                  <entity name=""res_attendance"">
                                                    <attribute name=""res_participationmode"" />
                                                    <filter>
                                                      <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                                      <condition attribute=""res_classroombooking"" operator=""eq"" value=""{erLesson.Id}"" />
                                                    </filter>
                                                  </entity>
                                                </fetch>";

                        EntityCollection attendances = service.RetrieveMultiple(new FetchExpression(fetchAttendancesCount));

                        int inPersonAttendancesCount = attendances.Entities.Count(attendance => attendance.GetAttributeValue<bool>("res_participationmode") == true);
                        int remoteAttendancesCount = attendances.Entities.Count(attendance => attendance.GetAttributeValue<bool>("res_participationmode") == false);

                        lesson["res_attendees"] = inPersonAttendancesCount + remoteAttendancesCount;
                        lesson["res_remoteattendees"] = remoteAttendancesCount;
                        lesson["res_takenseats"] = inPersonAttendancesCount;
                        lesson["res_availableseats"] = classroomSeats - inPersonAttendancesCount;

                        if (isInPerson)
                        {
                            if (inPersonAttendancesCount < classroomSeats)
                            {

                                var request = new OrganizationRequest("res_ClientAction");

                                request["jsonDataInput"] = JsonConvert.SerializeObject(erLesson.Id);
                                request["actionName"] = "NOTIFICATE_LESSON_OPENING";

                                try
                                {
                                    tracingService.Trace("Contenuto di jsonDataInput: {0}", request["jsonDataInput"]);

                                    OrganizationResponse response = service.Execute(request);
                                    tracingService.Trace("after calling client action");
                                    if (response.Results.Contains("jsonDataOutput"))
                                    {
                                        tracingService.Trace("response from client action");
                                        var outputValue = response.Results["jsonDataOutput"];
                                    }
                                }
                                catch (FaultException<OrganizationServiceFault> ex)
                                {
                                    tracingService.Trace("OrganizationServiceFault Exception: {0}", ex.ToString());

                                    throw new InvalidPluginExecutionException($"Errore durante l'esecuzione dell'azione: {ex.Message}");
                                }
                                #endregion
                            }
                        }
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

        private async Task CallPowerAutomateFlow(ITracingService tracingService, string subscriberFullName, string subscriberEmail, string lessonCode, string attendanceId)
        {
            string flowUrl = "https://prod-29.northeurope.logic.azure.com:443/workflows/6e131085e906484fa2d0dc74ea775786/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-T1DGUsteF9r6Eok-ahXSP4ex-pNs6J5uMH145J7XzQ";

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var data = new
                    {
                        subscriberFullName,
                        subscriberEmail,
                        lessonCode,
                        attendanceId
                    };
                    var json = JsonConvert.SerializeObject(data);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");

                    tracingService.Trace("Sending request to Power Automate Flow URL: {0}", flowUrl);
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


using FM.MDP.UTILS;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace FM.MDP.ATTENDANCE
{
    public class PreUpdate : IPlugin
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
                    Utils.CheckMandatoryFieldsOnUpdate(UtilsAttendance.mandatoryFields, target);

                    bool isInPerson = target.GetAttributeValue<bool>("res_participationmode");

                    if (isInPerson)
                    {
                        EntityReference erLesson = Utils.GetAttributeFromTargetOrPreImage<EntityReference>("res_classroombooking", target, preImage);
                        Entity lesson = service.Retrieve("res_classroombooking", erLesson.Id, new ColumnSet("res_code", "res_classroomid"));

                        EntityReference erClassroom = lesson.GetAttributeValue<EntityReference>("res_classroomid");
                        Entity classroom = service.Retrieve("res_classroom", erClassroom.Id, new ColumnSet("res_seats"));
                        int classroomSeats = classroom?.GetAttributeValue<int>("res_seats") ?? 0;

                        var fetchInPersonAttendances = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                            <fetch returntotalrecordcount=""true"">
                                              <entity name=""res_attendance"">
                                                <filter>
                                                  <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                                  <condition attribute=""res_classroombooking"" operator=""eq"" value=""{erLesson.Id}"" />
                                                  <condition attribute=""res_participationmode"" operator=""eq"" value=""1"" />
                                                </filter>
                                              </entity>
                                            </fetch>";

                        int inPersonAttendances = service.RetrieveMultiple(new FetchExpression(fetchInPersonAttendances)).TotalRecordCount;

                        if (inPersonAttendances == classroomSeats)
                        {
                            target["res_participationmode"] = false;

                            EntityReference erSubscriber = Utils.GetAttributeFromTargetOrPreImage<EntityReference>("res_subscriberid", target, preImage);
                            Entity subscriber = service.Retrieve("res_subscriber", erSubscriber.Id, new ColumnSet("res_fullname", "res_emailaddress"));

                            string subscriberFullName = subscriber.GetAttributeValue<string>("res_fullname") ?? string.Empty;
                            string subscriberEmail = subscriber.GetAttributeValue<string>("res_emailaddress") ?? string.Empty;
                            string lessonCode = lesson.GetAttributeValue<string>("res_code") ?? string.Empty;

                            var task = Task.Run(async () => await CallPowerAutomateFlow(tracingService, subscriberFullName, subscriberEmail, lessonCode));

                            task.Wait();
                        }
                    }

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

        private async Task CallPowerAutomateFlow(ITracingService tracingService, string subscriberFullName, string subscriberEmail, string lessonCode)
        {
            string flowUrl = "https://prod-02.northeurope.logic.azure.com:443/workflows/b49a606b6b5248588f407dfe7b1119cf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ysEd4Z2CYFaJRenXZw6-xV0k9QxjnfNisKrN6bdyp48";

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var data = new
                    {
                        subscriberFullName,
                        subscriberEmail,
                        lessonCode
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

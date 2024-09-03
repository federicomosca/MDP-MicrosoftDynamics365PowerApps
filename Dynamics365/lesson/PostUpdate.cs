using FM.PAP.CLIENTACTION;
using FM.PAP.UTILS;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace FM.PAP.LESSON
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
                Entity target = context.InputParameters["Target"] as Entity;

                IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
                try
                {
                    Entity preImage = context.PreEntityImages["PreImage"];

                    Utils.CheckMandatoryFieldsOnUpdate(UtilsLesson.mandatoryFields, target);

                    /*
                     * se è stata cambiata l'aula e i posti a sedere della nuova aula sono maggiori di quella precedente
                     * invoco la custom API per notificare agli utenti in remoto che adesso sono disponibili dei posti
                     */
                    EntityReference erClassroom = target.Contains("res_classroomid") ? target.GetAttributeValue<EntityReference>("res_classroomid") : null;
                    if (erClassroom != null)
                    {
                        Entity classroom = service.Retrieve("res_classroom", erClassroom.Id, new ColumnSet("res_seats"));
                        int? classroomSeats = classroom?.GetAttributeValue<int?>("res_seats") ?? 0;

                        var fetchInPersonAttendees = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                            <fetch returntotalrecordcount=""true"">
                                                <entity name=""res_attendance"">
                                                <filter>
                                                    <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                                    <condition attribute=""res_classroombooking"" operator=""eq"" value=""{target.Id}"" />
                                                    <condition attribute=""res_participationmode"" operator=""eq"" value=""1"" />
                                                </filter>
                                                </entity>
                                            </fetch>";
                        tracingService.Trace(fetchInPersonAttendees);

                        EntityCollection inPersonAttendees = service.RetrieveMultiple(new FetchExpression(fetchInPersonAttendees));

                        if (inPersonAttendees.Entities.Count() < classroomSeats)
                        {
                            var request = new OrganizationRequest("res_ClientAction");

                            request["jsonDataInput"] = JsonConvert.SerializeObject(target.Id);
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
                        }
                    }
                    else
                    {
                        tracingService.Trace("no classroom found");
                    }
                    /**
                     * se modifico data o orari della lezione, devo aggiornare gli stessi campi nelle presenze
                     */



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

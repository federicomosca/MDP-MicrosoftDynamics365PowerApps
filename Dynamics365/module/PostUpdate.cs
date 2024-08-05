using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace FM.PAP.MODULE
{
    public class PostUpdate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {

            ITracingService tracingService = (ITracingService)
            serviceProvider.GetService(typeof(ITracingService));

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
                    Entity preImage = (Entity)context.PreEntityImages["PreImage"];

                    #region > logica che aggiorna il costo complessivo del corso al cambiare del costo di uno dei relativi moduli
                    Decimal modulesFeeSum = 0;
                    Decimal courseFee = 0;

                    EntityReference erCourse = preImage.Contains("res_courseid") && preImage["res_courseid"] != null ? preImage.GetAttributeValue<EntityReference>("res_courseid") : null;
                    Guid moduleId = target.Id;
                    if (moduleId != Guid.Empty && erCourse != null)
                    {
                        var fetchXml = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                        <fetch aggregate=""true"">
                                          <entity name=""res_module"">
                                            <attribute name=""res_fee"" alias=""ModulesFeeSum"" aggregate=""sum"" />
                                            <filter>
                                              <condition attribute=""res_courseid"" operator=""eq"" value=""{erCourse.Id}"" />
                                              <condition attribute=""res_moduleid"" operator=""ne"" value=""{moduleId}"" />
                                              <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                            </filter>
                                          </entity>
                                        </fetch>";

                        EntityCollection modules = service.RetrieveMultiple(new FetchExpression(fetchXml));

                        Entity module = modules.Entities[0];

                        if (module.Attributes.Contains("ModulesFeeSum") && ((AliasedValue)module["ModulesFeeSum"]).Value != null)
                        {
                            modulesFeeSum = ((Money)((AliasedValue)module["ModulesFeeSum"]).Value).Value;
                        }

                        // PER QUALCHE MOTIVO QUA COURSE FEE GLI ARRIVA 0, DUNQUE NON AGGIORNA IL COSTO COMPLESSIVO DEL CORSO, GLI PASSA "NESSUN VALORE"

                        Entity course = new Entity("res_course", erCourse.Id);
                        courseFee = modulesFeeSum;
                        tracingService.Trace($"Course Fee: {courseFee.ToString()}");
                        course["res_fee"] = courseFee != 0 ? new Money(courseFee) : null;
                        service.Update(course);
                    }

                    #endregion

                    #region > logica che aggiorna l'assegnazione del modulo a un nuovo corso
                    EntityReference erNewCourse = target.Contains("res_courseid") && target["res_courseid"] != null ? target.GetAttributeValue<EntityReference>("res_courseid") : null;
                    if (erNewCourse != null && erNewCourse.Id != erCourse.Id)
                    {
                        Entity module = new Entity("res_module", moduleId);
                        module["res_courseid"] = erNewCourse;
                        service.Update(module);
                    }
                    #endregion

                    #region > [esercitazione] torna le lezioni attive del modulo che durano almeno 8 ore
                    var fetchXml2 = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                        <fetch>
                                          <entity name=""res_lesson"">
                                            <filter>
                                              <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                              <condition attribute=""res_moduleid"" operator=""eq"" value=""{moduleId}"" />
                                            </filter>
                                          </entity>
                                        </fetch>";

                    EntityCollection results = service.RetrieveMultiple(new FetchExpression(fetchXml2));

                    if (results.Entities.Count > 0)
                    {
                        List<Entity> filteredLessons = results.Entities.Where(lesson => lesson.GetAttributeValue<Decimal>("res_intendedduration") > 8).ToList();

                        foreach (Entity lesson in filteredLessons)
                        {
                            tracingService.Trace("Filteres lessons found.");
                            string lessonTitle = lesson.GetAttributeValue<string>("res_title");
                            tracingService.Trace(lessonTitle);
                        }
                    }
                    #endregion
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

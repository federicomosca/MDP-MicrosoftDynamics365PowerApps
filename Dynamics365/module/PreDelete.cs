using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace FM.PAP.MODULE
{
    public class PreDelete : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // Obtain the tracing service
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            // Obtain the execution context from the service provider.  
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            // The InputParameters collection contains all the data passed in the message request.  
            if (context.PreEntityImages.Contains("PreImage") && context.PreEntityImages["PreImage"] is Entity)
            {
                // Obtain the target entity from the input parameters.  
                Entity preImage = (Entity)context.PreEntityImages["PreImage"];

                // Obtain the IOrganizationService instance which you will need for  web service calls.  
                IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

                try
                {
                    Decimal modulesFeesSum = 0;
                    Decimal courseFee = 0;

                    Guid currentModuleId = preImage.Contains("res_moduleid") && preImage["res_moduleid"] != null ? preImage.GetAttributeValue<Guid>("res_moduleid") : Guid.Empty;
                    tracingService.Trace($"Current Module Id: {currentModuleId.ToString()}");
                    EntityReference erCourse = preImage.Contains("res_course") && preImage["res_course"] != null ? preImage.GetAttributeValue<EntityReference>("res_course") : null;
                    if (erCourse != null && currentModuleId != Guid.Empty)
                    {
                        var fetchXml = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                    <fetch aggregate=""true"">
                                      <entity name=""res_module"">
                                        <attribute name=""res_fee"" alias=""SumFee"" aggregate=""sum"" />
                                        <filter>
                                          <condition attribute=""res_moduleid"" operator=""ne"" value=""{currentModuleId}"" uitype=""res_module"" />
                                          <condition attribute=""res_course"" operator=""eq"" value=""{erCourse.Id}"" uitype=""res_course"" />
                                          <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                        </filter>
                                      </entity>
                                    </fetch>";

                        EntityCollection modules = service.RetrieveMultiple(new FetchExpression(fetchXml)); 
                        if (modules.Entities.Count > 0)
                        {
                            Entity aggregate = modules.Entities[0];
                            if (aggregate.Attributes.Contains("SumFee") && ((AliasedValue)aggregate["SumFee"]).Value != null)
                            {
                                modulesFeesSum = ((Money)((AliasedValue)aggregate["SumFee"]).Value).Value;
                            }
                        }
                        tracingService.Trace($"Nuova tariffa del corso: {modulesFeesSum}");

                        Entity enCourse = new Entity("res_course", erCourse.Id);
                        courseFee = modulesFeesSum;
                        enCourse["res_fee"] = courseFee != 0 ? new Money(courseFee) : null;
                        service.Update(enCourse);
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
        }
    }
}


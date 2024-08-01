using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace RSMNG.FORMEDO.MODULE
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
                    Decimal courseFee = 0;
                    Decimal moduleFee = 0;
                    Decimal aggSum = 0;

                    EntityReference erCourse = target.Contains("res_courseid") && target["res_courseid"] != null ? target.GetAttributeValue<EntityReference>("res_courseid") : null;
                    Entity course = erCourse != null ? service.Retrieve("res_course", erCourse.Id, new ColumnSet("res_fee")) : null;
                    courseFee = course != null && course.Contains("res_fee") && course["res_fee"] != null ? course.GetAttributeValue<Money>("res_fee").Value : 0;
                    moduleFee = target.Contains("res_fee") && target["res_fee"] != null ? target.GetAttributeValue<Money>("res_fee").Value : 0;
                    if (moduleFee != 0)
                    {
                        if (erCourse != null)
                        {
                            var fetchXml = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                        <fetch aggregate=""true"">
                                          <entity name=""res_module"">
                                            <attribute name=""res_fee"" alias=""SumFee"" aggregate=""sum"" />
                                            <filter>
                                              <condition attribute=""res_courseid"" operator=""eq"" value=""{erCourse.Id}"" uitype=""res_course"" />
                                              <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                            </filter>
                                          </entity>
                                        </fetch>";
                            tracingService.Trace(fetchXml);
                            EntityCollection results = service.RetrieveMultiple(new FetchExpression(fetchXml));

                            if (results.Entities.Count > 0)
                            {
                                Entity aggregate = results.Entities[0];
                                if (aggregate.Attributes.Contains("SumFee"))
                                {
                                    aggSum = ((Money)((AliasedValue)aggregate["SumFee"]).Value).Value;
                                }
                            }
                            courseFee = aggSum;
                            course["res_fee"] = courseFee != 0 ? new Money(courseFee) : null;
                            service.Update(course);
                        }
                        else
                        {
                            throw new ApplicationException("You must select a course.");
                        }
                    } else
                    {
                        throw new ApplicationException("You must enter a fee for the new module.");
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

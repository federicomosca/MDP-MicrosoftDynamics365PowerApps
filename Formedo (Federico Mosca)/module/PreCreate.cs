using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RSMNG.FORMEDO.MODULE
{
    public class PreCreate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService serviceOrg = serviceFactory.CreateOrganizationService(null);
            IOrganizationService serviceUser = serviceFactory.CreateOrganizationService(context.UserId);

            try
            {
                Entity target = (Entity)context.InputParameters["Target"];
                tracingService.Trace("dentro PreCreate");
                EntityReference course = target.GetAttributeValue<EntityReference>("res_course");
                if (course == null)
                {
                    throw new ApplicationException("course not found");
                }
                else
                {
                    tracingService.Trace($"Course: {course.Id}");
                }

                Decimal fee = target.Contains("res_fee") && target["res_fee"] != null ? target.GetAttributeValue<Money>("res_fee").Value : 0;

                if (fee == 0)
                {
                    throw new ApplicationException("you must enter a fee");
                }


                string name = target.GetAttributeValue<string>("res_name");

                if (name == null)
                {
                    throw new ApplicationException("name not found");

                }
                else
                {
                    tracingService.Trace($"Name: {name}");
                }

                DateTime? intendedStart = target.GetAttributeValue<DateTime?>("res_intendedstart");
                if (intendedStart.HasValue == false)
                {
                    throw new ApplicationException("intended start date not selected");

                }
                else
                {
                    if (intendedStart < DateTime.Today)
                    {
                        throw new ApplicationException($"intended start date cannot be earlier than today. start  {intendedStart.ToString()}. today  {DateTime.Today.ToString()}");
                    }
                    else
                    {
                        tracingService.Trace($"Intended Start Date: {intendedStart}");
                    }
                }

                DateTime? intendedEnd = target.GetAttributeValue<DateTime?>("res_intendedend");
                if (intendedEnd.HasValue == false)
                {
                    throw new ApplicationException("intended end date not selected");
                }
                else
                {
                    if (intendedEnd < intendedStart)
                    {
                        throw new ApplicationException($"intended end date cannot be earlier than intended start date. end date {intendedEnd.ToString()}. start date  {intendedStart.ToString()}");
                    }
                    else
                    {
                        tracingService.Trace($"Intended End Date: {intendedStart}");
                    }
                }
                //Decimal costFee = target.GetAttributeValue<Money>("res_fee").Value;
                //target.Attributes.Add("res_fee", new Money(costFee));
            }
            catch (Exception ex)
            {
                tracingService.Trace(ex.ToString());
                throw new InvalidPluginExecutionException(ex.Message);
            }
        }

    }
}

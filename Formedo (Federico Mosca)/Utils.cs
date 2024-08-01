using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Services;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace FORMEDO.UTILS
{
    public class Utils
    {
        #region STANDARD UPDATE PLUGIN
        public class Update : IPlugin
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
        #endregion

        #region STANDARD CREATE PLUGIN
        public class Create : IPlugin
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
        #endregion

        public static void CheckMandatoryFieldsOnCreate(Dictionary<string, string> fields, Entity target)
        {
            try
            {
                List<string> missingFields = fields.Where(x => !target.Contains(x.Key)).Select(x => x.Value).ToList();
                if (missingFields.Count > 0)
                {
                    string fieldName = string.Join(", ", missingFields);
                    throw new InvalidPluginExecutionException($"{(missingFields.Count > 1 ? "I seguenti campi sono obbligatori: " : "Il seguente campo è obbligatorio: ")} {fieldName}.");
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

        public static void CheckMandatoryFieldsOnUpdate(Dictionary<string, string> fields, Entity target)
        {
            try
            {
                List<string> missingFields = fields.Where(x => target.Contains(x.Key) && target.GetAttributeValue<object>(x.Key) == null).Select(x => x.Value).ToList();
                if (missingFields.Count > 0)
                {
                    string fieldName = string.Join(", ", missingFields);
                    throw new InvalidPluginExecutionException($"{(missingFields.Count > 1 ? "I seguenti campi sono obbligatori: " : "Il seguente campo è obbligatorio: ")} {fieldName}.");
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

        public static void CheckReadOnlyFields(Dictionary<string, string> fields, Entity target)
        {
            try
            {
                List<string> missingFields = fields.Where(x => target.Contains(x.Key)).Select(x => x.Value).ToList();
                if (missingFields.Count > 0)
                {
                    string fieldName = string.Join(", ", missingFields);
                    throw new InvalidPluginExecutionException($"{(missingFields.Count > 1 ? "I seguenti campi sono obbligatori: " : "Il seguente campo è obbligatorio: ")} {fieldName}.");
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

        public static T GetAttributeFromTargetOrPreImage<T>(string logicalName, Entity target, Entity preImage)
        {
            return target.Contains(logicalName) ? target.GetAttributeValue<T>(logicalName) : preImage.GetAttributeValue<T>(logicalName);
        }
    }
}


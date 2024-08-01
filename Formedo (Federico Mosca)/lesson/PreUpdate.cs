using FORMEDO;
using FORMEDO.UTILS;
using FORMEDO.LESSON;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace RSMNG.FORMEDO.LESSON
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
                    Utils.CheckMandatoryFieldsOnUpdate(UtilsLesson.mandatoryFields, target);

                    string[] codeSegments = new string[3];

                    EntityReference erClassroom = Utils.GetAttributeFromTargetOrPreImage<EntityReference>("res_classroomid", target, preImage);
                    Entity classroom = service.Retrieve("res_classroom", erClassroom.Id, new ColumnSet("res_name"));
                    codeSegments[0] = classroom["res_name"] != null ? classroom.GetAttributeValue<string>("res_name") + " - " : string.Empty;

                    EntityReference erModule = Utils.GetAttributeFromTargetOrPreImage<EntityReference>("res_moduleid", target, preImage);
                    Entity module = service.Retrieve("res_module", erModule.Id, new ColumnSet("res_title"));
                    codeSegments[1] = module["res_title"] != null ? module.GetAttributeValue<string>("res_title") + " - " : string.Empty;

                    DateTime date = Utils.GetAttributeFromTargetOrPreImage<DateTime>("res_intendeddate", target, preImage);
                    codeSegments[2] = date.ToString("dd-MM-yyyy");

                    tracingService.Trace(UtilsLesson.GenerateCode(codeSegments));
                    target["res_code"] = UtilsLesson.GenerateCode(codeSegments);
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

using RSMNG.FORMEDO.LESSON;
using FORMEDO.UTILS;
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
                    Utils.CheckMandatoryFieldsOnCreate(UtilsLesson.mandatoryFields, target);

                    string[] codeSegments = new string[3];

                    EntityReference erClassroom = target.Contains("res_classroomid") && target["res_classroomid"] != null ? target.GetAttributeValue<EntityReference>("res_classroomid") : null;
                    Entity classroom = erClassroom != null ? service.Retrieve("res_classroom", erClassroom.Id, new ColumnSet("res_name")) : null;
                    codeSegments[0] = classroom["res_name"] != null ? classroom.GetAttributeValue<string>("res_name") + " - " : string.Empty;

                    EntityReference erModule = target.Contains("res_moduleid") && target["res_moduleid"] != null ? target.GetAttributeValue<EntityReference>("res_moduleid") : null;
                    Entity module = erModule != null ? service.Retrieve("res_module", erModule.Id, new ColumnSet("res_title")) : null;
                    codeSegments[1] = module["res_title"] != null ? module.GetAttributeValue<string>("res_title") + " - " : string.Empty;

                    DateTime date = target.Contains("res_intendeddate") && target["res_intendeddate"] != null ? target.GetAttributeValue<DateTime>("res_intendeddate") : DateTime.UtcNow;
                    codeSegments[2] = date.ToString("dd-MM-yyyy");

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

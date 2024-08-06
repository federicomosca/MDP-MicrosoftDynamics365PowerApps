using FM.PAP.UTILS;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace FM.PAP.ATTENDANCE
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
                    //Utils.CheckMandatoryFieldsOnUpdate(UtilsAttendance.mandatoryFields, target);

                    //EntityReference erLesson = Utils.GetAttributeFromTargetOrPreImage<EntityReference>("res_classroombookingid", target, preImage);
                    //Entity lesson = service.Retrieve("res_classroombooking", erLesson.Id, new ColumnSet("res_sessionmode", "res_inpersonparticipation"));
                    //bool? sessionMode = lesson.GetAttributeValue<bool?>("res_sessionmode") ?? null;
                    //bool? isInPersonMandatory = lesson.GetAttributeValue<bool?>("res_inpersonparticipation") ?? null;

                    //bool participationMode = Utils.GetAttributeFromTargetOrPreImage<bool>("res_participationmode")


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

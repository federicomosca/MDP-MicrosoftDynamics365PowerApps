using FM.PAP.LESSON;
using FM.PAP.UTILS;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace FM.PAP.LESSON
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

                    #region GENERA CODICE
                    string[] codeSegments = new string[3];

                    EntityReference erClassroom = target.Contains("res_classroomid") && target.GetAttributeValue<EntityReference>("res_classroomid") != null ? target.GetAttributeValue<EntityReference>("res_classroomid") : null;
                    Entity classroom = erClassroom != null ? service.Retrieve("res_classroom", erClassroom.Id, new ColumnSet("res_name")) : null;
                    codeSegments[0] = classroom != null && classroom["res_name"] != null ? classroom.GetAttributeValue<string>("res_name") + " - " : "Da Remoto - ";

                    EntityReference erModule = target.GetAttributeValue<EntityReference>("res_moduleid");
                    Entity module = service.Retrieve("res_module", erModule.Id, new ColumnSet("res_title"));
                    codeSegments[1] = module["res_title"] != null ? module.GetAttributeValue<string>("res_title") + " - " : string.Empty;

                    DateTime date = target.GetAttributeValue<DateTime>("res_intendeddate");
                    codeSegments[2] = date.ToString("dd-MM-yyyy");

                    target["res_code"] = UtilsLesson.GenerateCode(codeSegments);
                    #endregion

                    #region GESTIONE DELLA MODALITÀ DI PARTECIPAZIONE
                    bool sessionMode = target.GetAttributeValue<bool>("res_sessionmode");
                    bool inPersonParticipation = target.GetAttributeValue<bool>("res_inpersonparticipation");

                    if (!sessionMode) target["res_inpersonparticipation"] = false; //hide field on js
                    if (sessionMode && !inPersonParticipation)
                    {
                        string url = Utils.RandomUrlGenerator.GenerateRandomUrl();
                        target["res_remoteparticipationurl"] = url;
                    }
                    #endregion
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

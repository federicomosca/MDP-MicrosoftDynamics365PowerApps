using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.InteropServices;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using static RSMNG.FORMEDO.CLIENTACTION.ClientAction;

namespace RSMNG.FORMEDO.CLIENTACTION
{
    public class ClientAction : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            ITracingService tracingService =
            (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            IPluginExecutionContext context = (IPluginExecutionContext)
            serviceProvider.GetService(typeof(IPluginExecutionContext));

            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            string jsonDataOutput = string.Empty;
            string jsonDataInput = (string)context.InputParameters["jsonDataInput"];
            string actionName = (string)context.InputParameters["actionName"];


            try
            {
                switch (actionName)
                {
                    case "DATE_VALIDATION":
                        jsonDataOutput = ValidateDates(tracingService, service, jsonDataInput);
                        break;

                    case "CHECK_GOVERNMENT_ID":
                        jsonDataOutput = LinkByGovernmentId(tracingService, service, jsonDataInput);
                        break;

                    case "UPDATE_OLD_CONTACTS_ACCOUNTS":
                        jsonDataOutput = CheckStoredAccountsContactsRelation(tracingService, service, jsonDataInput);
                        break;

                    case "FILTER_BOOKING_DATE":
                        jsonDataOutput = FilterBookingDate(tracingService, service, jsonDataInput);
                        break;
                    case "HANDLE_ATTENDEES_SURPLUS":
                        jsonDataOutput = HandleAttendeesSurplus(tracingService, service, jsonDataInput);
                        break;
                }

                context.OutputParameters["jsonDataOutput"] = jsonDataOutput;
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

        public string ValidateDates(ITracingService tracingService, IOrganizationService service, string jsonDataInput)
        {
            FormTerm formTerm = JsonConvert.DeserializeObject<FormTerm>(jsonDataInput);

            string source = formTerm.source;
            string message = "ok";
            DateTime startDate = DateTime.Parse(formTerm.startDate);
            DateTime endDate = DateTime.Parse(formTerm.endDate);

            Guid courseId = Guid.Empty;
            Guid moduleId = Guid.Empty;

            if (formTerm.courseId.HasValue)
            {
                courseId = (Guid)formTerm.courseId.Value;
            }
            if (formTerm.moduleId.HasValue)
            {
                moduleId = (Guid)formTerm.moduleId.Value;
            }

            tracingService.Trace($"Source: {source}");
            tracingService.Trace($"Course ID: {courseId}");
            tracingService.Trace($"Module ID: {moduleId}");


            if (courseId != null || source.Equals("COURSE"))
            {
                string filter = string.Empty;
                string entityName = string.Empty;

                switch (source)
                {
                    case "COURSE":
                        entityName = "res_course";
                        filter = $@"<condition attribute=""res_courseid"" operator=""ne"" value=""{courseId}"" />";
                        break;

                    case "MODULE":
                        entityName = "res_module";
                        filter = $@"<condition attribute=""res_moduleid"" operator=""ne"" value=""{moduleId}"" />
                                    <condition attribute=""res_courseid"" operator=""eq"" value=""{courseId}"" />";
                        break;
                }

                var fetchXml = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                <fetch returntotalrecordcount=""true"">
                                  <entity name=""{entityName}"">
                                    <filter type=""and"">
                                        <filter>
                                        <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                            {filter}
                                        </filter>
                                        <filter type=""or"">
                                        <filter type=""and"">
                                          <condition attribute=""res_intendedstartdate"" operator=""lt"" value=""{startDate}"" />
                                          <condition attribute=""res_intendedenddate"" operator=""gt"" value=""{endDate}"" />
                                        </filter>
                                        <filter type=""or"">
                                          <condition attribute=""res_intendedstartdate"" operator=""between"">
                                            <value>{startDate}</value>
                                            <value>{endDate}</value>
                                          </condition>
                                          <condition attribute=""res_intendedenddate"" operator=""between"">
                                            <value>{startDate}</value>
                                            <value>{endDate}</value>
                                          </condition>
                                        </filter>
                                      </filter>
                                    </filter>
                                  </entity>
                                </fetch>";

                tracingService.Trace(fetchXml);

                EntityCollection results = service.RetrieveMultiple(new FetchExpression(fetchXml.ToString()));
                tracingService.Trace($"Results are found? {results.TotalRecordCount > 0}");

                if (results.TotalRecordCount > 0)
                {
                    message = $"The dates you entered overlap with the dates of another existing {source.ToLower()}.";
                }

            }
            tracingService.Trace($"Client Action Message: {message}");
            return message;
        }

        public string LinkByGovernmentId(ITracingService tracingService, IOrganizationService service, string jsonDataInput)
        {
            tracingService.Trace("I'm in the function LinkByGovernmentId");
            string successMessage = string.Empty;

            Record record = JsonConvert.DeserializeObject<Record>(jsonDataInput);

            string source = string.Empty;
            string entity = string.Empty;

            if (record != null) source = record.source;
            if (source == "account") entity = "contact"; else entity = "account";

            if (source != string.Empty)
            {
                tracingService.Trace($"Government ID: {record.governmentId} | Source: {record.source}");

                var fetchXml = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                <fetch>
                                  <entity name=""{entity}"">
                                  <attribute name=""{entity}id"" />
                                      <filter>
                                          <condition attribute=""{record.attribute_label}"" operator=""eq"" value=""{record.governmentId}"" />
                                      </filter>
                                  </entity>
                                </fetch>";

                tracingService.Trace(fetchXml);
                EntityCollection results = service.RetrieveMultiple(new FetchExpression(fetchXml));

                if (results.Entities.Count > 0)
                {
                    tracingService.Trace("I've found results.");
                    successMessage = $"{entity} found.";

                    LinkByGovernmentIdResult result = new LinkByGovernmentIdResult
                    {
                        id = results.Entities[0].GetAttributeValue<Guid>($"{entity}id").ToString(),
                        successMessage = successMessage
                    };

                    return JsonConvert.SerializeObject(result);
                }
                else
                {
                    tracingService.Trace("No results.");
                    successMessage = $"{entity} not found";

                    LinkByGovernmentIdResult result = new LinkByGovernmentIdResult
                    {
                        id = string.Empty,
                        successMessage = successMessage
                    };

                    return JsonConvert.SerializeObject(result);
                }
            }
            return successMessage;
        }

        public string CheckStoredAccountsContactsRelation(ITracingService tracingService, IOrganizationService service, string jsonDataInput)
        {
            tracingService.Trace("Sono nel metodo CheckStoredAccountsContactsRelation");
            CheckRange checkRange = JsonConvert.DeserializeObject<CheckRange>(jsonDataInput);
            string errorCode = "nothing to update";

            if (checkRange != null)
            {
                tracingService.Trace("checkRange non è null");

                var fetchAccounts = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                <fetch>
                                  <entity name=""account"">
                                    <attribute name=""accountid"" />
                                    <attribute name=""res_governmentid"" />
                                    <filter>
                                      <condition attribute=""statecode"" operator=""eq"" value=""0""/>
                                      <condition attribute=""createdon"" operator=""between"">
                                        <value>{DateTime.Parse(checkRange.startDate)}</value>
                                        <value>{DateTime.Parse(checkRange.endDate)}</value>
                                      </condition>
                                    </filter>
                                  </entity>
                                </fetch>";

                var fetchContacts = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                    <fetch>
                                      <entity name=""contact"">
                                        <attribute name=""contactid"" />
                                        <attribute name=""governmentid"" />
                                        <filter>
                                          <condition attribute=""createdon"" operator=""between"">
                                            <value>{DateTime.Parse(checkRange.startDate)}</value>
                                            <value>{DateTime.Parse(checkRange.endDate)}</value>
                                          </condition>
                                        </filter>
                                      </entity>
                                    </fetch>";

                EntityCollection accountEntities = service.RetrieveMultiple(new FetchExpression(fetchAccounts));
                EntityCollection contactEntities = service.RetrieveMultiple(new FetchExpression(fetchContacts));

                int accountsCount = accountEntities.Entities.Count;
                int contactsCount = contactEntities.Entities.Count;

                if (accountsCount != 0 && contactsCount != 0)
                {
                    tracingService.Trace("I've found results.");

                    /** per ogni record di account prendo il c.f. e lo confronto col c.f. di ogni recordi di contacts,
                     * se matchano, creo un oggetto match che ha due attributi, accountId e contactId,
                     * e li valorizzo con i rispettivi Guid recuperati dai record nelle rispettive due liste;
                     * infine aggiungo l'oggetto appena creato nella lista da inviare come json output al cloud flow
                     */
                    List<Match> matches = new List<Match>();
                    for (int i = 0; i < accountsCount; i++)
                    {
                        for (int j = 0; j < contactsCount; j++)
                        {
                            string accountGovernmentId = accountEntities.Entities[i].GetAttributeValue<string>("res_governmentid");
                            string contactGovernmentId = contactEntities.Entities[j].GetAttributeValue<string>("governmentid");
                            if (accountGovernmentId == contactGovernmentId)
                            {
                                Match match = new Match();
                                Guid accountId = accountEntities.Entities[i].GetAttributeValue<Guid>("accountid");
                                Guid contactId = contactEntities.Entities[j].GetAttributeValue<Guid>("contactid");
                                match.accountId = accountId;
                                match.contactId = contactId;
                                matches.Add(match);
                            }
                        }
                    }

                    String matchesJSON = JsonConvert.SerializeObject(matches, Formatting.Indented);

                    return matchesJSON;
                }
            }
            return errorCode;
        }

        public string FilterBookingDate(ITracingService tracingService, IOrganizationService service, string jsonDataInput)
        {
            ClassroomBooking jsonInput = JsonConvert.DeserializeObject<ClassroomBooking>(jsonDataInput);
            ModuleRange moduleRange = new ModuleRange { ErrorCode = "00" };

            DateTime? date = null;

            if (!string.IsNullOrEmpty(jsonInput.intendedDate))
            {
                DateTime.TryParse(jsonInput.intendedDate, out DateTime parsedDate);
                date = parsedDate;
            }

            Guid bookingId = jsonInput.bookingId != null && jsonInput.bookingId != "0" ? new Guid(jsonInput.bookingId) : Guid.Empty;
            Guid classroomId = jsonInput.classroomId != null ? new Guid(jsonInput.classroomId) : Guid.Empty;
            Guid moduleId = jsonInput.moduleId != null ? new Guid(jsonInput.moduleId) : Guid.Empty;

            if (date != null)
            {
                if (moduleId != Guid.Empty)
                {
                    /*
                     * recupero data di inizio prevista e data di fine prevista del modulo a cui appartiene la lezione
                     * per la quale si sta prenotando l'aula per limitare il range di date selezionabili al range del modulo stesso
                     */
                    var fetchModuleDates = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                                <fetch>
                                                  <entity name=""res_module"">
                                                    <attribute name=""res_courseid"" />
                                                    <attribute name=""res_intendedstartdate"" alias=""startDate"" />
                                                    <attribute name=""res_intendedenddate"" alias=""endDate"" />
                                                    <filter>
                                                      <condition attribute=""res_moduleid"" operator=""eq"" value=""{moduleId}"" />
                                                    </filter>
                                                  </entity>
                                                </fetch>";

                    EntityCollection moduleDatesCollection = service.RetrieveMultiple(new FetchExpression(fetchModuleDates));

                    if (moduleDatesCollection.Entities.Count > 0)
                    {
                        Entity moduleDatesEntity = moduleDatesCollection.Entities[0];
                        Guid courseId = moduleDatesEntity.Contains("res_courseid") ? moduleDatesEntity.GetAttributeValue<EntityReference>("res_courseid").Id : Guid.Empty;

                        /*
                         * il controllo sulla disponibilità dell'aula nella specifica data avviene contestualmente al corso
                         * a cui appartiene il modulo per la quale si sta effettuando la prenotazione
                         */
                        if (courseId != Guid.Empty && classroomId != Guid.Empty)
                        {
                            /*
                             * recupero la data delle eventuali prenotazioni per tutte le lezioni del corso
                             * a cui appartiene la lezione per la quale si sta effettuando la prenotazione
                             * così da evitare sovrapposizioni di prenotazione tra lezioni dello stesso corso
                             */
                            var fetchBookingsDates = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                                        <fetch returntotalrecordcount=""true"">
                                                            <entity name=""res_classroombooking"">
                                                            <filter>
                                                                <condition attribute=""res_intendeddate"" operator=""eq"" value=""{date}"" />
                                                                <condition attribute=""res_classroomid"" operator=""eq"" value=""{classroomId}"" />
                                                                <condition attribute=""res_classroombookingid"" operator=""ne"" value=""{bookingId}"" />
                                                                <condition attribute=""res_courseid"" operator=""eq"" value=""{courseId}"" />
                                                            </filter>
                                                            </entity>
                                                        </fetch>";
                            EntityCollection bookingsDateCollection = service.RetrieveMultiple(new FetchExpression(fetchBookingsDates));
                            if (bookingsDateCollection.TotalRecordCount > 0)
                            {
                                //l'aula scelta per la data selezionata è già occupata
                                moduleRange.ErrorCode = "01";
                            }
                        }
                        else
                        {
                            //course not found
                            moduleRange.ErrorCode = "02";
                        }

                        #region CONTROLLO CHE LA DATA CADA NEL RANGE DEL MODULO {ERROR 03}
                        DateTime? intendedStartDate = moduleDatesEntity.Contains("startDate") ? (DateTime?)((AliasedValue)moduleDatesEntity.Attributes["startDate"]).Value : null;
                        DateTime? intendedEndDate = moduleDatesEntity.Contains("endDate") ? (DateTime?)((AliasedValue)moduleDatesEntity.Attributes["endDate"]).Value : null;

                        /**
                         * inserisco le date del modulo nel jsonOutput per dettagliare la notifica di errore
                         */
                        moduleRange.ModuleIntendedStartDate = intendedStartDate;
                        moduleRange.ModuleIntendedEndDate = intendedEndDate;

                        moduleRange.ErrorCode = date < intendedStartDate || date > intendedEndDate ? "03" : moduleRange.ErrorCode;
                        #endregion
                        #region CONTROLLO LA DISPONIBILITÀ DEL DOCENTE {ERRORE 04}
                        if (moduleRange.ErrorCode != "03")
                        {
                            Guid teacherId = jsonInput.teacherId != null ? new Guid(jsonInput.teacherId) : Guid.Empty;
                            Entity enTeacher = teacherId != Guid.Empty ? service.Retrieve("res_staff", teacherId, new ColumnSet("res_availability")) : null;
                            string availability = checkTeacherAvailability(enTeacher, date);
                            moduleRange.ErrorCode = availability != string.Empty ? availability : moduleRange.ErrorCode;
                        }
                        #endregion
                    }
                    else
                    {
                        //module dates not found
                        moduleRange.ErrorCode = "05";
                    }
                }
                else
                {
                    //lesson not found
                    moduleRange.ErrorCode = "06";
                }
            }
            else
            {
                //intendedDate o Classroom sono null
                moduleRange.ErrorCode = "07";
            }

            return JsonConvert.SerializeObject(moduleRange);
        }

        public string HandleAttendeesSurplus(ITracingService tracingService, IOrganizationService service, string jsonDataInput)
        {
            Lesson inputLesson = JsonConvert.DeserializeObject<Lesson>(jsonDataInput);

            string code = inputLesson.Code;
            int classroomSeats = inputLesson.ClassroomSeats;
            int takenSeats = inputLesson.TakenSeats;
            Guid? lessonId = inputLesson.LessonId;
            Guid? moduleId = inputLesson.ModuleId;
            Guid? courseId = inputLesson.CourseId;
            Guid? referentId = inputLesson.ReferentId;

            DateTime? intendedDate = null;
            if (!string.IsNullOrEmpty(inputLesson.IntendedDate))
            {
                DateTime.TryParse(inputLesson.IntendedDate, out DateTime parsedDate);
                intendedDate = parsedDate;
            }

            string intendedStartingTime = inputLesson.IntendedStartingTime;
            string intendedEndingTime = inputLesson.IntendedEndingTime;
            string intendedBreak = inputLesson.IntendedBreak;
            Decimal intendedLessonDuration = inputLesson.IntendedLessonDuration;
            Decimal intendedBookingDuration = inputLesson.IntendedBookingDuration;

            /**
             * se il numero di posti occupati supera il numero di posti disponibili per quell'aula
             * creo una nuova prenotazione con gli stessi dati della prima
             * eccezion fatta per Aula e Modalità che saranno settate rispettivamente su
             * una delle aule virtuali (la prima disponibile) e "in remoto"
             */
            if (takenSeats > classroomSeats)
            {
                Entity enRemoteLesson = new Entity("res_classroombooking");
                Guid remoteLessonId = service.Create(enRemoteLesson);

                Entity remoteLesson = new Entity("res_classroombooking", remoteLessonId);

                if (moduleId.HasValue) remoteLesson["res_moduleid"] = new EntityReference("res_module", moduleId.Value);
                if (courseId.HasValue) remoteLesson["res_courseid"] = new EntityReference("res_course", courseId.Value);
                if (referentId.HasValue) remoteLesson["res_referent"] = new EntityReference("res_staff", referentId.Value);
                if (intendedDate.HasValue) remoteLesson["res_intendeddate"] = intendedDate.Value;
                if (!string.IsNullOrEmpty(intendedStartingTime)) remoteLesson["res_intendedstartingtime"] = intendedStartingTime;
                if (!string.IsNullOrEmpty(intendedEndingTime)) remoteLesson["res_intendedendingtime"] = intendedEndingTime;
                if (!string.IsNullOrEmpty(intendedBreak)) remoteLesson["res_intendedbreak"] = intendedBreak;
                if (intendedLessonDuration != 0) remoteLesson["res_intendedlessonduration"] = intendedLessonDuration;
                if (intendedBookingDuration != 0) remoteLesson["res_intendedbookingduration"] = intendedBookingDuration;
                remoteLesson["res_sessionmode"] = false;
                remoteLesson["res_availableseats"] = null;
                remoteLesson["res_takenseats"] = null;
                remoteLesson["res_attendees"] = null;

                /*
                 * recupero tutte le aule virtuali
                 * le filtro e seleziono la prima di quelle che non hanno una relazione con la lezione nella data prevista scelta
                 */
                var fetchVirtualClassroom = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                                    <fetch top=""1"">
                                        <entity name=""res_classroom"">
                                        <attribute name=""res_classroomid"" />
                                        <attribute name=""res_name"" />
                                        <filter>
                                            <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                            <condition attribute=""res_type"" operator=""eq"" value=""0"" />
                                        </filter>
                                        <link-entity name=""res_classroombooking"" from=""res_classroomid"" to=""res_classroomid"" link-type=""not any"" alias=""linkedLesson"">
                                            <filter>
                                            <condition attribute=""statecode"" operator=""eq"" value=""0"" />
                                            <condition attribute=""res_intendeddate"" operator=""eq"" value=""{intendedDate}"" />
                                            </filter>
                                        </link-entity>
                                        </entity>
                                    </fetch>";

                EntityCollection virtualClassrooms = service.RetrieveMultiple(new FetchExpression(fetchVirtualClassroom));
                if (virtualClassrooms.Entities.Count > 0)
                {
                    Entity entity = virtualClassrooms.Entities[0];

                    if (entity.Contains("res_classroomid"))
                    {
                        Guid classroomId = entity.GetAttributeValue<Guid>("res_classroomid");
                        remoteLesson["res_classroomid"] = new EntityReference("res_classroom", classroomId);
                        if (entity.Contains("res_name"))
                        {
                            string classroomName = entity.GetAttributeValue<string>("res_name");
                            if (!string.IsNullOrEmpty(code)) remoteLesson["res_code"] = $"{code} (Remote, Moved To: {classroomName})";
                        } else
                        {
                            if (!string.IsNullOrEmpty(code)) remoteLesson["res_code"] = $"{code} (Remote, Moved To: {null})";
                        }
                    }
                    else
                    {
                        //SE NON NE TROVA UNA, LA CREA
                        tracingService.Trace("No virtual classroom found.");
                    }

                }

                /**
                 * dopo aver creato il record in questione
                 * recupero dal db gli iscritti alla prima lezione
                 * ordinati per data di creazione (del record di relazione) discendente
                 * seleziono tanti record, a partire dal primo, quanti sono gli iscritti "in surplus"
                 * elimino l'associazione con la prima lezione e li associo alla nuova lezione in modalità "da remoto"
                 */
                int attendeesSurplus = takenSeats - classroomSeats;
                var fetchAttendees = $@"<?xml version=""1.0"" encoding=""utf-16""?>
                            <fetch top=""{attendeesSurplus}"">
                              <entity name=""res_attendance"">
                                <filter>
                                  <condition attribute=""res_classroombooking"" operator=""eq"" value=""{lessonId}"" />
                                </filter>
                                <order attribute=""createdon"" descending=""true"" />
                              </entity>
                            </fetch>";

                EntityCollection attendees = service.RetrieveMultiple(new FetchExpression(fetchAttendees));

                if (attendees.Entities.Count > 0)
                {
                    foreach (Entity attendee in attendees.Entities)
                    {
                        attendee.Attributes.Remove("res_classroombooking");
                        attendee.Attributes.Add("res_classroombooking", new EntityReference("res_classroombooking", remoteLessonId));

                        service.Update(attendee);
                    }
                }

                service.Update(remoteLesson);
                /**
                 * con power automate invio una mail agli iscritti in questione 
                 * per notificargli che i posti in aula sono esauriti e che dovranno assistere da remoto
                 * tramite il link che verrà generato
                 *              */
            }

            return "Il numero degli iscritti ha superato il numero dei posti disponibili. Gli ultimi iscritti dopo il superamento del limite riceveranno un link per assistere da remoto.";
        }

        #region INTERNAL METHODS
        public string checkTeacherAvailability(Entity enTeacher, DateTime? date)
        {
            string errorCode = string.Empty;
            OptionSetValueCollection teacherAvailability = new OptionSetValueCollection();
            if (enTeacher != null)
            {
                teacherAvailability = enTeacher.Contains("res_availability") && enTeacher["res_availability"] != null ?
                    enTeacher.GetAttributeValue<OptionSetValueCollection>("res_availability") : new OptionSetValueCollection();
            }
            string datesDayOfWeek = ((DateTime)date).DayOfWeek.ToString();

            const int MONDAY = 910240000;
            const int TUESDAY = 910240001;
            const int WEDNESDAY = 910240002;
            const int THURSDAY = 910240003;
            const int FRIDAY = 910240004;


            string[] availableDays = new string[5];

            foreach (OptionSetValue availability in teacherAvailability)
            {
                switch (availability.Value)
                {
                    case MONDAY:
                        availableDays[0] = "Monday";
                        break;
                    case TUESDAY:
                        availableDays[1] = "Tuesday";
                        break;
                    case WEDNESDAY:
                        availableDays[2] = "Wednesday";
                        break;
                    case THURSDAY:
                        availableDays[3] = "Thursday";
                        break;
                    case FRIDAY:
                        availableDays[4] = "Friday";
                        break;
                }
            }
            if (!availableDays.Contains(datesDayOfWeek))
            {
                errorCode = "04";
            }
            return errorCode;
        }


        #endregion

        public class FormTerm
        {
            [System.Runtime.Serialization.DataMember] public string source { get; set; }

            [System.Runtime.Serialization.DataMember] public string startDate { get; set; }

            [System.Runtime.Serialization.DataMember] public string endDate { get; set; }

            [System.Runtime.Serialization.DataMember] public Guid? courseId { get; set; }

            [System.Runtime.Serialization.DataMember] public Guid? moduleId { get; set; }
        };

        public class BirthDate
        {
            [System.Runtime.Serialization.DataMember] public string birthDate { get; set; }
        }

        public class Record
        {
            [System.Runtime.Serialization.DataMember] public string source { get; set; }
            [System.Runtime.Serialization.DataMember] public string governmentId { get; set; }
            [System.Runtime.Serialization.DataMember] public string attribute_label { get; set; }
        }

        public class CheckRange
        {
            [System.Runtime.Serialization.DataMember] public string startDate { get; set; }
            [System.Runtime.Serialization.DataMember] public string endDate { get; set; }
        }

        public class Match
        {
            [System.Runtime.Serialization.DataMember] public Guid accountId { get; set; }
            [System.Runtime.Serialization.DataMember] public Guid contactId { get; set; }
        }

        public class MatchList
        {
            [System.Runtime.Serialization.DataMember] public List<Match> matches { get; set; }
        }

        public class LinkByGovernmentIdResult
        {
            [System.Runtime.Serialization.DataMember] public string id { get; set; }
            [System.Runtime.Serialization.DataMember] public string successMessage { get; set; }
        }

        public class ClassroomBooking
        {
            [System.Runtime.Serialization.DataMember] public string bookingId { get; set; }
            [System.Runtime.Serialization.DataMember] public string intendedDate { get; set; }
            [System.Runtime.Serialization.DataMember] public string classroomId { get; set; }
            [System.Runtime.Serialization.DataMember] public string moduleId { get; set; }
            [System.Runtime.Serialization.DataMember] public string teacherId { get; set; }
        }

        public class ModuleRange
        {
            [System.Runtime.Serialization.DataMember] public DateTime? ModuleIntendedStartDate { get; set; }
            [System.Runtime.Serialization.DataMember] public DateTime? ModuleIntendedEndDate { get; set; }
            [System.Runtime.Serialization.DataMember] public string ErrorCode { get; set; }
        }

        public class Lesson
        {
            [System.Runtime.Serialization.DataMember] public string Code { get; set; }
            [System.Runtime.Serialization.DataMember] public int ClassroomSeats { get; set; }
            [System.Runtime.Serialization.DataMember] public int TakenSeats { get; set; }
            [System.Runtime.Serialization.DataMember] public Guid? LessonId { get; set; }
            [System.Runtime.Serialization.DataMember] public Guid? ModuleId { get; set; }
            [System.Runtime.Serialization.DataMember] public Guid? CourseId { get; set; }
            [System.Runtime.Serialization.DataMember] public Guid? ReferentId { get; set; }
            [System.Runtime.Serialization.DataMember] public string IntendedDate { get; set; }
            [System.Runtime.Serialization.DataMember] public string IntendedStartingTime { get; set; }
            [System.Runtime.Serialization.DataMember] public string IntendedEndingTime { get; set; }
            [System.Runtime.Serialization.DataMember] public string IntendedBreak { get; set; }
            [System.Runtime.Serialization.DataMember] public Decimal IntendedLessonDuration { get; set; }
            [System.Runtime.Serialization.DataMember] public Decimal IntendedBookingDuration { get; set; }
        }
    }
}

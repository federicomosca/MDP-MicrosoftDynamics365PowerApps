//sostituire PROGETTO con nome progetto
//sostituire ENTITY con nome entità
if (typeof (FM) == "undefined") {
    FM = {};
}

if (typeof (FM.PAP) == "undefined") {
    FM.PAP = {};
}

if (typeof (FM.PAP.LESSON) == "undefined") {
    FM.PAP.LESSON = {};
}

(function () {
    var _self = this;
    const CREATE_FORM = 1;
    const UPDATE_FORM = 2;

    //Form model
    _self.formModel = {
        entity: {
            ///costanti entità
            logicalName: "account", // esempio logical Name
            displayName: "Organizzazione", // esempio display Name
        },
        fields: {
            referent: "header_res_referent",
            code: "res_code",
            intendedDate: "res_intendeddate",
            classroom: "res_classroomid",
            module: "res_moduleid",
            course: "res_courseid",
            intendedStartingTime: "res_intendedstartingtime",
            intendedEndingTime: "res_intendedendingtime",
            intendedBookingDuration: "res_intendedbookingduration",
            intendedLessonDuration: "res_intendedlessonduration",
            intendedBreak: "res_intendedbreak",
            sessionMode: "res_sessionmode",
            takenSeats: "res_takenseats",
            availableSeats: "res_availableseats",
            classroomSeats: "res_classroomseats",
            attendees: "res_attendees",
            remoteAttendees: "res_remoteattendees",
            inPersonParticipation: "res_inpersonparticipation",
            url: "res_remoteparticipationurl"
        },
        tabs: {
        },
        sections: {
        }
    };

    const fields = _self.formModel.fields;
    //---------------------------------------------------
    _self.checkUrl = executionContext => {
        var formContext = executionContext.getFormContext();

        let url = formContext.getAttribute(fields.url).getValue();
        /*formContext.getControl(fields.url).setVisible(url === null ? false : true);*/
        if (!url) formContext.getControl(fields.url).setVisible(false);
        else formContext.getControl(fields.url).setVisible(true);
    }

    /*
    Esempio di stringa interpolata
    */
    _self._interpolateString = `${null} example`;

    /*
    Utilizzare la keyword async se si utilizza uno o più metodi await dentro la funzione onSaveForm
    per rendere il salvataggio asincrono (da attivare sull'app dynamics!)
    */
    _self.onSaveForm = function (executionContext) {
        if (executionContext.getEventArgs().getSaveMode() == 70) {
            executionContext.getEventArgs().preventDefault();
            return;
        }
    };
    //---------------------------------------------------
    _self.onLoadCreateForm = async function (executionContext) {

        var formContext = executionContext.getFormContext();

    };
    //---------------------------------------------------
    _self.onLoadUpdateForm = async function (executionContext) {

        var formContext = executionContext.getFormContext();
    };
    //---------------------------------------------------
    _self.onLoadReadyOnlyForm = function (executionContext) {

        var formContext = executionContext.getFormContext();
    };
    //---------------------------------------------------
    _self.onChangeClassroom = function (executionContext) {
        let formContext = executionContext.getFormContext();

        const classroomField = formContext.getAttribute(fields.classroom);
        const classroomId = classroomField && classroomField.getValue() ? cleanId(classroomField.getValue()[0].id) : null;
        if (classroomId) {

            Xrm.WebApi.retrieveRecord("res_classroom", classroomId, "?$select=res_seats").then(
                function (classroom) {
                    const classroomSeats = classroom.res_seats;
                    if(classroomSeats) formContext.getAttribute(fields.classroomSeats).setValue(classroomSeats);
                },
                function (error) {
                    console.log(error.message);
                }
            )
        }
    };
    //---------------------------------------------------
    _self.onChangeModule = function (executionContext) {
        let formContext = executionContext.getFormContext();

        clearFields(formContext, fieldsToClear = [
            fields.intendedDate,
            fields.intendedStartingTime,
            fields.intendedEndingTime,
            fields.intendedBreak,
            fields.intendedBookingDuration,
            fields.intendedLessonDuration
        ]);

        const moduleField = formContext.getAttribute(fields.module);
        const referentField = formContext.getControl(fields.referent);
        referentField.getAttribute().setValue(null);

        let moduleId = moduleField && moduleField.getValue() ? moduleField.getValue()[0].id : null;
        if (!moduleId) return;

        const fetchXml = [
            "?fetchXml=<fetch>",
            "  <entity name='res_module'>",
            "    <attribute name='res_courseid'/>",
            "    <filter>",
            "      <condition attribute='statecode' operator='eq' value='0'/>",
            "      <condition attribute='res_moduleid' operator='eq' value='", moduleId, "'/>",
            "    </filter>",
            "    <link-entity name='res_module_res_staff' from='res_moduleid' to='res_moduleid' alias='linkedStaffMember'>",
            "      <attribute name='res_staffid'/>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>"
        ].join("");

        Xrm.WebApi.retrieveMultipleRecords("res_module", fetchXml).then(
            function (results) {
                if (results.entities.length === 0) {
                    console.log("No modules found");
                    return;
                }
                console.log(results);
                const courseId = results.entities[0]._res_courseid_value ?? null;
                const referentId = results.entities[0]["linkedStaffMember.res_staffid"] ?? null;

                if (!courseId) return;
                Xrm.WebApi.retrieveRecord("res_course", courseId, "?$select=res_title").then(
                    function (result) {
                        const courseLookup = [{
                            id: courseId,
                            name: result.res_title,
                            entityType: "res_course"
                        }];

                        const courseField = formContext.getControl(fields.course);
                        if (courseField) {
                            courseField.getAttribute().setValue(courseLookup);
                        } else {
                            console.log("Cannot access course field.");
                        }

                        Xrm.WebApi.retrieveRecord("res_staff", referentId, "?$select=res_qualification,res_fullname").then(
                            function (staffMember) {
                                const referentLookUp = [{
                                    id: referentId,
                                    name: staffMember.res_fullname,
                                    entityType: "res_staff"
                                }];

                                if (referentField) {
                                    referentField.getAttribute().setValue(referentLookUp);
                                } else {
                                    console.log("Cannot access referent field in the header.");
                                }
                            },
                            function (error) {
                                console.log(error.message);
                                referentField ? referentField.getAttribute().setValue(null) : null;
                            }
                        );
                    });
            },
            function (error) { console.log(error.message) }
        );
    };
    //---------------------------------------------------
    _self.onChangeIntendedDate = function (executionContext) {
        var formContext = executionContext.getFormContext();
        formContext.getControl(fields.intendedDate).clearNotification();
        var errorMessage = '';

        const intendedDateField = formContext.getAttribute(fields.intendedDate);
        var intendedDate = intendedDateField ? intendedDateField.getValue() : null;

        const classroomField = formContext.getAttribute(fields.classroom);
        var classroomId = classroomField && classroomField.getValue() ? (classroomField.getValue()[0].id).replace(/[{}]/g, "") : null;

        if (intendedDate != null) {
            var todayUTC = new Date();
            var todayISO = new Date(todayUTC.getFullYear(), todayUTC.getMonth(), todayUTC.getDate());

            if (intendedDate > todayISO) {
                const moduleField = formContext.getAttribute(fields.module);
                var moduleId = moduleField && moduleField.getValue() ? (moduleField.getValue()[0].id).replace(/[{}]/g, "") : null;
                if (moduleId) {

                    const bookingId = formContext.data.entity.getId() ?
                        formContext.data.entity.getId().replace(/[{}]/g, "") : 0;

                    const referentField = formContext.getControl(fields.referent);
                    const teacherId = referentField && referentField.getAttribute().getValue() ? (referentField.getAttribute().getValue()[0].id).replace(/[{}]/g, "") : null;

                    let json =
                    {
                        bookingId: bookingId,
                        intendedDate: toLocalISOString(intendedDate),
                        classroomId: classroomId,
                        moduleId: moduleId,
                        teacherId: teacherId
                    }

                    // Parameters
                    var parameters = {};
                    parameters.actionName = "FILTER_BOOKING_DATE"; // Edm.String
                    parameters.jsonDataInput = JSON.stringify(json); // Edm.String

                    fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.2/res_ClientAction", {
                        method: "POST",
                        headers: {
                            "OData-MaxVersion": "4.0",
                            "OData-Version": "4.0",
                            "Content-Type": "application/json; charset=utf-8",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(parameters)
                    }).then(
                        function success(response) {
                            return response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });
                        }
                    ).then(function (responseObjects) {
                        var response = responseObjects[0];
                        var responseBody = responseObjects[1];
                        var result = responseBody;
                        // Return Type: mscrm.res_ClientActionResponse
                        // Output Parameters
                        var jsondataoutput = result["jsonDataOutput"]; // Edm.String
                        const moduleRange = JSON.parse(jsondataoutput);

                        const moduleTitle = moduleRange["ModuleTitle"];
                        const teacherFullName = moduleRange["TeacherFullName"];
                        const moduleIntendedStartDate = moduleRange["ModuleIntendedStartDate"];
                        const moduleIntendedEndDate = moduleRange["ModuleIntendedEndDate"];
                        const errorCode = moduleRange["ErrorCode"];

                        switch (errorCode) {
                            case "01":
                                errorMessage = `Esiste gi\u00E0 una lezione del modulo '${moduleTitle}' per la data scelta.`;
                                break;

                            case "02":
                                errorMessage = 'Il corso relativo al modulo non \u00E8 stato trovato.';
                                break;

                            case "03":
                                errorMessage = `La data prevista dev\'essere compresa tra la data di inizio (${moduleIntendedStartDate}) e la data di fine (${moduleIntendedEndDate}) del modulo scelto.`;
                                break;

                            case "04":
                                errorMessage = `Il docente ${teacherFullName} non \u00E8 disponibile per la data scelta.`;
                                break;

                            case "05":
                                errorMessage = 'Il modulo per il quale si sta prenotando la lezione e le relative date di inizio e di fine non sono state trovate.';
                                break;

                            case "06":
                                errorMessage = 'Il modulo per il quale si sta prenotando la lezione non \u00E8 stato trovato.';
                                break;

                            case "07":
                                errorMessage = 'L\'aula o la data selezionate non sono state trovate.';
                                break;
                        }
                        formContext.getControl(fields.intendedDate).setNotification(errorMessage);
                    }).catch(function (error) {
                        console.log(error.message);
                    });
                }
            } else {
                errorMessage = 'La data prevista non pu\u00F2 essere precedente a oggi.';
            }
        } else {
            errorMessage = '\u00C8 necessario indicare una data prevista.';
        }
        formContext.getControl(fields.intendedDate).setNotification(errorMessage);
    };
    //---------------------------------------------------
    _self.onChangeIntendedTime = executionContext => {
        const formContext = executionContext.getFormContext();
        const eventSourceAttribute = executionContext.getEventSource();
        const eventSourceControl = formContext.getControl(eventSourceAttribute.getName());

        try {

            const fieldsToCheck = {
                startTime: fields.intendedStartingTime,
                endTime: fields.intendedEndingTime,
                break: fields.intendedBreak,
            };

            let intendedBookingDuration;

            const fieldsValuesMinutes = {};

            const fieldsValues = {};

            //cancello le notifiche di errore
            Object.keys(fieldsToCheck).forEach(fieldKey => {
                formContext.getControl(fieldsToCheck[fieldKey]).clearNotification();
            });

            //salvo i valori inseriti nei campi
            Object.keys(fieldsToCheck).forEach(fieldKey => {
                fieldsValues[fieldKey] = formContext.getAttribute(fieldsToCheck[fieldKey]).getValue();
            })

            //converto i valori inseriti in minuti
            Object.keys(fieldsValues).forEach(fieldKey => {
                if (fieldsValues[fieldKey]) fieldsValuesMinutes[fieldKey] = timeStringToMinutes(fieldsValues[fieldKey]);
            })

            //formatto i valori inseriti nei campi
            Object.keys(fieldsToCheck).forEach(fieldKey => {
                if (fieldsValues[fieldKey]) formContext.getAttribute(fieldsToCheck[fieldKey]).setValue(formatTime(fieldsValues[fieldKey]));
            })

            /**
             * determino durata prenotazione e durata lezione
             */
            if (fieldsValuesMinutes.startTime && fieldsValuesMinutes.endTime) {
                if (fieldsValuesMinutes.startTime < fieldsValuesMinutes.endTime) {
                    intendedBookingDuration = fieldsValuesMinutes.endTime - fieldsValuesMinutes.startTime;
                    const intendedBookingDurationString = minutesToTimeString(intendedBookingDuration);
                    formContext.getAttribute(fields.intendedBookingDuration).setValue(intendedBookingDurationString);
                }
                else throw new Error('Ora Inizio Prevista non può essere antecedente a Ora Fine Prevista');
            }

            if (fieldsValuesMinutes.break && intendedBookingDuration) {
                if (fieldsValuesMinutes.break <= intendedBookingDuration) {
                    const intendedLessonDuration = intendedBookingDuration - fieldsValuesMinutes.break;
                    const intendedLessonDurationString = minutesToTimeString(intendedLessonDuration);
                    formContext.getAttribute(fields.intendedLessonDuration).setValue(intendedLessonDurationString);
                }
                else {
                    formContext.getAttribute(fields.intendedLessonDuration).setValue(null);
                    throw new Error('La pausa non può essere maggiore della durata della prenotazione.');
                }
            }

        } catch (error) {
            eventSourceControl.setNotification(error.message);
        }
    };
    //---------------------------------------------------
    _self.handleSessionModeVisibilities = executionContext => {
        var formContext = executionContext.getFormContext();
        let sessionMode = formContext.getAttribute(fields.sessionMode).getValue();

        const fieldsToHandle = [
            fields.classroom,
            fields.availableSeats,
            fields.classroomSeats,
            fields.takenSeats,
            fields.inPersonParticipation,
            fields.remoteAttendees
        ];

        fieldsToHandle.forEach(field => {
            const control = formContext.getControl(field);
            if (control) {
                if (sessionMode) {
                    control.setDisabled(false);
                    control.setVisible(true);
                } else {
                    control.setDisabled(true);
                    control.setVisible(false);
                }
            }
        });
    }
    //---------------------------------------------------
    _self.updateAttendees = executionContext => {
        var formContext = executionContext.getFormContext();

        const sessionMode = formContext.getAttribute(fields.sessionMode).getValue();

        const attendeesField = formContext.getAttribute(fields.attendees);
        const attendeesControl = formContext.getControl("subgrid_attendances");
        const gridContext = attendeesControl.getGrid();

        if (gridContext) {
            if (!sessionMode) {
                const attendeesCount = gridContext.getTotalRecordCount();
                attendeesField.setValue(attendeesCount);
            } else {
                const lessonId = formContext.data.entity.getId();

                const remoteAttendeesField = formContext.getAttribute("res_remoteattendees");
                const takenSeatsField = formContext.getAttribute("res_takenseats");
                const availableSeatsField = formContext.getAttribute("res_availableseats");

                // Parameters
                var parameters = {};
                parameters.jsonDataInput = JSON.stringify(lessonId); // Edm.String
                parameters.actionName = "COUNT_ATTENDEES"; // Edm.String

                fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.2/res_ClientAction", {
                    method: "POST",
                    headers: {
                        "OData-MaxVersion": "4.0",
                        "OData-Version": "4.0",
                        "Content-Type": "application/json; charset=utf-8",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(parameters)
                }).then(
                    function success(response) {
                        return response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });
                    }
                ).then(function (responseObjects) {
                    var response = responseObjects[0];
                    var responseBody = responseObjects[1];
                    var result = responseBody;
                    // Return Type: mscrm.res_ClientActionResponse
                    // Output Parameters
                    var jsondataoutput = result["jsonDataOutput"]; // Edm.String
                    const updatedAttendees = JSON.parse(jsondataoutput);

                    attendeesField.setValue(updatedAttendees["Attendees"]);
                    remoteAttendeesField.setValue(updatedAttendees["RemoteAttendees"]);
                    availableSeatsField.setValue(updatedAttendees["AvailableSeats"]);
                    takenSeatsField.setValue(updatedAttendees["TakenSeats"]);
                }).catch(function (error) {
                    console.log(error.message);
                });
            }
        }
    }
    //---------------------------------------------------

    /* 
    Utilizzare la keyword async se si utilizza uno o più metodi await dentro la funzione l'onLoadForm
    per rendere l'onload asincrono asincrono (da attivare sull'app dynamics!)
    Ricordare di aggiungere la keyword anche ai metodi richiamati dall'onLoadForm se l'await avviene dentro di essi
    */
    _self.onLoadForm = async function (executionContext) {

        await import('../res_scripts/Utils.js');

        //init formContext
        var formContext = executionContext.getFormContext();

        //Init event
        formContext.data.entity.addOnSave(_self.onSaveForm);

        formContext.getAttribute(fields.classroom).addOnChange(_self.onChangeClassroom);
        formContext.getAttribute(fields.module).addOnChange(_self.onChangeModule);
        formContext.getAttribute(fields.intendedDate).addOnChange(_self.onChangeIntendedDate);
        formContext.getAttribute(fields.intendedBreak).addOnChange(_self.onChangeIntendedTime);
        formContext.getAttribute(fields.intendedStartingTime).addOnChange(_self.onChangeIntendedTime);
        formContext.getAttribute(fields.intendedEndingTime).addOnChange(_self.onChangeIntendedTime);
        formContext.getAttribute(fields.sessionMode).addOnChange(_self.handleSessionModeVisibilities);
        const attendancesControl = formContext.getControl("subgrid_attendances");
        if (attendancesControl) {
            attendancesControl.addOnLoad(_self.updateAttendees);
        }

        //Init function
        _self.checkUrl(executionContext);
        _self.handleSessionModeVisibilities(executionContext);

        switch (formContext.ui.getFormType()) {
            case CREATE_FORM:
                _self.onLoadCreateForm(executionContext);
                break;
            case UPDATE_FORM:
                _self.onLoadUpdateForm(executionContext);
                break;
        }
    }
}
).call(FM.PAP.LESSON);
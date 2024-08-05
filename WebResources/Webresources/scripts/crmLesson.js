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
    _self.checkUrl = formContext => {
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
                    const availableSeats = classroom.res_seats;
                    availableSeats ? formContext.getAttribute(fields.availableSeats).setValue(availableSeats) : null;
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
            fields.intendedBookingDuration
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
                if (moduleId && classroomId) {

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

                        var moduleIntendedStartDate = moduleRange["ModuleIntendedStartDate"];
                        var moduleIntendedEndDate = moduleRange["ModuleIntendedEndDate"];
                        var errorCode = moduleRange["ErrorCode"];

                        switch (errorCode) {
                            case "01":
                                errorMessage = `L\'aula selezionata \u00E8 gi\u00E0 stata prenotata per la data scelta.`;
                                break;

                            case "02":
                                errorMessage = 'Il corso relativo al modulo non \u00E8 stato trovato.';
                                break;

                            case "03":
                                errorMessage = `La data prevista dev\'essere compresa tra la data di inizio (${moduleIntendedStartDate}) e la data di fine (${moduleIntendedEndDate}) del modulo scelto.`;
                                break;

                            case "04":
                                errorMessage = 'Il docente del modulo non \u00E8 disponibile per la data scelta.';
                                break;

                            case "05":
                                errorMessage = 'Il modulo per il quale si sta prenotando la lezione e le relative date di inizio e di fine non sono state trovate.';
                                break;

                            case "06":
                                errorMessage = 'Il modulo per il quale si sta prenotando la lezione non \U00E8 stato trovato.';
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
        formContext.getControl(fields.intendedStartingTime).clearNotification();
        formContext.getControl(fields.intendedEndingTime).clearNotification();
        formContext.getControl(fields.intendedBreak).clearNotification();

        try {
            let intendedStartingTime;
            let intendedEndingTime;
            let intendedBreak;
            let intendedBookingDuration;

            const intendedStartingTimeString = formContext.getAttribute(fields.intendedStartingTime).getValue();
            const intendedEndingTimeString = formContext.getAttribute(fields.intendedEndingTime).getValue();
            const intendedBreakString = formContext.getAttribute(fields.intendedBreak).getValue();

            if (intendedStartingTimeString) intendedStartingTime = timeStringToMinutes(intendedStartingTimeString);
            if (intendedEndingTimeString) intendedEndingTime = timeStringToMinutes(intendedEndingTimeString);
            if (intendedBreakString) intendedBreak = timeStringToMinutes(intendedBreakString);

            if (intendedStartingTime && intendedEndingTime) {
                if (intendedStartingTime < intendedEndingTime) {
                    intendedBookingDuration = intendedEndingTime - intendedStartingTime;
                    const intendedBookingDurationString = minutesToTimeString(intendedBookingDuration);
                    formContext.getAttribute(fields.intendedBookingDuration).setValue(intendedBookingDurationString);
                }
                else throw new Error('Ora Inizio Prevista non può essere antecedente a Ora Fine Prevista');
            }

            if (intendedBreak && intendedBookingDuration) {
                if (intendedBreak <= intendedBookingDuration) {
                    const intendedLessonDuration = intendedBookingDuration - intendedBreak;
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
            fields.takenSeats,
            fields.inPersonParticipation,
            fields.remoteAttendees
        ];

        fieldsToHandle.forEach(field => {
            const control = formContext.getControl(field);
            if (control) {
                if (sessionMode) {
                    control.setVisible(true);
                } else {
                    control.setVisible(false);
                }
            }
        });
    }
    //---------------------------------------------------
    _self.updateAttendees = (formContext, gridContext) => {

        let attendeesCount = gridContext.getGrid().getTotalRecordCount();
        const attendeesField = formContext.getAttribute(fields.attendees);

            //        attendeesField ? attendeesField.setValue(attendeesCount) : null;

            //        if (attendeesCount > 0) {


            //            const classroomField = formContext.getAttribute(fields.classroom);
            //            const availableSeatsField = formContext.getAttribute(fields.availableSeats);
            //            const takenSeatsField = formContext.getAttribute(fields.takenSeats);

            //            let classroomId = classroomField && classroomField.getValue() ? classroomField.getValue()[0].id : null;

            //            Xrm.WebApi.retrieveRecord("res_classroom", classroomId, "?$select=res_seats,res_name").then(
            //                function (classroom) {
            //                    const classroomSeats = classroom.res_seats ?? 0;

            //                    takenSeatsField ? takenSeatsField.setValue(attendeesCount) : null;
            //                    let takenSeats = takenSeatsField && takenSeatsField.getValue() ? takenSeatsField.getValue() : 0;

            //                    availableSeatsField ? availableSeatsField.setValue(classroomSeats - takenSeats) : null;

            //                    if (takenSeats > classroomSeats) {

            //                        const code = formContext.getAttribute(fields.code) && formContext.getAttribute(fields.code).getValue() ? formContext.getAttribute(fields.code).getValue() : null;
            //                        const lessonId = cleanId(formContext.data.entity.getId());
            //                        const moduleId = formContext.getAttribute(fields.module) && formContext.getAttribute(fields.module).getValue() ? formContext.getAttribute(fields.module).getValue()[0].id : null;
            //                        const courseId = formContext.getAttribute(fields.course) && formContext.getAttribute(fields.course).getValue() ? formContext.getAttribute(fields.course).getValue()[0].id : null;
            //                        const referentId = formContext.getControl(fields.referent) && formContext.getControl(fields.referent).getAttribute().getValue() ? formContext.getControl(fields.referent).getAttribute().getValue()[0].id : null;
            //                        const intendedDate = formContext.getAttribute(fields.intendedDate) && formContext.getAttribute(fields.intendedDate).getValue() ? formContext.getAttribute(fields.intendedDate).getValue() : null;
            //                        const intendedStartingTime = formContext.getAttribute(fields.intendedStartingTime) && formContext.getAttribute(fields.intendedStartingTime).getValue() ? formContext.getAttribute(fields.intendedStartingTime).getValue() : null;
            //                        const intendedEndingTime = formContext.getAttribute(fields.intendedEndingTime) && formContext.getAttribute(fields.intendedEndingTime).getValue() ? formContext.getAttribute(fields.intendedEndingTime).getValue() : null;
            //                        const intendedBreak = formContext.getAttribute(fields.intendedBreak) && formContext.getAttribute(fields.intendedBreak).getValue() ? formContext.getAttribute(fields.intendedBreak).getValue() : null;
            //                        const intendedLessonDuration = formContext.getAttribute(fields.intendedLessonDuration) && formContext.getAttribute(fields.intendedLessonDuration).getValue() ? formContext.getAttribute(fields.intendedLessonDuration).getValue() : null;
            //                        const intendedBookingDuration = formContext.getAttribute(fields.intendedBookingDuration) && formContext.getAttribute(fields.intendedBookingDuration).getValue() ? formContext.getAttribute(fields.intendedBookingDuration).getValue() : null;

            //                        console.log(code);
            //                        console.log(referentId);

            //                        let json = {
            //                            Code: code,
            //                            ClassroomSeats: classroomSeats,
            //                            TakenSeats: takenSeats,
            //                            LessonId: lessonId,
            //                            ModuleId: moduleId,
            //                            CourseId: courseId,
            //                            ReferentId: referentId,
            //                            IntendedDate: toLocalISOString(intendedDate),
            //                            IntendedStartingTime: intendedStartingTime,
            //                            IntendedEndingTime: intendedEndingTime,
            //                            IntendedBreak: intendedBreak,
            //                            IntendedLessonDuration: intendedLessonDuration,
            //                            IntendedBookingDuration: intendedBookingDuration
            //                        };

            //                        // Parameters
            //                        var parameters = {};
            //                        parameters.jsonDataInput = JSON.stringify(json) // Edm.String
            //                        parameters.actionName = 'HANDLE_ATTENDEES_SURPLUS'; // Edm.String

            //                        fetch(Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.2/res_ClientAction", {
            //                            method: "POST",
            //                            headers: {
            //                                "OData-MaxVersion": "4.0",
            //                                "OData-Version": "4.0",
            //                                "Content-Type": "application/json; charset=utf-8",
            //                                "Accept": "application/json"
            //                            },
            //                            body: JSON.stringify(parameters)
            //                        }).then(
            //                            function success(response) {
            //                                return response.json().then((json) => { if (response.ok) { return [response, json]; } else { throw json.error; } });
            //                            }
            //                        ).then(function (responseObjects) {
            //                            var response = responseObjects[0];
            //                            var responseBody = responseObjects[1];
            //                            var result = responseBody;
            //                            console.log(result);
            //                            // Return Type: mscrm.res_ClientActionResponse
            //                            // Output Parameters
            //                            var jsondataoutput = result["jsonDataOutput"]; // Edm.String


            //                        }).catch(function (error) {
            //                            console.log(error.message);
            //                        });
            //                    }
            //                },
            //                function (error) { console.log(error.message); }
            //            );
            //        } else {
            //            formContext.getControl(fields.takenSeats).setVisible(false)
            //        }
            //    } else {
            //        console.log("Subgrid non trovata.");
            //    }
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

        //formContext.getAttribute(fields.sessionMode).addOnChange(_self.onChangeSessionMode);
        formContext.getAttribute(fields.classroom).addOnChange(_self.onChangeClassroom);
        formContext.getAttribute(fields.module).addOnChange(_self.onChangeModule);
        formContext.getAttribute(fields.intendedDate).addOnChange(_self.onChangeIntendedDate);
        formContext.getAttribute(fields.intendedBreak).addOnChange(_self.onChangeIntendedTime);
        formContext.getAttribute(fields.intendedStartingTime).addOnChange(_self.onChangeIntendedTime);
        formContext.getAttribute(fields.intendedEndingTime).addOnChange(_self.onChangeIntendedTime);
        formContext.getAttribute(fields.sessionMode).addOnChange(_self.handleSessionModeVisibilities);


        //Init function
        _self.checkUrl(formContext);
        _self.handleSessionModeVisibilities(executionContext);

        //try {
        //    const gridContext = formContext.getControl("subgrid_attendances");

        //    if (gridContext) {
        //        _self.updateAttendees(formContext, gridContext);
        //    }
        //    else throw new Error('Grid Context not found.');
        //}
        //catch (error) {
        //    alert(error.message);
        //}

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
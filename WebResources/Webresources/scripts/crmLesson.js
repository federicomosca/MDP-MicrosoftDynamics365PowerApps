//sostituire PROGETTO con nome progetto
//sostituire ENTITY con nome entità
if (typeof (RSMNG) == "undefined") {
    RSMNG = {};
}

if (typeof (RSMNG.FORMEDO) == "undefined") {
    RSMNG.FORMEDO = {};
}

if (typeof (RSMNG.FORMEDO.LESSON) == "undefined") {
    RSMNG.FORMEDO.LESSON = {};
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
            attendees: "res_attendees"
        },
        tabs: {
        },
        sections: {
        }
    };

    const fields = _self.formModel.fields;
    //---------------------------------------------------
    function toLocalISOString(date) {
        const pad = (n) => (n < 10 ? '0' + n : n);
        return date.getFullYear() + '-' +
            pad(date.getMonth() + 1) + '-' +
            pad(date.getDate()) + 'T' +
            pad(date.getHours()) + ':' +
            pad(date.getMinutes()) + ':' +
            pad(date.getSeconds());
    };
    //---------------------------------------------------
    function handleSeatsVisibility(formContext) {
        const sessionMode = formContext.getAttribute(fields.sessionMode) && formContext.getAttribute(fields.sessionMode).getValue() ? formContext.getAttribute(fields.sessionMode).getValue() : null;

        if (sessionMode === true) {
            formContext.getControl(fields.availableSeats).setVisible(true);
            formContext.getControl(fields.takenSeats).setVisible(true);
        } else {
            const availableSeatsControl = formContext.getControl(fields.availableSeats);
            const takenSeatsControl = formContext.getControl(fields.takenSeats);
            if (availableSeatsControl && takenSeatsControl) {
                availableSeatsControl.setDisabled(true);
                takenSeatsControl.setDisabled(true);
            }
        }
    };
    //---------------------------------------------------

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

        handleSeatsVisibility(formContext);

        clearFields(formContext, fieldsToClear = [
            fields.code,
            fields.intendedDate,
            fields.intendedStartingTime,
            fields.intendedEndingTime,
            fields.intendedBreak,
            fields.intendedBookingDuration
        ]);

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
                } else {
                    errorMessage = '\U+00C8 opportuno indicare prima un\'aula e una data.';
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
    _self.onChangeBookingTime = function (executionContext) {
        var formContext = executionContext.getFormContext();
        var eventSourceAttribute = executionContext.getEventSource();
        var eventSourceControl = formContext.getControl(eventSourceAttribute.getName());
        var errorMessage = '';

        var time = eventSourceControl.getAttribute().getValue();

        /**
         * verifico che gli orari di inizio e di fine siano formattati correttamente
         */
        var validationMessage = validateTime(time);

        if (validationMessage == "Ok") {
            const intendedBookingDurationField = formContext.getAttribute(fields.intendedBookingDuration) ?? null;
            const intendedLessonDurationField = formContext.getAttribute(fields.intendedLessonDuration) ?? null;
            const intendedStartingTimeField = formContext.getAttribute(fields.intendedStartingTime) ?? null;
            const intendedEndingTimeField = formContext.getAttribute(fields.intendedEndingTime) ?? null;
            const intendedBreakField = formContext.getAttribute(fields.intendedBreak) ?? null;

            var intendedStartingTime = intendedStartingTimeField && intendedStartingTimeField.getValue() ? parseFloat(intendedStartingTimeField.getValue()) : null;
            var intendedEndingTime = intendedEndingTimeField && intendedEndingTimeField.getValue() ? parseFloat(intendedEndingTimeField.getValue()) : null;
            var intendedBreak = intendedBreakField && intendedBreakField.getValue() ? parseFloat(intendedBreakField.getValue()) : null;

            /**
             * verifico che ora di inizio non sia dopo l'ora di fine
             */
            if (intendedStartingTime && intendedEndingTime) {
                if (intendedStartingTime > intendedEndingTime) {
                    errorMessage = 'Data Inizio Prevista non pu\u00f2 essere antecedente a Data Fine Prevista';
                } else {
                    var intendedBookingDuration = intendedEndingTime - intendedStartingTime;
                    intendedBookingDuration != null ? intendedBookingDurationField.setValue(validateDuration(`${intendedBookingDuration}`)) : null;

                    var intendedLessonDuration = intendedBreak && intendedBookingDuration ? intendedBookingDuration - intendedBreak : intendedBookingDuration ?? null;
                    intendedLessonDuration != null ? intendedLessonDurationField.setValue(validateDuration(`${intendedLessonDuration}`)) : null;

                    /**
                     * calcolo della durata prevista in minuti
                     */
                    //let intendedStartingTimeHours = intendedStartingTime.split(/[:\,\.]/)[0];
                    //let intendedEndingTimeHours = intendedEndingTime.split(/[:\,\.]/)[0];
                    //let intendedStartingTimeMinutes = intendedStartingTime.split(/[:\,\.]/)[1];
                    //let intendedEndingTimeMinutes = intendedEndingTime.split(/[:\,\.]/)[1];
                    //DA CONTINUARE
                }
            }
        } else {
            errorMessage = validationMessage;
        }
        eventSourceControl.clearNotification();

        eventSourceControl.setNotification(errorMessage);
    };
    //---------------------------------------------------
    _self.onChangeSessionMode = (executionContext) => {
        var formContext = executionContext.getFormContext();

        /**
         * se la session mode è settata su Remote, nascondo i campi classroom, available seats e taken seats
         */
        const sessionModeField = formContext.getAttribute(fields.sessionMode);
        const availableSeatsField = formContext.getAttribute(fields.availableSeats);
        const takenSeatsField = formContext.getAttribute(fields.takenSeats);

        var sessionMode = sessionModeField && sessionModeField.getValue() ? sessionModeField.getValue() : null;

        /**
         * per ogni campo interessato (classroom, available e taken seats), controllo che il campo esista, 
         * dopodiché, se session mode è impostato su Remote, lo nascondo, contrariamente lo mostro
         */
        availableSeatsField ? !sessionMode ? formContext.getControl(fields.availableSeats).setVisible(false) : formContext.getControl(fields.availableSeats).setVisible(true) : null;
        takenSeatsField ? !sessionMode ? formContext.getControl(fields.takenSeats).setVisible(false) : formContext.getControl(fields.takenSeats).setVisible(true) : null;
    }
    //---------------------------------------------------
    _self.countAttendees = function (executionContext) {
        var formContext = executionContext.getFormContext();

        const gridContext = formContext.getControl("subgrid_attendances");

        if (gridContext) {
            let attendeesCount = gridContext.getGrid().getTotalRecordCount();
            const attendeesField = formContext.getAttribute(fields.attendees);

            attendeesField ? attendeesField.setValue(attendeesCount) : null;

            if (attendeesCount > 0) {

                handleSeatsVisibility(formContext);

                const classroomField = formContext.getAttribute(fields.classroom);
                const availableSeatsField = formContext.getAttribute(fields.availableSeats);
                const takenSeatsField = formContext.getAttribute(fields.takenSeats);

                let classroomId = classroomField && classroomField.getValue() ? classroomField.getValue()[0].id : null;

                Xrm.WebApi.retrieveRecord("res_classroom", classroomId, "?$select=res_seats,res_name").then(
                    function (classroom) {
                        const classroomSeats = classroom.res_seats ?? 0;

                        takenSeatsField ? takenSeatsField.setValue(attendeesCount) : null;
                        let takenSeats = takenSeatsField && takenSeatsField.getValue() ? takenSeatsField.getValue() : 0;

                        availableSeatsField ? availableSeatsField.setValue(classroomSeats - takenSeats) : null;

                        if (takenSeats > classroomSeats) {

                            const code = formContext.getAttribute(fields.code) && formContext.getAttribute(fields.code).getValue() ? formContext.getAttribute(fields.code).getValue() : null;
                            const lessonId = cleanId(formContext.data.entity.getId());
                            const moduleId = formContext.getAttribute(fields.module) && formContext.getAttribute(fields.module).getValue() ? formContext.getAttribute(fields.module).getValue()[0].id : null;
                            const courseId = formContext.getAttribute(fields.course) && formContext.getAttribute(fields.course).getValue() ? formContext.getAttribute(fields.course).getValue()[0].id : null;
                            const referentId = formContext.getControl(fields.referent) && formContext.getControl(fields.referent).getAttribute().getValue() ? formContext.getControl(fields.referent).getAttribute().getValue()[0].id : null;
                            const intendedDate = formContext.getAttribute(fields.intendedDate) && formContext.getAttribute(fields.intendedDate).getValue() ? formContext.getAttribute(fields.intendedDate).getValue() : null;
                            const intendedStartingTime = formContext.getAttribute(fields.intendedStartingTime) && formContext.getAttribute(fields.intendedStartingTime).getValue() ? formContext.getAttribute(fields.intendedStartingTime).getValue() : null;
                            const intendedEndingTime = formContext.getAttribute(fields.intendedEndingTime) && formContext.getAttribute(fields.intendedEndingTime).getValue() ? formContext.getAttribute(fields.intendedEndingTime).getValue() : null;
                            const intendedBreak = formContext.getAttribute(fields.intendedBreak) && formContext.getAttribute(fields.intendedBreak).getValue() ? formContext.getAttribute(fields.intendedBreak).getValue() : null;
                            const intendedLessonDuration = formContext.getAttribute(fields.intendedLessonDuration) && formContext.getAttribute(fields.intendedLessonDuration).getValue() ? formContext.getAttribute(fields.intendedLessonDuration).getValue() : null;
                            const intendedBookingDuration = formContext.getAttribute(fields.intendedBookingDuration) && formContext.getAttribute(fields.intendedBookingDuration).getValue() ? formContext.getAttribute(fields.intendedBookingDuration).getValue() : null;

                            console.log(code);
                            console.log(referentId);

                            let json = {
                                Code: code,
                                ClassroomSeats: classroomSeats,
                                TakenSeats: takenSeats,
                                LessonId: lessonId,
                                ModuleId: moduleId,
                                CourseId: courseId,
                                ReferentId: referentId,
                                IntendedDate: toLocalISOString(intendedDate),
                                IntendedStartingTime: intendedStartingTime,
                                IntendedEndingTime: intendedEndingTime,
                                IntendedBreak: intendedBreak,
                                IntendedLessonDuration: intendedLessonDuration,
                                IntendedBookingDuration: intendedBookingDuration
                            };

                            // Parameters
                            var parameters = {};
                            parameters.jsonDataInput = JSON.stringify(json) // Edm.String
                            parameters.actionName = 'HANDLE_ATTENDEES_SURPLUS'; // Edm.String

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
                                console.log(result);
                                // Return Type: mscrm.res_ClientActionResponse
                                // Output Parameters
                                var jsondataoutput = result["jsonDataOutput"]; // Edm.String


                            }).catch(function (error) {
                                console.log(error.message);
                            });
                        }
                    },
                    function (error) { console.log(error.message); }
                );
            } else {
                formContext.getControl(fields.takenSeats).setVisible(false)
            }
        } else {
            console.log("Subgrid non trovata.");
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

        handleSeatsVisibility(formContext);
        _self.countAttendees(executionContext);

        formContext.getAttribute(fields.sessionMode).addOnChange(_self.onChangeSessionMode);
        formContext.getAttribute(fields.classroom).addOnChange(_self.onChangeClassroom);
        formContext.getAttribute(fields.module).addOnChange(_self.onChangeModule);
        formContext.getAttribute(fields.intendedDate).addOnChange(_self.onChangeIntendedDate);
        formContext.getAttribute(fields.intendedStartingTime).addOnChange(_self.onChangeBookingTime);
        formContext.getAttribute(fields.intendedEndingTime).addOnChange(_self.onChangeBookingTime);
        formContext.getAttribute(fields.intendedBreak).addOnChange(_self.onChangeBookingTime);

        const gridContext = formContext.getControl("subgrid_attendances");
        gridContext ? gridContext.addOnLoad(_self.countAttendees) : console.log("cannot access grid context");



        //Init function

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
).call(RSMNG.FORMEDO.LESSON);
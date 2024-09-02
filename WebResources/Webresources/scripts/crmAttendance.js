// Ensure FM namespace is defined
if (typeof (FM) == "undefined") {
    FM = {};
}

// Ensure FM.PAP namespace is defined
if (typeof (FM.PAP) == "undefined") {
    FM.PAP = {};
}

// Ensure FM.PAP.ATTENDANCE namespace is defined
if (typeof (FM.PAP.ATTENDANCE) == "undefined") {
    FM.PAP.ATTENDANCE = {};
}

(function () {
    var _self = this;
    const CREATE_FORM = 1;
    const UPDATE_FORM = 2;

    // Form model
    _self.formModel = {
        entity: {
            /// Costanti entità
            logicalName: "account", // Esempio logical Name
            displayName: "Organizzazione", // Esempio display Name
        },
        fields: {
            code: "res_code",
            createdOn: "createdon",
            lesson: "res_classroombooking",
            subscriber: "res_subscriberid",
            date: "res_date",
            startingTime: "res_startingtime",
            endingTime: "res_endingtime",
            signature: "res_signature",
            participationMode: "res_participationmode"
        },
        tabs: {},
        sections: {}
    };

    const fields = _self.formModel.fields;

    // Event handler for save
    _self.onSaveForm = function (executionContext) {
        if (executionContext.getEventArgs().getSaveMode() == 70) {
            executionContext.getEventArgs().preventDefault();
            return;
        }
    };

    // Event handler for create form load
    _self.onLoadCreateForm = async function (executionContext) {
        var formContext = executionContext.getFormContext();
    };

    // Event handler for update form load
    _self.onLoadUpdateForm = async function (executionContext) {
        var formContext = executionContext.getFormContext();
    };

    // Event handler for read-only form load
    _self.onLoadReadyOnlyForm = function (executionContext) {
        var formContext = executionContext.getFormContext();
    };

    _self.fillLessonRelatedFields = executionContext => {
        const formContext = executionContext.getFormContext();
        let date, startingTime, endingTime;

        const lessonField = formContext.getAttribute(fields.lesson);
        const lessonId = lessonField.getValue() ? lessonField.getValue()[0].id : null;

        if (lessonId) {
            Xrm.WebApi.retrieveRecord("res_classroombooking", lessonId, "?$select=res_intendeddate,res_intendedstartingtime,res_intendedendingtime").then(
                lesson => {
                    [date, startingTime, endingTime] = [lesson["res_intendeddate"], lesson["res_intendedstartingtime"], lesson["res_intendedendingtime"]];

                    formContext.getAttribute(fields.date).setValue(new Date(date));
                    formContext.getAttribute(fields.startingTime).setValue(startingTime);
                    formContext.getAttribute(fields.endingTime).setValue(endingTime);
                },
                error => { console.log(error.message); }
            );
        }
    };

    _self.checkAvailableParticipationMode = executionContext => {
        let formContext = executionContext.getFormContext();

        const lesson = formContext.getAttribute(fields.lesson).getValue();
        const participationModeControl = formContext.getControl(fields.participationMode);
        let classroomSeats;
        let isInPersonMandatory;

        /**
         * recupero la lezione legata alla presenza, dalla lezione recupero l'aula
         * dell'aula vedo quanti sono i posti
         */
        if (lesson) {
            const lessonId = formContext.getAttribute(fields.lesson).getValue()[0].id;
            let sessionMode;
            Xrm.WebApi.retrieveRecord("res_classroombooking", lessonId, "?$select=_res_classroomid_value, res_sessionmode, res_inpersonparticipation").then(
                lesson => {
                    sessionMode = lesson["res_sessionmode"];
                    isInPersonMandatory = lesson["res_inpersonparticipation"];
                    const classroomId = lesson._res_classroomid_value;

                    if (classroomId) {
                        Xrm.WebApi.retrieveRecord("res_classroom", classroomId, "?$select=res_seats").then(
                            classroom => {
                                classroomSeats = classroom.res_seats;
                                /**
                                 * recupero il numero di iscritti alla lezione attivi e in presenza
                                 */
                                var fetchXml = [
                                    "?fetchXml=<fetch returntotalrecordcount='true'>",
                                    "  <entity name='res_attendance'>",
                                    "    <filter>",
                                    "      <condition attribute='res_classroombooking' operator='eq' value='", lessonId, "'/>",
                                    "      <condition attribute='res_participationmode' operator='eq' value='1'/>",
                                    "      <condition attribute='statecode' operator='eq' value='0'/>",
                                    "    </filter>",
                                    "  </entity>",
                                    "</fetch>"
                                ].join("");

                                Xrm.WebApi.retrieveMultipleRecords("res_attendance", fetchXml).then(
                                    results => {
                                        /**
                                         * se il numero di iscritti in presenza supera il numero di posti dell'aula
                                         * tutti i nuovi iscritti vedranno solo "da remoto" nell'option set
                                         * altrimenti controllo la sessionMode dell'aula e se è in presenza controllo la partecipazione in presenza se`è obbligatoria
                                         * in quest'ultimo caso i nuovi iscritti vedranno solo "da remoto"
                                         */

                                        if (results.entities.length !== classroomSeats) {
                                            if (isInPersonMandatory) {
                                                participationModeControl.setVisible(false);
                                                formContext.getAttribute(fields.participationMode).setValue(true);
                                            }
                                            else {
                                                participationModeControl.setVisible(true);
                                                formContext.getAttribute(fields.participationMode).setValue(true);
                                            }
                                        } else {
                                            if (isInPersonMandatory) {
                                                participationModeControl.setVisible(false);
                                                formContext.getAttribute(fields.participationMode).setValue(false);
                                            } else {
                                                participationModeControl.setVisible(true);
                                            }
                                        }
                                    },
                                    error => { console.log(error.message); }
                                );
                            },
                            error => { console.log(error.message); }
                        );
                    } else {
                        participationModeControl.setVisible(false);
                    }
                },
                error => { console.log(error.message); }
            );

        } else {
            console.log('Lesson not found.');
        }
    }

    _self.onChangeParticipationMode = executionContext => {
        let formContext = executionContext.getFormContext();
        formContext.getControl(fields.participationMode).clearNotification();

        let errorMessage;
        const lesson = formContext.getAttribute(fields.lesson).getValue();
        const participationMode = formContext.getAttribute(fields.participationMode).getValue();

        if (lesson) {
            const lessonId = formContext.getAttribute(fields.lesson).getValue()[0].id;

            Xrm.WebApi.retrieveRecord("res_classroombooking", lessonId, "?$select=_res_classroomid_value, res_sessionmode, res_inpersonparticipation").then(
                lesson => {
                    const sessionMode = lesson.res_sessionmode;
                    const isInPersonMandatory = lesson.res_inpersonparticipation;
                    const classroomId = lesson._res_classroomid_value;

                    if (!sessionMode) {
                        if (participationMode)
                            errorMessage = "La lezione non è erogata in presenza";
                    } else {
                        if (isInPersonMandatory && !participationMode) {
                            errorMessage = "È obbligatoria la presenza in aula.";
                        } else {
                            Xrm.WebApi.retrieveRecord("res_classroom", classroomId, "?$select=res_seats").then(
                                classroom => {
                                    const classroomSeats = classroom.res_seats;

                                    /**
                                    * recupero il numero di iscritti alla lezione attivi e in presenza
                                    */
                                    var fetchXml = [
                                        "?fetchXml=<fetch returntotalrecordcount='true'>",
                                        "  <entity name='res_attendance'>",
                                        "    <filter>",
                                        "      <condition attribute='res_classroombooking' operator='eq' value='", lessonId, "'/>",
                                        "      <condition attribute='res_participationmode' operator='eq' value='1'/>",
                                        "      <condition attribute='statecode' operator='eq' value='0'/>",
                                        "    </filter>",
                                        "  </entity>",
                                        "</fetch>"
                                    ].join("");

                                    Xrm.WebApi.retrieveMultipleRecords("res_attendance", fetchXml).then(
                                        results => {
                                            if (results.entities.length === classroomSeats && participationMode) {
                                                errorMessage = "Non ci sono pi\u00F9 posti disponibili";
                                                formContext.getControl(fields.participationMode).setNotification(errorMessage);
                                            }
                                        },
                                        error => { console.log(error.message); }
                                    );
                                },
                                error => { console.log(error.message); }
                            );
                        }
                    }
                    if (errorMessage) formContext.getControl(fields.participationMode).setNotification(errorMessage);
                },
                error => { console.log(error.message); });
        }
    }

    _self.onLoadForm = async function (executionContext) {
        await import('../res_scripts/Utils.js');

        var formContext = executionContext.getFormContext();

        // Init events
        formContext.data.entity.addOnSave(_self.onSaveForm);

        formContext.getAttribute(fields.participationMode).addOnChange(_self.onChangeParticipationMode);
        formContext.getAttribute(fields.lesson).addOnChange(_self.fillLessonRelatedFields);

        // Init functions   
        _self.fillLessonRelatedFields(executionContext);
        _self.checkAvailableParticipationMode(executionContext);

        switch (formContext.ui.getFormType()) {
            case CREATE_FORM:
                await _self.onLoadCreateForm(executionContext);
                break;
            case UPDATE_FORM:
                await _self.onLoadUpdateForm(executionContext);
                break;
        }
    };
}).call(FM.PAP.ATTENDANCE);

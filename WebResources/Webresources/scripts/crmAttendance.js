    //sostituire PROGETTO con nome progetto
    //sostituire ENTITY con nome entità
    if (typeof (
    ) == "undefined") {
        FM = {};
    }

    if (typeof (FM.PAP) == "undefined") {
        FM.PAP = {};
    }

    if (typeof (FM.PAP.ATTENDANCE) == "undefined") {
        FM.PAP.ATTENDANCE = {};
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
                code: "res_code",
                createdOn: "createdon",
                lesson: "res_classroombooking",
                subscriber: "res_subscriberid",
                date: "res_date",
                startingTime: "res_startingtime",
                endingTime: "res_endingtime",
                signature: "res_signature"
            },
            tabs: {
            },
            sections: {
            }
        };

        const fields = _self.formModel.fields;
        //---------------------------------------------------

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
        _self.fillLessonFields = executionContext => {
            var formContext = executionContext.getFormContext();
            let date, startingTime, endingTime;

            const lessonField = formContext.getAttribute(fields.lesson);
            let lessonId = lessonField && lessonField.getValue() ? lessonField.getValue()[0].id : null;

            if (lessonId) {
                Xrm.WebApi.retrieveRecord("res_classroombooking", lessonId, "?$select=res_intendeddate,res_intendedstartingtime,res_intendedendingtime").then(
                    lesson => {
                        [date, startingTime, endingTime] = [lesson["res_intendeddate"], lesson["res_intendedstartingtime"], lesson["res_intendedendingtime"]];

                        date ? formContext.getAttribute(fields.date).setValue(new Date(date)) : null;
                        startingTime ? formContext.getAttribute(fields.startingTime).setValue(startingTime) : null;
                        endingTime ? formContext.getAttribute(fields.endingTime).setValue(endingTime) : null;

                    },
                    error => { console.log(error.message); }
                );
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

            _self.fillLessonFields(executionContext);
            formContext.getAttribute(fields.lesson).addOnChange(_self.fillLessonFields);

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
    ).call(FM.PAP.ATTENDANCE);
//sostituire PROGETTO con nome progetto
//sostituire ENTITY con nome entità
if (typeof (FM) == "undefined") {
    FM = {};
}

if (typeof (FM.PAP) == "undefined") {
    FM.PAP = {};
}

if (typeof (FM.PAP.MODULE) == "undefined") {
    FM.PAP.MODULE = {};
}

(function () {
    var _self = this;

    //Form model
    _self.formModel = {
        entity: {
            ///costanti entità
            logicalName: "account", // esempio logical Name
            displayName: "Organizzazione", // esempio display Name
        },
        fields: {
            title: "res_title",
            course: "res_courseid",
            fee: "res_fee",
            optional: "res_optional",
            intendedStartDate: "res_intendedstartdate",
            intendedEndDate: "res_intendedenddate",
            intendedDuration: "res_intendedduration",
            intendedDurationMinutes: "res_intendeddurationminutes"
        },
        tabs: {

        },
        sections: {

        }
    };

    const fields = _self.formModel.fields;

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
    _self.formatDate = function toLocalISOString(date) {
        const pad = (n) => (n < 10 ? '0' + n : n);
        return date.getFullYear() + '-' +
            pad(date.getMonth() + 1) + '-' +
            pad(date.getDate()) + 'T' +
            pad(date.getHours()) + ':' +
            pad(date.getMinutes()) + ':' +
            pad(date.getSeconds());
    };
    //---------------------------------------------------
    _self.onChangeIntendedDate = function (executionContext, currField, notificationId) {
        let formContext = executionContext.getFormContext();
        let source = "MODULE";
        let json = null;
        let errorMessage = null;
        let todayUTC = new Date();
        let todayISO = new Date(todayUTC.getFullYear(), todayUTC.getMonth(), todayUTC.getDate());
        
        formContext.getControl(fields.intendedStartDate).clearNotification();
        formContext.getControl(fields.intendedEndDate).clearNotification();

        let startDate = formContext.getAttribute(fields.intendedStartDate).getValue();
        let endDate = formContext.getAttribute(fields.intendedEndDate).getValue();

        let courseId = formContext.getAttribute(fields.course).getValue() ?
            formContext.getAttribute(fields.course).getValue()[0].id.replace(/[{}]/g, "") : 0;

        /**
         * controllo che né data fine né data inizio siano precedenti a oggi
         */
        if (startDate != null && startDate < todayISO) {
            errorMessage = "Intended Start Date may not be earlier than today.";
        }
        if (endDate != null && endDate < todayISO) {
            errorMessage = "Intended End Date may not be earlier than today.";
        }

        
        /**
         * la chiamata all'API avviene soltanto se entrambi i campi data sono stati valorizzati
         */
        if (startDate != null && endDate != null) {

            /**
             * controllo che la data di inizio non sia antecedente alla data di fine
             */
            if (startDate >= endDate) {
                errorMessage = "Intended Start Date may not be same or later than Intended End Date";
            }


            

            if (courseId != 0) {

                switch (formContext.ui.getFormType()) {
                    case 1:
                        json = {
                            source: source,
                            startDate: _self.formatDate(startDate),
                            endDate: _self.formatDate(endDate),
                            courseId: courseId,
                        }
                        break;

                    case 2:
                        let moduleId =
                            formContext.data.entity.getId() ?
                                formContext.data.entity.getId().replace(/[{}]/g, "") : 0;
                        json = {
                            source: source,
                            startDate: _self.formatDate(startDate),
                            endDate: _self.formatDate(endDate),
                            courseId: courseId,
                            moduleId: moduleId
                        }
                        break;
                }

                // Parameters
                var parameters = {};
                parameters.actionName = "DATE_VALIDATION"; // Edm.String
                parameters.jsonDataInput = JSON.stringify(json); // Edm.String-

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

                    if (jsondataoutput !== "ok") {
                        formContext.getControl(fields.intendedStartDate).clearNotification();
                        formContext.getControl(fields.intendedEndDate).clearNotification();
                        errorMessage = jsondataoutput;
                        formContext.getControl(fields.intendedStartDate).setNotification(errorMessage);
                        formContext.getControl(fields.intendedEndDate).setNotification(errorMessage);
                    } else {
                        console.log("ok");
                    }
                }).catch(function (error) {
                    console.log(error.message);
                });
            }
        }

        if (errorMessage) {
            formContext.getControl(currField).setNotification(errorMessage);
        }
    };
    //---------------------------------------------------
    _self.onChangeIntendedStart = function (executionContext) {
        _self.onChangeIntendedDate(executionContext, fields.intendedStartDate);
    };
    //---------------------------------------------------
    _self.onChangeIntendedEnd = function (executionContext) {
        _self.onChangeIntendedDate(executionContext, fields.intendedEndDate);
    };
    //---------------------------------------------------
    _self.onChangeIntendedDuration = function (executionContext) {
        let formContext = executionContext.getFormContext();

        let intendedDurationMinutes = 0;
        let intendedDurationField = formContext.getAttribute(fields.intendedDuration);
        let intendedDurationMinutesField = formContext.getAttribute(fields.intendedDurationMinutes);

        if (intendedDurationField.getValue() != 0) {
            let time = intendedDurationField.getValue();
            let hours = Math.floor(time);
            let fractionalPart = time - hours;
            let minutes = Math.round(fractionalPart * 100);
            intendedDurationMinutes = (hours * 60) + minutes;
        }
        intendedDurationMinutesField.setValue(intendedDurationMinutes);
    };
    //---------------------------------------------------
    /* 
    Utilizzare la keyword async se si utilizza uno o più metodi await dentro la funzione l'onLoadForm
    per rendere l'onload asincrono asincrono (da attivare sull'app dynamics!)
    Ricordare di aggiungere la keyword anche ai metodi richiamati dall'onLoadForm se l'await avviene dentro di essi
    */
    _self.onLoadForm = async function (executionContext) {



        //init formContext
        var formContext = executionContext.getFormContext();

        //Init event
        formContext.data.entity.addOnSave(_self.onSaveForm);
        formContext.getAttribute(fields.intendedStartDate).addOnChange(_self.onChangeIntendedStart);
        formContext.getAttribute(fields.intendedEndDate).addOnChange(_self.onChangeIntendedEnd);
        formContext.getAttribute(fields.course).addOnChange(_self.onChangeIntendedDate);
        formContext.getAttribute(fields.intendedDuration).addOnChange(_self.onChangeIntendedDuration);


        //Init function 

        switch (formContext.ui.getFormType()) {
            case 1:
                _self.onLoadCreateForm(executionContext);
                break;
            case 2:
                _self.onLoadUpdateForm(executionContext);
                break;
        }
    }
}
).call(FM.PAP.MODULE);
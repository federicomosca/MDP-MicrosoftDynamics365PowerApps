//sostituire PROGETTO con nome progetto
//sostituire ENTITY con nome entità
if (typeof (FM) == "undefined") {
    FM = {};
}

if (typeof (FM.PAP) == "undefined") {
    FM.PAP = {};
}

if (typeof (FM.PAP.COURSE) == "undefined") {
    FM.PAP.COURSE = {};
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
            fee: "res_fee",
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
        let source = "COURSE";
        let json = null;
        let errorMessage = null;
        let todayUTC = new Date();
        let todayISO = new Date(todayUTC.getFullYear(), todayUTC.getMonth(), todayUTC.getDate());

        formContext.getControl(fields.intendedStartDate).clearNotification();
        formContext.getControl(fields.intendedEndDate).clearNotification();

        let startDate = formContext.getAttribute(fields.intendedStartDate).getValue();
        let endDate = formContext.getAttribute(fields.intendedEndDate).getValue();

        /**
         * controllo che né data fine né data inizio siano precedenti a oggi
         */
        if (startDate != null && startDate < todayISO) {
            errorMessage = "Intended Start Date may not be earlier than today.";
        }

        if (errorMessage != null && endDate != null && endDate < todayISO) {
            errorMessage = "Intended End Date may not be earlier than today.";
        }

        if (errorMessage != null && startDate >= endDate) {
            errorMessage = "Intended Start Date may not be same or later than Intended End Date";
        }

        /**
         * la chiamata all'API avviene soltanto se entrambi i campi data sono stati valorizzati
         */
        if (errorMessage != null) {

            /**
             * controllo che la data di inizio non sia antecedente alla data di fine
             */

            switch (formContext.ui.getFormType()) {
                case 1:
                    json = {
                        source: source,
                        startDate: toLocalISOString(startDate),
                        endDate: toLocalISOString(endDate),
                    }
                    break;

                case 2:
                    let courseId =
                        formContext.data.entity.getId() ?
                            formContext.data.entity.getId().replace(/[{}]/g, "") : 0;
                    json = {
                        source: source,
                        startDate: toLocalISOString(startDate),
                        endDate: toLocalISOString(endDate),
                        courseId: courseId
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

        if (errorMessage) {
            formContext.getControl(currField).setNotification(errorMessage);
        }
    };
    //---------------------------------------------------
    _self.onChangeIntendedStartDate = function (executionContext) {
        _self.onChangeIntendedDate(executionContext, fields.intendedStartDate);
    };
    //---------------------------------------------------
    _self.onChangeIntendedEndDate = function (executionContext) {
        _self.onChangeIntendedDate(executionContext, fields.intendedEndDate);
    };
    //---------------------------------------------------
    _self.onChangeIntendedDuration = function (executionContext) {
        let formContext = executionContext.getFormContext();

        let intendedDurationMinutes = 0;
        let intendedDurationField = formContext.getAttribute(fields.intendedDuration);
        let intendedDurationMinutesField = formContext.getAttribute(fields.intendedDurationMinutes);
        let time = intendedDurationField.getValue();
        var regex = /^\d+([:.,][0-5][0-9])?$/;

        if (regex.test(time)) {
            let nums = time.split(/[:\,\.]/);
            let hours = nums[0];
            console.log(hours);

            let minutes = nums[1];
            console.log(minutes);

            intendedDurationMinutes = parseInt((hours * 60) + (minutes ?? 0));
            intendedDurationMinutesField.setValue(intendedDurationMinutes);
        } else {
            formContext.getControl(fields.intendedDuration).setNotification("This format is not valid. Set hours and, optionally, minutes (max 59) preceded by point, comma or colon")
        }
    }

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
        formContext.getAttribute(fields.intendedStartDate).addOnChange(_self.onChangeIntendedStartDate);
        formContext.getAttribute(fields.intendedEndDate).addOnChange(_self.onChangeIntendedEndDate);
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
).call(FM.PAP.COURSE);
//sostituire PROGETTO con nome progetto
//sostituire ENTITY con nome entità
if (typeof (RSMNG) == "undefined") {
    RSMNG = {};
}

if (typeof (RSMNG.FORMEDO) == "undefined") {
    RSMNG.FORMEDO = {};
}

if (typeof (RSMNG.FORMEDO.CONTACT) == "undefined") {
    RSMNG.FORMEDO.CONTACT = {};
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
            firstName: "firstname",
            lastName: "lastname",
            account: "parentcustomerid",
            email: "emailaddress1",
            governmentId: "governmentid"
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

    //_self.checkAccountName = function (executionContext) {
    //    var formContext = executionContext.getFormContext();

    //    let accountField = formContext.getAttribute(fields.account);
    //    let accountId = accountField && accountField.getValue() ? (accountField.getValue()[0].id).replace(/[{}]/g, "") : null;
    //    if (accountId) {
    //        Xrm.WebApi.retrieveRecord("account", accountId, "?$select=name").then(
    //            function success(account) {

    //                let splitName = account.name ? account.name.split(" ") : "";

    //                if (splitName) {
    //                    formContext.getAttribute(fields.firstName) ? formContext.getAttribute(fields.firstName).setValue(`${splitName[0]}`) : null;
    //                    formContext.getAttribute(fields.lastName) ? formContext.getAttribute(fields.lastName).setValue(`${splitName[1]}`) : null;
    //                }

    //            },
    //            function error(error) {
    //                console.log(error.message);
    //            }
    //        );
    //    }
    ////};
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
        //formContext.getAttribute(fields.account).addOnChange(_self.checkAccountName);
        //_self.checkAccountName(executionContext);

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
).call(RSMNG.FORMEDO.CONTACT)
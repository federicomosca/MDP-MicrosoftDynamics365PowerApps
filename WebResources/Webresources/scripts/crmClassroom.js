//sostituire PROGETTO con nome progetto
//sostituire ENTITY con nome entità
if (typeof (FM) == "undefined") {
    FM = {};
}

if (typeof (FM.PAP) == "undefined") {
    FM.PAP = {};
}

if (typeof (FM.PAP.CLASSROOM) == "undefined") {
    FM.PAP.CLASSROOM = {};
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
            name: "res_name",
            type: "res_type",
            seats: "res_seats"
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
).call(FM.PAP.CLASSROOM)
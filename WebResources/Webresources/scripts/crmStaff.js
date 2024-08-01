//sostituire PROGETTO con nome progetto
//sostituire ENTITY con nome entità
if (typeof (RSMNG) == "undefined") {
    RSMNG = {};
}

if (typeof (RSMNG.FORMEDO) == "undefined") {
    RSMNG.FORMEDO = {};
}

if (typeof (RSMNG.FORMEDO.STAFF) == "undefined") {
    RSMNG.FORMEDO.STAFF = {};
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
            contact: "res_contactid",
            fullName: "res_fullname",
            qualification: "res_qualification",
            email: "res_emailaddress",
            paycheck: "res_paycheck",
            employmentStartDate: "res_employmentstartdate",
            employmentEndDate: "res_employmentenddate"
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
    _self.onChangeEmploymentStartDate = function (executionContext) {
        _self.onChangeEmploymentDate(executionContext, fields.employmentStartDate);
    };
    //---------------------------------------------------
    _self.onChangeEmploymentEndDate = function (executionContext) {
        _self.onChangeEmploymentDate(executionContext, fields.employmentEndDate);
    };
    //---------------------------------------------------
    _self.onChangeEmploymentDate = function (executionContext, fieldControl) {
        let formContext = executionContext.getFormContext();
        let errorMessage = null;
        let todayUTC = new Date();
        let todayISO = new Date(todayUTC.getFullYear(), todayUTC.getMonth(), todayUTC.getDate());

        formContext.getControl(fields.employmentStartDate).clearNotification();
        formContext.getControl(fields.employmentEndDate).clearNotification();

        let startDate = formContext.getAttribute(fields.employmentStartDate).getValue();
        let endDate = formContext.getAttribute(fields.employmentEndDate).getValue();

        /**
         * controllo che né data fine né data inizio siano precedenti a oggi
         */
        if (startDate != null && startDate < todayISO) {
            errorMessage = "Employment Start Date can not be earlier than today.";
        }
        if (endDate != null && endDate < todayISO) {
            errorMessage = "Employement End Date can not be earlier than today.";
        }

        if (startDate != null && endDate != null) {

            /**
             * controllo che la data di inizio non sia antecedente alla data di fine
             */
            if (startDate >= endDate) {
                errorMessage = "Employment Start Date cannot be equal or later than Employement End Date";
            }

            if (errorMessage) {
                formContext.getControl(fieldControl).setNotification(errorMessage);
            }
        }
    }
    //---------------------------------------------------
    _self.onChangeContactLookup = function (executionContext) {
        var formContext = executionContext.getFormContext();

        let contactField = formContext.getAttribute(fields.contact);

        let contactId = contactField && contactField.getValue() && contactField.getValue().length > 0
            ? contactField.getValue()[0].id
            : null;

        if (contactId) {
            Xrm.WebApi.retrieveRecord("contact", contactId, "?$select=firstname,lastname,emailaddress1").then(
                function success(contact) {
                    let firstname = contact.firstname ?? '';
                    let lastname = contact.lastname ?? '';
                    let fullName = `${firstname} ${lastname}`;

                    formContext.getAttribute(fields.fullName).setValue(fullName);
                    formContext.getAttribute("res_qualification").setValue(fullName);

                    let email = contact.emailaddress1 ?? '';
                    formContext.getAttribute(fields.email).setValue(email);
                },
                function error(error) {
                    console.error("Error retrieving contact details: ", error.message);
                }
            );
        } else {
            // Se non è selezionato nessun contatto, imposta fullName su una stringa vuota
            formContext.getAttribute(fields.email).setValue('');
            formContext.getAttribute(fields.fullName).setValue('');
            formContext.getAttribute("res_qualification").setValue(null);
        }
    }
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
        formContext.getAttribute(fields.employmentStartDate).addOnChange(_self.onChangeEmploymentStartDate);
        formContext.getAttribute(fields.employmentEndDate).addOnChange(_self.onChangeEmploymentEndDate);
        formContext.getAttribute(fields.contact).addOnChange(_self.onChangeContactLookup);


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
).call(RSMNG.FORMEDO.STAFF)
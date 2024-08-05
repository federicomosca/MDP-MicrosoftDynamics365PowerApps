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
            signature: "res_signature"
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

    // Function to fill lesson fields
    _self.fillLessonFields = executionContext => {
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

    _self.onLoadForm = async function (executionContext) {
        await import('../res_scripts/Utils.js');

        var formContext = executionContext.getFormContext();

        // Init events
        formContext.data.entity.addOnSave(_self.onSaveForm);

        // Init functions
        _self.fillLessonFields(executionContext);

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

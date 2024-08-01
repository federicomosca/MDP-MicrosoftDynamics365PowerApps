function cleanId(id) {
    var cleanedId = 0;
    if (id) {
        cleanedId = id.replace(/[{}]/g, "");
    } else {
        console.log(`Given ID(${id}) is not valid.`);
    }
    return cleanedId;
}

function validateDuration(timeWithAnyPunctuationMark) {
    if (timeWithAnyPunctuationMark) {

        const time = timeWithAnyPunctuationMark.replace(/[,;:]/g, '.');

        var regex = /^\d+([:.,][0-5][0-9])?$/;

        if (regex.test(time)) {
            return parseFloat(time);
        } else {
            return "This format is not valid. Set hours and, optionally, minutes (max 59) preceded by point, comma or colon."
        }
    } else {
        return "Time to format not found.";
    }
}

function validateTime(time) {
    if (time) {
        var regex = /^([0-9]|[0-1][0-9]|2[0-3])[:.][0-5][0-9]$|^([0-9]|[0-1][0-9]|2[0-3])$/;

        if (regex.test(time)) {
            return "Ok";
        } else {
            return "This format is not valid. Please insert hh:mm or hh.mm"
        }
    } else {
        return "Time to format not found.";
    }
}

function clearFields(context, fieldsToClear) {
    fieldsToClear.forEach(fieldToClear => {
        let attr = context.getAttribute(fieldToClear);
        if (attr && attr.getValue() !== null) {
            attr.setValue(null);
        }
    });
}

function checkFieldsHaveValue(context, fieldsToCheck) {
    fieldsToCheck.forEach(fieldToCheck => {
        let attribute = context.getAttribute(fieldToCheck);
        if (attribute && attribute.getValue() !== null) {
            return true;
        }
        return false;
    });
}
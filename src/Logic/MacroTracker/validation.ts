function changeAlertDivToInvalid(event: Event, alert_div: HTMLElement, inputClassName: string) {
           
    alert_div.className = "ml-2 invalid-feedback";
    (event.target as HTMLElement).className = inputClassName + " is-invalid";
}

function checkValidation(event: Event, alert_div: HTMLElement, identifier: string, inputClassName: string) {
    if(alert_div.innerHTML == "") {
        alert_div.className = "ml-2 valid-feedback";
        alert_div.innerHTML = "Valid " + identifier;

        (event.target as HTMLElement).className = inputClassName +  " is-valid";
        return true
    } else {
        return false
    }
}

export function validateGenderOrActivityLvl(event: Event, identifier: string, alert_div: HTMLElement, inputClassName: string) {

    const GenderOrActivityLvl = (event.target as HTMLSelectElement).value
    alert_div.style.display = "block"

    if(GenderOrActivityLvl == '0') {
        alert_div.innerHTML = "Gender is invalid"
        changeAlertDivToInvalid(event, alert_div, inputClassName)
    }
    return checkValidation(event, alert_div, identifier, inputClassName)

}

export function ValidateText(event: Event, identifier: string, alert_div: HTMLElement, inputClassName: string) {
    const value = (event.target as HTMLInputElement).value
    const requirements = validation_requirements[identifier]

    alert_div.style.display = "block"

    const min = requirements.min ? value.trim().length < requirements.min : undefined
    const max = requirements.max ? value.trim().length > requirements.max : undefined
    const regex =  !(requirements.regExp.test(value))

    if(min || max || regex) {

        changeAlertDivToInvalid(event, alert_div, inputClassName)
        
        if(min || max) {
            alert_div.innerHTML = `Invalid length, ${requirements.min} - ${requirements.max} ${requirements.unit} <br>`
        }

        if(regex && value.trim().length > 0) {
            alert_div.innerHTML += requirements.regMessage
        }
    } 
    return checkValidation(event, alert_div, identifier, inputClassName)

}

type Text_validation_requirements = {
    [key: string]: {
        min: number | undefined,
        max: number | undefined,
        unit: string | undefined,
        regExp: RegExp,
        regMessage: string
    } 
}

const validation_requirements: Text_validation_requirements = {

    Username: {
        min: 4, 
        max: 12, 
        unit: 'characters',
        regExp: /^[A-zA-Z0-9]+$/,
        regMessage: "Only letters and numbers are allowed"
    },

    Password: {
        min: 9, 
        max: 50, 
        unit: 'characters',
        regExp: /(?=.*[@$£<`'^])/,
        regMessage: "One special character is required"
    },

    Name: {
        min: 3, 
        max: 12, 
        unit: 'characters',
        regExp: /^[a-zA-Z0-9]+$/,
        regMessage: "Only letters allowed"
    },

    Email: {
        min: undefined, 
        max: undefined, 
        unit: undefined,
        regExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        regMessage: "Email is invalid"
    },

    Weight: {
        min: 29,
        max: 635,
        unit: 'kg',
        regExp: /^(0|[1-9]\d*)(\.\d+)?\s*[0-9]+(\.[0-9]+)?/,
        regMessage: "Weight can only be defined by numbers and a period"
    },

    Height: {
        min: 50,
        max: 275,
        unit: 'cm',
        regExp: /^(0|[1-9]\d*)(\.\d+)?\s*[0-9]+(\.[0-9]+)?/,
        regMessage: "Height can only be defined by numbers and a period"
    },

    Age: {
        min: 12,
        max: 130,
        unit: undefined,
        regExp: /^[0-9]+(0|[1-9]\d*)(\.\d+)?$/,
        regMessage: "Age can only be defined by numbers"
    },

    Nutrient: {
        min: 0,
        max: 1000,
        unit: undefined,
        regExp: /^[0-9]+(0|[1-9]\d*)(\.\d+)?$/,
        regMessage: "Nutrient can only be defined by numbers and a period"
    }

}


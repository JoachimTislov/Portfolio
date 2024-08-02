import { ref } from "vue";

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

export function ValidateText(event: Event, alert_div: HTMLElement | null, identifier: string, inputClassName: string) {
    const value = (event.target as HTMLInputElement).value
    const requirements = validation_requirements[identifier]
  
    if (!alert_div) return false

    alert_div.innerHTML = ""
    alert_div.style.display = "block"

    const min = requirements.min ? value.trim().length < requirements.min : undefined
    const max = requirements.max ? value.trim().length > requirements.max : undefined
    const regex = requirements.regExp ? !(requirements.regExp.test(value)) : undefined

    console.log(regex, requirements.regExp)

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
        min: number | undefined
        max: number | undefined
        unit: string | undefined
        regExp: RegExp | undefined
        regMessage: string | undefined
        alert_div: HTMLElement | null
    } 
}

// Init html div alert elements
export const username_validation_message = ref<HTMLElement | null>(null)
export const password_validation_message = ref<HTMLElement | null>(null)
export const name_validation_message = ref<HTMLElement | null>(null)
export const email_validation_message = ref<HTMLElement | null>(null)
export const weight_validation_message = ref<HTMLElement | null>(null)
export const height_validation_message = ref<HTMLElement | null>(null)
export const age_validation_message = ref<HTMLElement | null>(null)
export const mealName_validation_message = ref<HTMLElement | null>(null)
export const nutrient_validation_message = ref<HTMLElement | null>(null)
export const ingredientName_validation_message = ref<HTMLElement | null>(null)
export const amount_validation_message = ref<HTMLElement | null>(null)
export const hour_validation_message = ref<HTMLElement | null>(null)
export const minutes_validation_message = ref<HTMLElement | null>(null)


export function initAlertElements() {
    username_validation_message.value?.focus()
    password_validation_message.value?.focus()
    name_validation_message.value?.focus()
    email_validation_message.value?.focus()
    weight_validation_message.value?.focus()
    height_validation_message.value?.focus()
    age_validation_message.value?.focus()
    mealName_validation_message.value?.focus()
    nutrient_validation_message.value?.focus()
    ingredientName_validation_message.value?.focus()
    amount_validation_message.value?.focus()
    hour_validation_message.value?.focus()
    minutes_validation_message.value?.focus()
}

const regNumbers = /^[0-9]+$/
const regLettersAndNumbers = /^[a-zA-Z0-9]+$/
const regPeriodAndNumbers = /^(0|[1-9]\d*)(\.\d+)?\s*[0-9]+(\.[0-9]+)?/
const regPeriodAndNumbers2 = /^[0-9]+(0|[1-9]\d*)(\.\d+)?$/

const regSpecialCharacter = /(?=.*[}{.@$£<>-_/)[(+¤%&;:*¨~`'^#])/

const validation_requirements: Text_validation_requirements = {

    Username: {
        min: 4, 
        max: 12, 
        unit: 'characters',
        regExp: regLettersAndNumbers,
        regMessage: "Only letters and numbers are allowed",
        alert_div: username_validation_message.value
    },

    Password: {
        min: 9, 
        max: 50, 
        unit: 'characters',
        regExp: regSpecialCharacter,
        regMessage: "One special character is required; ( }{.@$£<>-_/[+¤%&;:*¨~`'^# )",
        alert_div: password_validation_message.value
    },

    Name: {
        min: 3, 
        max: 12, 
        unit: 'characters',
        regExp: regLettersAndNumbers,
        regMessage: "Only letters allowed",
        alert_div: name_validation_message.value
    },

    Email: {
        min: undefined, 
        max: undefined, 
        unit: undefined,
        regExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        regMessage: "Email is invalid",
        alert_div: email_validation_message.value
    },

    Weight: {
        min: 29,
        max: 635,
        unit: 'kg',
        regExp: regPeriodAndNumbers,
        regMessage: "Weight can only be defined by numbers and a period",
        alert_div: weight_validation_message.value 
    },

    Height: {
        min: 50,
        max: 275,
        unit: 'cm',
        regExp: regPeriodAndNumbers,
        regMessage: "Height can only be defined by numbers and a period",
        alert_div: height_validation_message.value
    },

    Age: {
        min: 12,
        max: 130,
        unit: undefined,
        regExp: regPeriodAndNumbers2,
        regMessage: "Age can only be defined by numbers and a period",
        alert_div: age_validation_message.value
    },

    Nutrient: {
        min: 0,
        max: 1000,
        unit: undefined,
        regExp: regPeriodAndNumbers2,
        regMessage: "Nutrient can only be defined by numbers and a period",
        alert_div: nutrient_validation_message.value
    },

    MealName: {
        min: 8,
        max: 40,
        unit: 'characters',
        regExp: undefined,
        regMessage: undefined,
        alert_div: mealName_validation_message.value
    },

    IngredientName: {
        min: 3,
        max: 40,
        unit: 'characters',
        regExp: undefined,
        regMessage: undefined,
        alert_div: ingredientName_validation_message.value
    },

    Amount: {
        min: 1,
        max: 1000,
        unit: undefined,
        regExp: /^(0|[1-9]\d*)(\.\d+)?\s*(g|kg|pounds|tsp|tbsp|oz|ml|L|cup)?$/,
        regMessage: "Amount can only be defined by numbers, a period and a unit",
        alert_div: amount_validation_message.value
    },

    Hour: {
        min: 0,
        max: 23,
        unit: undefined,
        regExp: regNumbers,
        regMessage: "Hour can only contain numbers",
        alert_div: hour_validation_message.value
    },

    Minutes: {
        min: 0,
        max: 59,
        unit: undefined,
        regExp: regNumbers,
        regMessage: "Minutes can only contain numbers",
        alert_div: minutes_validation_message.value
    }

}


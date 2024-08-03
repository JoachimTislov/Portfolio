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

export function validateGenderOrActivityLvl(event: Event, alert_div: HTMLElement | null, identifier: string, inputClassName: string) {
    const GenderOrActivityLvl = (event.target as HTMLSelectElement).value

    if (!alert_div) return false

    alert_div.style.display = "block"

    if(GenderOrActivityLvl == '0') {
        alert_div.innerHTML = `${identifier} is invalid`
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
    } 
}

// Init html div alert elements

// login
export const username_validation_message = ref<HTMLElement | null>(null)
export const password_validation_message = ref<HTMLElement | null>(null)

// register
export const register_username_validation_message = ref<HTMLElement | null>(null)
export const register_password_validation_message = ref<HTMLElement | null>(null)
export const register_confirm_password_validation_message = ref<HTMLElement | null>(null)
export const register_name_validation_message = ref<HTMLElement | null>(null)
export const register_weight_validation_message = ref<HTMLElement | null>(null)
export const register_height_validation_message = ref<HTMLElement | null>(null)
export const register_age_validation_message = ref<HTMLElement | null>(null)
export const register_gender_validation_message = ref<HTMLElement | null>(null)
export const register_activityLvl_validation_message = ref<HTMLElement | null>(null)
export const register_email_validation_message = ref<HTMLElement | null>(null)


export const mealName_validation_message = ref<HTMLElement | null>(null)
export const nutrient_validation_message = ref<HTMLElement | null>(null)
export const ingredientName_validation_message = ref<HTMLElement | null>(null)
export const amount_validation_message = ref<HTMLElement | null>(null)
export const hour_validation_message = ref<HTMLElement | null>(null)
export const minutes_validation_message = ref<HTMLElement | null>(null)


export function initAlertElements() {
    username_validation_message.value?.focus()
    password_validation_message.value?.focus()

    register_username_validation_message.value?.focus()
    register_password_validation_message.value?.focus() 
    register_confirm_password_validation_message.value?.focus() 
    register_name_validation_message.value?.focus() 
    register_weight_validation_message.value?.focus() 
    register_height_validation_message.value?.focus() 
    register_age_validation_message.value?.focus() 
    register_gender_validation_message.value?.focus() 
    register_activityLvl_validation_message.value?.focus() 
    register_email_validation_message.value?.focus() 


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
    },

    Password: {
        min: 9, 
        max: 50, 
        unit: 'characters',
        regExp: regSpecialCharacter,
        regMessage: "One special character is required; ( }{.@$£<>-_/[+¤%&;:*¨~`'^# )",
    },

    Name: {
        min: 3, 
        max: 12, 
        unit: 'characters',
        regExp: regLettersAndNumbers,
        regMessage: "Only letters allowed",
    },

    Email: {
        min: undefined, 
        max: undefined, 
        unit: undefined,
        regExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        regMessage: "Email is invalid",
    },

    Weight: {
        min: 29,
        max: 635,
        unit: 'kg',
        regExp: regPeriodAndNumbers,
        regMessage: "Weight can only be defined by numbers and a period",
    },

    Height: {
        min: 50,
        max: 275,
        unit: 'cm',
        regExp: regPeriodAndNumbers,
        regMessage: "Height can only be defined by numbers and a period",
    },

    Age: {
        min: 12,
        max: 130,
        unit: undefined,
        regExp: regPeriodAndNumbers2,
        regMessage: "Age can only be defined by numbers and a period",
    },

    Nutrient: {
        min: 0,
        max: 1000,
        unit: undefined,
        regExp: regPeriodAndNumbers2,
        regMessage: "Nutrient can only be defined by numbers and a period",
    },

    MealName: {
        min: 8,
        max: 40,
        unit: 'characters',
        regExp: undefined,
        regMessage: undefined,
    },

    IngredientName: {
        min: 3,
        max: 40,
        unit: 'characters',
        regExp: undefined,
        regMessage: undefined,
    },

    Amount: {
        min: 1,
        max: 1000,
        unit: undefined,
        regExp: /^(0|[1-9]\d*)(\.\d+)?\s*(g|kg|pounds|tsp|tbsp|oz|ml|L|cup)?$/,
        regMessage: "Amount can only be defined by numbers, a period and a unit",
    },

    Hour: {
        min: 0,
        max: 23,
        unit: undefined,
        regExp: regNumbers,
        regMessage: "Hour can only contain numbers",
    },

    Minutes: {
        min: 0,
        max: 59,
        unit: undefined,
        regExp: regNumbers,
        regMessage: "Minutes can only contain numbers",
    }

}


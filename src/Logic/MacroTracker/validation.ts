function changeAlertDivToInvalid(event: Event, alert_div: HTMLElement, inputClassName: string) {
  alert_div.className = 'ml-2 invalid-feedback'
  ;(event.target as HTMLElement).className = inputClassName + ' is-invalid'
}

function checkValidation(
  event: Event,
  alert_div: HTMLElement,
  identifier: string,
  inputClassName: string
) {
  if (alert_div.innerHTML == '') {
    alert_div.className = 'ml-2 valid-feedback'
    alert_div.innerHTML = 'Valid ' + identifier
    ;(event.target as HTMLElement).className = inputClassName + ' is-valid'

    return true
  } else {
    return false
  }
}

export function validateGenderOrActivityLvl(
  event: Event,
  alert_div: HTMLElement | null,
  identifier: string,
  inputClassName: string
) {
  const GenderOrActivityLvl = (event.target as HTMLSelectElement).value

  if (!alert_div) return false

  alert_div.style.display = 'block'

  if (GenderOrActivityLvl == '0') {
    alert_div.innerHTML = `${identifier} is invalid`
    changeAlertDivToInvalid(event, alert_div, inputClassName)
  } else {
    alert_div.innerHTML = ''
  }
  return checkValidation(event, alert_div, identifier, inputClassName)
}

export function ValidateText(
  event: Event,
  alert_div: HTMLElement | null,
  identifier: string,
  inputClassName: string
) {
  const value = (event.target as HTMLInputElement).value
  const requirements = validation_requirements[identifier]

  if (!alert_div) return false

  alert_div.innerHTML = ''
  alert_div.style.display = 'block'

  const inputValue =
    requirements.type == 'string'
      ? value.trim().length
      : requirements.type == 'float'
        ? parseFloat(value)
        : parseInt(value)

  const min = requirements.min ? inputValue < requirements.min : undefined
  const max = requirements.max ? inputValue > requirements.max : undefined
  const regex = requirements.regExp ? !requirements.regExp.test(value) : undefined

  if (min || max || regex) {
    changeAlertDivToInvalid(event, alert_div, inputClassName)

    if (min || max || Number.isNaN(inputValue)) {
      alert_div.innerHTML = `<small> Enter ${identifier} between ${requirements.min} and ${requirements.max} ${requirements.unit} <small> <br>`
    }

    if (regex || inputValue >= 0) {
      alert_div.innerHTML += `<small> ${requirements.regMessage} </small>`
    }
  }
  return checkValidation(event, alert_div, identifier, inputClassName)
}

type Text_validation_requirements = {
  [key: string]: {
    type: string
    min: number | undefined
    max: number | undefined
    unit: string | undefined
    regExp: RegExp | undefined
    regMessage: string | undefined
  }
}

const regNumbers = /^[0-9]+$/
const regLettersAndNumbers = /^[a-zA-Z0-9]+$/

const regPeriodAndNumbers = /^(0|[1-9]\d*)(\.\d+)?$/
const regSpecialCharacter = /(?=.*[}{.@$£<>-_/)[(+¤%&;:*¨~`'^#])/

const validation_requirements: Text_validation_requirements = {
  Username: {
    type: 'string',
    min: 4,
    max: 12,
    unit: 'characters',
    regExp: regLettersAndNumbers,
    regMessage: 'Only letters and numbers are allowed'
  },

  Password: {
    type: 'string',
    min: 9,
    max: 50,
    unit: 'characters',
    regExp: regSpecialCharacter,
    regMessage: "One special character is required; ( }{.@$£<>-_/[+¤%&;:*¨~`'^# )"
  },

  Name: {
    type: 'string',
    min: 3,
    max: 12,
    unit: 'characters',
    regExp: regLettersAndNumbers,
    regMessage: 'Only letters allowed'
  },

  Email: {
    type: 'string',
    min: undefined,
    max: undefined,
    unit: undefined,
    regExp:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    regMessage: 'Email is invalid'
  },

  Weight: {
    type: 'float',
    min: 29,
    max: 635,
    unit: 'kg',
    regExp: regPeriodAndNumbers,
    regMessage: 'Weight can only be defined by numbers and a period'
  },

  Height: {
    type: 'int',
    min: 50,
    max: 275,
    unit: 'cm',
    regExp: regPeriodAndNumbers,
    regMessage: 'Height can only be defined by numbers and a period'
  },

  Age: {
    type: 'int',
    min: 12,
    max: 130,
    unit: 'years',
    regExp: regPeriodAndNumbers,
    regMessage: 'Age can only be defined by numbers and a period'
  },

  Nutrient: {
    type: 'float',
    min: 0,
    max: 1000,
    unit: undefined,
    regExp: regPeriodAndNumbers,
    regMessage: 'Nutrient can only be defined by numbers and a period'
  },

  MealName: {
    type: 'string',
    min: 8,
    max: 40,
    unit: 'characters',
    regExp: undefined,
    regMessage: undefined
  },

  IngredientName: {
    type: 'string',
    min: 3,
    max: 40,
    unit: 'characters',
    regExp: undefined,
    regMessage: undefined
  },

  Amount: {
    type: 'float',
    min: 1,
    max: 1000,
    unit: undefined,
    regExp: /^(0|[1-9]\d*)(\.\d+)?\s*(g|kg|pounds|tsp|tbsp|oz|ml|L|cup)?$/,
    regMessage: 'Amount can only be defined by numbers, a period and a unit'
  },

  Hour: {
    type: 'int',
    min: 0,
    max: 23,
    unit: undefined,
    regExp: regNumbers,
    regMessage: 'Hour can only contain numbers'
  },

  Minutes: {
    type: 'int',
    min: 0,
    max: 59,
    unit: undefined,
    regExp: regNumbers,
    regMessage: 'Minutes can only contain numbers'
  }
}

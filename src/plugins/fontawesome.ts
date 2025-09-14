import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRight,
  faArrowLeft,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowRight, faArrowLeft, faArrowUp, faArrowDown)

// import { config } from '@fortawesome/fontawesome-svg-core'
// config.familyDefault = 'classic'
// config.styleDefault = 'duotone'

export { FontAwesomeIcon }

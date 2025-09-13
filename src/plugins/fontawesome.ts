import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, fab)

// import { config } from '@fortawesome/fontawesome-svg-core'
// config.familyDefault = 'classic'
// config.styleDefault = 'duotone'

export { FontAwesomeIcon }

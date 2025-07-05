import { boot } from 'quasar/wrappers'
import pinia from 'src/stores'

export default boot(({ app }) => {
  app.use(pinia)
})

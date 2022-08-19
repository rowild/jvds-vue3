import { boot } from 'quasar/wrappers'
import { createLogger } from 'vue-logger-plugin'

export default boot(({ app }) => {
  // create logger with options
  const logger = createLogger({
    enabled: true,
    level: 'debug',
    beforeHooks: [],
    afterHooks: [],
  })

  app.use(logger)
})

// export { logger }
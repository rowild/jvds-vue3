/**
 * Generate Vuex store modules via node.js
 *
 * Resulting structure:
 * scr
 *   store
 *     modules
 *       newModule
 *         moduleName
 *         actions, getters, mutations
 */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
// `__dirname` returns the current path

const relativePathToModulesFolder = 'src/store/modules'
const args = process.argv.slice(2)

const error = (...args) => {
  console.log(chalk.red(...args))
}

const success = (...args) => {
  console.log(chalk.green(...args))
}

// If there is no first argument given (= module name), error out and return
if (!args.length) {
  console.error('You must provide a name for the module.')
  // about this eslint error, read: https://github.com/eslint/eslint/issues/8767
  return
}

// get the first argument and test, if a folder with that name already exists
// `__dirname` returns the current path
const moduleName = args[0]
const modulePath = path.join(__dirname, '../', relativePathToModulesFolder, moduleName)

// If the directory with the given name already exists, error out and return
if (fs.existsSync(modulePath)) {
  error(`${moduleName} directory already exists.`)
  return
}

// `stateContent` will generate the content of the state.js file
const stateContent = `import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  // Add state properties for module ${moduleName}
}

export default {
  state,
  getters,
  mutations,
  actions
}
`

let exportFileContent = function(type) {
  return `/* eslint-disable no-unused-vars */

// ${moduleName} ${type}
// import * as types from '@/store/types'

export default {
  // add ${moduleName} ${type}
}

`
}

// Export the `getters.js`, `actions.js`, `mutations.js`
// const exportFileContent = ;

// Build path to the module files:
const statePath = `${path.join(modulePath, `${moduleName}.js`)}`
const actionsPath = `${path.join(modulePath, 'actions.js')}`
const gettersPath = `${path.join(modulePath, 'getters.js')}`
const mutationsPath = `${path.join(modulePath, 'mutations.js')}`

// Create the new module folder:
fs.mkdirSync(modulePath)

// Create the new module files:
fs.appendFileSync(statePath, stateContent)
fs.appendFileSync(gettersPath, exportFileContent('getters'))
fs.appendFileSync(mutationsPath, exportFileContent('mutations'))
fs.appendFileSync(actionsPath, exportFileContent('actions'))

success(`Module ${moduleName} generated!`)

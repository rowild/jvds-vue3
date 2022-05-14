const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const args = process.argv.slice(2)
// console.log('args =', args)

const error = (...args) => {
  console.log(chalk.red(...args))
}

const success = (...args) => {
  console.log(chalk.green(...args))
}

// If there is no first argument given (= module name), error out and return
if (args.length !== 2) {
  error(
    'You must provide the relative path to a source file (including path, e.g. "public/data/compositions/catalog.json") and the relative path to a destination folder (e.g. "public/data/compositions/).'
  )
  // about this eslint error, read: https://github.com/eslint/eslint/issues/8767
  /* eslint-disable */
  return
}

// --------------------------------------------------------------
// Choose the source JSON file
// --------------------------------------------------------------
const sourceFile = args[0]
const destinationFolder = args[1]

const sourceData = fs.readFileSync(__dirname + '/../' + sourceFile)
// Parse JSON
const sourceDataJsonContent = JSON.parse(sourceData)

/**
 * Create Filename from data from json
 *
 * @param {String} title
 * @param {String} subtitle
 * @param {String} year
 */
let createFileName = function(title, subtitle, year) {
  const patternEmptySpaces = /\s/g
  const patternNonNormalLetters = /[<>?!:;,$,%|'"\{\}\/]/g
  let fileame = ''

  title = title.toLowerCase()
  year = year.toLowerCase()

  // Check if there is a subtitle
  if (subtitle !== 'undefined' && subtitle !== undefined && subtitle !== 'undefined' && subtitle !== null && subtitle) {
    subtitle = subtitle.toLowerCase()
  }

  // Purify title
  if (title !== null && title !== undefined && title !== '') {
    if (RegExp(patternEmptySpaces, 'g').test(title)) {
      title = title.replace(patternEmptySpaces, '-')
    }
    if (RegExp(patternNonNormalLetters, 'g').test(title)) {
      title = title.replace(patternNonNormalLetters, '-')
    }
    if (RegExp(/-{2,}/, 'g').test(title)) {
      title = title.replace(/_{2,}/, '-')
    }
  }

  // Purify subtitle
  if (subtitle !== '' && subtitle !== undefined && subtitle !== null && subtitle) {
    if (RegExp(patternEmptySpaces, 'g').test(subtitle)) {
      subtitle = subtitle.replace(patternEmptySpaces, '-')
    }
    if (RegExp(patternNonNormalLetters, 'g').test(subtitle)) {
      subtitle = subtitle.replace(patternNonNormalLetters, '-')
    }
    if (RegExp(/-{2,}/, 'g').test(subtitle)) {
      subtitle = subtitle.replace(/_{2,}/, '-')
    }
  }

  // Purify Year
  if (year !== null && year !== undefined && year !== '' && year) {
    if (RegExp(patternEmptySpaces, 'g').test(year)) {
      year = year.replace(patternEmptySpaces, '-')
    }
    if (RegExp(patternNonNormalLetters, 'g').test(year)) {
      year = year.replace(patternNonNormalLetters, '-')
    }
    if (RegExp(/-{2,}/, 'g').test(year)) {
      year = year.replace(/_{2,}/, '-')
    }
  }

  // Generate filename depending on whether we have a subtitle or not
  if (subtitle !== '' && subtitle !== undefined && subtitle !== null && subtitle) {
    filename = 'jvds__' + title + '__' + subtitle + '__' + year + '.json'
  } else {
    filename = 'jvds__' + title + '__' + year + '.json'
  }

  return filename
}

// Content to prefill each file with
const exportFileContent = function(opus) {
  content = '{\n'
  content += '  "id":' + opus.id + ',\n'
  content += '  "title":"' + opus.title + '",\n'
  if (opus.subtitle) {
    content += '  "subtitle":"' + opus.subtitle + '",\n'
  }
  content += '  "categories":' + JSON.stringify(opus.categories) + ',\n'
  content += '  "year":"' + opus.year + '",\n'
  if (opus.yearEnd) {
    content += '  "year-end":"' + opus.yearEnd + '",\n'
  }
  content += '  "duration":"' + opus.duration + '",\n'
  content += '  "orchestration":"' + opus.orchestration + '",\n'
  content += '  "description":"' + opus.description + '",\n'
  content += '  "performances":' + JSON.stringify(opus.performances, null, 2) + '\n'
  content += '}'

  return content

  //   return (
  //     `{
  //   "id": ${opus.id},
  //   "title": "${opus.title}",
  //   "subtitle": "${opus.subtitle}",
  //   "categories": ` +
  //     JSON.stringify(opus.categories) +
  //     `,
  //   "year": "${opus.year}",
  //   "year-end": "` +
  //     opus['year-end'] +
  //     `",
  //   "duration": "${opus.duration}",
  //   "orchestration": "${opus.orchestration}",
  //   "description": "${opus.description}",
  //   "performances": ` +
  //     JSON.stringify(opus.performances) +
  //     `
  // }`
  //   )
}

// --------------------------------------------------------------
// Get all the data from the file
// --------------------------------------------------------------
if (sourceDataJsonContent) {
  // Get root node
  let catalog = sourceDataJsonContent.catalog

  // Loop over all entries
  for (let i = 0; i < catalog.length; i++) {
    let destPath = ''
    let filename = createFileName(catalog[i].title, catalog[i].subtitle, catalog[i].year)
    console.log('filename =', filename)

    destPath = path.join(__dirname, '../', args[1], filename)

    if (fs.existsSync(destPath)) {
      error(`${destPath} already exists`)
      return
    } else {
      fs.appendFileSync(destPath, exportFileContent(catalog[i]))
    }
  }
} else {
  console.error('could not parse the source file as JSON.')
}

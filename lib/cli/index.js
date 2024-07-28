const yargs = require('yargs')

const { requireDocs } = require('../core')
const { MissingDocsError } = require('../core/missing-docs-error')

const cliRun = (options) => {
  const { extensions, docsExtension } = options

  try {
    requireDocs(extensions ? extensions.split(',') : undefined, docsExtension)

    console.log('All files have documentation')

    process.exit(0)
  } catch (error) {
    if (error instanceof MissingDocsError) {
      console.error('The following files are missing documentation:')
      console.error(error.filenames.join('\n'))
    } else {
      console.error(error.message)
    }

    process.exit(1)
  }
}

const cliConfigure = () => {
  const usage = `
require-docs-js

Configure husky's git hook to require docs for all files with the given extensions.
`.trim()

  return yargs
    .usage(usage)
    .option('extensions', {
      alias: 'e',
      type: 'string',
      description:
        'Comma-separated file extensions that docs will be required. Default: .js,.jsx,.ts,.tsx',
      demandOption: false,
    })
    .option('docs-extension', {
      alias: 'd',
      type: 'string',
      description: "Documentation files' extension. Default: .md",
      demandOption: false,
    })
    .option('docs-dir', {
      alias: 'D',
      type: 'string',
      description: 'Documentation directory. Default: docs/',
      demandOption: false,
    })
    .help(true).argv
}

module.exports = { cliConfigure, cliRun }

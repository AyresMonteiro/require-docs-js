const { requireDocs } = require('../core')
const { MissingDocsError } = require('../core/missing-docs-error')

const verify = (options) => {
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

module.exports = {
  verify
}

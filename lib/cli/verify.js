const { requireDocs } = require('../core')
const { MissingDocsError } = require('../core/missing-docs-error')
const { CLILogger } = require('./logger')

const verify = (options) => {
  const { extensions, docsExtension } = options

  const logger = new CLILogger()

  try {
    requireDocs(extensions ? extensions.split(',') : undefined, docsExtension)

    logger.info('All files have documentation')

    process.exit(0)
  } catch (error) {
    if (error instanceof MissingDocsError) {
      logger.error('The following files are missing documentation:')
      error.filenames.forEach(logger.error.bind(logger))
    } else {
      logger.error(error.message)
    }

    process.exit(1)
  }
}

module.exports = {
  verify
}

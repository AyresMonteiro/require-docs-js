const { requireDocs } = require('../core')
const { MissingDocsError } = require('../core/missing-docs-error')
const { getDocFilename } = require('../core/utils')
const { CLILogger } = require('./logger')

const verify = (options) => {
  const { extensions, docsExtension, docsDir } = options

  const logger = new CLILogger()

  try {
    requireDocs(
      extensions ? extensions.split(',') : undefined,
      docsExtension,
      docsDir
    )

    logger.info('All files have documentation')

    process.exit(0)
  } catch (error) {
    if (error instanceof MissingDocsError) {
      logger.error('The following files are missing documentation:')
      error.filenames
        .map((f) => `${f}. Create/modify ${getDocFilename(f, docsExtension, docsDir)}`)
        .forEach(logger.error.bind(logger))
    } else {
      logger.error(error.message)
    }

    process.exit(1)
  }
}

module.exports = {
  verify,
}

const { execSync } = require('node:child_process')
const { MissingDocsError } = require('./missing-docs-error')
const { defaultCodeExtensions, defaultDocsExtension, defaultDocsDir } = require('./default-values')
const { getDocFilename, getFileExtension } = require('./utils')

const requireDocs = (
  codeExtensions = defaultCodeExtensions,
  docsExtension = defaultDocsExtension,
  docsDir = defaultDocsDir
) => {
  const stagedFiles = execSync('git diff --cached --name-only --diff-filter=AMR')
    .toString()
    .split('\n')
    .map(f => f.trim())
    .filter(f => !!f)

  const stagedCode = stagedFiles.filter((file) => codeExtensions.includes(getFileExtension(file)))
  const stagedDocs = new Set(stagedFiles.filter((file) => getFileExtension(file) === docsExtension))

  const missingDocs = stagedCode.filter((file) => {
    const docsFile = getDocFilename(file, docsExtension, docsDir)
    return !stagedDocs.has(docsFile)
  })

  if (missingDocs.length > 0) {
    throw new MissingDocsError('Missing documentation', missingDocs)
  }
}

module.exports = { requireDocs }

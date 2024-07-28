const path = require('node:path')
const { execSync } = require('node:child_process')
const { MissingDocsError } = require('./missing-docs-error')
const { defaultDocsDir, defaultCodeExtensions, defaultDocsExtension } = require('./default-values')

/*
  * Get the file extension from a filename.

  * @param {string} filename - The filename to get the extension from.
  */
const getFileExtension = (filename) => {
  const extension = filename.split('.').pop()

  return '.' + extension
}

const getDocFilename = (filename, docsExtension, docsDir) => {
  const fileParts = filename.split('.')

  fileParts.pop();

  const docFilename = fileParts.join('.') + docsExtension

  return path.join(docsDir || defaultDocsDir, docFilename)
}

const requireDocs = (
  codeExtensions = defaultCodeExtensions,
  docsExtension = defaultDocsExtension
) => {
  const stagedFiles = execSync('git diff --cached --name-only --diff-filter=AMR')
    .toString()
    .split('\n')
    .map(f => f.trim())
    .filter(f => !!f)

  const stagedCode = stagedFiles.filter((file) => codeExtensions.includes(getFileExtension(file)))
  const stagedDocs = new Set(stagedFiles.filter((file) => getFileExtension(file) === docsExtension))

  const missingDocs = stagedCode.filter((file) => {
    const docsFile = getDocFilename(file, docsExtension)
    return !stagedDocs.has(docsFile)
  })

  if (missingDocs.length > 0) {
    throw new MissingDocsError('Missing documentation', missingDocs)
  }
}

module.exports = { requireDocs }

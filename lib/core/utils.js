const path = require('node:path')
const { defaultDocsDir } = require("./default-values")

/*
  * Get the file extension from a filename.

  * @param {string} filename - The filename to get the extension from.
  */
const getFileExtension = (filename) => {
  const extension = filename.split('.').pop()

  return '.' + extension
}

/*
  * Get the documentation filename for a code file.

  * @param {string} filename - The code filename.
  * @param {string} docsExtension - The documentation file extension.
  * @param {string} docsDir - The documentation directory.
  */
const getDocFilename = (filename, docsExtension, docsDir) => {
  const fileParts = filename.split('.')

  fileParts.pop();

  const docFilename = fileParts.join('.') + docsExtension

  return path.join(docsDir || defaultDocsDir, docFilename)
}

module.exports = {
  getFileExtension,
  getDocFilename,
}

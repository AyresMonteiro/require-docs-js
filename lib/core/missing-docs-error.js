/*
  * Custom error class for missing docs

  * @param {string} message - The error message.
  * @param {string[]} filenames - The filenames that are missing documentation.
  */
class MissingDocsError extends Error {
  /*
    * @param {string} message
    * @param {string[]} filenames
    */
  constructor(message, filenames) {
    super(message);
    this.name = 'MissingDocsError';
    this.filenames = filenames || [];
  }
}

module.exports = {
  MissingDocsError
}
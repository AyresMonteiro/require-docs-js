const getExtensionsArg = (value) => {
  if (!value) return ''

  return `--extensions ${value}`
}

const getDocsExtensionArg = (value) => {
  if (!value) return ''

  return `--docs-extension ${value}`
}

const getDocsDirArg = (value) => {
  if (!value) return ''

  return `--docs-dir ${value}`
}

const getNpxPrefix = (isUsingNpx) => {
  return isUsingNpx ? 'npx ' : ''
}

const getVerifyCommand = (options) => {
  const extensionsArg = getExtensionsArg(options['extensions'])
  const docsExtensionArg = getDocsExtensionArg(options['docs-extension'])
  const docsDirArg = getDocsDirArg(options['docs-dir'])
  const isUsingNpx = options['npx']

  return `${getNpxPrefix(
    isUsingNpx
  )} require-docs-js verify ${extensionsArg} ${docsExtensionArg} ${docsDirArg}`.trim()
}

/*
 * Template for husky hook shell script
 */
const huskyHookTemplate = (options) => {
  const disableShebang = options['disable-shebang']
  const verifyCommand = getVerifyCommand(options)

  return (
    `
${disableShebang ? '' : '#!/bin/sh'}

# Verify that all files have documentation
${verifyCommand}
`.trim() + '\n'
  )
}

module.exports = {
  huskyHookTemplate,
}

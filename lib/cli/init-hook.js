const inquirer = require('@inquirer/prompts')
const {
  defaultCodeExtensions,
  defaultDocsDir,
  defaultDocsExtension,
} = require('../core/default-values')
const { createHuskyHook } = require('./husky/create-husky-hook')
const { CLILogger } = require('./logger')

const initHook = async () => {
  const npx = await inquirer.confirm({
    message: 'Do you want to use npx to execute the module locally?',
    default: false,
  })

  const extensions = await inquirer.input({
    message: 'What code file extensions should be checked?',
    default: defaultCodeExtensions.join(', '),
  })

  const docsExtension = await inquirer.input({
    message: 'What is the extension of the documentation files?',
    default: defaultDocsExtension,
  })

  const docsDir = await inquirer.input({
    message: 'What is the documentation directory?',
    default: defaultDocsDir,
  })

  const options = {
    ['docs-dir']: docsDir,
    ['docs-extension']: docsExtension,
    ['extensions']: extensions,
    ['npx']: npx,
  }

  createHuskyHook(options)

  const okMessage = '\n\n' + 'Husky hook created. Enjoy your docs :)' + '\n\n'

  new CLILogger().log(okMessage)
}

module.exports = {
  initHook,
}

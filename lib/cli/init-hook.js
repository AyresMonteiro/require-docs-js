const inquirer = require('@inquirer/prompts')
const { createHuskyHook } = require('./husky/create-husky-hook')

const initHook = async () => {
  const npx = await inquirer.confirm({
    message: 'Do you want to use npx to execute the module locally?',
    default: false
  })

  const extensions = await inquirer.input({
    message: 'What code file extensions should be checked?',
    default: '.js,.jsx,.ts,.tsx'
  })

  const docsExtension = await inquirer.input({
    message: 'What is the extension of the documentation files?',
    default: '.md'
  })

  const docsDir = await inquirer.input({
    message: 'What is the documentation directory?',
    default: 'docs/'
  })

  const options = {
    ['docs-dir']: docsDir,
    ['docs-extension']: docsExtension,
    ['extensions']: extensions,
    ['npx']: npx
  }

  createHuskyHook(options)

  console.log(
    "\n\n" +
    'Husky hook created. Enjoy your docs :)' +
    "\n\n"
  )
}

module.exports = {
  initHook,
}

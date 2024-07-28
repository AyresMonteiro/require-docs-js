const path = require('node:path')
const fs = require('node:fs')

const { huskyHookTemplate } = require('./template')

const createHuskyHook = (options) => {
  const pwd = process.cwd()

  const huskyPath = path.join(pwd, '.husky')

  if (!fs.existsSync(huskyPath)) {
    fs.mkdirSync(huskyPath)
  }

  const hookPath = path.join(huskyPath, 'pre-commit')

  const hookExists = fs.existsSync(hookPath)

  let mode = 'write'

  if (hookExists) {
    options['disable-shebang'] = true
    mode = 'append'
  }

  const hookContent = huskyHookTemplate(options)

  if (mode === 'write') {
    fs.writeFileSync(hookPath, hookContent)
  } else {
    fs.appendFileSync(hookPath, "\n\n" + hookContent)
  }
}

module.exports = {
  createHuskyHook,
}

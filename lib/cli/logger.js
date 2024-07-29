const chalk = require('chalk')

class CLILogger {
  constructor() {
    this.prefix = '[require-docs]'
  }

  log(message) {
    console.log(`${chalk.bgWhite(this.prefix)} ${message}`)
  }

  info(message) {
    console.info(`${chalk.bgGreen(this.prefix)} ${message}`)
  }

  error(message) {
    console.error(`${chalk.bgRed(this.prefix)} ${message}`)
  }
}

module.exports = {
  CLILogger,
}

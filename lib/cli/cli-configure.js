const yargs = require('yargs')

const cliConfigure = (options) => {
  const { verifyCommand, initHookCommand } = options

  const usage = `
require-docs-js [command]

CLI to require docs for all files with the given extensions.
`.trim()

  return yargs
    .usage(usage)
    .command(
      ['verify', '$0'],
      'Default command. Verify that all files have documentation.',
      (yargs) => {
        return yargs
          .option('extensions', {
            alias: 'e',
            type: 'string',
            description:
              'Comma-separated file extensions that docs will be required. Default: .js,.jsx,.ts,.tsx',
            demandOption: false,
          })
          .option('docs-extension', {
            alias: 'd',
            type: 'string',
            description: "Documentation files' extension. Default: .md",
            demandOption: false,
          })
          .option('docs-dir', {
            alias: 'D',
            type: 'string',
            description: 'Documentation directory. Default: docs/',
            demandOption: false,
          }).argv
      },
      verifyCommand
    )
    .command(
      'init-hook',
      'Initialize husky git hook',
      (yargs) => {
        return yargs.argv
      },
      initHookCommand
    )
    .help(true).argv
}

module.exports = { cliConfigure }

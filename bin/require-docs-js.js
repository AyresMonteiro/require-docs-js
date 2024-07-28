#! /usr/bin/env node

const { cliConfigure, verify, initHook } = require('../lib/cli')

cliConfigure({
  verifyCommand: verify,
  initHookCommand: initHook,
})

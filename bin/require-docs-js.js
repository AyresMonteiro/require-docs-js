#! /usr/bin/env node

const { cliConfigure, cliRun } = require('../lib/cli')

const options = cliConfigure()

cliRun(options)

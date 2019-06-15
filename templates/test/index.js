'use strict'
const { describe, it } = require('mocha')
const assert = require('assert')
const pkg = require('../package.json')
const module = require('..')

describe(pkg.name, () => {
  it('...', () => {
    assert(module)
  })
})

'use strict'
const { describe, it, beforeEach } = require('mocha')
const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const pkg = require('../package.json')
const createPackage = require('..')

const TMP_DIR = path.join(__dirname, 'fixtures', 'tmp')

describe(pkg.name, () => {
  beforeEach(() => fs.remove(TMP_DIR))

  it('work...', async function () {
    this.timeout(0)
    await createPackage({
      silent: true,
      noPropmt: true,
      name: 'test',
      directory: TMP_DIR
    })

    assert(true)
  })
})

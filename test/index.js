'use strict'
const { suite, test, beforeEach } = require('mocha')
const path = require('path')
const fs = require('fs-extra')
const pkg = require('../package.json')
const createPackage = require('..')

const TMP_DIR = path.join(__dirname, 'fixtures', 'tmp')

suite(pkg.name, () => {
  beforeEach(() => fs.remove(TMP_DIR))

  test('scaffolds a package', async function () {
    this.timeout(0)
    await createPackage({
      prompt: false,
      silent: true,
      directory: TMP_DIR
    })
  })
})

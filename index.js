'use strict'
const createPackageJson = require('create-package-json')
const createGit = require('create-git')
const cptmpl = require('cptmpl')
const path = require('path')

module.exports = async function createPackage (input = {}) {
  // We need this for the defaults
  const cwd = process.cwd()

  // Removed undefined values from input and default some options
  const options = Object.keys(input).reduce((o, key) => {
    if (typeof input[key] !== 'undefined') {
      o[key] = input[key]
    }
    return o
  }, {
    extended: false
  })

  // Defaults
  let opts = Object.assign({
    directory: cwd,
    silent: false,
    noPrompt: true
  }, options)

  await cptmpl(path.join(__dirname, 'templates', '.npmrc'), path.join(opts.directory, '.npmrc'))

  const pkg = await createPackageJson({
    directory: opts.directory,
    silent: opts.silent,
    extended: opts.extended,
    noPrompt: opts.noPrompt,
    name: opts.name,
    scope: '@wesleytodd',
    version: '0.0.0',
    devDependencies: ['standard', 'mocha'],
    scripts: {
      test: 'standard && mocha',
      postpublish: 'git push origin && git push origin --tags'
    }
  })

  await cptmpl.recursive(path.join(__dirname, 'templates'), opts.directory, Object.assign({}, opts, pkg))

  await createGit({
    directory: opts.directory,
    silent: opts.silent,
    extended: opts.extended,
    noPrompt: opts.noPrompt,
    remoteOrigin: pkg.repository && pkg.repository.url
  })
}

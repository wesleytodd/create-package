'use strict'
const create = require('@pkgjs/create')
const createPackageJson = require('create-package-json')
const createGit = require('create-git')
const cptmpl = require('cptmpl')

const path = require('path')
function tmplPath (...args) {
  return path.join(__dirname, 'templates', ...args)
}

module.exports = create({
  commandDescription: 'Scaffold a package',
  uses: [createPackageJson, createGit],
  options: {
    remoteOrigin: {
      type: 'string',
      flag: {
        key: 'remote-origin',
        alias: 'o'
      },
      prompt: false
    }
  }
}, async function createPackage (initOpts, input) {
  const opts = await initOpts({
    version: '0.0.0',
    devDependencies: ['standard', 'mocha'],
    scriptsTest: 'standard && mocha',
    scriptsPreVersion: 'npm t',
    scriptsPostPublish: 'git push origin && git push origin --tags',
    ignoreTemplates: ['Node.gitignore', 'Global/macOS.gitignore'],
    additionalRules: ['package-lock.json']
  }, {
    // Git options
    initialCommitMessage: '',

    // package.json options
    scripts: {
      debug: 'mocha --inspect --inspect-brk'
    }
  })

  await cptmpl(tmplPath('npmrc'), path.join(opts.directory, '.npmrc'))
  const pkg = await createPackageJson(opts)
  await createGit({
    ...opts,
    initialCommitMessage: '',
    remoteOrigin: pkg.repository && pkg.repository.url
  })

  await cptmpl.recursive(tmplPath(), opts.directory, {
    ...opts,
    ...pkg
  })
})

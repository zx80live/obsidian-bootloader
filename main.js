'use strict';

var obsidian = require('obsidian')

const rootDir = app.vault.adapter.basePath
const libsDir = rootDir + '/_boot'

class BootLoader extends obsidian.Plugin {
  constructor() {
    super(...arguments)

    window.lib = (path) => {
      const f = name.endsWith('.js') ? name : name + '.js'
      return require(path)
    }
    window.libs = {}
    console.log("BootLoader is started..")
  }

  async onload() {
    console.log('ON_LOAD', this)
    const self = this
    self.app.workspace.onLayoutReady(() => {
      return self.loadLibs(libsDir)
    })
  }

  onunload() {
  }

  async loadLibs(dir) {
    const fs = require('fs')
    fs.readdir(dir, (err, files) => {
      if(err) {
        console.log("BootLoader error", err)
      }

      files.forEach(f => {
        const path = dir + '/' + f
        if(fs.lstatSync(path).isDirectory()) {
          console.log('bootloader: skip dir', path)
          return
        }
	    const loaded = lib(path)
        Object.values(loaded).forEach(l => {
          Object.keys(l).forEach(m => {
            if(m == 'onLoad') {
	          l.onLoad(app)
	          return
	        }
	      })
	    })
        window.libs = {...window.libs, ...loaded}
        console.log("BootLoader: load lib", path)
      })
    })
  }
}

module.exports = BootLoader

'use strict';

var obsidian = require('obsidian')

const rootDir = app.vault.adapter.basePath
const libsDir = rootDir + '/_boot'

class BootLoader extends obsidian.Plugin {
  constructor() {
    super(...arguments)

    window.lib = (name) => {
      const f = name.endsWith('.js') ? name : name + '.js'
      return require(libsDir + '/' + f)
    }
    window.libs = {}
    console.log("BootLoader is started..")
  }

  async onload() {
    const self = this
    self.app.workspace.onLayoutReady(() => {
      self.loadLibs()
    })
  }

  onunload() {
  }

  async loadLibs() {
    const fs = require('fs')
    fs.readdir(libsDir, (err, files) => {
      if(err) {
        console.log("BootLoader error", err)
      }

      files.forEach(f => {
        if(fs.lstatSync(libsDir + '/' + f).isDirectory()) {
          console.log('bootloader: skip dir', f)
          return
        }
	    const loaded = lib(f)
        Object.values(loaded).forEach(l => {
          Object.keys(l).forEach(m => {
            if(m == 'onLoad') {
	      l.onLoad(obsidian)
	      return
	    }
	  })
	})
        window.libs = {...window.libs, ...loaded}
        console.log("BootLoader: load lib", f)
      })
    })
  }
}

module.exports = BootLoader

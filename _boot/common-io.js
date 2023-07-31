'use strict'

var fs = require('fs')

class Io {
  transform(f, transformer) {
    fs.readFile(f, 'utf8', function (err, data) {
      if(err) {
        return console.log(err)
      }
      var result = transformer(data)

      fs.writeFile(f, result, 'utf8', function (err) {
        if(err) return console.log(err)
      })
    })
  }

  replaceInFile(f, rules) {
    this.transform(f, function(data) {
      var result = data
      rules.forEach(function(value, key) {
        var reg = new RegExp("\\$\\{" + key + "\\}", 'g')
        result = result.replaceAll(reg, value)
      })
      return result
    })
  }

  insertAfterLine(f, line, text) {
    const self = this
    self.transform(f, function(data) {
      return self.__insertLine(data, line, line, text)
    })
  }

  insertBeforeLine(f, line, text) {
    const self = this
    self.transform(f, function(data) {
      return self.__insertLine(data, line - 1, line - 1, text)
    })
  }

  replaceLine(f, line, text) {
    const self = this
    self.transform(f, function(data) {
      return self.__insertLine(data, line - 1, line, text)
    })
  }

  append(f, text) {
    this.transform(f, function(data) {
      return data + text
    })
  }


  __insertLine(data, start, end, text) {
    var lines = data.split(/\n/gi)
    var head = lines.slice(0, start)
    var tail = lines.slice(end)

    return head.join('\n') + '\n' + text + '\n' + tail.join('\n')
  }
}

const io = new Io()

module.exports = {io}

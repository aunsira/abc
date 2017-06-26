class FormatText {
  static extractIndexTable (script) {
    return script.match('((.*));')[1]
      .split(',')
  }

  static matchesNasdaqIndex (txt) {
    return this.removeDoubleQuote(txt[0].match(/"(.*?)"/)[0])
  }

  static matchesNasdaqValue (txt) {
    return this.removeDoubleQuote(txt[1])
  }

  static removeDoubleQuote (txt) {
    return txt.replace(/"/g, '')
  }
}

module.exports = FormatText

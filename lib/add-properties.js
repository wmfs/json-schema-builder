
const typeHints = require('./type-hints')

module.exports = function addProperties (root, hints) {
  const required = []
  if (hints) {
    root.properties = {}
    hints.forEach(
      (hint) => {
        if (hint.hasOwnProperty('required') && hint.required) {
          required.push(hint.key)
        }
        if (typeHints.hasOwnProperty(hint.typeHint)) {
          root.properties[hint.key] = typeHints[hint.typeHint](hint)
          if (hint.typeHint === 'object') {
            let target = root.properties[hint.key]
            if (target.hasOwnProperty('items')) {
              target = target.items
            }
            addProperties(target, hint.propertyHints)
          }
        } else {
          console.error(`Unknown type hint ${hint.typeHint}`)
        }
      }
    )
    if (required.length > 0) {
      root.required = required
    }
  }
}

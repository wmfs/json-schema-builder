
const typeHints = require('./type-hints')

module.exports = function addProperties (root, hints) {
  if (!hints) {
    return
  }

  root.properties = {}
  for (const hint of hints) {
    const typeHint = typeHints[hint.typeHint]
    if (typeHint) {
      root.properties[hint.key] = typeHint(hint)
      if (hint.typeHint === 'object') {
        let target = root.properties[hint.key]
        if (target.items) {
          target = target.items
        }
        addProperties(target, hint.propertyHints)
      }
    } else {
      console.error(`Unknown type hint ${hint.typeHint}`)
    }
  }

  const required = hints.filter(h => h.required).map(h => h.key)
  if (required.length > 0) {
    root.required = required
  }
  const primary = hints.filter(h => h.primary).map(h => h.key)
  if (primary.length > 0) {
    root.primaryKey = primary
  }
}

const applyMetaAttributes = require('./apply-meta-attributes')

module.exports = function makeBaseObject (hint, actualType) {
  let base = {}
  applyMetaAttributes(base, hint)
  let target

  if (hint.multiple) {
    base.type = 'array'
    if (hint.hasOwnProperty('uniqueItems')) {
      base.uniqueItems = hint.uniqueItems
    }
    if (hint.hasOwnProperty('minItems')) {
      base.minItems = hint.minItems
    }
    if (hint.hasOwnProperty('maxItems')) {
      base.maxItems = hint.maxItems
    }

    base.items = {}
    target = base.items
  } else {
    target = base
  }

  target.type = actualType

  return {
    propertyValue: base,
    target: target
  }
}

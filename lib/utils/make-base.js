const applyMetaAttributes = require('./apply-meta-attributes')

module.exports = function makeBaseObject (hint, typeDefaults) {
  let base = {
    typeHint: hint.typeHint
  }
  applyMetaAttributes(base, hint, typeDefaults)

  let target
  if (hint.choiceSet) {
    base.items = {}
    base.items.type = typeof Object.values(hint.choiceSet)[0]
    base.items.enum = hint.choiceSet
  }
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

    base.items = typeDefaults
    target = base.items
  } else {
    target = base
  }

  return {
    propertyValue: base,
    target: target
  }
}

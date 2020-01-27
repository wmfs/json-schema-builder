const applyMetaAttributes = require('./apply-meta-attributes')

module.exports = function makeBaseObject (hint, typeDefaults) {
  const base = {
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
    // if (hint.key === 'humanFactors') console.log('MULTIPLE')
    base.type = 'array'
    if (Object.prototype.hasOwnProperty.call(hint, 'uniqueItems')) {
      base.uniqueItems = hint.uniqueItems
    }
    if (Object.prototype.hasOwnProperty.call(hint, 'minItems')) {
      base.minItems = hint.minItems
    }
    if (Object.prototype.hasOwnProperty.call(hint, 'maxItems')) {
      base.maxItems = hint.maxItems
    }
    if (hint.choiceSet) {
      base.items.type = typeof Object.values(hint.choiceSet)[0]
      base.items.enum = hint.choiceSet
    } else {
      base.items = typeDefaults
    }
    target = base.items
  } else {
    target = base
  }

  return {
    propertyValue: base,
    target: target
  }
}

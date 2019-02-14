const dataTypes = require('@wmfs/tymly-data-types')
const makeBase = require('./utils/make-base')
const categoryProcessors = require('./category-processors')

function addProperties (root, hints) {
  if (!hints) {
    return
  }
  root.properties = {}
  for (const hint of hints) {
    addProperty(root, hint)
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

function addProperty (root, hint) {
  const dataType = dataTypes.getDataTypeByName(hint.typeHint)
  let base

  if (hint.typeHint === 'object') {
    base = makeBase(hint, {
      type: 'object'
    })
    root.properties[hint.key] = base.propertyValue
    let target = root.properties[hint.key]
    if (target.items) {
      target = target.items
    }
    addProperties(target, hint.propertyHints)
  } else if (dataType) {
    base = makeBase(hint, JSON.parse(JSON.stringify(dataType.jsonSchema)))
    if (categoryProcessors.hasOwnProperty(dataType.category)) {
      categoryProcessors[dataType.category](base.target, hint)
    }
  } else {
    console.error(`Unknown type hint ${hint.typeHint}`)
  }

  root.properties[hint.key] = base && base.propertyValue
} // addProperty

module.exports = addProperties

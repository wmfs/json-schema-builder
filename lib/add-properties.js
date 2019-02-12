const dataTypes = require('@wmfs/tymly-data-types')
const makeBase = require('./utils/make-base')
const categoryProcessors = require('./category-processors')
module.exports = function addProperties (root, hints) {
  if (!hints) {
    return
  }

  root.properties = {}
  for (const hint of hints) {
    const dataType = dataTypes.getDataTypeByName(hint.typeHint)
    if (dataType || hint.typeHint === 'object') {
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
      } else {
        base = makeBase(hint, JSON.parse(JSON.stringify(dataType.jsonSchema)))
        if (categoryProcessors.hasOwnProperty(dataType.category)) {
          console.log('?', dataType.category)
          categoryProcessors[dataType.category](base.target, hint)
        }
      }
      console.log('1111', hint)
      console.log('2222', base.propertyValue)
      root.properties[hint.key] = base.propertyValue
    } else {
      console.error(`Unknown type hint ${hint.typeHint}`)
    }

    const required = hints.filter(h => h.required).map(h => h.key)
    if (required.length > 0) {
      root.required = required
    }
    const primary = hints.filter(h => h.primary).map(h => h.key)
    if (primary.length > 0) {
      root.primaryKey = primary
    }

    console.log('----------------------------------------')

    //   const typeHint = typeHints[hint.typeHint]
    //   if (typeHint) {
    //     root.properties[hint.key] = typeHint(hint)
    //     if (hint.typeHint === 'object') {
    //       let target = root.properties[hint.key]
    //       if (target.items) {
    //         target = target.items
    //       }
    //       addProperties(target, hint.propertyHints)
    //     }
    //   } else {
    //     console.error(`Unknown type hint ${hint.typeHint}`)
    //   }
  }
}

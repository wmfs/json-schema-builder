const dataTypes = require('@wmfs/tymly-data-types')
const makeBase = require('./utils/make-base')
const categoryProcessors = require('./category-processors')
const dottie = require('dottie')

function addProperties (root, hints, section, page, pageFx, pageValidations, pageGoto) {
  if (!hints) {
    return
  }
  if (!root.properties) {
    root.properties = {}
  }
  if (section) {
    if (!root.properties[section]) {
      root.properties[section] = {}
      root.properties[section].title = section
      root.properties[section].typeHint = 'section'
      root.properties[section].properties = {}
    }
    if (!root.properties[section].properties[page]) {
      root.properties[section].properties[page] = {}
      root.properties[section].properties[page].title = page
      root.properties[section].properties[page].typeHint = 'page'
      root.properties[section].properties[page].properties = {}
      root.properties[section].properties[page].validations = pageValidations
    }
    if (pageGoto) root.properties[section].properties[page].showWhen = pageGoto
    for (const hint of hints) {
      if (pageFx) addProperty(root, hint, section, page, pageFx)
      else addProperty(root, hint, section, page)
    }
  } else if (page) {
    if (!root.properties[page]) {
      root.properties[page] = {}
      root.properties[page].title = page
      root.properties[page].typeHint = 'page'
      root.properties[page].properties = {}
      root.properties[page].validation = pageValidations
    }
    if (pageGoto) root.properties[page].showWhen = pageGoto
    for (const hint of hints) {
      if (pageFx) addProperty(root, hint, undefined, page, pageFx)
      else addProperty(root, hint, undefined, page)
    }
  } else {
    for (const hint of hints) {
      addProperty(root, hint)
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

function addProperty (root, hint, section, page, pageFx) {
  const dataType = dataTypes.getDataTypeByName(hint.typeHint)
  let base
  // console.log(hint)
  let propPath
  if (section) {
    propPath = root.properties[section].properties[page].properties
  } else if (page) {
    propPath = root.properties[page].properties
  } else {
    propPath = root.properties
  }
  if (hint.typeHint === 'object') {
    base = makeBase(hint, {
      type: 'object'
    })
    propPath[hint.key] = base.propertyValue
    let target = propPath[hint.key]
    if (target.items) {
      target = target.items
    }
    addProperties(target, hint.propertyHints, section, page)
  } else if (dataType) {
    base = makeBase(hint, JSON.parse(JSON.stringify(dataType.jsonSchema)))
    if (Object.prototype.hasOwnProperty.call(categoryProcessors, dataType.category)) {
      categoryProcessors[dataType.category](base.target, hint)
    }
    if (hint.tooltip) {
      base.propertyValue.tooltip = hint.tooltip
      base.target.tooltip = hint.tooltip
    }
  } else if (hint.typeHint === 'info') {
    base = {
      propertyValue: {
        typeHint: hint.typeHint,
        text: hint.text
      },
      target: {
        typeHint: hint.typeHint,
        text: hint.text
      }
    }
  } else if (hint.typeHint === 'cardlist') {
    const propertiesName = Object.keys(hint.properties)
    base = {
      propertyValue: {
        key: hint.key,
        typeHint: 'object',
        title: hint.title,
        subtitle: hint.subtitle,
        properties: jsonSchemaBuilder(hint.properties[propertiesName]).properties
      },
      target: {
        key: hint.key,
        typeHint: 'object',
        title: hint.title,
        subtitle: hint.subtitle,
        properties: jsonSchemaBuilder(hint.properties[propertiesName]).properties
      }
    }
  } else {
    console.log(hint)
    console.error(`Unknown type hint ${hint.typeHint}`)
  }
  // if (showWhen && showWhen.condition !== 'true') {
  //   base.propertyValue.showWhen = showWhen.condition
  //   base.target.showWhen = showWhen.condition
  // }
  if (pageFx) {
    pageFx.showWhens.forEach(showWhen => {
      if (showWhen.target === hint.key) {
        base.propertyValue.showWhen = showWhen.condition
        base.target.showWhen = showWhen.condition
      }
    })
    pageFx.autoSetters.forEach(autoSetter => {
      if (autoSetter.target === hint.key) {
        base.propertyValue.autoSetter = autoSetter.condition
        base.propertyValue.autoValue = autoSetter.value
        base.target.autoSetter = autoSetter.condition
        base.target.autoValue = autoSetter.value
      }
    })
  }
  // if (hint.key === 'humanFactors') console.log(base)
  propPath[hint.key] = base && base.propertyValue
} // addProperty

function jsonSchemaBuilder (options) {
  // console.log(options)
  const schema = {}
  if (options.pages) {
    Object.keys(options.pages).forEach(page => {
      const pageHints = dottie.get(options, `pages.${page}.propertyHints`)
      const pageFx = dottie.get(options, `pages.${page}.fx`)
      const pageValidations = dottie.get(options, `pages.${page}.validations`)
      const pageGoto = dottie.get(options, `pages.${page}.goto`)
      addProperties(schema, pageHints, undefined, page, pageFx, pageValidations, pageGoto)
    })
  } else {
    addProperties(schema, options.propertyHints)
  }
  return schema
}

module.exports = addProperties

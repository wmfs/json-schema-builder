const dataTypes = require('@wmfs/tymly-data-types')
const applyMetaAttributes = require('./utils/apply-meta-attributes')
const addProperties = require('./add-properties')
const dottie = require('dottie')

function jsonSchemaBuilder (options) {
  const schema = {
    $schema: 'http://json-schema.org/draft-06/schema#'
  }
  applyMetaAttributes(schema, options, {})
  schema.type = 'object'
  if (options.sections) {
    Object.keys(options.sections).forEach(section => {
      const sectionTitle = dottie.get(options, `sections.${section}.title`)
      const sectionDescription = dottie.get(options, `sections.${section}.description`)
      let sectionHeader
      if (sectionTitle === sectionDescription) {
        sectionHeader = sectionTitle
      } else {
        sectionHeader = sectionTitle + ' - ' + sectionDescription
      }
      const sectionPages = dottie.get(options, `sections.${section}.pages`)
      Object.keys(sectionPages).forEach(page => {
        const pageHints = dottie.get(options, `sections.${section}.pages.${page}.propertyHints`)
        const pageFx = dottie.get(options, `sections.${section}.pages.${page}.fx`)
        const pageValidations = dottie.get(options, `sections.${section}.pages.${page}.validations`)
        addProperties(schema, pageHints, sectionHeader, page, pageFx, pageValidations)
      })
    })
  } else {
    addProperties(schema, options.propertyHints)
  }
  return schema
}

module.exports = {
  dslToJsonSchema: jsonSchemaBuilder,
  dataTypes: dataTypes
}

const dataTypes = require('@wmfs/tymly-data-types')
const applyMetaAttributes = require('./utils/apply-meta-attributes')
const addProperties = require('./add-properties')

function jsonSchemaBuilder (options) {
  const schema = {
    $schema: 'http://json-schema.org/draft-06/schema#'
  }
  applyMetaAttributes(schema, options, {})
  schema.type = 'object'

  addProperties(schema, options.propertyHints)

  return schema
}

module.exports = {
  dslToJsonSchema: jsonSchemaBuilder,
  dataTypes: dataTypes
}

const addProperties = require('./add-properties')
const applyMetaAttributes = require('./utils/apply-meta-attributes')
module.exports = function jsonSchemaBuilder (options) {
  const schema = {
    $schema: 'http://json-schema.org/draft-06/schema#'
  }

  applyMetaAttributes(schema, options)

  schema.type = 'object'

  addProperties(schema, options.propertyHints)

  return schema
}

const _ = require('lodash')

const makeBase = require('../utils/make-base')
module.exports = function booleanProcessor (hint) {
  // TODO: Validate all this
  // Infer type from first 'values' element
  const firstElement = hint.values[0]
  let type
  if (_.isInteger(firstElement)) {
    type = 'integer'
  } else {
    type = 'string'
  }
  const { propertyValue, target } = makeBase(hint, type)
  target.enum = hint.values
  if (hint.hasOwnProperty('minItems')) {
    target.minItems = hint.minItems
  }
  if (hint.hasOwnProperty('maxItems')) {
    target.maxItems = hint.maxItems
  }

  return propertyValue
}

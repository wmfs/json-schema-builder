const makeBase = require('../utils/make-base')
module.exports = function booleanProcessor (hint) {
  const { propertyValue } = makeBase(hint, 'boolean')
  return propertyValue
}

const makeBase = require('../utils/make-base')
const applyNumericAttributes = require('../utils/apply-numeric-attributes')
module.exports = function integerProcessor (hint) {
  const { propertyValue, target } = makeBase(hint, 'integer')
  applyNumericAttributes(target, hint)
  return propertyValue
}

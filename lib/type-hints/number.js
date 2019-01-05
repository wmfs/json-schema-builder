const makeBase = require('../utils/make-base')
const applyNumericAttributes = require('../utils/apply-numeric-attributes')
module.exports = function numberProcessor (hint) {
  const { propertyValue, target } = makeBase(hint, 'number')
  applyNumericAttributes(target, hint)
  return propertyValue
}

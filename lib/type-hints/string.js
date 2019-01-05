const makeBase = require('../utils/make-base')
const applyStringAttributes = require('../utils/apply-string-attributes')
module.exports = function stringProcessor (hint) {
  const { propertyValue, target } = makeBase(hint, 'string')
  applyStringAttributes(target, hint)
  return propertyValue
}

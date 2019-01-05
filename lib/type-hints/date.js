const makeBase = require('../utils/make-base')
const applyStringAttributes = require('../utils/apply-string-attributes')
module.exports = function dateProcessor (hint) {
  const { propertyValue, target } = makeBase(hint, 'string')
  applyStringAttributes(target, hint)
  target.format = 'date-time'
  return propertyValue
}

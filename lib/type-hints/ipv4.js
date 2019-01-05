const makeBase = require('../utils/make-base')
const applyStringAttributes = require('../utils/apply-string-attributes')
module.exports = function ipv4Processor (hint) {
  const { propertyValue, target } = makeBase(hint, 'string')
  applyStringAttributes(target, hint)
  target.format = 'ipv4'
  return propertyValue
}

const makeBase = require('../utils/make-base')
module.exports = function objectProcessor (hint) {
  const { propertyValue } = makeBase(hint, 'object')
  return propertyValue
}

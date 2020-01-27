const applyChoiceSetAsEnum = require('../utils/apply-choice-set-as-enum')
const STRING_ATTRIBUTE_KEYS = [
  'minLength',
  'maxLength',
  'pattern'
]

module.exports = function textCategoryProcessor (target, hint) {
  STRING_ATTRIBUTE_KEYS.forEach(
    (key) => {
      if (Object.prototype.hasOwnProperty.call(hint, key)) {
        target[key] = hint[key]
      }
    }
  )
  applyChoiceSetAsEnum(target, hint)
}

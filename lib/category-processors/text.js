const applyChoiceSetAsEnum = require('../utils/apply-choice-set-as-enum')
const STRING_ATTRIBUTE_KEYS = [
  'minLength',
  'maxLength',
  'pattern'
]

module.exports = function textCategoryProcessor (target, hint) {
  STRING_ATTRIBUTE_KEYS.forEach(
    (key) => {
      if (hint.hasOwnProperty(key)) {
        target[key] = hint[key]
      }
    }
  )
  applyChoiceSetAsEnum(target, hint)
}

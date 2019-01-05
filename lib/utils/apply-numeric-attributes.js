const NUMERIC_ATTRIBUTE_KEYS = [
  'minimum',
  'exclusiveMinimum',
  'maximum',
  'exclusiveMaximum',
  'multipleOf'
]

module.exports = function applyNumericAttributes (target, hint) {
  NUMERIC_ATTRIBUTE_KEYS.forEach(
    (key) => {
      if (hint.hasOwnProperty(key)) {
        target[key] = hint[key]
      }
    }
  )
}

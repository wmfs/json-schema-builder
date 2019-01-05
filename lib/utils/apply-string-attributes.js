const STRING_ATTRIBUTE_KEYS = [
  'minLength',
  'maxLength',
  'pattern'
]

module.exports = function applyStringAttributes (target, hint) {
  STRING_ATTRIBUTE_KEYS.forEach(
    (key) => {
      if (hint.hasOwnProperty(key)) {
        target[key] = hint[key]
      }
    }
  )
}

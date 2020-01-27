const META_ATTRIBUTE_KEYS = [
  'title',
  'description',
  'default',
  'examples'
]

module.exports = function applyMetaAttributes (target, hint, dataItemDefaults) {
  Object.entries(dataItemDefaults).forEach(([key, value]) => {
    target[key] = value
  })
  META_ATTRIBUTE_KEYS.forEach(
    (key) => {
      if (Object.prototype.hasOwnProperty.call(hint, key)) {
        target[key] = hint[key]
      }
    }
  )
  if (Object.prototype.hasOwnProperty.call(hint, 'example') && !Object.prototype.hasOwnProperty.call(hint, 'examples')) {
    target.examples = [hint.example]
  }
}

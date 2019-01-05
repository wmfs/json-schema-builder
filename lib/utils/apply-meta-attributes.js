const META_ATTRIBUTE_KEYS = [
  'title',
  'description',
  'default',
  'examples'
]

module.exports = function applyMetaAttributes (target, hint) {
  META_ATTRIBUTE_KEYS.forEach(
    (key) => {
      if (hint.hasOwnProperty(key)) {
        target[key] = hint[key]
      }
    }
  )
  if (hint.hasOwnProperty('example') && !hint.hasOwnProperty('examples')) {
    target['examples'] = [ hint.example ]
  }
}

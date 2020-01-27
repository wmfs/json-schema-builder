module.exports = function applyChoiceSetAsEnum (target, hint) {
  if (Object.prototype.hasOwnProperty.call(hint, 'choiceSet')) {
    target.enum = Object.keys(hint.choiceSet)
  }
}

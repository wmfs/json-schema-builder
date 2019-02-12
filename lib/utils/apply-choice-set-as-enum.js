module.exports = function applyChoiceSetAsEnum (target, hint) {
  if (hint.hasOwnProperty('choiceSet')) {
    target.enum = Object.keys(hint.choiceSet)
  }
}

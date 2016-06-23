var repeatString = require('repeat-string')
var getIndent = require('./getIndent')

function formatComments (root, params) {
  var indentWidth = params.indentWidth

  var getRuleBefore = function (prev) {
    if (prev && prev.ruleWithoutBody) return ';'
    else return ''
  }

  var getCommentBefore = function (prev, commentBefore) {
    var ruleBefore = getRuleBefore(prev)
    if (ruleBefore == ";" && !commentBefore) {
      commentBefore = ' '
    }

    return ruleBefore + commentBefore;
  }

  root.walkComments(function (comment, index) {
    var prev = comment.prev()
    var parentType = comment.parent.type
    var indentation = getIndent(comment, indentWidth)
    var nlCount = comment.raws.before.split('\n').length - 1
    var spaceCount = comment.raws.before.split(' ').length - 1
    var commentBefore = ''
    if (parentType !== 'root') {
      if (nlCount) {
        commentBefore = repeatString('\n', nlCount) + indentation
      }
    } else {
      if (nlCount) {
        commentBefore = repeatString('\n', nlCount) + indentation
      } else if (spaceCount){
        commentBefore = repeatString(' ', spaceCount)
      }
    }

    comment.raws.before = getCommentBefore(prev, commentBefore);
  })

  return root
}


module.exports = formatComments

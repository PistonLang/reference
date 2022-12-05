import { GrammarPoints, many, option, special, toDefs, union } from '../grammar'
import { base, types } from './refs'

const _defs: Record<keyof typeof base, GrammarPoints> = {
    character: special("any unicode character"),
    commentCharacter: special("any Unicode character except new line (U+000A)"),
    charCharacter: special("any Unicode character except \\ (U+005C), new line (U+000A) and ' (U+0027)"),
    stringCharacter: special("any Unicode character except \\ (U+005C) and \" (U+201D)"),
    letter: special("any character in the Unicode category Ll, Lm, Lt, Lu or Lo"),
    digit: special("any character in the Unicode category Nd"),
    newline: special("the new line character (U+000A)"),
    commaOrNL: union(',', base.newline),
    lineComment: ['//', many(base.commentCharacter)],
    multiComment: ['/*', many(union(base.character, base.multiComment)), '*/'],
    comment: union(base.lineComment, base.multiComment),
    identifierHead: union(base.letter, '_'),
    identifierTail: union(base.letter, '_', base.digit, '\''),
    identifier: [base.identifierHead, many(base.identifierTail)],
    PathSegment: [base.identifier, option(types.TypeArgs)]
}

const defs = toDefs(base, _defs)

export default defs
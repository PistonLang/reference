import { GrammarPoints, many, option, special, toDefs, union } from '../grammar'
import { base, types } from './refs'

const _defs: Record<keyof typeof base, GrammarPoints> = {
    character: special("Any unicode character"),
    charCharacter: special("Any unicode character except \\ (U+005C) and new line (U+000A)"),
    stringCharacter: special("Any unicode character except \\ (U+005C) and \" (U+201D)"),
    letter: special("Character in the unicode category Ll, Lm, Lt, Lu or Lo"),
    digit: special("Character in the hnicode category Nd"),
    newline: special("A new line character (U+000A)"),
    commaOrNL: union(',', base.newline),
    identifierHead: union(base.letter, '_'),
    identifierTail: union(base.letter, '_', base.digit, '\''),
    identifier: [base.identifierHead, many(base.identifierTail)],
    PathSegment: [base.identifier, option(types.TypeArgs)]
}

export const defs = toDefs(base, _defs)
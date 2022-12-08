import { GrammarPoints, many, option, toDefs, union } from "../grammar"
import { tokens, types } from "./refs"

const _defs: Record<keyof typeof types, GrammarPoints> = {
    TypePath: union(types.PathSegment, [types.TypePath, tokens.dot, types.PathSegment]),
    TypeUnion: [types.Type, many(tokens.plus, types.Type)],
    TypeBound: [tokens.identifier, tokens.subtype, types.TypeUnion],
    TypeParams: [tokens.lBracket, many(tokens.identifier, option(tokens.commaOrNL)), option(tokens.identifier), tokens.rBracket],
    TypeArg: [option(union(tokens.subtype, tokens.supertype)), types.Type],
    TypeArgs: [tokens.lBracket, many(types.TypeArg, option(tokens.commaOrNL)), option(types.TypeArg), tokens.rBracket],
    WhereClause: [tokens.whereKw, many(types.TypeBound, tokens.comma), types.TypeBound],
    NestedType: [tokens.lParen, types.Type, tokens.rParen],
    NullableTypes: [types.Type, tokens.qMark],
    Type: union(types.TypePath, types.NestedType, types.NullableTypes),
    PathSegment: [types.Identifier, option(types.TypeArgs)],
    Identifier: union(tokens.identifier, tokens.getKw, tokens.setKw, tokens.whereKw),
}

const defs = toDefs(types, _defs)

export default defs
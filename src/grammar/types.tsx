import { GrammarPoints, many, option, toDefs, union } from "../grammar"
import { tokens, types } from "./refs"

const _defs: Record<keyof typeof types, GrammarPoints> = {
    TypePath: union(types.PathSegment, [types.TypePath, tokens.dot, types.PathSegment]),
    TypeUnion: [types.TypeInstance, many(tokens.plus, types.TypeInstance)],
    TypeBound: [types.Identifier, tokens.subtype, types.TypeUnion],
    TypeParams: [tokens.lBracket, many(types.Identifier, option(tokens.commaOrNL)), option(types.Identifier), tokens.rBracket],
    TypeArg: [option(union(tokens.subtype, tokens.supertype)), types.TypeInstance],
    TypeArgs: [tokens.lBracket, many(types.TypeArg, option(tokens.commaOrNL)), option(types.TypeArg), tokens.rBracket],
    WhereClause: [tokens.whereKw, many(types.TypeBound, tokens.comma), types.TypeBound],
    NestedType: [tokens.lParen, types.TypeInstance, tokens.rParen],
    NullableType: [types.TypeInstance, tokens.qMark],
    TypeInstance: union(types.TypePath, types.NestedType, types.NullableType),
    PathSegment: [types.Identifier, option(types.TypeArgs)],
    Identifier: union(tokens.identifier, tokens.getKw, tokens.setKw, tokens.whereKw),
}

const defs = toDefs(types, _defs)

export default defs
import { GrammarPoints, many, option, toDefs, union } from "../grammar"
import { base, types } from "./refs"

const _defs: Record<keyof typeof types, GrammarPoints> = {
    TypePath: union(base.PathSegment, [types.TypePath, '.', base.PathSegment]),
    TypeUnion: [types.Type, many('+', types.Type)],
    TypeBound: [base.identifier, '<:', types.TypeUnion],
    TypeParams: ['[', many(base.identifier, option(base.commaOrNL)), option(base.identifier), ']'],
    TypeArgs: ['[', many(types.Type, option(base.commaOrNL)), option(types.Type), ']'],
    WhereClause: ['where', many(types.TypeBound, ','), types.TypeBound],
    NestedType: ['(', types.Type, ')'],
    NullableTypes: [types.Type, '?'],
    Type: union(types.TypePath, types.NestedType, types.NullableTypes) 
}

export const defs = toDefs(types, _defs)
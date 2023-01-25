import { GrammarPoints, many, option, toDefs, union } from '../grammar'
import { tokens, types, scopes, funcs } from './refs'

const _defs: Record<keyof typeof types, GrammarPoints> = {
	TypePath: [option(types.TypePath, tokens.dot), types.PathSegment],
	TypeBound: [funcs.Identifier, tokens.subtype, types.IntersectionType],
	TypeParams: [
		tokens.lBracket,
		many(funcs.Identifier, option(tokens.commaOrNL)),
		option(funcs.Identifier),
		tokens.rBracket,
	],
	TypeArg: [option(union(tokens.subtype, tokens.supertype)), types.TypeInstance],
	TypeArgs: [tokens.lBracket, many(types.TypeArg, option(tokens.commaOrNL)), option(types.TypeArg), tokens.rBracket],
	WhereClause: [tokens.whereKw, many(types.TypeBound, tokens.comma), types.TypeBound],
	NestedType: [tokens.lParen, types.TypeInstance, tokens.rParen],
	NullableType: [types.TypeInstance, tokens.qMark],
	TypeInstance: union(types.TypePath, types.NestedType, types.NullableType),
	IntersectionType: [types.TypeInstance, many(tokens.and, types.IntersectionType)],
	PathSegment: [funcs.Identifier, option(types.TypeArgs)],
	SuperTypes: [tokens.subtype, types.IntersectionType],
	ClassDef: [
		tokens.classKw,
		funcs.Identifier,
		option(types.TypeParams),
		option(funcs.FunctionParams),
		option(types.SuperTypes),
		option(types.WhereClause),
		option(scopes.StatementBlock),
	],
	TraitDef: [
		tokens.traitKw,
		funcs.Identifier,
		option(types.TypeParams),
		option(types.SuperTypes),
		option(types.WhereClause),
		option(scopes.StatementBlock),
	],
}

const defs = toDefs(types, _defs)

export default defs

import { GrammarPoints, many, option, toDefs, union } from '../grammar'
import { tokens, types, scopes, funcs } from './refs'

const _defs: Record<keyof typeof types, GrammarPoints> = {
	TypePath: [types.PathSegment, many(tokens.dot, types.PathSegment)],
	TypeBound: [tokens.identifier, tokens.subtype, types.IntersectionType],
	TypeParams: [
		tokens.lBracket,
		many(tokens.identifier, option(tokens.commaOrNL)),
		option(tokens.identifier),
		option(types.TypeGuard),
		tokens.rBracket,
	],
	TypeArg: [option(union(tokens.subtype, tokens.supertype)), types.TypeInstance],
	TypeArgs: [tokens.lBracket, many(types.TypeArg, option(tokens.commaOrNL)), option(types.TypeArg), tokens.rBracket],
	TypeGuard: [tokens.whereKw, many(types.TypeBound, tokens.commaOrNL), option(types.TypeBound)],
	NestedType: [tokens.lParen, types.TypeInstance, tokens.rParen],
	NullableType: [types.TypeInstance, tokens.qMark],
	TypeInstance: union(types.TypePath, types.NestedType, types.NullableType),
	IntersectionType: [types.TypeInstance, many(tokens.and, types.TypeInstance)],
	PathSegment: [tokens.identifier, option(types.TypeArgs)],
	SuperTypes: [tokens.subtype, types.IntersectionType],
	ClassDef: [
		tokens.classKw,
		tokens.identifier,
		option(types.TypeParams),
		option(funcs.FunctionParams),
		option(types.SuperTypes),
		option(scopes.StatementBlock),
	],
	TraitDef: [
		tokens.traitKw,
		tokens.identifier,
		option(types.TypeParams),
		option(types.SuperTypes),
		option(scopes.StatementBlock),
	],
}

const defs = toDefs(types, _defs)

export default defs

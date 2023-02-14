import { GrammarPoints, many, option, toDefs, union } from '../grammar'
import { exprs, funcs, tokens, types } from './refs'

const _defs: Record<keyof typeof funcs, GrammarPoints> = {
	FunctionParam: [tokens.identifier, tokens.colon, types.TypeInstance],
	FunctionParams: [
		tokens.lParen,
		many(funcs.FunctionParam, tokens.commaOrNL),
		option(funcs.FunctionParam),
		tokens.rParen,
	],
	FunctionDef: [
		tokens.defKw,
		tokens.identifier,
		option(types.TypeParams),
		option(funcs.FunctionParams),
		option(tokens.arrow, types.TypeInstance),
		option(tokens.eq, exprs.Expression),
	],
	PropertyDef: [
		union(tokens.valKw, tokens.varKw),
		tokens.identifier,
		tokens.colon,
		types.TypeInstance,
		option(tokens.eq, exprs.Expression),
	],
}

const defs = toDefs(funcs, _defs)

export default defs

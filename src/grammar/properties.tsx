import { GrammarPoints, option, toDefs, union } from '../grammar'
import { exprs, funcs, props, tokens, types } from './refs'

const _defs: Record<keyof typeof props, GrammarPoints> = {
	PropertyDef: [
		union(tokens.valKw, tokens.varKw),
		funcs.Identifier,
		tokens.colon,
		types.TypeInstance,
		option(tokens.eq, exprs.Expression),
	],
	GetterDef: [tokens.getKw, funcs.FunctionLikeDef],
	SetterDef: [tokens.setKw, funcs.FunctionLikeDef],
}

const defs = toDefs(props, _defs)

export default defs

import { GrammarPoints, many, option, toDefs, union } from '../grammar'
import { scopes, tokens, types, funcs } from './refs'

const _defs: Record<keyof typeof scopes, GrammarPoints> = {
	Statement: union(types.ClassDef, types.TraitDef, funcs.FunctionDef, funcs.PropertyDef),
	StatementBody: [many(scopes.Statement, tokens.commaOrNL), option(scopes.Statement)],
	StatementBlock: [tokens.lBrace, scopes.StatementBody, tokens.rBrace],
}

const defs = toDefs(scopes, _defs)

export default defs

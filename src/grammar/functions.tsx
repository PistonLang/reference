import { GrammarPoints, many, option, toDefs, union } from "../grammar"
import { exprs, funcs, tokens, types } from "./refs"

const _defs: Record<keyof typeof funcs, GrammarPoints> = {
    Identifier: union(tokens.identifier, tokens.getKw, tokens.setKw, tokens.whereKw),
    FunctionParam: [funcs.Identifier, tokens.colon, types.TypeInstance],
    FunctionParams: [tokens.lParen, many(funcs.FunctionParam, tokens.commaOrNL), option(funcs.FunctionParam), tokens.rParen],
    FunctionLikeDef: [funcs.Identifier, option(types.TypeParams), funcs.FunctionParams, option(tokens.arrow, types.TypeInstance), option(types.WhereClause), option(tokens.eq, exprs.Expression)],
    FunctionDef: [tokens.defKw, funcs.FunctionLikeDef],
}

const defs = toDefs(funcs, _defs)

export default defs
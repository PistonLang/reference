import { GrammarPoints, many, option, toDefs, union } from "../grammar"
import { exprs, stmts, tokens, types } from "./refs"

const _defs: Record<keyof typeof stmts, GrammarPoints> = {
    FunctionParam: [types.Identifier, tokens.colon, types.TypeInstance],
    FunctionParams: [tokens.lParen, many(stmts.FunctionParam, tokens.commaOrNL), option(stmts.FunctionParam), tokens.rParen],
    PropertyDef: [union(tokens.valKw, tokens.varKw), types.Identifier, tokens.colon, types.TypeInstance, option(tokens.eq, exprs.Expression)],
    Statement: union(stmts.ClassDef, stmts.TraitDef, stmts.PropertyDef, stmts.GetterDef, stmts.SetterDef),
    FunctionLikeDef: [types.Identifier, option(types.TypeParams), stmts.FunctionParams, option(tokens.arrow, types.TypeInstance), option(types.WhereClause), option(tokens.eq, exprs.Expression)],
    FunctionDef: [tokens.defKw, stmts.FunctionLikeDef],
    GetterDef: [tokens.getKw, stmts.FunctionLikeDef],
    SetterDef: [tokens.setKw, stmts.FunctionLikeDef],
    StatementBody: [many(stmts.Statement, tokens.commaOrNL), option(stmts.Statement)],
    StatementBlock: [tokens.lBrace, stmts.StatementBody, tokens.rBrace],
    SuperTypes: [tokens.subtype, types.TypeInstance, many(tokens.comma, types.TypeInstance)],
    ClassDef: [tokens.classKw, types.Identifier, option(types.TypeParams), option(stmts.FunctionParams), option(stmts.SuperTypes), option(types.WhereClause), option(stmts.StatementBlock)],
    TraitDef: [tokens.traitKw, types.Identifier, option(types.TypeParams), option(stmts.SuperTypes), option(types.WhereClause), option(stmts.StatementBlock)],
    File: [option(stmts.Import), stmts.StatementBody, tokens.eof],
    ImportGroup: [tokens.lBrace, many(stmts.ImportSegment, tokens.commaOrNL), option(stmts.ImportSegment), tokens.rBrace],
    ImportPath: union(types.Identifier, [stmts.ImportPath, tokens.dot, types.Identifier]),
    ImportValue: union(stmts.ImportGroup),
    ImportSegment: [stmts.ImportPath, option(tokens.colon, stmts.ImportValue)],
    Import: [tokens.importKw, stmts.ImportValue]
}

const defs = toDefs(stmts, _defs)

export default defs
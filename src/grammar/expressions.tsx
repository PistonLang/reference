import { GrammarPoints, many, option, range, toDefs, union } from "../grammar"
import { base, exprs, types } from "./refs"

const _defs: Record<keyof typeof exprs, GrammarPoints> = {
    binaryDigit: union('0', '1'),
    decimalDigit: range('0', '9'),
    hexDigit: union(exprs.decimalDigit, range('a', 'f'), range('A', 'F')),
    intSuffix: union('i8', 'i16', '132', 'i64'),
    floatSuffix: union('f32', 'f64'),
    decimalBody: [exprs.decimalDigit, many(union('_', exprs.decimalDigit))],
    binaryBody: [exprs.binaryDigit, many(union('_', exprs.binaryDigit))],
    hexBody: [exprs.hexDigit, many(union('_', exprs.hexDigit))],
    floatExponent: [union('e', 'E'), option(union('+', '-')), exprs.decimalBody],
    decimalLiteral: [exprs.decimalBody, exprs.intSuffix],
    binaryLiteral: ['0', union('b', 'B'), exprs.binaryBody, exprs.intSuffix],
    hexLiteral: ['0', union('x', 'X'), exprs.hexBody, exprs.intSuffix],
    intLiteral: union(exprs.binaryLiteral, exprs.decimalLiteral, exprs.hexLiteral),
    floatLiteral: [exprs.decimalBody, '.', exprs.decimalBody, option(exprs.floatExponent), option(exprs.floatSuffix)],
    boolLiteral: union('true', 'false'),
    escapedChar: ['\\', union('n', 't', 'v', 'f', 'r', '\'', '"', '\\')],
    charLiteral: ["'", union(exprs.escapedChar, base.charCharacter), "'"],
    stringLiteral: ['"', union(exprs.escapedChar, base.stringCharacter), '"'],
    NestedExpression: ['(', exprs.Expression, ')'],
    AccessExpression: [exprs.Term, '.', base.PathSegment],
    InvokeExpression: [exprs.Term, '(', many(exprs.Expression, base.commaOrNL), option(exprs.Expression), ')'],
    PrefixExpression: [union('+', '-'), exprs.Term],
    ThisExpression: 'this',
    SuperExpression: ['super', option(types.TypeArgs)],
    Term: union(
        exprs.intLiteral, exprs.floatLiteral, exprs.boolLiteral, exprs.charLiteral, exprs.stringLiteral, 
        exprs.AccessExpression, exprs.InvokeExpression, exprs.PrefixExpression, exprs.NestedExpression, 
        exprs.ThisExpression, exprs.SuperExpression, base.PathSegment
    ),
    Expression: exprs.AssignExpression,
    TimesExpression: [exprs.Term, many(union('*', '/'), exprs.Term)],
    PlusExpression: [exprs.TimesExpression, many(union('+', '-'), exprs.TimesExpression)],
    RelationExpression: [exprs.PlusExpression, many(union('<', '<=', '>', '>='), exprs.PlusExpression)],
    EqualsExpression: [exprs.RelationExpression, many(union('==', '!=', '==', '!=='), exprs.RelationExpression)],
    AndExpression: [exprs.EqualsExpression, many('&&', exprs.EqualsExpression)],
    OrExpression: [exprs.AndExpression, many('||', exprs.AndExpression)],
    TernaryExpression: [exprs.OrExpression, many('?', exprs.Expression, ':', exprs.Expression)],
    AssignExpression: [exprs.TernaryExpression, many('=', exprs.TernaryExpression)],
}

const defs = toDefs(exprs, _defs)

export default defs
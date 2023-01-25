import { GrammarPoints, many, option, toDefs, union } from '../grammar'
import { exprs, tokens, types } from './refs'

const _defs: Record<keyof typeof exprs, GrammarPoints> = {
	NestedExpression: [tokens.lParen, exprs.Expression, tokens.rParen],
	AccessExpression: [exprs.Term, tokens.dot, types.PathSegment],
	CallExpression: [
		exprs.Term,
		tokens.lParen,
		many(exprs.Expression, tokens.commaOrNL),
		option(exprs.Expression),
		tokens.rParen,
	],
	UnaryExpression: [union(tokens.plus, tokens.minus), exprs.Term],
	ThisExpression: tokens.thisKw,
	SuperExpression: [tokens.superKw, option(types.TypeArgs)],
	IdentifierExpression: types.PathSegment,
	LiteralExpression: union(
		tokens.intLiteral,
		tokens.floatLiteral,
		tokens.boolLiteral,
		tokens.charLiteral,
		tokens.stringLiteral,
		tokens.nullKw
	),
	Term: union(
		exprs.AccessExpression,
		exprs.CallExpression,
		exprs.UnaryExpression,
		exprs.NestedExpression,
		exprs.ThisExpression,
		exprs.SuperExpression,
		exprs.LiteralExpression,
		exprs.IdentifierExpression
	),
	Expression: exprs.AssignExpression,
	TimesExpression: [exprs.Term, many(union(tokens.star, tokens.slash), exprs.Term)],
	PlusExpression: [exprs.TimesExpression, many(union(tokens.plus, tokens.minus), exprs.TimesExpression)],
	RelationExpression: [
		exprs.PlusExpression,
		many(union(tokens.less, tokens.greater, tokens.lessEq, tokens.greaterEq), exprs.PlusExpression),
	],
	EqualsExpression: [exprs.RelationExpression, many(union(tokens.eqEq, tokens.eMarkEq), exprs.RelationExpression)],
	AndExpression: [exprs.EqualsExpression, many(tokens.andAnd, exprs.EqualsExpression)],
	OrExpression: [exprs.AndExpression, many(tokens.orOr, exprs.AndExpression)],
	TernaryExpression: [exprs.OrExpression, many(tokens.qMark, exprs.Expression, tokens.colon, exprs.Expression)],
	AssignExpression: [exprs.TernaryExpression, many(tokens.eq, exprs.TernaryExpression)],
}

const defs = toDefs(exprs, _defs)

export default defs

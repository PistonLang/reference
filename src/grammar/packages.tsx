import { GrammarPoints, many, option, toDefs, union } from '../grammar'
import { packs, tokens, scopes } from './refs'

const _defs: Record<keyof typeof packs, GrammarPoints> = {
	ImportGroup: [tokens.lBrace, many(packs.ImportSegment, tokens.commaOrNL), option(packs.ImportSegment), tokens.rBrace],
	ImportPath: [tokens.identifier, many(tokens.dot, tokens.identifier)],
	ImportValue: union(packs.ImportGroup),
	ImportSegment: [packs.ImportPath, option(tokens.colon, packs.ImportValue)],
	Import: [tokens.importKw, packs.ImportValue],
	File: [option(packs.Import), scopes.StatementBody, tokens.eof],
}

const defs = toDefs(packs, _defs)

export default defs

import defs from '../grammar/tokens'
import { CodePoint, GrammarSection } from '../sections'

const tokens = GrammarSection(
	'Lexical Tokens',
	[defs.PistonToken],
	<>
		<p>
			Piston code is represented as a sequence of UTF-8 code points. Said code points can then be transformed into a
			sequence of tokens such that the longest route is always taken.
		</p>
	</>,
	[
		GrammarSection(
			'Identifiers',
			[
				defs.letter,
				defs.digit,
				defs.underscore,
				defs.apostrophe,
				defs.identifierHead,
				defs.identifierTail,
				defs.identifier,
			],
			<>
				<p>
					Identifiers are sequences of characters which are used for binding types, variables, functions and packages.
					An identifier must start with a letter or underscore and can later also contain digits and apostrophes, as
					primes.
				</p>
			</>
		),
		GrammarSection(
			'Keywords',
			[],
			<>
				<p>
					In Piston, keywords are identifiers which are specially treated by the language. As such, during parsing, they
					are not represented as identifier tokens, but as their own special tokens.
				</p>
				<p>
					We differentiate between strong keywords, which remain unexchangeable with identifiers throughout the grammar,
					and weak keywords, which, as we shall see in the grammar, can be used in the same places as identifier tokens.
				</p>
			</>,
			[
				GrammarSection('Strong Keywords', [
					defs.classKw,
					defs.traitKw,
					defs.valKw,
					defs.varKw,
					defs.nullKw,
					defs.trueKw,
					defs.falseKw,
					defs.thisKw,
					defs.superKw,
				]),
				GrammarSection('Weak Keywords', [defs.whereKw, defs.getKw, defs.setKw]),
			]
		),
		GrammarSection(
			'Symbols',
			[
				defs.plus,
				defs.minus,
				defs.star,
				defs.slash,
				defs.eq,
				defs.eqEq,
				defs.eMarkEq,
				defs.less,
				defs.greater,
				defs.lessEq,
				defs.greaterEq,
				defs.and,
				defs.andAnd,
				defs.orOr,
				defs.dot,
				defs.qMark,
				defs.colon,
				defs.comma,
				defs.arrow,
				defs.lParen,
				defs.rParen,
				defs.lBracket,
				defs.rBracket,
				defs.lBrace,
				defs.rBrace,
				defs.subtype,
				defs.supertype,
			],
			<>
				<p>
					Given above are all the sequences of symbol (non-alphanumeric and non-whitespace) characters which have a
					lexical meaning in the language.
				</p>
			</>
		),
		GrammarSection(
			'Ignorables',
			[defs.character, defs.whitespaceCharacter, defs.newline, defs.whitespace, defs.comment],
			<>
				<p>
					When constructing syntax nodes, whitespace and comments are to be ignored. The only form of whitespace that is
					to be treated differently are new lines.
				</p>
			</>,
			[
				GrammarSection(
					'Comments',
					[defs.lineComment, defs.multiComment],
					<>
						<p>
							Piston supports single-line comments, which begin with a <CodePoint>{'//'}</CodePoint> and multi-line
							comments, which start with a <CodePoint>{'/*'}</CodePoint> and end with a <CodePoint>{'*/'}</CodePoint>.
							Multi-line comments support nesting.
						</p>
					</>
				),
				GrammarSection(
					'New Lines',
					[defs.commaOrNL],
					<>
						<p>
							In Piston, lists of items, whether declarations, parameters, arguments or expressions, use commas or new
							lines for separation. It is only when there is a missing comma that new lines become significant
							characters. In every other case, new lines, like the other whitespace characters, are ignored.
						</p>
					</>
				),
			]
		),
		GrammarSection(
			'Literals',
			[],
			<>
				<p>
					Literals are sequences of characters which represent particular values. Piston has integer, floating-point,
					boolean, character and string literals
				</p>
			</>,
			[
				GrammarSection(
					'Integer Literals',
					[
						defs.binaryDigit,
						defs.decimalDigit,
						defs.hexDigit,
						defs.binaryBody,
						defs.decimalBody,
						defs.hexBody,
						defs.binaryLiteral,
						defs.decimalBody,
						defs.hexLiteral,
						defs.intLiteral,
					],
					<>
						<p>
							Integer literals represent values of type <CodePoint>Int32</CodePoint> or, when they surpass the bounds of{' '}
							<CodePoint>Int32</CodePoint>, they are of type <CodePoint>Int64</CodePoint>. By default, the literals are
							in base 10, however, <CodePoint>0b</CodePoint> or <CodePoint>0x</CodePoint> can be appended to the start
							to make it a base 2 or 16 literal, respectively.
						</p>
					</>
				),
				GrammarSection(
					'Float Literals',
					[defs.floatExponent, defs.floatLiteral],
					<>
						<p>
							Floating-point literals represent values of type <CodePoint>Float64</CodePoint>. They are in base 10 and
							support scientific notation.
						</p>
					</>
				),
				GrammarSection(
					'Boolean Literals',
					[defs.boolLiteral],
					<>
						<p>
							Boolean literals represent values of type <CodePoint>Bool</CodePoint>.
						</p>
					</>
				),
				GrammarSection(
					'Char Literals',
					[defs.charCharacter, defs.escapedChar, defs.charLiteral],
					<>
						<p>
							Character literals represent values of type <CodePoint>Char</CodePoint>. Aside for regular characters,
							they also support certain escape sequences. These include:
						</p>
						<ul>
							<li>
								<CodePoint>\n</CodePoint> - new line
							</li>
							<li>
								<CodePoint>\t</CodePoint> - tab
							</li>
							<li>
								<CodePoint>\v</CodePoint> - vertical
							</li>
							<li>
								<CodePoint>\f</CodePoint> - form feed
							</li>
							<li>
								<CodePoint>\r</CodePoint> - carriage return
							</li>
							<li>
								<CodePoint>\\</CodePoint> - backslash
							</li>
							<li>
								<CodePoint>\'</CodePoint> - single quote
							</li>
							<li>
								<CodePoint>\"</CodePoint> - double quote
							</li>
						</ul>
					</>
				),
				GrammarSection(
					'String Literals',
					[defs.stringCharacter, defs.quote, defs.stringLiteral],
					<>
						<p>
							String literals represent values of type <CodePoint>String</CodePoint>. They are able to span multiple
							lines and support the same escape sequences as character literals. That said, no whitespace elimination is
							done on the literal itself - that must be done with functions.
						</p>
					</>
				),
				GrammarSection(
					'Null Literals',
					[],
					<>
						<p>
							The absence of a value can be represented using a <CodePoint>null</CodePoint> literal. It is a value of
							type <CodePoint>Nothing?</CodePoint>.
						</p>
					</>
				),
			]
		),
	]
)

export default tokens

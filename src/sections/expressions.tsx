import defs from '../grammar/expressions'
import { CodePoint, GrammarSection } from '../sections'

const expressions = GrammarSection(
	'Expressions',
	[defs.Expression],
	[],
	[
		GrammarSection(
			'Term',
			[defs.Term],
			<>
				<p>Terms are operands for binary operators.</p>
			</>,
			[
				GrammarSection(
					'Identifier Expression',
					[defs.IdentifierExpression],
					<>
						<p>
							An identifier can be used to reference a local or imported item or a package with the corresponding name.
						</p>
					</>
				),
				GrammarSection('Literal Expression', [defs.LiteralExpression]),
				GrammarSection(
					'This Expression',
					[defs.ThisExpression],
					<>
						<p>
							<CodePoint>this</CodePoint> can be used inside of a class or trait to refer to the current instance.
						</p>
					</>
				),
				GrammarSection(
					'Super Expression',
					[defs.SuperExpression],
					<>
						<p>
							<CodePoint>super</CodePoint> can be used to call the supertype's implementation of a member. In the case
							that there are multiple supertypes with such an implmentation, the exact supertype needs to be passed in
							as a type argumet.
						</p>
						<p>Super Expressions cannot be used by themselves - they must be children of other expressions.</p>
					</>
				),
				GrammarSection(
					'Nested Expression',
					[defs.NestedExpression],
					<>
						<p>Every expression can be put in parentheses so it can be treated as a term.</p>
					</>
				),
				GrammarSection(
					'Access Expression',
					[defs.AccessExpression],
					<>
						<p>
							Every term may be succeeded by a dot and and identifier to access a member, if the term represents a
							value, or to access a subpackage, if it represents a package.
						</p>
					</>
				),
				GrammarSection(
					'Call Expression',
					[defs.CallExpression],
					<>
						<p>
							A function can be called by passing it arguments inside parentheses. It should be noted that this needs to
							be done on the exact same line, otherwise the parentheses will be treated as the start of a nested
							expression.
						</p>
						<p>
							When used on a value, this calls its <CodePoint>apply</CodePoint> method and when combined with an
							assignment this calls its <CodePoint>update</CodePoint> method.
						</p>
					</>
				),
				GrammarSection(
					'Unary Expression',
					[defs.UnaryExpression],
					<>
						<p>
							Unary expressions are applications of the unary operators <CodePoint>+</CodePoint> amd{' '}
							<CodePoint>-</CodePoint> which correspond to calls to the member functions{' '}
							<CodePoint>unaryPlus</CodePoint> and <CodePoint>unaryMinus</CodePoint>.
						</p>
						<p>
							It should be noted that the operator needs to be directly next to the term, with no whitespace in between,
							as that is what distinguishes these operators from their binary variants.
						</p>
					</>
				),
			]
		),
		GrammarSection(
			'Binary Expression',
			[
				defs.TimesExpression,
				defs.PlusExpression,
				defs.RelationExpression,
				defs.EqualsExpression,
				defs.AndExpression,
				defs.OrExpression,
			],
			<>
				<p>
					All binary operators in Piston, aside for <CodePoint>&&</CodePoint> amd <CodePoint>||</CodePoint> correspond
					to certain member functions on the first operand. Namely
				</p>
				<ul>
					<li>
						<CodePoint> a * b</CodePoint> - <CodePoint>a.times(b)</CodePoint>
					</li>
					<li>
						<CodePoint> a / b</CodePoint> - <CodePoint>a.div(b)</CodePoint>
					</li>
					<li>
						<CodePoint> a + b</CodePoint> - <CodePoint>a.plus(b)</CodePoint>
					</li>
					<li>
						<CodePoint> a - b</CodePoint> - <CodePoint>a.minus(b)</CodePoint>
					</li>
					<li>
						<CodePoint> a &lt; b</CodePoint> - <CodePoint>a.compare(b) &lt; 0</CodePoint>
					</li>
					<li>
						<CodePoint> a &gt; b</CodePoint> - <CodePoint>a.compare(b) &gt; 0</CodePoint>
					</li>
					<li>
						<CodePoint> a &lt;= b</CodePoint> - <CodePoint>a.compare(b) &lt;= 0</CodePoint>
					</li>
					<li>
						<CodePoint> a &gt;= b</CodePoint> - <CodePoint>a.compare(b) &gt;= 0</CodePoint>
					</li>
					<li>
						<CodePoint> a == b</CodePoint> - <CodePoint>a.equals(b)</CodePoint>
					</li>
					<li>
						<CodePoint> a != b</CodePoint> - <CodePoint>a.equals(b).not</CodePoint>
					</li>
				</ul>
				<p>
					For an operator to be treated as a binary one, there needs to either be whitespace on both sides of it or no
					whitespace on either side of it.
				</p>
				<p>
					The type of comparison, equality and logical operators is <CodePoint>piston.Bool</CodePoint>, while for the
					rest it depends on the underlying function.
				</p>
				<p>
					Unlike the rest of the operators, the logical operators use short-circuiting, meaning that the following
					equivalences hold:
				</p>
				<ul>
					<li>
						<CodePoint>(a && b) == (a ? b : false)</CodePoint>
					</li>
					<li>
						<CodePoint>(a || b) == (a ? true : b)</CodePoint>
					</li>
				</ul>
			</>
		),
		GrammarSection(
			'Assignment Expression',
			[defs.AssignExpression],
			<>
				<p>
					The <CodePoint>=</CodePoint> operator can be used on an identifier or access expression to call the
					corresponding setter, assuming it exists. When used on a call expression, it calls the object's{' '}
					<CodePoint>update</CodePoint> function. All other cases are errors.
				</p>
				<p>
					The type of an Assignment Expression is always <CodePoint>piston.Unit</CodePoint>.
				</p>
			</>
		),
		GrammarSection(
			'Ternary Expression',
			[defs.TernaryExpression],
			<>
				<p>
					The ternary operator is used for choosing which expression to evaluate based on a given value. Namely, if the
					value is <CodePoint>true</CodePoint>, the first expression will be evaluated, otherwise the second one.
				</p>
				<p>
					The type of the expression is the least common supertype of the types of the two possible expressions which
					may be evaluated.
				</p>
			</>
		),
	]
)

export default expressions

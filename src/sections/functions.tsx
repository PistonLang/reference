import { CodePoint, GrammarSection } from '../sections'
import defs from '../grammar/functions'

const functions = GrammarSection(
	'Functions and Properties',
	[],
	<>
		<p>
			In Piston there are two constructs which can be used to process and manipulate with data: functions and
			properties.
		</p>
	</>,
	[
		GrammarSection(
			'Functions',
			[defs.FunctionParam, defs.FunctionParams, defs.FunctionDef],
			<>
				<p>
					Every function in Piston must have an identifier, a list of parameters and, aside for functions in traits, it
					must also contain an expression which gets evaluated every time it is called. Functions which return a value
					must also have a return type, otherwise it defaults to <CodePoint>Unit</CodePoint>.
				</p>
				<p>
					Function parameters in Piston are special immutable properties which hold the values passed into the function.
				</p>
				<p>
					Piston supports function overloading, meaning several functions with the same name may be declared in a given
					scope, differing by the number and/or types of parameters. This is because, unlike other items within the
					language, functions are differentiated by their signature which is an ordered pair of their names and the
					types of their parameters. As a result, two functions would not be distinct if they only differ by their
					return type and/or the names of their parameters.
				</p>
			</>
		),
		GrammarSection(
			'Properties',
			[],
			<>
				Properties consist of a getter, and optionally setter function, bound to an identifier. They may be stored or
				computed.
			</>,
			[
				GrammarSection(
					'Stored Properties',
					[defs.PropertyDef],
					<>
						<p>
							Stored properties represent memory locations where references to values are stored. When using{' '}
							<CodePoint>val</CodePoint> a corresponding getter function is created and when using{' '}
							<CodePoint>var</CodePoint> a setter is also created.
						</p>
						<p>
							Stored properties are initialized when the file is being loaded and when a class instance is created.
							Unlike functions, the order in which they are written matters as that is the order in which they will be
							evaluated. As such, a stored property cannot be used in the expression of another stored property before
							it is initialized. That said it is not expected that indirect access by calling a function which uses it
							is checked.
						</p>
					</>
				),
				GrammarSection(
					'Computed Properties',
					[],
					<>
						<p>
							Computed properties consist of a special getter function and/or setter functions. A getter function is
							created the same as a normal function, but with the parameter list left out. A setter function, on the
							other hand, is created just as a normal function, but its name must end with a <CodePoint>_=</CodePoint>.
						</p>
					</>
				),
			]
		),
	]
)

export default functions

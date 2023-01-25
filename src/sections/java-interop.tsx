import { CodePoint, GrammarSection } from '../sections'

const javaInterop = GrammarSection(
	'Java Interop',
	[],
	<>
		<p>
			Piston is a programming language which compiles to JVM bytecode, specifically that of Java 17. As a result,
			Piston is able to interoperate with other languages on the JVM.
		</p>
	</>,
	[
		GrammarSection(
			'Properties',
			[],
			<>
				<p>
					Given a string of one or more character starting with a capital letter <CodePoint>X</CodePoint>, all methods
					without parameters named <CodePoint>getX</CodePoint> are treated as getters and all methods with one parameter
					named <CodePoint>setX</CodePoint> are treated as setters of the property named <CodePoint>X</CodePoint> with
					the first letter uncapitalized.
				</p>
				<p>
					In the other direction, all getter become methods which begin with <CodePoint>get</CodePoint> and all setters
					turn into methods that start with <CodePoint>set</CodePoint>, followed by the property name capitalized.
				</p>
				<p>
					Stored properties turn into a private field which gets return by a corresponding <CodePoint>get</CodePoint>{' '}
					and, if it is mutable, <CodePoint>set</CodePoint> method.
				</p>
			</>
		),
		GrammarSection(
			'Types',
			[],
			<>
				<p>
					On the JVM, just as in Piston, everything has a type. As such, for every Java type there exists a mapping to a
					Piston type and vice versa,
				</p>
			</>,
			[
				GrammarSection(
					'Traits',
					[],
					<>
						<p>
							For the most part, there is a one-to-one correspondence between Java interfaces and Piston traits. The one
							exception is that Piston treats <CodePoint>java.lang.Object</CodePoint> i.e.{' '}
							<CodePoint>piston.Any</CodePoint> as a trait and as such it allows having default implementations for its
							methods inside traits. This is implemented such that if there is no implementation provided by the class,
							Piston generates the corresponding method which just calls the interface's implementation inside it.
						</p>
					</>
				),
				GrammarSection(
					'Classes',
					[],
					<>
						<p>
							All Java classes, aside for the aforementioned <CodePoint>java.lang.Object</CodePoint>, regardless of
							whether abstract, final or sealed, get treated as Piston classes and thus cannot be subtyped in Piston
							code. Conversely, all Piston classes get mapped to final Java classes. The exception to this are some of
							the built-in types which have the following mapping:
						</p>
						<ul>
							<li>
								<CodePoint>piston.Unit</CodePoint> &lt;=&gt; <CodePoint>void, piston.Unit</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Int8</CodePoint> &lt;=&gt; <CodePoint>byte, java.lang.Byte</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Int16</CodePoint> &lt;=&gt; <CodePoint>short, java.lang.Short</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Int32</CodePoint> &lt;=&gt; <CodePoint>int, java.lang.Int</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Int64</CodePoint> &lt;=&gt; <CodePoint>long, java.lang.Long</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Float32</CodePoint> &lt;=&gt; <CodePoint>float, java.lang.Float</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Float64</CodePoint> &lt;=&gt; <CodePoint>double, java.lang.Double</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Bool</CodePoint> &lt;=&gt; <CodePoint>boolean, java.lang.Boolean</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Char</CodePoint> &lt;=&gt; <CodePoint>char, java.lang.Character</CodePoint>
							</li>
							<li>
								<CodePoint>piston.String</CodePoint> &lt;=&gt; <CodePoint>java.lang.String</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Int8Array</CodePoint> &lt;=&gt; <CodePoint>byte[]</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Int16Array</CodePoint> &lt;=&gt; <CodePoint>short[]</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Int32Array</CodePoint> &lt;=&gt; <CodePoint>int[]</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Int64Array</CodePoint> &lt;=&gt; <CodePoint>long[]</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Float32Array</CodePoint> &lt;=&gt; <CodePoint>float[]</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Float64Array</CodePoint> &lt;=&gt; <CodePoint>double[]</CodePoint>
							</li>
							<li>
								<CodePoint>piston.BoolArray</CodePoint> &lt;=&gt; <CodePoint>boolean[]</CodePoint>
							</li>
							<li>
								<CodePoint>piston.CharArray</CodePoint> &lt;=&gt; <CodePoint>char[]</CodePoint>
							</li>
							<li>
								<CodePoint>piston.Array[T]</CodePoint> &lt;=&gt; <CodePoint>T[]</CodePoint>
							</li>
						</ul>
						<p>
							Going from Piston to Java, the second type is used in generics and as a parameter or return type of an
							overridden Java method which uses it. In all other scenarios, the primitive variant is to be used.
						</p>
					</>
				),
				GrammarSection(
					'Nullability',
					[],
					<>
						<p>
							When it comes to nullability, all Java type instances annotated with{' '}
							<CodePoint>org.jetbrains.annotations.NotNull</CodePoint> are treated as non-null types and all Java type
							instances annotated with <CodePoint>org.jetbrains.annotations.Nullable</CodePoint> are treated as
							nullable. Every Java type instance T without a nullability annotation is treated as an inference variable
							α with constraints α &lt;: T? and α &gt;: T.
						</p>
						<p>
							Similarly, in Java all non-null Piston type instances are annotated with{' '}
							<CodePoint>org.jetbrains.annotations.NotNull</CodePoint> and all nullable Piston type instances are
							annotated with <CodePoint>org.jetbrains.annotations.Nullable</CodePoint>.
						</p>
					</>
				),
			]
		),
	]
)

export default javaInterop

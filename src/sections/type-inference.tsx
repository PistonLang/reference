import { GrammarSection } from '../sections';

const typeInference = GrammarSection(
	'Type Inference',
	[],
	<>
		<p>
			As Piston is a statically-typed language, every expression is given a type
			during compile-time allowing the compiler to find any typing issues before
			compilation. However, it is not possible nor practical for the user to
			specify the type of every expression and thus it is the job of the
			compiler to not only check, but also infer types.
		</p>
	</>,
	[
		GrammarSection(
			'Inference Variables',
			[],
			<>
				<p>
					While type arguments can explicitly be passed in, it is also the
					compiler's job to infer them when they are left out. To accomplish
					this, at the call site all occurences of a type parameter are replaced
					with an inference variable which is given a set of constraints that
					match those of the parameter, as well ones which are additionally
					inferred. Namely, for an inference variable α and a type T, there are
					three types of constaints:
				</p>
				<ul>
					<li>α &lt;: T (Subtype)</li>
					<li>α &gt;: T (Supertype)</li>
					<li>α = T (Equality)</li>
				</ul>
				<p>Constraints are given as follows:</p>
				<ul>
					<li>
						If an object of type α is passed to a parameter of type T, then α
						&lt;: T
					</li>
					<li>
						If an object of type T is passed to a parameter of type α, then α
						&gt;: T
					</li>
					<li>
						If an object of type G[α] is passed to a parameter of type H[T] such
						that G[α] &lt;: H[α] then α = T
					</li>
					<li>
						If an object of type G[T] is passed to a parameter of type H[α] such
						that G[T] &lt;: H[T] then α = T
					</li>
					<li>
						If an object of type G[α] is passed to a parameter of type H[&lt;:
						T] such that G[α] &lt;: H[α] then α &lt;: T
					</li>
					<li>
						If an object of type G[T] is passed to a parameter of type H[&lt;:
						α] such that G[T] &lt;: H[T] then α &gt;: T
					</li>
					<li>
						If an object of type G[α] is passed to a parameter of type H[&gt;:
						T] such that G[α] &lt;: H[α] then α &gt;: T
					</li>
					<li>
						If an object of type G[T] is passed to a parameter of type H[&gt;:
						α] such that G[T] &lt;: H[T] then α &lt;: T
					</li>
				</ul>
				<p>
					At the point that an equality constraint is given, α is to be replaced
					with T. If that never happens however, all the subtyping constraints
					are to be combined into one constraint α &lt;: I where I is a reduced
					intersection of all the subtype contraints. Similarly, all the
					supertyping constraints are to be reduced to a single constraint α
					&gt;: U where U is a reduced union of all the supertype contraints.
					Then, if I = U, it follows that α = I = U.
				</p>
				<p>
					It is the job of the compiler to check that the equality type conforms
					to all subtype and supertype constraints and that every subtype is a
					subtype of all the supertypes.
				</p>
			</>
		),
	]
);

export default typeInference;

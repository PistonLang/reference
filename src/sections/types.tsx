import typeDefs from "../grammar/types";
import stmtDefs from "../grammar/statements";
import { CodePoint, GrammarSection } from "../sections";

export const types = GrammarSection("Types", [typeDefs.PathSegment, typeDefs.TypePath, typeDefs.TypeInstance, typeDefs.NestedType], <>
    <p>
        Types are sets of values with a corresponding set of operations.
    </p>
    <p>
        Piston is a statically-typed language, meaning every value has a static type which is defined at compile-time.
        As a result of this, properties and functions must have the types of the parameters and return value specified.
    </p>
    <p>
        Additionally, Piston has strong typing, which means that the type of a value does not change throughout
        the execution of the program.
    </p>
    <p>
        In Piston, all types are reference types, meaning that most of the time their values do not get stored in
        properties and parameters, only references to the memory locations where they are stored. There are
        optimizations in place for certain immutable built-in types, however it does not change the fact that
        the mutability of properties and values are independent.
    </p>
    <p>
        Piston has nominal subtyping, meaning that types are organized in a hierarchy
        of subtypes and supertypes with the supertype of all types, <CodePoint>Any?</CodePoint>, at the top
        and the subtype of all types, <CodePoint>Nothing</CodePoint>, at the bottom.
    </p>
    <p>
        Additionally, Piston has parametric polymorphism, meaning a type can accept a number of type parameters.
        The result of supplying a type with all the necessary type arguments is called a type instance.
        Type instances are used for specifying the set of values which a function/property can input and output.
    </p>
</>, [
    GrammarSection("Built-in Types", [], [], [
        GrammarSection("Any", [], <>
            <p>
                <CodePoint>piston.Any</CodePoint> is the supertype of a non-null types. As a result, whenever a list of supertypes
                is left empty, <CodePoint>Any</CodePoint> will be the direct supertype of the declared type.
            </p>
            <p>
                <CodePoint>Any</CodePoint> comes with three member functions:
            </p>
            <ul>
                <li><CodePoint>equals(other: Any?) -&gt; Bool</CodePoint></li>
                <li><CodePoint>hashcode() -&gt; Int32</CodePoint></li>
                <li><CodePoint>toString() -&gt; String</CodePoint></li>
            </ul>
        </>),
        GrammarSection("Nothing", [], <>
            <p>
                Conversely, <CodePoint>piston.Nothing</CodePoint> is the subtype of all types. It cannot be instantiated and it is used
                to signify errors and infinite loops.
            </p>
        </>),
        GrammarSection("Unit", [], <>
            <p>
                <CodePoint>piston.Unit</CodePoint> is a singleton type which signiifies side-effects, akin 
                to <CodePoint>void</CodePoint> in many programming languages.
            </p>
        </>),
        GrammarSection("Bool", [], <>
            <p>
                <CodePoint>piston.Boolean</CodePoint> is a boolean type whose only values 
                are <CodePoint>true</CodePoint> and <CodePoint>false</CodePoint>. It has several built-in operators
                within the language.
            </p>
        </>),
        GrammarSection("Integer Values", [], <>
            <p>
                Piston has 4 signed integer types of the form <CodePoint>IntN</CodePoint> where the 
                <CodePoint>N</CodePoint> represents the number of bits in the binary representation.
                The inegers are represented in two's compliment, meaning their values range from
                -2<sup>N</sup> to 2<sup>N</sup> - 1.
            </p>
            <p>
                The aforementioned types are <CodePoint>Int8</CodePoint>, <CodePoint>Int16</CodePoint>, <CodePoint>Int32</CodePoint> and <CodePoint>Int64</CodePoint>.
            </p>
        </>),
        GrammarSection("Floating-point Types", [], <>
            <p>
                Piston has two IEEE 754 floating-point types:
            </p>
            <ul>
                <li><CodePoint>piston.Float32</CodePoint> which is single-precision.</li>
                <li><CodePoint>piston.Float64</CodePoint> which is double-precision.</li>
            </ul>
        </>),
        GrammarSection("Char", [], <>
            <p>
                <CodePoint>piston.Char</CodePoint> is a type which represents a unicode symbol in UTF-16 character encoding.
            </p>
        </>),
        GrammarSection("String", [], <>
            <p>
                <CodePoint>piston.String</CodePoint> is a type which represents a sequence of
            </p>
        </>),
        GrammarSection("Arrays", [], <>
            <p>
                <CodePoint>piston.Array[T]</CodePoint> is a built-in parameterized type which represents an indexed fixed-sized
                collection of values of a single type. It contains the following members:
            </p>
            <p>
                There are also specialized array types for some of the aforementioned built-in types, 
                namely <CodePoint>piston.BoolArray</CodePoint>,  <CodePoint>piston.Int8Array</CodePoint>, <CodePoint>piston.Int16Array</CodePoint>, <CodePoint>piston.Int32Array</CodePoint>, <CodePoint>piston.Int64rray</CodePoint>, <CodePoint>piston.Float32Array</CodePoint>, <CodePoint>piston.Float64Array</CodePoint> and <CodePoint>piston.CharArray</CodePoint>.
            </p>
        </>)
    ]),
    GrammarSection("Custom Types", [], [], [
        GrammarSection("Traits", [stmtDefs.SuperTypes, stmtDefs.TraitDef], <>
            <p>
                Traits are types which can be subtyped, but cannot be instantiated by themselves. They are unable to store data,
                but they can define functions and properties which need to be implemented by their subtypes.
            </p>
            <p>
                The functions and properties inside a trait are called members and member functions may also be reffered to as
                methods. Unlike functions and properties defined at the file-level, which may also be referred to as top-level,
                all type members take an extra parameter which is an instance of the enclosing type. This rerefence can be accessed
                using the <CodePoint>this</CodePoint> keyword, however this is usually unecessary as all calls to type members
                use it implicitly.
            </p>
            <p>
                Trait members may or may not have default implementations which can be overriden inside their subtypes.
                The only exception to this are stored properties as traits are unable to store data.
            </p>
            <p>
                Every member defined in a trait is implicitly contained in the declaration scope of its subtypes.
                There it may be overriden such that it has a different implementation. 
                Additionally, its parameters may be renamed and its return type may be changed
                to a subtype of the one used in the supertype.
            </p>
            <p>
                If the list of supertypes contains types which are subtypes of each other, only the lowest subtype will
                be counted, thus there would be no default implmentation conflicts between them. Types cannot form dependency cycles, 
                nor can a type directly or indirectly subtype the same type with different type arguments.
            </p>
            <p>
                The declaration blocks of types may also contain nested types, though these types are in no way members of
                type, they merely use it as a namespace.
            </p>
        </>),
        GrammarSection("Classes", [stmtDefs.ClassDef], <>
            <p>
                Classes are types which cannot be subtyped, but can be instatiated and store data. Stored properties can be
                defined within their definition block and are evaluated when the instance is created.
            </p>
            <p>
                Unlike in traits, in classes every item must be fully-implemented, and, whenever there is a conflict between
                default implementations, it must be resolved by overriding the corresponding item.
            </p>
            <p>
                There are two types of classes: singleton and multi-instance classes.
            </p>
        </>, [
            GrammarSection("Singletons", [], <>
                <p>
                    Singleton classes have only a single instance which is loaded whenever it is first accessed.
                    Thus, they act like stored properties.
                </p>
            </>),
            GrammarSection("Multi-Instance Classes", [], <>
                <p>
                    As the name suggests, multi-instance classes can have multiple instances which are created
                    by passing arguments to a spcial function called the constructor. This function has the same
                    name as the type and is treated as a function of the enclosing scope.
                </p>
            </>)
        ])
    ]),
    GrammarSection("Nullables", [typeDefs.NullableType], <>
        <p>
            Every type instance comes with a nullable variant, meaning that, aside from values of the corresponding type,
            it also accepts the value <CodePoint>null</CodePoint>.
        </p>
        <p>
            The nullable variants are considered supertypes of the corresponding non-null types.
        </p>
    </>),
    GrammarSection("Type Parameters", [typeDefs.TypeParams, typeDefs.TypeArg, typeDefs.TypeArgs], <>
        <p>
            All declarations in Piston can take zero or more type parameters which are defined in
            sqaure brackets after the defining identifier. Similarly, they can be defined
        </p>
    </>, [
        GrammarSection("Where Clause", [typeDefs.TypeUnion, typeDefs.TypeBound, typeDefs.WhereClause], <>
            <p>
                Every type parameter has an upper bound, which is <CodePoint>Any?</CodePoint> by default.
                However, at the end of the type, functions, getter and setter header, a <CodePoint>where</CodePoint> clause
                can be defined where the type parameters are given a constraint on their upper bound.
            </p>
        </>),
        GrammarSection("Variance", [], <>
            <p>
                Variance determines the subtyping relationship between instances of a given type with different
                type arguments.
            </p>
        </>, [
            GrammarSection("Invariance", [], <>
                <p>
                    The default variance is invariance, meaning that two instances of one type with different
                    type arguments are unrelated, regardless of the relationship between the arguments passed in.
                </p>
            </>),
            GrammarSection("Covariance", [], <>
                <p>
                    Covariance means that if a type <CodePoint>A</CodePoint> subtypes <CodePoint>B</CodePoint> then
                    <CodePoint>I[A]</CodePoint> subtypes <CodePoint>I[B]</CodePoint>. This can be enabled by using the
                    subtype symbol in front of the type argument. A consequence of this variance is that only 
                    members of the type which do not take parameters of the type parameter the argument corresponds to
                    may be called on an object of said type.
                </p>
            </>),
            GrammarSection("Contravariance", [], <>
                <p>
                    Contravariance means that if a type <CodePoint>A</CodePoint> subtypes <CodePoint>B</CodePoint> then
                    <CodePoint>I[B]</CodePoint> subtypes <CodePoint>I[A]</CodePoint>. This can be enabled by using the
                    supertype symbol in front of the type argument. A consequence of this variance is that only 
                    members of the type which do not return values of the type parameter the argument corresponds to
                    may be called on an object of said type.
                </p>
            </>)
        ])
    ])
])
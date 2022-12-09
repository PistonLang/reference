import typeDefs from "../grammar/types";
import stmtDefs from "../grammar/statements";
import { CodePoint, section } from "../sections";

export const types = section("Types", [typeDefs.PathSegment, typeDefs.TypePath, typeDefs.Type, typeDefs.NestedType], [
    <p>
        Types are sets of values with a corresponding set of operations.
    </p>,
    <p>
        In Palm, all types are references, meaning that the value does not get copied
        when being passed to functions and when being stored in properties, only the reference. As a result,
        the mutability of a property does not affect the mutability of the underlying value.
    </p>,
    <p>
        Additionally, Palm has subtyping polymorphism, meaning that types are organized in a hierarchy
        of subtypes and supertypes with the supertype of all types, <CodePoint>Any</CodePoint>, at the top
        and the subtype of all types, <CodePoint>Nothing</CodePoint>, at the bottom.
    </p>,
    <p>
        There are four categories of types which are treated differently in Palm from the rest:
        <CodePoint>Any</CodePoint>, <CodePoint>Unit</CodePoint>, <CodePoint>Nothing</CodePoint> and nullables.
    </p>
], [
    section("Any", [], [
        <p>
            The <CodePoint>Any</CodePoint> type is a supertype of every type.
        </p>
    ]),
    section("Unit", [], [
        <p>
            The <CodePoint>Unit</CodePoint> type is a singleton type which represents side-effects. When set as the expected 
            type, it will allow values of any type.
        </p>
    ]),
    section("Nothing", [], [
        <p>
            The <CodePoint>Nothing</CodePoint> type is a subtype of everty time. It is used to represent errors
            and infinite loops.
        </p>
    ]),
    section("Nullables", [typeDefs.NullableTypes], [
        <p>
            Every type comes with a nullable variant, meaning that, aside from values of the corresponding type,
            it also accepts the value <CodePoint>null</CodePoint>.
        </p>,
        <p>
            The nullable variants are considered supertypes of the corresponding types.
        </p>
    ]),
    section("Custom Types", [], [], [
        section("Traits", [stmtDefs.SuperTypes, stmtDefs.TraitDef], [
            <p>
                Traits are types which can be subtyped, but cannot be instantiated by themselves. They are unable to store data,
                but they can define functions and properties which need to be implemented by their subtypes. They may also
                provide default implementations for said functions and properties, which can be overriden in their subtypes.
            </p>,
            <p>
                When overriding a member in a subtype, the parameter names may be changed and the return type may be changed
                to a subtype of the one used in the supertype.
            </p>,
            <p>
                If the list of supertypes contains types which are subtypes of each other, only the lowest subtype will
                be counted, thus there would be no default implmentation conflicts between them. Types cannot form dependency cycles, 
                nor can a type directly or indirectly subtype the same type with different type arguments.
            </p>,
            <p>
                When working inside a type's declaration block, you are able to reference the current instance
                using <CodePoint>this</CodePoint>, though when calling a member function or property it can be left out
                as it is implicitly called on it.
            </p>
        ]),
        section("Classes", [stmtDefs.ClassDef], [
            <p>
                Classes are types which cannot be subtyped, but can be instatiated and store data. Stored properties can be
                defined within their definition block and are evaluated when the instance is created.
            </p>,
            <p>
                Unlike in traits, in classes every item must be fully-implemented, and, whenever there is a conflict between
                default implementations, it must be resolved by overriding the corresponding item.
            </p>,
            <p>
                There are two types of classes: singleton and multi-instance classes.
            </p>
        ], [
            section("Singletons", [], [
                <p>
                    Singleton classes have only a single instance which is loaded whenever it is first accessed.
                    Thus, they act like stored properties.
                </p>
            ]),
            section("Multi-Instance Classes", [], [
                <p>
                    As the name suggests, multi-instance classes can have multiple instances which are created
                    by passing arguments to the class. Thus, they act like functions.
                </p>
            ])
        ])
    ]),
    section("Generics", [typeDefs.TypeParams, typeDefs.TypeArg, typeDefs.TypeArgs], [
        <p>
            Types, functions and properties may take type parameters to expand their use across various types while
            still providing type-safety. These go between square brackets right after the declaring identifier.
        </p>
    ], [
        section("Where Clause", [typeDefs.TypeUnion, typeDefs.TypeBound, typeDefs.WhereClause], [
            <p>
                At the end of the type, functions, getter and setter header, a<CodePoint>where</CodePoint> clause
                can be defined where the type parameters are given a constraint on their upper bound.
            </p>
        ]),
        section("Variance", [], [
            <p>
                Variance determines the subtyping relationship between instances of a given type with different
                type arguments.
            </p>
        ], [
            section("Invariance", [], [
                <p>
                    The default variance is invariance, meaning that two instances of one type with different
                    type arguments are unrelated, regardless of the relationship between the arguments passed in.
                </p>
            ]),
            section("Covariance", [], [
                <p>
                    Covariance means that if a type <CodePoint>A</CodePoint> subtypes <CodePoint>B</CodePoint> then
                    <CodePoint>I[A]</CodePoint> subtypes <CodePoint>I[B]</CodePoint>. This can be enabled by using the
                    subtype symbol in front of the type argument. A consequence of this variance is that you may only call 
                    members of the type which do not take parameters of the type parameter the argument corresponds to.
                </p>
            ]),
            section("Contravariance", [], [
                <p>
                    Contravariance means that if a type <CodePoint>A</CodePoint> subtypes <CodePoint>B</CodePoint> then
                    <CodePoint>I[B]</CodePoint> subtypes <CodePoint>I[A]</CodePoint>. This can be enabled by using the
                    supertype symbol in front of the type argument. A consequence of this variance is that you may only call 
                    members of the type which do not return value of the type parameter the argument corresponds to.
                </p>
            ])
        ])
    ])
])
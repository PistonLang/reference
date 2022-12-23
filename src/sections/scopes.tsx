import { AlgorithmSection, GrammarSection } from "../sections";

export const scopes = GrammarSection("Scopes", [], <>
    <p>
        Piston code is structurally comprised of a hierarchy of sections called scopes.
        Scopes define the accessibility and lifetimes of items defined within them, as well
        as a context which maps identifiers to particular set of items.
        There are two types of scopes: declaration scopes and expression scopes.
    </p>
</>, [
    GrammarSection("Declaration Scopes", [], <>
        <p>
            Declaration scopes are used for binding identifiers to items. An item is a
            general term which encompasses packages, properties, functions and types. Such scopes are:
        </p>
        <ul>
            <li>Packages</li>
            <li>Files</li>
            <li>The bodies of classes</li>
            <li>The bodies of traits</li>
            <li>Parameter lists</li>
        </ul>
        <p>
            As an identifier can be used either by itself or in a call, every identifer can be bound to
            either up to one type, up to one package or up to one property, and simulatenously it may be
            bound to zero or more functions and/or setters with differing parameters.
        </p>
        <p>
            Piston allows shadowing which is the ability for an already bound identifier to be bound to a new 
            item in a nested scope.
        </p>
    </>),
    GrammarSection("Expression Scopes", [], <>
        <p>
            Expression scopes define an expression which is to be evaluated at a particular point
            during the exection of a program. Such scopes are defined by:
        </p>
        <ul>
            <li>Functions</li>
            <li>Getters</li>
            <li>Setters</li>
            <li>Stored Properties</li>
        </ul>
    </>),
    GrammarSection("Overload Resolution", [], <>
        <p>
            As one identifier may be bound to multiple functions as well as one other type of item, 
            the compiler must resolve which overload is being used in order to determine the type of the
            corresponding expression. The two types of expressions which use an identifier are both
            handled in their own way. 
        </p>
        <p>
            Piston uses one of two algorithms that work within the context of a scope based on the type of
            expressions.
        </p>
    </>, [
        AlgorithmSection("Access Name Resolution Algorithm", <>
            <p>
                For a given scope context C and identifier I
            </p>
            <ol>
                <li>Return the subpackage, getter or type in the set that C maps I to if there is one.</li>
            </ol>
        </>, <>
            <p>
                This algorithm is recursively applied from the inner-most scope outwards on Identifier Expressions
                which are not immediately contained within Call Espressions, such that if there is no result for
                the current scope, the algorithm is applied on its parent scope.
            </p>
            <p>
                This algorithm is applied in the package scope of a package which is used in an Access Expression
                that is not directly contained within a Call Expression. Similarly, it is applied on the type scope
                of a value that is contained within such an expression.
            </p>
        </>),
        AlgorithmSection("Callable Name Resoltion Algorithm", <>
            <p>
                For a given scope context C, identifier I and list of arguments L.
            </p>
            <ol>
                <li>
                    A list of candidates is formed of all the functions in the set that C maps I to, whose
                    number of parameters matches the number of arguments in L (denoted as #L).
                </li>
                <li>
                    The list is trimmed such that a candidate remains if for every i, 0 &lt;= i &lt;= #L,
                    the type of L<sub>i</sub> is a subtype of the type of the i-th parameter.
                </li>
                <li>
                    If the list is empty, the first algorithm is applied to C and I and its result is returned.
                    Otherwise continue.
                </li>
                <li>
                    The candidates are sorted using the following algorithm on 2 candidates A and B
                    <ol>
                        <li>Let i initially be 0</li>
                        <li>If i is greater than #L, put A in front of B and stop the algorithm. Otherwise continue.</li>
                        <li>
                            If the type of the i-th parameter of A is equal to that of the i-th parameter of B, increment i and
                            and return to the previos step. Otheriwse continue.
                        </li>
                        <li>
                            If the type of the i-th parameter of A is a supertype of that of B, put B in front of A, otherwise
                            put A in front of B.
                        </li>
                    </ol>
                    It should be noted that generic parameters as treated as their type bounds. 
                </li>
                <li>
                    If there exists a candidate such that the previous sorting algorithm is undecisive when applied to
                    it and the first element, an error occurs. Otherwise, the first item is returned.
                </li>
            </ol>
        </>, <>
            <p>
                This algorithm is recursively applied from the inner-most scope outwards on Identifier Expressions
                which are immediately contained within Call Espressions, such that if there is no result for
                the current scope, the algorithm is applied on its parent scope.
            </p>
            <p>
                This algorithm is applied in the package scope of a package which is used in an Access Expression
                that is directly contained within a Call Expression. 
            </p>
            <p>
                This algorithm is applied to the type scope of a value which is the direct child of an
                Access Expression directly contained within a Call Expression, as well as expressoins which
                get resolved to such expressions, including Binary, Unary, Call and Call + Assignment Expressions.
            </p>
        </>),
        AlgorithmSection("Assignment Resolution Algorithm", <>
        <p>
            For a given scope context C, identifier I and expression E.
        </p>
        <ol>
            <li>
                A list of candidates is formed of all the settters in the set that C maps I to.
            </li>
            <li>
                The list is trimmed such that a candidate remains if the type of the parameter of the setter
                is a supertype of the type of E.
            </li>
            <li>
                The candidates are sorted such that a candidate A goes before candidate B if the type of the
                parameter of A is a subtype of the parameter of B
            </li>
            <li>
                If there exists a candidate such that the previous sorting algorithm is undecisive when applied to
                it and the first element, an error occurs. Otherwise, the first item is returned.
            </li>
        </ol>
    </>, <>
        <p>
            As can be seen, this is a variant of the previous algorithm, specialied for setters rather than functions.
        </p>
        <p>
            This algorithm is recursively applied from the inner-most scope outwards on Identifier Expressions
            which are immediately contained within Assignment Espressions, such that if there is no result for
            the current scope, the algorithm is applied on its parent scope.
        </p>
        <p>
            This algorithm is applied in the package scope of a package which is used in an Access Expression
            that is directly contained within am Assignment Expression. Similarly, it is applied on the type scope
            of a value that is contained within such an expression.
        </p>
    </>)
    ])
])
import defs from "../grammar/expressions";
import { CodePoint, section } from "../sections";

export const expressions = section("Expressions", [defs.Expression], [], [
    section("Term", [defs.Term], [
        <p>
            Terms are operands for binary operators.
        </p>
    ], [
        section("Identifier Expression", [defs.IdentifierExpression], [
            <p>
                You can use an identifier to reference a local or imported item or package with the corresponding name.
            </p>
        ]),
        section("Literal Expression", [defs.LiteralExpression]),
        section("This Expression", [defs.ThisExpression], [
            <p>
                You can use <CodePoint>this</CodePoint> inside of a class or trait to refer to the current
                instance.
            </p>
        ]),
        section("Super Expression", [defs.SuperExpression], [
            <p>
                You can use <CodePoint>super</CodePoint> to call the supertype's implementation of an item.
                In the case that there are multiple supertypes with such an implmentation, you can pass the
                exact supertype as a type argument.
            </p>
        ]),
        section("Nested Expression", [defs.NestedExpression], [
            <p>
                Every expression can be put in curly braces so it can be treated as a term.
            </p>
        ]),
        section("Access Expression", [defs.AccessExpression], [
            <p>
                You can put an identifier after a dot to access a member of a value or a subpackage of a package.
            </p>
        ]),
        section("Call Expression", [defs.CallExpression], [
            <p>
                To call a function you need to pass it arguments inside parentheses. It should be noted that
                this needs to be done on the exact same like, otherwise the parentheses will be treated as the
                start of a nested expression.
            </p>,
            <p>
                When used on a value, this calls its <CodePoint>apply</CodePoint> member function and when combined with
                an assignment this calls its <CodePoint>update</CodePoint> member function.
            </p>
        ]),
        section("Unary Expression", [defs.UnaryExpression], [
            <p>
                Unary expressions are applications of the unary operators 
                <CodePoint>+</CodePoint> amd <CodePoint>-</CodePoint> which correspond to calls
                to the member functions <CodePoint>unaryPlus</CodePoint> and <CodePoint>unaryMinus</CodePoint>.
            </p>,
            <p>
                It should be noted that the operator needs to be directly next to the term, with no whitespace
                in between, as that is what distinguishes there operators from their binary variants.
            </p>
        ]),
    ]),
    section("Binary Expression", [
        defs.TimesExpression, defs.PlusExpression, defs.RelationExpression, defs.EqualsExpression, 
        defs.AndExpression, defs.OrExpression
    ], [
        <p>
            All binary operators in Palm, aside for <CodePoint>&&</CodePoint> amd <CodePoint>||</CodePoint> correspond
            to certain member functions on the first operand. Namely
        </p>,
        <ul>
            <li><CodePoint> a * b</CodePoint> - <CodePoint>a.times(b)</CodePoint></li>
            <li><CodePoint> a / b</CodePoint> - <CodePoint>a.div(b)</CodePoint></li>
            <li><CodePoint> a + b</CodePoint> - <CodePoint>a.plus(b)</CodePoint></li>
            <li><CodePoint> a - b</CodePoint> - <CodePoint>a.minus(b)</CodePoint></li>
            <li><CodePoint> a &lt; b</CodePoint> - <CodePoint>a.compare(b) &lt; 0</CodePoint></li>
            <li><CodePoint> a &gt; b</CodePoint> - <CodePoint>a.compare(b) &gt; 0</CodePoint></li>
            <li><CodePoint> a &lt;= b</CodePoint> - <CodePoint>a.compare(b) &lt;= 0</CodePoint></li>
            <li><CodePoint> a &gt;= b</CodePoint> - <CodePoint>a.compare(b) &gt;= 0</CodePoint></li>
            <li><CodePoint> a == b</CodePoint> - <CodePoint>a.equals(b)</CodePoint></li>
            <li><CodePoint> a != b</CodePoint> - <CodePoint>a.equals(b).not</CodePoint></li>
        </ul>,
        <p>
            For an operator to be treated as a binary one, there needs to either be whitespace on both sides of it
            or no whitespace on either side of it.
        </p>
    ]),
    section("Assignment Expression", [defs.AssignExpression], [
        <p>
            You can use the <CodePoint>=</CodePoint> operator on an identifier or access expression to call
            the corresponding setter, assuming it exists. When use on a call expression, it calls the object's
            <CodePoint>update</CodePoint> function. All other cases are errors.
        </p>
    ]),
    section("Ternary Expression", [defs.TernaryExpression], [
        <p>
            The ternary operator is used for choosing which expression to evaluate based on a given value.
            Namely, if the value is <CodePoint>true</CodePoint>, the first expression will be evaluated,
            otherwise the second one.
        </p>
    ]),
])
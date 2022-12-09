import stmts from "../grammar/statements";
import { CodePoint, section } from "../sections";

export const properties = section("Properties", [], [
<p>
    Properties are a pair of a getter and, potentially, setter function bound to an identifier.
</p>
], [
    section("Getters", [stmts.GetterDef], [
    <p>
        Getters are functions which are called when a property is being accessed.
    </p>
    ]),
    section("Setters", [stmts.SetterDef], [
    <p>
        Setters are fuctions which are called when a property is being assigned a value.
    </p>
    ]),
    section("Stored Properties", [stmts.PropertyDef], [
    <p>
        Stored properties represent memory locations where references to values are stored.
        When using <CodePoint>val</CodePoint> a corresponding getter function is created and
        when using <CodePoint>var</CodePoint> a setter is also created.
    </p>,
    <p>
        Stored properties are initalized when the file is being loaded and when a class instance is created. Unlike functions,
        getters and setters, the order in which they are written matters as that is the order in which they will be
        evaluated. As such, you cannot use a stored property in the expression of another before it is initialized.
        That said it is not expected that indirect access by calling a function which uses it is checked.
    </p>
    ]),
])
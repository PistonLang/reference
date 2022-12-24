import stmts from "../grammar/statements";
import { CodePoint, GrammarSection } from "../sections";

const properties = GrammarSection("Properties", [], <>
    <p>
        Properties are a pair of a getter and, potentially, setter function bound to an identifier.
    </p>
</>, [
    GrammarSection("Getters", [stmts.GetterDef], <>
        <p>
            Getters are functions which are called when a property is being accessed.
        </p>
    </>),
    GrammarSection("Setters", [stmts.SetterDef], <>
        <p>
            Setters are fuctions which are called when a property is being assigned a value. Since setters
            have a parameter, they are able to be overloaded in the same manner as functions.
        </p>
    </>),
    GrammarSection("Stored Properties", [stmts.PropertyDef], <>
        <p>
            Stored properties represent memory locations where references to values are stored.
            When using <CodePoint>val</CodePoint> a corresponding getter function is created and
            when using <CodePoint>var</CodePoint> a setter is also created.
        </p>
        <p>
            Stored properties are initalized when the file is being loaded and when a class instance is created. Unlike functions,
            getters and setters, the order in which they are written matters as that is the order in which they will be
            evaluated. As such, stored property cannot be used in the expression of another stored property before it is initialized.
            That said it is not expected that indirect access by calling a function which uses it is checked.
        </p>
    </>),
])

export default properties
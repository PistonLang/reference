import { GrammarSection } from "../sections";

export const introduction = GrammarSection("Introduction", [], <>
    <p>
        This is a reference manual for the Piston programming language.
    </p>
    <p>
        Piston is a statically-typed general-prurpose programming language for the JVM with the goal of being 
        as simplistic yet as expressive as possible. To achieve this it drastically limits the JVM's nominal
        subtyping model in favour of a powerful type system which provides a more functional approach to processing data.
    </p>
</>, [
    GrammarSection("Scope", [], <>
        <p>
            This reference manual captures the core syntax and semantics of the Piston programming language. As such
            its target audience are implementors of and contributors to the Piston programming language.
        </p>
        <p>
            The manual does contain references to types from the standard library, though only those which are
            essential for the functioning of the language. In general, this is not a manual for Piston's
            standard library.
        </p>
        <p>
            Additionally, this manual is in no way a tutorial of sorts for the language.
        </p>
    </>),
    GrammarSection("Compatibility", [], <>
        <p>
            Currently the Piston programming language is very far from being complete and as a result this
            specification is highly prone to changes. Anyone wishing to contribute to the development of the language
            should stay up-to-date with all the changes on the specification's GitHub repository.
        </p>
    </>),
    GrammarSection("Notation", [], <>
        <p>
            Some sections of this document start with the syntax of the tokens/construct being documented
            using a notation similar to EBNF:
        </p>
        <ul>
            <li>Terminal sequences are eclosed in double quotes</li>
            <li>Ranges of characters are represented with '...' between two characters</li>
            <li>Angled brackets are used to describe special characters</li>
            <li>Character sequences can be enclosed in parentheses</li>
            <li>Optional character sequences are enclosed is square brackets</li>
            <li>Repeatable character sequences are enclosed in curly braces</li>
            <li>Multiple choices of sequences are separated using pipes</li>
        </ul>
        <p>
            All production names will be written in camel case, however a distinction will be made between
            tokens, which will start with an uppercase letter, and syntax nodes, which will start with a lowercase letter.
            As in PEG parsers, the unions prioritize the sequences listed first.
        </p>
    </>)
])
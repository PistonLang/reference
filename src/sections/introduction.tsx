import { GrammarSection } from "../sections";

export const introduction = GrammarSection("Introduction", [], <>
    <p>
        This document is a reference for the Palm programming language. It is not a tutorial for the language, nor
        a reference for the standard library - it is a reference meant primarily for implementors and contributors to
        the language.
    </p>
    <p>
        Palm is a statically-typed general-prurpose programming language for the JVM with the goal of being 
        as simplistic yet as expressive as possible. To achieve this it drastically limits the JVM's nominal
        subtyping model in favour of a powerful type system which provides a more functional approach to processing data.
    </p>
</>, [
    GrammarSection("Compatibility", [], <>
        <p>
            Currently the Palm programming language is very far from being complete and as a result this
            specification is highly prone to changes. If you wish to contribute to the development of the language,
            make sure to keep up with all the changes on the spectification's GitHub repository.
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
        </p>
    </>)
])
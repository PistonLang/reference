import { section } from "../sections";

export const introduction = section("Introduction", [], [
<p>
This document is a reference for the Palm programming language. It is not a tutorial for the language, nor
a reference for the standard library - it is a refernce meant primarily for implementors and contributors to
the language.
</p>,
], [
    section("Notation", [], [
    <p>
    Some sections in this document start with the syntax of the tokens/construct being documented
    using a notation used is similar to EBNF:
    </p>,
    <ul>
        <li>Terminal sequences are eclosed in double quotes</li>
        <li>Ranges of characters are represented with '...' between two characters</li>
        <li>Angled brackets are used to describe special characters</li>
        <li>Character sequences can be enclosed in parentheses</li>
        <li>Optional character sequences are enclosed is square brackets</li>
        <li>Repeatable character sequences are enclosed in curly braces</li>
        <li>Multiple choices of sequences are separated using pipes</li>
    </ul>,
    <p>
    All production names will be written in camel case, however a distinction will be made between
    tokens, which will start with an uppercase letter, and syntax nodes, which will start with a lowercase letter.
    </p>
    ])
])
import { section } from "../sections";
import base from '../grammar/base'

export const introduction = section("Introduction", [], [
<p>
This document is a reference for the Palm programming language. It is not a tutorial for the language, nor
a reference for the standard library - it is a refernce meant primarily for implementors and contributors to
the language.
</p>,
], [
    section("Notation", [], [
    <p>
    This document uses a notation similar to EBNF:
    </p>,
    <ul>
        <li>Terminal sequences are eclosed in single quotes</li>
        <li>Ranges of characters are represented with '...' between two characters</li>
        <li>Angled brackets are used to describe special characters</li>
        <li>Character sequences can be enclosed in parentheses</li>
        <li>Optional character sequences are enclosed is square brackets</li>
        <li>Repeatable character sequences are enclosed in curly braces</li>
        <li>Multiple choices of sequences are separated using pipes</li>
    </ul>,
    <p>
    All production names will be written in camel case, however a distinction will be made between
    names which begin with a lowercase letter, which represent terminal sequences and as such do not support
    having whitespace between their components, and names which begin with a capital letter, which represent
    parsed nodes and ignore whitespace between their compoents.
    </p>
    ])
])

export const inputRepresentation = section("Input Representation", [], [
<p>
Palm source code is represented in UTF-8. No canaonicalization is done to the input and thus uppercase
and lowercase letters are to be treated as distinct characters.
</p>
],
[
    section("Characters", [
    base.character, base.charCharacter, base.stringCharacter, base.commentCharacter,
    base.letter, base.digit, base.newline
    ], [
    <p>
    The given terms are used to describe specific unicde characters.
    </p>
    ])
])
import defs from "../grammar/tokens";
import { CodePoint, section } from "../sections";

export const tokens = section("Lexical Tokens", [defs.palmToken], [
    <p>
        Palm code is represented in a UTF-8 text format where every sequence of characters represents one of the above tokens.
        These tokens are then used for building syntax nodes.
    </p>
], [
    section("Keywords", [], [
        <p>
            In Palm thre are two types of keywords: strong and weak.
        </p>
    ], [
        section("Strong Keywords", [
            defs.classKw, defs.traitKw, defs.valKw, defs.varKw, defs.nullKw, 
            defs.trueKw, defs.falseKw, defs.thisKw, defs.superKw
        ]),
        section("Weak Keywords", [defs.whereKw, defs.getKw, defs.setKw])
    ]),
    section("Identifiers", [
        defs.letter, defs.digit, defs.underscore, defs.apostrophe, defs.identifierHead, defs.identifierTail, defs.identifier
    ], [
        <p>
            Identifiers are sequences of characters which are used for referencing types, variables, fuctions and packages.
            The aforementioned keywwords are not counted under this token type.
        </p>,
        <p>
            An identifier must start with a letter or underscore and can later also contain digits and apostrophes, as primes.
        </p>
    ]),
    section("Symbols", [
        defs.plus, defs.minus, defs.star, defs.slash, defs.eq, defs.eqEq, defs.eMarkEq, defs.less, defs.greater, 
        defs.lessEq, defs.greaterEq, defs.andAnd, defs.orOr, defs.dot, defs.qMark, defs.colon, defs.comma, defs.arrow, 
        defs.lParen, defs.rParen, defs.lBracket, defs.rBracket, defs.lBrace, defs.rBrace, defs.subtype, defs.supertype
    ], [
        <p>
            Given above are all the symbols that have a lexical meaning in the language.
        </p>
    ]),
    section("Ignorables", [
        defs.character, defs.whitespaceCharacter, defs.newline, defs.whitespace, defs.comment
    ], [
       <p>
            When constructing syntax nodes, whitespace and comments are to be ignored. The only form of whitespace that is to
            be treated diffrently are new lines.
        </p>
    ], [
        section("Comments", [defs.lineComment, defs.multiComment], [
            <p>
                Palm supports single-line comments, which begin with a <CodePoint>{'//'}</CodePoint> and multi-line comments,
                which start with a <CodePoint>{'/*'}</CodePoint> and end with a <CodePoint>{'*/'}</CodePoint>.
                Multi-line comments support nesting.
            </p>
        ]),
        section("New Lines", [defs.commaOrNL], [
            <p>
                In Palm, listz of items, whether declarations, parameters, arguments or expressions, use commas or new lines for 
                separation. It is only when there is a missing comma that new lines become significant characters. In every other case, 
                new lines, like the other whitespace characters, are ignored.
            </p>
        ])
    ]),
    section("Literals", [], [
        <p>
            Literals are sequences of characters which represent particular values. Palm has integer, floating-point, boolean, 
            character and string literals
        </p>
    ], [
        section("Integer Literals", [
            defs.binaryDigit, defs.decimalDigit, defs.hexDigit, defs.binaryBody, defs.decimalBody, defs.hexBody, 
            defs.binaryLiteral, defs.decimalBody, defs.hexLiteral, defs.intLiteral
        ], [
            <p>
                Integer literals represent values of type <CodePoint>Int32</CodePoint> or, when they surpass the
                bounds of <CodePoint>Int32</CodePoint>, they are of type <CodePoint>Int64</CodePoint>. 
                By default, the literals are in base 10, however, you can add a <CodePoint>0b</CodePoint> up front to make
                it a base 2 literal, or a <CodePoint>0x</CodePoint> to make it a base 16 literal.
            </p>
        ]),
        section("Float Literals", [defs.floatExponent, defs.floatLiteral], [
            <p>
                Floating-point literals represent values of type <CodePoint>Float64</CodePoint>. 
                They are in base 10 and support scientific notation.
            </p>
        ]),
        section("Boolean Literals", [defs.boolLiteral], [
            <p>
                Boolean literals represent values of type <CodePoint>Bool</CodePoint>.
            </p>
        ]),
        section("Char Literals", [defs.charCharacter, defs.charLiteral], [
            <p>
                Character literals represent values of type <CodePoint>Char</CodePoint>. Aside for regular characters,
                they also support certain escape characters. These include:
            </p>,
            <ul>
                <li><CodePoint>\n</CodePoint> - new line</li>
                <li><CodePoint>\t</CodePoint> - tab</li>
                <li><CodePoint>\v</CodePoint> - vertical</li>
                <li><CodePoint>\f</CodePoint> - form feed</li>
                <li><CodePoint>\r</CodePoint> - carriage return</li>
                <li><CodePoint>\\</CodePoint> - backslash</li>
                <li><CodePoint>\'</CodePoint> - single quote</li>
                <li><CodePoint>\"</CodePoint> - double quote</li>
            </ul>
        ]),
        section("String Literals", [defs.stringCharacter, defs.qoute, defs.stringLiteral], [
            <p>
                String literals represent values of type <CodePoint>String</CodePoint>. They are able to span multiple
                lines and support the same escape characters as character literals. That said, no whitespace elimination
                is done on the literal itself - that must be done with functions.
            </p>
        ]),
        section("Null Literals", [], [
            <p>
                The absence of a value can be represented using a <CodePoint>null</CodePoint> literal.
                It is a value of type <CodePoint>Nothing?</CodePoint>. 
            </p>
        ])
    ])
])
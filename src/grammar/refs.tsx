import { toRefs } from "../grammar";

export const exprs = toRefs([
    "NestedExpression",
    "AccessExpression",
    "CallExpression",
    "UnaryExpression",
    "ThisExpression",
    "SuperExpression",
    "IdentifierExpression",
    "LiteralExpression",
    "Term",
    "Expression",
    "TimesExpression",
    "PlusExpression",
    "RelationExpression",
    "EqualsExpression",
    "AndExpression",
    "OrExpression",
    "TernaryExpression",
    "AssignExpression",
] as const)

export const tokens = toRefs([
    "character",
    "charCharacter",
    "stringCharacter",
    "commentCharacter",
    "whitespaceCharacter",
    "letter",
    "digit",
    "lineComment",
    "multiComment",
    "comment",
    "newline",
    "commaOrNL",
    "identifier",
    "identifierHead",
    "identifierTail",
    "whitespace",
    "eof",
    "classKw",
    "traitKw",
    "defKw",
    'valKw',
    "varKw",
    "whereKw",
    "importKw",
    "getKw",
    "setKw",
    "thisKw",
    "superKw",
    "nullKw",
    "trueKw",
    "falseKw",
    "apostrophe",
    "qoute",
    "lParen",
    "rParen",
    "lBracket",
    "rBracket",
    "lBrace",
    "rBrace",
    "plus",
    "minus",
    "star",
    "slash",
    "andAnd",
    "orOr",
    "less",
    "greater",
    "lessEq",
    "greaterEq",
    "eq",
    "eqEq",
    "qMark",
    "eMarkEq",
    "colon",
    "subtype",
    "supertype",
    "arrow",
    "dot",
    "comma",
    "binaryDigit",
    "decimalDigit",
    "hexDigit",
    "decimalBody",
    "binaryBody",
    "hexBody",
    "decimalLiteral",
    "binaryLiteral",
    "hexLiteral",
    "floatExponent",
    "intLiteral",
    "floatLiteral",
    "boolLiteral",
    "escapedChar",
    "charLiteral",
    "stringLiteral",
    "underscore",
    "palmToken"
] as const)

export const stmts = toRefs([
    "FunctionParam",
    "FunctionParams",
    "FunctionDef",
    "PropertyDef",
    "SuperTypes",
    "ClassDef",
    "TraitDef",
    "GetterDef",
    "SetterDef",
    "Statement",
    "StatementBody",
    "StatementBlock",
    "FunctionLikeDef",
    "Import",
    "ImportPath",
    "ImportSegment",
    "ImportValue",
    "ImportGroup",
    "File"
] as const)

export const types = toRefs([
    "TypeInstance",
    "Identifier",
    "PathSegment",
    "TypePath",
    "TypeParams",
    "TypeArg",
    "TypeArgs",
    "TypeUnion",
    "WhereClause",
    "NullableType",
    "NestedType",
    "TypeBound"
] as const)
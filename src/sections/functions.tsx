import { CodePoint, GrammarSection } from "../sections";
import types from '../grammar/types'
import stmts from '../grammar/statements'

export const functions = GrammarSection("Functions", [
    types.Identifier, stmts.FunctionParam, stmts.FunctionParams, stmts.FunctionLikeDef, stmts.FunctionDef
], <>
    <p>
        Every function in Palm must have an identifer, a list of parameters and, aside for functions in traits, it
        must also contain an expression which gets evaluated every time it is called. Functions which return a value
        must also have a return type, otherwise it defaults to <CodePoint>Unit</CodePoint>.
    </p>
    <p>
        Function parameters in Palm are special immutable properties which hold the values passed into the function.
    </p>
    <p>
        Palm supports function overloading, meaning you are able to declare several functions with the same name,
        but with a different number and/or types of parameters. The names of the parameters and the return type of
        the function are not enough for them to be distinct.
    </p>
</>)
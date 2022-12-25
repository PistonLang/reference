import { CodePoint, GrammarSection } from "../sections";
import defs from "../grammar/functions";

const functions = GrammarSection(
  "Functions",
  [
    defs.Identifier,
    defs.FunctionParam,
    defs.FunctionParams,
    defs.FunctionLikeDef,
    defs.FunctionDef,
  ],
  <>
    <p>
      Every function in Piston must have an identifer, a list of parameters and,
      aside for functions in traits, it must also contain an expression which
      gets evaluated every time it is called. Functions which return a value
      must also have a return type, otherwise it defaults to{" "}
      <CodePoint>Unit</CodePoint>.
    </p>
    <p>
      Function parameters in Piston are special immutable properties which hold
      the values passed into the function.
    </p>
    <p>
      Piston supports function overloading, meaning several functions with the
      same name may be declared in a given scope, differing by the number and/or
      types of parameters. This is because, unlike other items within the
      language, functions are differentiated by their signature which is an
      ordered pair of their names and the types of their parameters. As a
      result, two functions would not be distinct if they only differ by their
      return type and/or the names of their parameters.
    </p>
  </>
);

export default functions;

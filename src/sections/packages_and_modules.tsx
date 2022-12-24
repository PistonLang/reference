import defs from "../grammar/statements";
import { GrammarSection } from "../sections";

const packageAndModules = GrammarSection("Packages and Modules", [], <>
    <p>
        Piston code is organized in modules, made up of packages, which consist of multiple files.
    </p>
</>, [
    GrammarSection("Modules", [], <>
        <p>
            A module is a single compilation unit. It may represent a library or an executable program.
        </p>
        <p>
            Modules are sort of a meta-concept in the language in the sense that they are not defined or
            referenced in Piston source code, but instead in a separate build system.
        </p>
    </>),
    GrammarSection("Packages", [], <>
        <p>
            Packages represent namespaces which can be used for grouping multiple declarations together.
        </p>
        <p>
            Every directory represents a package, with its subdirectories being its subpackages and
            all the declarations contained in its files belonging to it.
        </p>
    </>),
    GrammarSection("File", [defs.File], <>
        <p>
            Files are used for declaring functions, properties and types which belong to the package. 
            All of the stored properties are evaluated when an item from the file is first accessed.
        </p>
        <p>
            Within a file, all the items declared in the encapsulating package are directly accessible,
            as well as the items which are imported.
        </p>
    </>, [
        GrammarSection("Imports", [defs.ImportPath, defs.ImportSegment, defs.ImportGroup, defs.ImportValue, defs.Import], <>
            <p>
                Every Piston file can have a single import statement at the start of it which is used for
                binding identifiers to items declared in other packages. To do so, the path to every item
                is used with every identifier up to the item's name representing a subpackage or containing item of
                the previous one, starting from the root package. Additionally, if several items share the same
                starting path, the diverging sections of the path may be put inside curly braces after the shared starting path.
            </p>
        </>)
    ])
])

export default packageAndModules
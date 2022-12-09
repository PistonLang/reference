import defs from "../grammar/statements";
import { section } from "../sections";

export const packageAndModules = section("Packages and Modules", [], [
    <p>
        Palm code is organized in modules, made up of packages, which consist of multiple files.
    </p>
], [
    section("Modules", [], [
        <p>
            A module is a single compilation unit. It may represent a library or an executable program.
        </p>,
        <p>
            Modules are sort of a meta-concept in the language in the sense that they are not defined or
            referenced in Palm source code, but instead in a separate build system.
        </p>
    ]),
    section("Packages", [], [
        <p>
            Packages represent namespaces which can be used for grouping multiple declarations together.
        </p>,
        <p>
            Every directory represents a package, with its subdirectories being its subpackages and
            all the declarations contained in its files belonging to it.
        </p>
    ]),
    section("File", [defs.File], [
        <p>
            Files are used for declaring functions, properties and types which belong to the package. 
            All of the stored properties are evaluated when an item from the file is first accessed.
        </p>,
        <p>
            Within a file, all the items declared in the encapsulating package are directly accessible,
            as well as the items which are imported.
        </p>
    ], [
        section("Imports", [defs.ImportPath, defs.ImportSegment, defs.ImportGroup, defs.ImportValue, defs.Import], [
            <p>
                At the start of every file you import all of the items which you use from other packages.
                To do this, you use absolute paths where every intermdiate identifier represents a subpackage
                and the final one may be a package or item. When importing multiple items and/or subpackages
                with the same starting path, you may put them all in curly braces after a colon.
            </p>
        ])
    ])
])
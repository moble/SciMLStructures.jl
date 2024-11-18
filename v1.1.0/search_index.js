var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Modules = [SciMLStructures]","category":"page"},{"location":"api/#SciMLStructures.AbstractPortion","page":"API","title":"SciMLStructures.AbstractPortion","text":"An AbstractPortion object to be used in the SciMLStructures.jl interfaces, i.e. canonicalize(::AbstractPortion, p::T1) or replace!(::AbstractPortion, p::T1).\n\n\n\n\n\n","category":"type"},{"location":"api/#SciMLStructures.Caches","page":"API","title":"SciMLStructures.Caches","text":"The caches portion of the SciMLStructure, i.e. the caches which are meant to allow for writing the model function without allocations.\n\nRules for caches:\n\nCaches should be a mutable object.\nCaches should not assume any previous value in them. All values within the cache should be written into in the f cal that it is used from.\n\nFor making caches compatible with automatic differentiation, see PreallocationTools.jl.\n\n\n\n\n\n","category":"type"},{"location":"api/#SciMLStructures.Constants","page":"API","title":"SciMLStructures.Constants","text":"The constant portion of the SciMLStructure, i.e. the parameters which are meant to be constant with respect to optimization.\n\n\n\n\n\n","category":"type"},{"location":"api/#SciMLStructures.Discrete","page":"API","title":"SciMLStructures.Discrete","text":"The discrete portion of the SciMLStructure\n\n\n\n\n\n","category":"type"},{"location":"api/#SciMLStructures.Tunable","page":"API","title":"SciMLStructures.Tunable","text":"The tunable portion of the SciMLStructure, i.e. the parameters which are meant to be optimized.\n\n\n\n\n\n","category":"type"},{"location":"api/#SciMLStructures.canonicalize","page":"API","title":"SciMLStructures.canonicalize","text":"canonicalize(::AbstractPortion, p::T1) -> values::T2, repack, aliases::Bool\n\nThe core function of the interface is the canonicalize function. canonicalize allows the user to define to the solver how to represent the given \"portion\" in a standard AbstractVector type which allows for interfacing with standard tools like linear algebra in an efficient manner. The type of portions which are defined are:\n\nTunable: the tunable values/parameters, i.e. the values of the structure which are supposed to be considered   non-constant when used in the context of an inverse problem solve. For example, this is the set of   parameters to be optimized during a parameter estimation of an ODE.\nTunable parameters are expected to return an AbstractVector of unitless values.\nTunable parameters are expected to be constant during the solution of the ODE.\nConstants: the values which are to be considered constant by the solver, i.e. values which are not estimated   in an inverse problem and which are unchanged in any operation by the user as part of the solver's usage.\nCaches: the stored cache values of the struct, i.e. the values of the structure which are used as intermediates   within other computations in order to avoid extra allocations.\nDiscrete: the discrete portions of the state captured inside of the structure. For example, discrete values   stored outside of the u in the parameters to be modified in the callbacks of an ODE.\nAny parameter that is modified inside of callbacks should be considered Discrete.\n\nDefinitions for Base Objects\n\nVector: returns an aliased version of itself as Tunable, and an empty vector matching type for Constants,   Caches, and Discrete.\nArray: returns the vec(p) aliased version of itself as Tunable, and an empty vector matching type for Constants,   Caches, and Discrete.\n\n\n\n\n\n","category":"function"},{"location":"api/#SciMLStructures.hasportion","page":"API","title":"SciMLStructures.hasportion","text":"hasportion(::AbstractPortion, p)::Bool\n\nDenotes whether a portion is used in a given definition of a SciMLStructure. If false, then it's expected that the canonical values are nothing.\n\n\n\n\n\n","category":"function"},{"location":"api/#SciMLStructures.ismutablescimlstructure","page":"API","title":"SciMLStructures.ismutablescimlstructure","text":"Returns whether the SciMLStructure object is mutable and thus compatible with the interface functions that require mutation. Note that this is not mutable in the sense of the Julia type, rather mutable in the sense of AbstractPortion replacement, i.e. replace!\n\n\n\n\n\n","category":"function"},{"location":"api/#SciMLStructures.isscimlstructure-Tuple{Any}","page":"API","title":"SciMLStructures.isscimlstructure","text":"Returns whether the object satisfies the SciMLStructure interface. Defaults to false and types are required to opt-into the interface.\n\n\n\n\n\n","category":"method"},{"location":"api/#SciMLStructures.replace","page":"API","title":"SciMLStructures.replace","text":"replace(::AbstractPortion, p::T1, new_values) -> p::T1\n\nEquivalent to canonicalize(::AbstractPortion, p::T1)[2](new_values), though allowed to optimize and not construct intermediates. For more information on the arguments, see canonicalize.\n\n\n\n\n\n","category":"function"},{"location":"api/#SciMLStructures.replace!","page":"API","title":"SciMLStructures.replace!","text":"replace!(::AbstractPortion, p::T1, new_values)::Nothing\n\nEquivalent to canonicalize(::AbstractPortion, p::T1)[2](new_values), though done in a mutating fashion and is allowed to optimize and not construct intermediates. Requires a mutable SciMLStructure. For more information on the arguments, see canonicalize.\n\n\n\n\n\n","category":"function"},{"location":"interface/#The-SciMLStructure-Interface","page":"The SciMLStructure Interface","title":"The SciMLStructure Interface","text":"","category":"section"},{"location":"interface/#Core-Interface-Definitions","page":"The SciMLStructure Interface","title":"Core Interface Definitions","text":"","category":"section"},{"location":"interface/#isscimlstructure-Definition","page":"The SciMLStructure Interface","title":"isscimlstructure Definition","text":"","category":"section"},{"location":"interface/","page":"The SciMLStructure Interface","title":"The SciMLStructure Interface","text":"isscimlstructure(p)::Bool\nismutablescimlstructure(p)::Bool","category":"page"},{"location":"interface/","page":"The SciMLStructure Interface","title":"The SciMLStructure Interface","text":"Returns whether the object satisfies the SciMLStructure interface. Defaults to false and types are required to opt-into the interface.","category":"page"},{"location":"interface/#canonicalize-Definition","page":"The SciMLStructure Interface","title":"canonicalize Definition","text":"","category":"section"},{"location":"interface/","page":"The SciMLStructure Interface","title":"The SciMLStructure Interface","text":"canonicalize(::AbstractPortion, p::T1) -> values::T2, repack, aliases::Bool\nrepack(new_values::T2) -> p::T1 # with values replaced with new_values\nreplace(::AbstractPortion, p::T1, new_values) -> p::T1\nreplace!(::AbstractPortion, p::T1, new_values)::Nothing # Requires mutable","category":"page"},{"location":"interface/#Portion-Definitions","page":"The SciMLStructure Interface","title":"Portion Definitions","text":"","category":"section"},{"location":"interface/","page":"The SciMLStructure Interface","title":"The SciMLStructure Interface","text":"The core function of the interface is the canonicalize function. canonicalize allows the user to define to the solver how to represent the given \"portion\" in a standard AbstractVector type which allows for interfacing with standard tools like linear algebra in an efficient manner. The type of portions which are defined are:","category":"page"},{"location":"interface/","page":"The SciMLStructure Interface","title":"The SciMLStructure Interface","text":"Tunable: the tunable values/parameters, i.e. the values of the structure which are supposed to be considered non-constant when used in the context of an inverse problem solve. For example, this is the set of parameters to be optimized during a parameter estimation of an ODE.\nTunable parameters are expected to return an AbstractVector of unitless values.\nTunable parameters are expected to be constant during the solution of the ODE.\nConstants: the values which are to be considered constant by the solver, i.e. values which are not estimated in an inverse problem and which are unchanged in any operation by the user as part of the solver's usage.\nCaches: the stored cache values of the struct, i.e. the values of the structure which are used as intermediates within other computations in order to avoid extra allocations.\nDiscrete: the discrete portions of the state captured inside of the structure. For example, discrete values stored outside of the u in the parameters to be modified in the callbacks of an ODE.\nAny parameter that is modified inside of callbacks should be considered Discrete.","category":"page"},{"location":"interface/#Definitions-for-Base-Objects","page":"The SciMLStructure Interface","title":"Definitions for Base Objects","text":"","category":"section"},{"location":"interface/","page":"The SciMLStructure Interface","title":"The SciMLStructure Interface","text":"Vector: returns an aliased version of itself as Tunable, and an empty vector matching type for Constants, Caches, and Discrete.\nArray: returns the vec(p) aliased version of itself as Tunable, and an empty vector matching type for Constants, Caches, and Discrete.","category":"page"},{"location":"#SciMLStructures.jl:-Structured-Objects-for-Non-State-Values-in-System-Solvers","page":"Home","title":"SciMLStructures.jl: Structured Objects for Non-State Values in System Solvers","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"SciMLStructures.jl defines a generic interface for interacting with solvers, estimation tooling, and more within the SciML ecosystem and the greater Julia universe. SciMLStructures.jl defines a structured enforceable interface which allows for solvers to be able to handle custom user types in an efficient and generalized way.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install SciMLStructures.jl, use the Julia package manager:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg\nPkg.add(\"SciMLStructures\")","category":"page"},{"location":"#Contributing","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Please refer to the SciML ColPrac: Contributor's Guide on Collaborative Practices for Community Packages for guidance on PRs, issues, and other matters relating to contributing to SciML.\nSee the SciML Style Guide for common coding practices and other style decisions.\nThere are a few community forums:\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Slack\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Zulip\nOn the Julia Discourse forums\nSee also SciML Community page","category":"page"},{"location":"#Reproducibility","page":"Home","title":"Reproducibility","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"<details><summary>The documentation of this SciML package was built using these direct dependencies,</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg # hide\nPkg.status() # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"<details><summary>and using this machine and Julia version.</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using InteractiveUtils # hide\nversioninfo() # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"<details><summary>A more complete overview of all dependencies and their versions is also provided.</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg # hide\nPkg.status(; mode = PKGMODE_MANIFEST) # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using TOML\nusing Markdown\nversion = TOML.parse(read(\"../../Project.toml\", String))[\"version\"]\nname = TOML.parse(read(\"../../Project.toml\", String))[\"name\"]\nlink_manifest = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n                \"/assets/Manifest.toml\"\nlink_project = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n               \"/assets/Project.toml\"\nMarkdown.parse(\"\"\"You can also download the\n[manifest]($link_manifest)\nfile and the\n[project]($link_project)\nfile.\n\"\"\")","category":"page"}]
}

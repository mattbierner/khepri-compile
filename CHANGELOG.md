# ChangeLog #

## 1.4.0 - May 15, 2015
* Added support for reserved word members and object literals.
** `a.try(x)` translates to `a["try"](x)` for older interpreters.
* Better inlining of working assignment expression.

## 1.3.6 - May 11, 2015
* Fixed reverse pipe not defined as builtin symbol.

## 1.3.5 - April 24, 2015
* Fixed recursive mutable variable declaration functions inlining forever.
* Added rewriting for equality expressions to inlining pass to produce better code.

## 1.3.4 - Sep 30, 2014
* Fixed delete expressions.

## 1.3.3 - Sep 25, 2014
* Fixed bug where compiler would inline indirect recursive calls forever.

## 1.3.2 - Sep 23, 2014
* Fixed bug causing Application expression to not be rewritten correctly.

## 1.3.1 - Sep 23, 2014
* Fixed immutable assignments in chained assignment statements not propagating
  immutablity correctly, and therefore not taking full advantage of constant propagating.
* Relaxed some restrictions on working binding prop.

## 1.3.0 - Sep 22, 2014
* Support for identifier alias exports.
* Support for with and try body lambdas.
* Restricted bindings so that they may only be marked immutable if they have
  not previously been mutated in any enclosed scope.
* Better performance of slice unpacks.
** For inlined functions with know args targets, results in no call overhead.
* Added `<<|` and `|>>` to apply a function to an array of args.
** `var (<<|) = \f args -> f.apply(null, args);`
** `var (|>>) = \args f -> f.apply(null, args);`

## 1.2.2 - Sep 9, 2014
* Temp fix for translation stage blowing up call stack for large programs.

## 1.2.1 - Sep 8, 2014
* Fixed node bypassing reachable prune stage.

## 1.2.0 - Sep 8, 2014
* Added the checked operator `??`:
** Pseudo code is: `var (??) := \o f -> o && f o;`
** Allows writing safe member accessors: `o??.x`
** RHS lazily evaluated.
* Removed checked member expressions.
* Added support for generalized dot expressions
** These are unary functions that operate on a object: `.x` is `\o -> o.x`
** Dot expressions may contain any call or accessor: `.x.f(1 + 2).(computed)`
** Can be used anywhere: `.type \> (=== 'x')`

## 1.1.0 - Sep 7, 2014
* Added support for checked member expressions `object.?property`.
** Ensures that base can be accessed, returning `object && object.property`.
** Will only evaluate base at most once.
** Supports computed members too.
** In a member chain, all values to the right of a checked property are implicitly
  checked. `a.?b.c` === `a.?b.?c`;
* Added support for checked object and array patterns `\?{x b}`.
** Ensures that base is a valid object before evaluating all child elements.
* All sub patterns of a checked pattern are implicitly checked.
* Add checked member operator `(.?)`.

## 1.0.6 - Sep 4, 2014
* Fixed assignment constant propogation to be invalidated after an assignment
  takes place in an inner scope.

## 1.0.5 - July 31, 2014
* Fixed lexical check not including `new` operator in initial state.

## 1.0.4 - July 30, 2014
* Fixed package compiling error cause by changes to Khepri-ast that were 
  incorrectly synced.

## 1.0.2 - June 15, 2014
* Fixed operators with `?` not generating correct names.
* Fixed not erroring on reassignment of built-in immutable ops.
** Local hiding of built-in ops ok

## 1.0.1 - May 12, 2014
* Fixed identifier operators like `instanceof` being undefined.

## 1.0.0 - May 10, 2014
* Added support for custom prefix and infix operators.
* Revised how flipped binary operators are implemented to require fewer builtins.

## 0.5.13 - May 5, 2014
* Improved error message for undeclared identifier to only give start location
  instead of entire range of identifier.

## 0.5.12 - May 5, 2014
* Updated to khepri-ast V3.10

## 0.5.11 - April 30, 2014
* Fixed many issues with renaming of unpacked values, causing errors on when inlined
* Better code generation when using import patterns.
** Will prune unused values unpacked from an import.

## 0.5.10 - April 23, 2014
* Fixed composen potentially be inlined incorrectly when it is not the first
  function called.
* Fixed an inlining issue.

## 0.5.9 - April 19, 2014
* Restored limited pruning of bindings in inline stage so curry expressions are
  better inlined. 

## 0.5.8 - April 17, 2014
* Prune arguments binding if unused.

## 0.5.7 - April 17, 2014
* Fixed bug with inline that could cause non local ids to get renamed when
  function is inlined into a non local context.
* Restored accidentally commented out reachable pass.

## 0.5.6 - April 17, 2014
* Fixed inlining of compose when capturing mutable members.

## 0.5.5 - April 16, 2014
* Revert to not prune assignments since this is broken for certain edge cases.

## 0.5.4 - April 16, 2014
* Fixed `var f := \-> let y -> y;` with local bindings being inlined incorrectly.
* Improved inlining for fns like `var f := \x -> \y -> x + y;  f 1 2;` to just
  output `3`.

## 0.5.3 - April 16, 2014
* Fixed bug that could cause the arguments unpack of an inlined function to be
  pruned.
* Improvements to constant folding of non-immutable bindings.

## 0.5.2 - April 15, 2014
* Added support to inline call of lambda that uses arguments object.
* Don't count assignment in reachability.

## 0.5.1 - April 13, 2014
* Performance improvements.
** Compiler should be around 2x faster or better.

## 0.5.0 - April 10, 2014
* Non computed member operator to function.
* Added support for marking previously mutable binding immutable with `:=`.
** Can be used for declarations and package exports.
** Must take place in same scope as declaration.
* Better generated code when an argument to an inlined function is not provided,
  so it evaluates to undefined.
** `var f := \x -> x.x; f();` will output `undefined.x;`

## 0.4.1 - April 8, 2014
* Restored support for unnamed ellipsis pattern.

## 0.4.0 - April 8, 2014
* Added support for slice unpacks.

## 0.3.18 - April 7, 2014
* Fixed AMD package generation for imports.

## 0.3.17 - April 7, 2014
* Globals pruned if inlining makes them unreachable.
** `(+, 1);` generates `\y -> y + 1` with no `_add`
** While `(+)` generates `var __add = \x y -> x + y; __add;`
* Fixed potentially incorrect normalization of let bindings with a let expression
  value.
* Unused declarators without inits can also be pruned.

## 0.3.15 - April 6, 2014
* Fixed globals being marking unreachable.

## 0.3.14 - April 6, 2014
* Fixed package with imports.

## 0.3.13 - April 6, 2014
* Basic unreachable binding pruning.
** Compose now should have same overhead as a `compose` function in the worst case,
  but multi composes can be optimized to a single set of potentially inlined function calls.
* Unused variable elimination.

## 0.3.12 - April 5, 2014
* Restored builtin inlining.

## 0.3.11 - April 5, 2014
* Improvements to inlining.
* Restored zero overhead for call of curry.

## 0.3.10 - March 29, 2014
* Fixed inlining of recursive curry with multiple args.

## 0.3.9 - March 29, 2014
* Better generated bindings when working with numbers.
* Const string member access inline.

## 0.3.8 - March 29, 2014
* Improvements to inlining and constant folding.
* Allow recursive bindings to be inlined.
** Recursive inline expansion fix (instead of just disallowing) to a fixed depth.

## 0.3.7 - March 29, 2014
* Fixed function identifier not being renamed correctly.

## 0.3.7 - March 28, 2014
* Fixed possibly incorrect translation of names after inlining.
* Fixed not inlining some constants.

## 0.3.6 - March 28, 2014
* Fix for inling with too few args crashing.
* Fixed logical ops not registering alised names.

## 0.3.5 - March 28, 2014
* Each Operators converted to functions generate a single definition per file.
** Inlining can then expand these to be more efficent for calls and curries.
* Improvements to inlining.
* Better compose expression code generated.

## 0.3.4 - March 27, 2014
* Fixed potentially incorrect inlining of named functions.
* Better generated code for call of curried expression.
* Fixed incorrect AMD code generated when using Sink imports as targets of imports.
* Slightly better code generated for compose expressions.
* Fixed inlined curried expression potentially not capturing value of immutable
  binding, but instead using regular uncaptured identifier that can changed values.

## 0.3.3 - March 27, 2014
* Fixed AMD packages using global `require` instead of string `'require'` for imports.
* Improvements to constant folding.
* Fixed curry of function expression inlining potentially discarding arguments.

## 0.3.2 - March 25, 2014
* Fixed reserved identifiers like `require` potentially being hidden by user
  identifiers.

## 0.3.1 - March 24, 2014
* Fixed stack issue from `akh`.

## 0.3.0 - March 24, 2014
* Added code support for flipped binary ops `(_/)`
* Added support for operator to function for `new` and `@`.

## 0.2.4 - March 23, 2014
* Fixed static declarations potentially being renamed.
* Optimized call of curry `f @ 1 @ 2 3` to generate `f(1, 2, 3)`. This pattern is
  useful if you want to omit parentheses when calling a multi argument function.

## 0.2.3 - March 21, 2014
* Recompile from bad compile with old version of Khepri.

## 0.2.2 - March 21, 2014
* Fixed programs and packages not introducing a new scope, leading to potential
  name conflicts with globals.
* Fixed node packages silently discarding non import bindings.

## 0.2.1 - March 19, 2014
* Fixed not using tail calls for khepri_peep.

## 0.2.0 - March 19, 2014
* Added support for dot to function.

## 0.1.0 - March 4, 2014
* Added package export alias support.
* Added package module export support.

## 0.0.0 - March 2, 2014
* Branch from main-khepri

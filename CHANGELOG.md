# ChangeLog #

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

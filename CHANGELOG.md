# ChangeLog #

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

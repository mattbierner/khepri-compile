# ChangeLog #

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

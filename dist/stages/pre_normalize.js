/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/pre_normalize.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/error", "bes/object", "../normalize/pre_normalize"], (function(require, exports,
    Error, __o, pre_normalize) {
    "use strict";
    var normalize, setProperty = __o["setProperty"];
    (normalize = (function(options, input) {
        var tree = input["tree"];
        return Error.of(setProperty(input, "tree", pre_normalize.normalize(tree)));
    }));
    return normalize;
}));
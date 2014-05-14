/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/post_normalize.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bes/object", "akh/error", "../normalize/post_normalize"], (function(require, exports,
    __o, Error, post_normalize) {
    "use strict";
    var optimize, setProperty = __o["setProperty"];
    (optimize = (function(input) {
        var tree = input["tree"],
            data = input["data"];
        return Error.of(setProperty(input, "tree", post_normalize.normalize(tree, data)));
    }));
    return optimize;
}));
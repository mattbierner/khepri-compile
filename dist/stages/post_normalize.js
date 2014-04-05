/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/post_normalize.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/object", "akh/error", "../post_normalize"], (function(require, exports, __o, Error,
    post_normalize) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize;
    (optimize = (function(input) {
        var tree = input["tree"],
            data = input["data"];
        return Error.of(setProperty(input, "tree", post_normalize.normalize(tree, data)));
    }));
    return optimize;
}));
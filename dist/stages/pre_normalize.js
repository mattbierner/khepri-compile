/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/pre_normalize.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/error", "../pre_normalize"], (function(require, exports, Error, pre_normalize) {
    "use strict";
    var normalize;
    (normalize = (function(__o) {
        var options = __o["options"],
            tree = __o["tree"];
        return Error.of(({
            "options": options,
            "tree": pre_normalize.normalize(tree)
        }));
    }));
    return normalize;
}));
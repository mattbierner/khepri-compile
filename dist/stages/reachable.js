/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/reachable.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/object", "akh/error", "../reachable/reachable"], (function(require, exports, __o,
    Error, removeUnreachable) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize, x = Error.of;
    (optimize = (function(z) {
        var tree;
        return x(((tree = z["tree"]), setProperty(z, "tree", removeUnreachable(tree))));
    }));
    return optimize;
}));
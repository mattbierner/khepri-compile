/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/reachable.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bes/object", "akh/error", "../reachable/reachable"], (function(require, exports, __o,
    Error, removeUnreachable) {
    "use strict";
    var optimize, setProperty = __o["setProperty"],
        x = Error.of;
    (optimize = (function(z) {
        var tree;
        return x(((tree = z["tree"]), setProperty(z, "tree", removeUnreachable(tree))));
    }));
    return optimize;
}));
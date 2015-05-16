/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/reachable.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bes/object", "akh/error", "../reachable/reachable"], (function(require, exports, __o,
    Error, removeUnreachable) {
    "use strict";
    var optimize, setProperty = __o["setProperty"];
    (optimize = (function(options, input) {
        var tree = input["tree"];
        return Error.of(setProperty(input, "tree", removeUnreachable(tree, (options && options.prune))));
    }));
    return optimize;
}));
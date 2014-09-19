/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/closure.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "../fun", "../ast"], (function(require, exports, __o, __o0) {
    "use strict";
    var updateClosure, contains = __o["contains"],
        getLocals = __o0["getLocals"],
        setLocals = __o0["setLocals"];
    (updateClosure = (function(f, node, list) {
        var closure = getLocals(node),
            closure0 = closure.map((function(x) {
                return (contains(list, x) ? f(x) : x);
            }));
        return setLocals(closure0, node);
    }));
    (exports["updateClosure"] = updateClosure);
}));
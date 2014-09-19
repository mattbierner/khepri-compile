/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/closure.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("../fun"),
    __o0 = require("../ast"),
    updateClosure, contains = __o["contains"],
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
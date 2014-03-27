/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/traverse.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("neith")["zipper"],
    children = __o["children"],
    __o0 = require("nu-stream")["stream"],
    map = __o0["map"],
    toArray = __o0["toArray"],
    __o1 = require("akh")["base"],
    next = __o1["next"],
    seqa = __o1["sequencea"],
    seq = __o1["sequence"],
    traverse;
(traverse = (function(m, op) {
    return op(m.inspect(children)
        .chain((function(list) {
            return seqa((list ? toArray(map((function(__o) {
                var key = __o["key"];
                return seq(m.child(key), traverse(m, op), m.up);
            }), list)) : [m.of(null)]));
        })));
}));
(module.exports = traverse);
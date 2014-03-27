/*
 * THIS FILE IS AUTO GENERATED from 'lib/traverse.kep'
 * DO NOT EDIT
*/define(["require", "exports", "neith/zipper", "nu-stream/stream", "akh/base"], (function(require, exports, __o, __o0,
    __o1) {
    "use strict";
    var children = __o["children"],
        map = __o0["map"],
        toArray = __o0["toArray"],
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
    return traverse;
}));
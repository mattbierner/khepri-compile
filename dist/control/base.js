/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/control/base.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "../fun"], (function(require, exports, __o) {
    "use strict";
    var constant = __o["constant"],
        reduce = __o["reduce"],
        next, seqa, seq, binary;
    (next = (function(p, q) {
        return p.chain(constant(q));
    }));
    (seqa = (function(arr) {
        return reduce(arr, next);
    }));
    (seq = (function() {
        var args = arguments;
        return seqa(args);
    }));
    (binary = (function(a, b, f) {
        return a.chain((function(x) {
            return b.chain((function(y) {
                return f(x, y);
            }));
        }));
    }));
    (exports["next"] = next);
    (exports["seqa"] = seqa);
    (exports["seq"] = seq);
    (exports["binary"] = binary);
}));
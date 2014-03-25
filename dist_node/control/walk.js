/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/control/walk.kep'
 * DO NOT EDIT
*/
"use strict";
var zipper = require("neith")["zipper"],
    __o = require("akh")["base"],
    next = __o["next"],
    walk;
(walk = (function(m, pre, post) {
    return next(pre, m.get.chain((function(t) {
        if (zipper.isLeaf(t)) {
            var loop = next(post, m.get.chain((function(t) {
                if (zipper.isLast(t)) {
                    if (zipper.isRoot(t)) return m.of(null);
                    return next(m.up, loop);
                } else {
                    return next(m.right, walk(m, pre, post));
                }
            })));
            return loop;
        }
        return next(m.down, walk(m, pre, post));
    })));
}));
(module.exports = walk);
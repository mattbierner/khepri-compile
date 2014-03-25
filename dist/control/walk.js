/*
 * THIS FILE IS AUTO GENERATED from 'lib/control/walk.kep'
 * DO NOT EDIT
*/define(["require", "exports", "neith/zipper", "akh/base"], (function(require, exports, zipper, __o) {
    "use strict";
    var next = __o["next"],
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
    return walk;
}));
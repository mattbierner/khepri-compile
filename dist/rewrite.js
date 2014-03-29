/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/rewrite.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/base", "akh/unique", "akh/trans/state", "zipper-m/trans/zipper", "zipper-m/walk",
    "./fun"
], (function(require, exports, __o, Unique, StateT, ZipperT, walk, fun) {
    "use strict";
    var next = __o["next"],
        seq = __o["sequence"],
        seqa = __o["sequencea"],
        UP, DOWN, Rewriter, rewrite;
    (UP = true);
    (DOWN = false);
    (Rewriter = (function() {
        var self = this;
        (self.peepholes = []);
    }));
    (Rewriter.prototype.add = (function(types, up, condition, f) {
        var self = this,
            entry = ({
                "condition": condition,
                "map": f,
                "up": up
            });
        types.forEach((function(type) {
            (self.peepholes[type] = (self.peepholes[type] ? fun.concat(self.peepholes[type],
                entry) : [entry]));
        }));
    }));
    (Rewriter.prototype.upTransforms = (function(node) {
        var self = this;
        return ((node && self.peepholes[node.type]) || [])
            .filter((function(x) {
                return (x.up && x.condition(node));
            }));
    }));
    (Rewriter.prototype.downTransforms = (function(node) {
        var self = this;
        return ((node && self.peepholes[node.type]) || [])
            .filter((function(x) {
                return ((!x.up) && x.condition(node));
            }));
    }));
    var transform = (function(m, node, transforms) {
        return (transforms.length ? seqa(transforms.map((function(x) {
            return x.map;
        }))) : m.of(null));
    });
    (Rewriter.prototype.transform = (function(m) {
        var self = this;
        return m.node.chain((function(node) {
            return transform(m, node, self.downTransforms(node));
        }));
    }));
    (Rewriter.prototype.transformPost = (function(m) {
        var self = this;
        return m.node.chain((function(node) {
            return transform(m, node, self.upTransforms(node));
        }));
    }));
    (rewrite = (function(m, rewitter) {
        return next(walk(m, rewitter.transform(m), rewitter.transformPost(m)), m.node);
    }));
    (exports["UP"] = UP);
    (exports["DOWN"] = DOWN);
    (exports["Rewriter"] = Rewriter);
    (exports["rewrite"] = rewrite);
}));
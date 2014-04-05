/*
 * THIS FILE IS AUTO GENERATED from 'lib/rewritter.kep'
 * DO NOT EDIT
*/define(["require", "exports", "neith/zipper", "neith/tree", "neith/walk", "./fun"], (function(require, exports, zipper,
    tree, __o, fun) {
    "use strict";
    var walk = __o["walk"],
        UP, DOWN, Rewritter, rewrite;
    (UP = true);
    (DOWN = false);
    (Rewritter = (function() {
        var self = this;
        (self.peepholes = []);
    }));
    (Rewritter.prototype.add = (function(type, up, condition, f) {
        var self = this;
        if (Array.isArray(type)) return type.map((function(x) {
            return self.add(x, up, condition, f);
        }));
        var entry = ({
            "condition": condition,
            "map": f,
            "up": up
        });
        (self.peepholes[type] = (self.peepholes[type] ? fun.concat(self.peepholes[type], entry) : [
            entry
        ]));
    }));
    (Rewritter.prototype.upTransforms = (function(node) {
        var self = this;
        return ((node && self.peepholes[node.type]) || [])
            .filter((function(x) {
                return (x.up && x.condition(node));
            }));
    }));
    (Rewritter.prototype.downTransforms = (function(node) {
        var self = this;
        return ((node && self.peepholes[node.type]) || [])
            .filter((function(x) {
                return ((!x.up) && x.condition(node));
            }));
    }));
    var transform = (function(ctx, transforms) {
        return (transforms.length ? tree.modifyNode((function(node) {
            return transforms.reduce((function(p, c) {
                return c.map(p);
            }), node);
        }), ctx) : ctx);
    });
    (Rewritter.prototype.transform = (function(ctx) {
        var self = this,
            node = tree.node(ctx);
        return transform(ctx, self.downTransforms(node));
    }));
    (Rewritter.prototype.transformPost = (function(ctx) {
        var self = this,
            node = tree.node(ctx);
        return transform(ctx, self.upTransforms(node));
    }));
    var opt = (function(rewritter, ctx) {
        return walk(rewritter.transform.bind(rewritter), rewritter.transformPost.bind(rewritter), ctx);
    });
    (rewrite = (function(rewitter, ctx) {
        return tree.node(zipper.root(opt(rewitter, ctx)));
    }));
    (exports["UP"] = UP);
    (exports["DOWN"] = DOWN);
    (exports["Rewritter"] = Rewritter);
    (exports["rewrite"] = rewrite);
}));
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/rewriter.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "neith/zipper", "neith/tree", "neith/walk", "./fun"], (function(require, exports, zipper,
    tree, __o, __o0) {
    "use strict";
    var walk = __o["walk"],
        concat = __o0["concat"],
        UP, DOWN, Rewriter, rewrite;
    (UP = true);
    (DOWN = false);
    var transform = (function(ctx, transforms) {
        return (transforms.length ? tree.modifyNode((function(node) {
            return transforms.reduce((function(p, c) {
                return c.map(p);
            }), node);
        }), ctx) : ctx);
    });
    (Rewriter = (function() {
        var self = this;
        (self.peepholes = []);
    }));
    (Rewriter.prototype.add = (function(type, up, condition, f) {
        var self = this;
        if (Array.isArray(type)) return type.map((function(x) {
            return self.add(x, up, condition, f);
        }));
        (self.peepholes[type] = concat((self.peepholes[type] || []), ({
            "condition": condition,
            "map": f,
            "up": up
        })));
    }));
    (Rewriter.prototype.rewriters = (function(node) {
        var self = this;
        return ((node && self.peepholes[node.type]) || []);
    }));
    (Rewriter.prototype.upTransforms = (function(node) {
        var self = this;
        return self.rewriters(node)
            .filter((function(x) {
                return (x.up && x.condition(node));
            }));
    }));
    (Rewriter.prototype.downTransforms = (function(node) {
        var self = this;
        return self.rewriters(node)
            .filter((function(x) {
                return ((!x.up) && x.condition(node));
            }));
    }));
    (Rewriter.prototype.transform = (function(ctx) {
        var self = this,
            node = tree.node(ctx);
        return transform(ctx, self.downTransforms(node));
    }));
    (Rewriter.prototype.transformPost = (function(ctx) {
        var self = this,
            node = tree.node(ctx);
        return transform(ctx, self.upTransforms(node));
    }));
    var x = (function(rewritter, ctx) {
        return walk(rewritter.transform.bind(rewritter), rewritter.transformPost.bind(rewritter), ctx);
    }),
        x0 = zipper.root,
        y = tree.node;
    (rewrite = (function() {
        var x1 = x.apply(null, arguments);
        return y(x0(x1));
    }));
    (exports["UP"] = UP);
    (exports["DOWN"] = DOWN);
    (exports["Rewriter"] = Rewriter);
    (exports["rewrite"] = rewrite);
}));
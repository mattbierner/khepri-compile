/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/compile.kep'
 * DO NOT EDIT
*/
"use strict";
var pre_normalize = require("./stages/pre_normalize"),
    lexical = require("./stages/lexical"),
    post_normalize = require("./stages/post_normalize"),
    inline = require("./stages/inline"),
    khepri_peep = require("./stages/khepri_peep"),
    transform = require("./stages/transform"),
    ecma_peep = require("./stages/ecma_peep"),
    compile, x, x0, x1, x2, x3, x4, y, f, g, y0, f0, g0, y1, f1, g1, y2, f2, g2, y3, f3, g3, y4, f4, g4, compiler = ((x =
        pre_normalize), (x0 = lexical), (x1 = post_normalize), (x2 = inline), (x3 = khepri_peep), (x4 = transform), (
        y = ecma_peep), (f = y), (g = x4), (y0 = (function(x) {
        return f(g(x));
    })), (f0 = y0), (g0 = x3), (y1 = (function(x) {
        return f0(g0(x));
    })), (f1 = y1), (g1 = x2), (y2 = (function(x) {
        return f1(g1(x));
    })), (f2 = y2), (g2 = x1), (y3 = (function(x) {
        return f2(g2(x));
    })), (f3 = y3), (g3 = x0), (y4 = (function(x) {
        return f3(g3(x));
    })), (f4 = y4), (g4 = x), (function(x) {
        return f4(g4(x));
    })),
    extract = (function(__o) {
        var tree = __o["tree"];
        return tree;
    }),
    x5 = (function(root, options) {
        return ({
            "ast": root,
            "options": (options || ({}))
        });
    }),
    x6 = compiler,
    y5 = extract,
    f5 = y5,
    g5 = x6,
    y6 = (function(x) {
        return f5(g5(x));
    }),
    f6 = y6,
    g6 = x5;
(compile = (function() {
    return f6(g6.apply(null, arguments));
}));
(module.exports = compile);
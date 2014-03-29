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
    compile, x, x0, x1, x2, x3, x4, y, y0, y1, y2, y3, y4, compiler = ((x = pre_normalize), (x0 = lexical), (x1 =
        post_normalize), (x2 = inline), (x3 = khepri_peep), (x4 = transform), (y = ecma_peep), (y0 = (function(x5) {
        return y(x4(x5));
    })), (y1 = (function(x5) {
        return y0(x3(x5));
    })), (y2 = (function(x5) {
        return y1(x2(x5));
    })), (y3 = (function(x5) {
        return y2(x1(x5));
    })), (y4 = (function(x5) {
        return y3(x0(x5));
    })), (function(x5) {
        return y4(x(x5));
    })),
    extract = (function(__o) {
        var tree = __o["tree"];
        return tree;
    }),
    x5 = (function(root, options) {
        return ({
            "tree": root,
            "options": (options || ({}))
        });
    }),
    y5 = (function(x6) {
        return extract(compiler(x6));
    });
(compile = (function() {
    return y5(x5.apply(null, arguments));
}));
(module.exports = compile);
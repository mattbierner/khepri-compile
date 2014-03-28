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
    compile, x, x0, x1, x2, x3, y, y0, y1, y2, y3, compiler = ((x = pre_normalize), (x0 = lexical), (x1 =
        post_normalize), (x2 = inline), (x3 = khepri_peep), (y = transform), (y0 = (function(x) {
        return y(x3(x));
    })), (y1 = (function(x) {
        return y0(x2(x));
    })), (y2 = (function(x) {
        return y1(x1(x));
    })), (y3 = (function(x) {
        return y2(x0(x));
    })), (function(x) {
        return y3(x(x));
    })),
    extract = (function(__o) {
        var tree = __o["tree"];
        return tree;
    }),
    x4 = (function(root, options) {
        return ({
            "ast": root,
            "options": (options || ({}))
        });
    }),
    x5 = compiler,
    y4 = extract,
    y5 = (function(x) {
        return y4(x5(x));
    });
(compile = (function() {
    return y5(x4.apply(null, arguments));
}));
(module.exports = compile);
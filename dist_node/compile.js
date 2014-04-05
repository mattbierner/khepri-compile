/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/compile.kep'
 * DO NOT EDIT
*/
"use strict";
var Error = require("akh")["error"],
    __o = require("akh")["base"],
    sequence = __o["sequence"],
    pre_normalize = require("./stages/pre_normalize"),
    lexical = require("./stages/lexical"),
    post_normalize = require("./stages/post_normalize"),
    inline = require("./stages/inline"),
    khepri_peep = require("./stages/khepri_peep"),
    transform = require("./stages/transform"),
    ecma_peep = require("./stages/ecma_peep"),
    compile, compiler = (function(x) {
        return Error.tryError(pre_normalize(x)
            .chain(lexical)
            .chain(post_normalize)
            .chain(inline)
            .chain(khepri_peep)
            .chain(transform)
            .chain(ecma_peep), (function(x0) {
                throw x0;
            }));
    }),
    extract = (function(__o0) {
        var tree = __o0["tree"];
        return tree;
    }),
    x = (function(root, options) {
        return ({
            "tree": root,
            "options": (options || ({}))
        });
    }),
    x0 = compiler,
    y = extract,
    y0 = (function(x1) {
        var x2 = x1,
            __o0 = Error.tryError(pre_normalize(x2)
                .chain(lexical)
                .chain(post_normalize)
                .chain(inline)
                .chain(khepri_peep)
                .chain(transform)
                .chain(ecma_peep), (function(x3) {
                    throw x3;
                })),
            tree = __o0["tree"];
        return tree;
    });
(compile = (function() {
    var x1 = x.apply(null, arguments),
        __o0 = Error.tryError(pre_normalize(x1)
            .chain(lexical)
            .chain(post_normalize)
            .chain(inline)
            .chain(khepri_peep)
            .chain(transform)
            .chain(ecma_peep), (function(x2) {
                throw x2;
            })),
        tree = __o0["tree"];
    return tree;
}));
(module.exports = compile);
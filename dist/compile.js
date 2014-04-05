/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/compile.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/error", "akh/base", "./stages/pre_normalize", "./stages/lexical",
    "./stages/post_normalize", "./stages/inline", "./stages/khepri_peep", "./stages/transform",
    "./stages/ecma_peep"
], (function(require, exports, Error, __o, pre_normalize, lexical, post_normalize, inline, khepri_peep, transform,
    ecma_peep) {
    "use strict";
    var sequence = __o["sequence"],
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
    return compile;
}));
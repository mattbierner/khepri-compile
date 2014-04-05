/*
 * THIS FILE IS AUTO GENERATED from 'lib/compile.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/error", "akh/base", "./stages/pre_normalize", "./stages/lexical",
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
                .chain(ecma_peep), (function(x) {
                    console.log(x);
                    throw x;
                }));
        }),
        extract = (function(__o) {
            var tree = __o["tree"];
            return tree;
        });
    (compile = (function(f, g) {
        return (function() {
            return f(g.apply(null, arguments));
        });
    })((function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(extract, compiler), (function(root, options) {
        return ({
            "tree": root,
            "options": (options || ({}))
        });
    })));
    return compile;
}));
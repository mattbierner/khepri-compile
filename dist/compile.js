/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/compile.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/error", "./stages/pre_normalize", "./stages/lexical", "./stages/post_normalize",
    "./stages/inline", "./stages/khepri_peep", "./stages/transform", "./stages/ecma_peep"
], (function(require, exports, Error, pre_normalize, lexical, post_normalize, inline, khepri_peep, transform,
    ecma_peep) {
    "use strict";
    var compile, compiler = (function(x) {
            return pre_normalize(x)
                .chain(lexical)
                .chain(post_normalize)
                .chain(inline)
                .chain(khepri_peep)
                .chain(transform)
                .chain(ecma_peep);
        }),
        extract = (function(__o) {
            var tree = __o["tree"];
            return tree;
        }),
        thr = (function(x) {
            throw x;
        });
    (compile = (function(root, options, err) {
        var x;
        return Error.runError(((x = ({
                "tree": root,
                "options": (options || ({}))
            })), pre_normalize(x)
            .chain(lexical)
            .chain(post_normalize)
            .chain(inline)
            .chain(khepri_peep)
            .chain(transform)
            .chain(ecma_peep)), extract, (err || thr));
    }));
    return compile;
}));
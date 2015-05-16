/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/compile.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/error", "khepri-ast-zipper", "./stages/pre_normalize", "./stages/lexical",
    "./stages/reachable", "./stages/post_normalize", "./stages/inline", "./stages/khepri_peep",
    "./stages/transform", "./stages/ecma_peep"
], (function(require, exports, Error, __o, pre_normalize, lexical, reachable, post_normalize, inline, khepri_peep,
    transform, ecma_peep) {
    "use strict";
    var compile, khepriZipper = __o["khepriZipper"],
        extract = (function(x) {
            return x.tree;
        }),
        thr = (function(x) {
            throw x;
        });
    (compile = (function(root, options, err) {
        var x;
        return Error.runError(((x = ({
                tree: khepriZipper(root)
            })), pre_normalize(options, x)
            .chain(lexical.bind(null, options))
            .chain(post_normalize.bind(null, options))
            .chain(inline.bind(null, options))
            .chain(reachable.bind(null, options))
            .chain(khepri_peep.bind(null, options))
            .chain(transform.bind(null, options))
            .chain(ecma_peep.bind(null, options))), extract, (err || thr));
    }));
    return compile;
}));
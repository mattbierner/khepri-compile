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
        var options0, x;
        return Error.runError(((options0 = (options || ({}))), (x = ({
                tree: khepriZipper(root)
            })), pre_normalize(options0, x)
            .chain(lexical.bind(null, options0))
            .chain(post_normalize.bind(null, options0))
            .chain(inline.bind(null, options0))
            .chain(reachable.bind(null, options0))
            .chain(khepri_peep.bind(null, options0))
            .chain(transform.bind(null, options0))
            .chain(ecma_peep.bind(null, options0))), extract, (err || thr));
    }));
    return compile;
}));
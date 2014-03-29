/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/compile.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "./stages/pre_normalize", "./stages/lexical", "./stages/post_normalize",
    "./stages/inline", "./stages/khepri_peep", "./stages/transform", "./stages/ecma_peep"
], (function(require, exports, pre_normalize, lexical, post_normalize, inline, khepri_peep, transform, ecma_peep) {
    "use strict";
    var compile, x, x0, x1, x2, x3, x4, y, y0, y1, y2, y3, y4, compiler = ((x = pre_normalize), (x0 = lexical), (
            x1 = post_normalize), (x2 = inline), (x3 = khepri_peep), (x4 = transform), (y = ecma_peep), (y0 =
            (function(x5) {
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
    return compile;
}));
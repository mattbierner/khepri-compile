/*
 * THIS FILE IS AUTO GENERATED from 'lib/compile.kep'
 * DO NOT EDIT
*/define(["require", "exports", "./stages/pre_normalize", "./stages/lexical", "./stages/post_normalize",
    "./stages/inline", "./stages/khepri_peep", "./stages/transform", "./stages/ecma_peep"
], (function(require, exports, pre_normalize, lexical, post_normalize, inline, khepri_peep, transform, ecma_peep) {
    "use strict";
    var compile, compiler = (function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(ecma_peep, transform), khepri_peep), inline), post_normalize), lexical), pre_normalize),
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
            "ast": root,
            "options": (options || ({}))
        });
    })));
    return compile;
}));
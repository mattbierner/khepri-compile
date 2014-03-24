/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/compile.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "./stage/lexical", "./stage/normalize", "./stage/transform", "./stage/khepri_peep",
    "./stage/ecma_peep"
], (function(require, exports, lexical, normalize, transform, khepri_peep, ecma_peep) {
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
        })(ecma_peep, transform), khepri_peep), lexical), normalize);
    (compile = (function(f, g) {
        return (function() {
            return f(g.apply(null, arguments));
        });
    })((function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })((function(__o) {
        var ast = __o["ast"];
        return ast;
    }), compiler), (function(root, options) {
        return ({
            "ast": root,
            "options": (options || ({}))
        });
    })));
    (exports["compile"] = compile);
}));
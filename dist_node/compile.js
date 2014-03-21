/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/compile.kep'
 * DO NOT EDIT
*/
"use strict";
var lexical = require("./stage/lexical"),
    normalize = require("./stage/normalize"),
    transform = require("./stage/transform"),
    khepri_peep = require("./stage/khepri_peep"),
    ecma_peep = require("./stage/ecma_peep"),
    compile, compiler = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(ecma_peep.optimize, (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(transform.transform, (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(khepri_peep.optimize, (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(lexical.check, normalize.normalize))));
(compile = (function(f, g) {
    return (function(x) {
        return f(g(x));
    });
})((function(__o) {
    var ast = __o["ast"];
    return ast;
}), (function(f, g) {
    return (function() {
        return f(g.apply(null, arguments));
    });
})(compiler, (function(root, options) {
    return ({
        "ast": root,
        "options": (options || ({}))
    });
}))));
(exports["compile"] = compile);
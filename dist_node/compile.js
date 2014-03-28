/*
 * THIS FILE IS AUTO GENERATED from 'lib/compile.kep'
 * DO NOT EDIT
*/"use strict";
var pre_normalize = require("./stages/pre_normalize"),
    lexical = require("./stages/lexical"),
    post_normalize = require("./stages/post_normalize"),
    inline = require("./stages/inline"),
    khepri_peep = require("./stages/khepri_peep"),
    transform = require("./stages/transform"),
    ecma_peep = require("./stages/ecma_peep"),
    compile, compiler = (function(f, g) {
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
(module.exports = compile);
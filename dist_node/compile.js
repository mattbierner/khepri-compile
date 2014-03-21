/*
 * THIS FILE IS AUTO GENERATED from 'lib/compile.kep'
 * DO NOT EDIT
*/"use strict";
var lexical = require("./stage/lexical"),
    normalize = require("./stage/normalize"),
    transform = require("./stage/transform"),
    khepri_peep = require("./stage/khepri_peep"),
    ecma_peep = require("./stage/ecma_peep"),
    compile;
(compile = (function(f, g) {
    return (function() {
        return f(g.apply(null, arguments));
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
})((function(__o) {
    var ast = __o["ast"];
    return ast;
}), ecma_peep.optimize), transform.transform), khepri_peep.optimize), lexical.check), normalize.normalize), (
    function(root, options) {
        return ({
            "ast": root,
            "options": (options || ({}))
        });
    })));
(exports["compile"] = compile);
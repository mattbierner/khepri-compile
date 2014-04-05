/*
 * THIS FILE IS AUTO GENERATED from 'lib/compile.kep'
 * DO NOT EDIT
*/"use strict";
var Error = require("akh")["error"],
    __o = require("akh")["base"],
    sequence = __o["sequence"],
    pre_normalize = require("./stages/pre_normalize"),
    lexical = require("./stages/lexical"),
    post_normalize = require("./stages/post_normalize"),
    inline = require("./stages/inline"),
    khepri_peep = require("./stages/khepri_peep"),
    transform = require("./stages/transform"),
    ecma_peep = require("./stages/ecma_peep"),
    compile, compiler = (function(x) {
        return Error.tryError(pre_normalize(x)
            .chain(lexical)
            .chain(post_normalize)
            .chain(inline)
            .chain(khepri_peep)
            .chain(transform)
            .chain(ecma_peep), (function(x) {
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
(module.exports = compile);
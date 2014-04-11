/*
 * THIS FILE IS AUTO GENERATED from 'lib/compile.kep'
 * DO NOT EDIT
*/"use strict";
var Error = require("akh")["error"],
    __o = require("khepri-ast-zipper"),
    khepriZipper = __o["khepriZipper"],
    pre_normalize = require("./stages/pre_normalize"),
    lexical = require("./stages/lexical"),
    reachable = require("./stages/reachable"),
    post_normalize = require("./stages/post_normalize"),
    inline = require("./stages/inline"),
    khepri_peep = require("./stages/khepri_peep"),
    transform = require("./stages/transform"),
    ecma_peep = require("./stages/ecma_peep"),
    compile, extract = (function(__o0) {
        var tree = __o0["tree"];
        return tree;
    }),
    thr = (function(x) {
        throw x;
    });
(compile = (function(root, options, err) {
    var x;
    return Error.runError(((x = ({
            "tree": khepriZipper(root),
            "options": (options || ({}))
        })), pre_normalize(x)
        .chain(lexical)
        .chain(post_normalize)
        .chain(inline)
        .chain(reachable)
        .chain(khepri_peep)
        .chain(transform)
        .chain(ecma_peep)), extract, (err || thr));
}));
(module.exports = compile);
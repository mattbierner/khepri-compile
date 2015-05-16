/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/compile.kep'
 * DO NOT EDIT
*/
"use strict";
var Error = require("akh")["error"],
    __o = require("khepri-ast-zipper"),
    pre_normalize = require("./stages/pre_normalize"),
    lexical = require("./stages/lexical"),
    reachable = require("./stages/reachable"),
    post_normalize = require("./stages/post_normalize"),
    inline = require("./stages/inline"),
    khepri_peep = require("./stages/khepri_peep"),
    transform = require("./stages/transform"),
    ecma_peep = require("./stages/ecma_peep"),
    compile, khepriZipper = __o["khepriZipper"],
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
(module.exports = compile);
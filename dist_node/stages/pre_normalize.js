/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/pre_normalize.kep'
 * DO NOT EDIT
*/
"use strict";
var Error = require("akh")["error"],
    pre_normalize = require("../pre_normalize"),
    normalize;
(normalize = (function(__o) {
    var options = __o["options"],
        tree = __o["tree"];
    return Error.of(({
        "options": options,
        "tree": pre_normalize.normalize(tree)
    }));
}));
(module.exports = normalize);
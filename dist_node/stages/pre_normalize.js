/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/pre_normalize.kep'
 * DO NOT EDIT
*/"use strict";
var pre_normalize = require("../pre_normalize"),
    normalize;
(normalize = (function(__o) {
    var options = __o["options"],
        tree = __o["tree"];
    return ({
        "options": options,
        "tree": pre_normalize.normalize(tree)
    });
}));
(module.exports = normalize);
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/pre_normalize.kep'
 * DO NOT EDIT
*/
"use strict";
var pre_normalize = require("../pre_normalize"),
    normalize;
(normalize = (function(__o) {
    var options = __o["options"],
        ast = __o["ast"];
    return ({
        "options": options,
        "ast": pre_normalize.normalize(ast)
    });
}));
(module.exports = normalize);
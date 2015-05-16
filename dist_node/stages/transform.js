/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/transform.kep'
 * DO NOT EDIT
*/
"use strict";
var Error = require("akh")["error"],
    __o = require("bes")["object"],
    transformer = require("../transform/transform"),
    transform, setProperty = __o["setProperty"];
(transform = (function(options, input) {
    var tree = input["tree"],
        data = input["data"];
    return Error.of(setProperty(input, "tree", transformer.transform(tree, (options.package_manager || "amd"),
        data)));
}));
(module.exports = transform);
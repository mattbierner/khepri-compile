/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/transform.kep'
 * DO NOT EDIT
*/
"use strict";
var Error = require("akh")["error"],
    __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    transformer = require("../transform/transform"),
    transform;
(transform = (function(input) {
    var options = input["options"],
        tree = input["tree"],
        data = input["data"];
    return Error.of(setProperty(input, "tree", transformer.transform(tree, (options.package_manager || "amd"),
        data)));
}));
(module.exports = transform);
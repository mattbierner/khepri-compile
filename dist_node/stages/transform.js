/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/transform.kep'
 * DO NOT EDIT
*/"use strict";
var transformer = require("../transform/transform"),
    __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    transform;
(transform = (function(input) {
    var options = input["options"],
        tree = input["tree"],
        data = input["data"];
    return setProperty(input, "tree", transformer.transform(tree, (options.package_manager || "amd"), data));
}));
(module.exports = transform);
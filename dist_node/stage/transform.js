/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stage/transform.kep'
 * DO NOT EDIT
*/
"use strict";
var transformer = require("../transform"),
    __o = require("bes")["object"],
    setProperty = __o["setProperty"],
    transform;
(transform = (function(input) {
    var options = input["options"],
        ast = input["ast"],
        data = input["data"];
    return setProperty(input, "ast", transformer.transform(ast, (options.package_manager || "amd"), data));
}));
(module.exports = transform);
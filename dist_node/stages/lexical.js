/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/lexical.kep'
 * DO NOT EDIT
*/
"use strict";
var Error = require("akh")["error"],
    lexical = require("../lexical"),
    check, builtins = ["Array", "Boolean", "Date", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent",
        "Error", "eval", "EvalError", "Function", "Infinity", "isFinite", "isNaN", "JSON", "Math", "NaN", "Number",
        "Object", "parseInt", "parseFloat", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError",
        "TypeError", "undefined", "URIError"
    ];
(check = (function(__o) {
    var options = __o["options"],
        tree = __o["tree"],
        data = __o["data"];
    return lexical.check(tree, ((options && options.globals) || builtins), data)
        .map((function(__o0) {
            var tree0 = __o0["tree"],
                data0 = __o0["data"];
            return ({
                "tree": tree0,
                "data": data0,
                "options": options
            });
        }));
}));
(module.exports = check);
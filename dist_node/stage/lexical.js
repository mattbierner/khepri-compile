/*
 * THIS FILE IS AUTO GENERATED from 'lib/stage/lexical.kep'
 * DO NOT EDIT
*/"use strict";
var lexical = require("../lexical"),
    check, builtins = ["Array", "Boolean", "Date", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent",
        "Error", "eval", "EvalError", "Function", "Infinity", "isFinite", "isNaN", "JSON", "Math", "NaN", "Number",
        "Object", "parseInt", "parseFloat", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError",
        "TypeError", "undefined", "URIError"
    ];
(check = (function(__o) {
    var options = __o["options"],
        ast = __o["ast"],
        data = __o["data"],
        __o0 = lexical.check(ast, ((options && options.globals) || builtins), data),
        tree = __o0["tree"],
        data0 = __o0["data"];
    return ({
        "ast": tree,
        "data": data0,
        "options": options
    });
}));
(module.exports = check);
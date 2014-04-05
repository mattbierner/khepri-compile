/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/lexical.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/error", "../lexical"], (function(require, exports, Error, lexical) {
    "use strict";
    var check, builtins = ["Array", "Boolean", "Date", "decodeURI", "decodeURIComponent", "encodeURI",
            "encodeURIComponent", "Error", "eval", "EvalError", "Function", "Infinity", "isFinite", "isNaN",
            "JSON", "Math", "NaN", "Number", "Object", "parseInt", "parseFloat", "RangeError", "ReferenceError",
            "RegExp", "String", "SyntaxError", "TypeError", "undefined", "URIError"
        ];
    (check = (function(__o) {
        var options = __o["options"],
            tree = __o["tree"],
            data = __o["data"];
        return lexical.check(tree, ((options && options.globals) || builtins), data)
            .map((function(__o) {
                var tree = __o["tree"],
                    data = __o["data"];
                return ({
                    "tree": tree,
                    "data": data,
                    "options": options
                });
            }));
    }));
    return check;
}));
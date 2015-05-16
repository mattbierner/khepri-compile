/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/lexical.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/error", "bes/object", "../lexical/lexical"], (function(require, exports, Error, __o,
    lexical) {
    "use strict";
    var check, builtins = ["Array", "Boolean", "Date", "decodeURI", "decodeURIComponent", "encodeURI",
            "encodeURIComponent", "Error", "eval", "EvalError", "Function", "Infinity", "isFinite", "isNaN",
            "JSON", "Math", "NaN", "Number", "Object", "parseInt", "parseFloat", "RangeError", "ReferenceError",
            "RegExp", "String", "SyntaxError", "TypeError", "undefined", "URIError"
        ],
        builtinBinaryOps = ["*", "/", "+", "-", "%", "<<", ">>", ">>>", "<", ">", "<=", ">=", "==", "!=", "===",
            "!==", "&", "^", "|", "||", "&&", "|>", "|>>", "\\>", "\\>>", "<|", "<<|", "<\\", "<<\\", ".", "??",
            "@", "instanceof", "new"
        ],
        builtinUnaryOps = ["!", "++", "--", "~", "typeof", "void"];
    (check = (function(options, __o0) {
        var tree = __o0["tree"],
            data = __o0["data"];
        return lexical.check(tree, ((options && options.globals) || builtins), builtinBinaryOps,
            builtinUnaryOps, data)
            .map((function(__o1) {
                var tree0 = __o1["tree"],
                    data0 = __o1["data"];
                return ({
                    "tree": tree0,
                    "data": data0
                });
            }));
    }));
    return check;
}));
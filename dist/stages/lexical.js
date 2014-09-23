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
            "!==", "&", "^", "|", "||", "&&", "|>", "||>", "\\>", "\\>>", "<|", "<<|", "<\\", "<<\\", "!", "++",
            "--", "~", ".", "??", "@", "void", "instanceof", "typeof", "new"
        ],
        builtinUnaryOps = ["!", "++", "--", "~"];
    (check = (function(input) {
        var options = input["options"],
            tree = input["tree"],
            data = input["data"];
        return lexical.check(tree, ((options && options.globals) || builtins), builtinBinaryOps,
            builtinUnaryOps, data)
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
    return check;
}));
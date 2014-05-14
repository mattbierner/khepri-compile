/*
 * THIS FILE IS AUTO GENERATED from 'lib/user_operator.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("./fun"),
    opToName, splitOp, map = ({
        "*": "star",
        "/": "slash",
        "+": "plus",
        "-": "minus",
        "%": "percent",
        "<": "lt",
        ">": "gt",
        "=": "eq",
        "&": "and",
        "|": "bar",
        "^": "hat",
        "\\": "bslash",
        "~": "tilde",
        "@": "at",
        "?": "quest"
    });
(opToName = (function(name) {
    return ("__" + name.split("")
        .map((function(y) {
            return map[y];
        }))
        .join("_"));
}));
(splitOp = (function(op, ops) {
    var r;
    return ((!op) ? [] : ((r = ops.reduce((function(p, c) {
        var prefix;
        return ((((prefix = c[0]), (op.substring(0, prefix.length) === prefix)) && ((!p) ||
            (c[0].length > p[0].length))) ? c : p);
    }), null)), (r ? [r].concat(splitOp(op.slice(r[0].length), ops)) : [])));
}));
(exports["opToName"] = opToName);
(exports["splitOp"] = splitOp);
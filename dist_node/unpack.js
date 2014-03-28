/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/unpack.kep'
 * DO NOT EDIT
*/
"use strict";
var ast_expression = require("khepri-ast")["expression"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    fun = require("./fun"),
    flatten = fun["flatten"],
    innerPattern, unpackParameters, objectElementUnpack = (function(base, pattern, key, recursive) {
        var innerBase = ast_expression.MemberExpression.create(null, base, key, true);
        return (pattern ? flatten(innerPattern(innerBase, pattern)) : ast_declaration.Binding.create(null,
            ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null, key.value)), innerBase,
            recursive));
    });
(innerPattern = (function(base, pattern, recursive) {
    switch (pattern.type) {
        case "IdentifierPattern":
            return [ast_declaration.Binding.create(null, pattern, base, recursive)];
        case "AsPattern":
            return fun.concat(innerPattern(base, pattern.id), flatten(innerPattern(pattern.id, pattern.target,
                recursive)));
        case "ObjectPattern":
            return flatten(fun.map((function(__o) {
                var target = __o["target"],
                    key = __o["key"];
                return objectElementUnpack(pattern.ud.id, target, key, recursive);
            }), pattern.elements));
        default:
            return [];
    }
}));
var x = flatten,
    y = fun.map.bind(null, (function(x) {
        switch (x.type) {
            case "SinkPattern":
            case "IdentifierPattern":
                return [];
            case "AsPattern":
                return flatten(innerPattern(x.id, x.target));
            default:
                return innerPattern(x, x);
        }
    })),
    f = x,
    g = y;
(unpackParameters = (function(x) {
    return f(g(x));
}));
(exports["innerPattern"] = innerPattern);
(exports["unpackParameters"] = unpackParameters);
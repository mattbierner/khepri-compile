/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/builtin.kep'
 * DO NOT EDIT
*/
"use strict";
var ast_node = require("khepri-ast")["node"],
    setData = ast_node["setData"],
    setUserData = ast_node["setUserData"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_expression = require("khepri-ast")["expression"],
    ast_value = require("khepri-ast")["value"],
    builtins, unique = (function() {
        var x = 0;
        return (function() {
            (x = (x + 1));
            return x;
        });
    })(),
    binary = (function(uid, op) {
        var xArg = setData(ast_value.Identifier.create(null, "x"), "uid", unique()),
            yArg = setData(ast_value.Identifier.create(null, "y"), "uid", unique());
        return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null, null, [
            ast_pattern.IdentifierPattern.create(null, xArg), ast_pattern.IdentifierPattern.create(null,
                yArg)
        ]), op(xArg, yArg));
    }),
    binaryOp = (function(op, flipped) {
        return binary(unique(), (function(x, y) {
            return ast_expression.BinaryExpression.create(null, op, (flipped ? y : x), (flipped ? x : y));
        }));
    });
(builtins = ({
    "require": setData(new(ast_value.Identifier)(null, "require"), "uid", unique()),
    "exports": setData(new(ast_value.Identifier)(null, "exports"), "uid", unique()),
    "module": setData(new(ast_value.Identifier)(null, "module"), "uid", unique())
}));
[
    ["+", "__add"],
    ["-", "__sub"],
    ["*", "__mul"],
    ["/", "__div"],
    ["%", "__mod"],
    ["<<", "__blas"],
    [">>", "__bras"],
    [">>>", "__brls"],
    ["&", "__band"],
    ["^", "__bxor"],
    ["|", "bor"],
    ["<", "__lt"],
    [">", "__gt"],
    ["<=", "__lte"],
    [">=", "__gte"],
    ["==", "__eq"],
    ["!=", "__neq"],
    ["===", "__seq"],
    ["!==", "__sneq"],
    ["|>", "__pipe"],
    ["<|", "__rpipe"],
    ["\\>", "__compose"],
    ["\\>>", "__composen"],
    ["<\\", "__rcompose"],
    ["<<\\", "__rcomposen"]
].forEach((function(__o) {
    var op = __o[0],
        name = __o[1];
    (builtins[op] = binaryOp(op));
    (builtins[("_" + op)] = binaryOp(op, true));
}));
(module.exports = builtins);
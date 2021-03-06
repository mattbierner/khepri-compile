/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/transform/unpack.kep'
 * DO NOT EDIT
*/
"use strict";
var ast_expression = require("khepri-ast")["expression"],
    ast_value = require("khepri-ast")["value"],
    __o = require("../ast"),
    __o0 = require("../fun"),
    __o1 = require("../normalize/unpack"),
    expandBinding, expandBindings, expandArgumentsPattern, type = __o["type"],
    concat = __o0["concat"],
    flatten = __o0["flatten"],
    map = __o0["map"],
    innerPattern = __o1["innerPattern"],
    identifier = ast_value.Identifier.create.bind(null, null),
    number = ast_value.Literal.create.bind(null, null, "number"),
    relativeUnpack = (function(target, start, indx, pattern) {
        return innerPattern(ast_expression.MemberExpression.create(null, target, ast_expression.BinaryExpression.create(
            null, "-", ast_expression.CallExpression.create(null, ast_expression.MemberExpression.create(
                null, identifier("Math"), identifier("max")), [ast_expression.MemberExpression.create(
                null, target, identifier("length")), number(start)]), number(indx)), true), pattern);
    }),
    sliceUnpack = (function(target, id, from, to) {
        return innerPattern(ast_expression.CallExpression.create(null, ast_expression.MemberExpression.create(null,
            ast_expression.MemberExpression.create(null, ast_expression.ArrayExpression.create(null, []),
                identifier("slice")), identifier("call")), ((to === 0) ? [target, number(from)] : [target,
            number(from), number((-to))
        ])), id);
    }),
    transformUnpacks = map.bind(null, (function(node) {
        switch (type(node.value)) {
            case "RelativeUnpack":
                return relativeUnpack(node.value.target, node.value.min, node.value.index, node.pattern);
            case "SliceUnpack":
                return sliceUnpack(node.value.target, node.pattern, node.value.from, node.value.to);
            default:
                return node;
        }
    })),
    x = transformUnpacks;
(expandBindings = (function() {
    var args = arguments,
        z = innerPattern.apply(null, args);
    return flatten(x(z));
}));
(expandBinding = (function(binding) {
    return expandBindings(binding.value, binding.pattern);
}));
(expandArgumentsPattern = (function(parameters, thisObj) {
    var argumentsUnpack = (parameters.id ? expandBindings(identifier("arguments"), parameters.id) : []),
        selfUnpack = (parameters.self ? expandBindings(thisObj, parameters.self) : []);
    return concat(argumentsUnpack, selfUnpack);
}));
(exports["expandBinding"] = expandBinding);
(exports["expandBindings"] = expandBindings);
(exports["expandArgumentsPattern"] = expandArgumentsPattern);
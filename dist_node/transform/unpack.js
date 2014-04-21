/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/transform/unpack.kep'
 * DO NOT EDIT
*/
"use strict";
var ast_declaration = require("khepri-ast")["declaration"],
    ast_expression = require("khepri-ast")["expression"],
    ast_value = require("khepri-ast")["value"],
    __o = require("../ast"),
    type = __o["type"],
    getUid = __o["getUid"],
    __o0 = require("../fun"),
    concat = __o0["concat"],
    flatten = __o0["flatten"],
    map = __o0["map"],
    __o1 = require("../inline/unpack"),
    innerPattern = __o1["innerPattern"],
    unpackParameters = __o1["unpackParameters"],
    expandBinding, expandBindings, expandArgumentsPattern, identifier = ast_value.Identifier.create.bind(null, null),
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
    expandSlice = map.bind(null, (function(node) {
        switch (type(node.value)) {
            case "RelativeUnpack":
                return relativeUnpack(node.value.target, node.value.min, node.value.index, node.value.pattern);
            case "SliceUnpack":
                return sliceUnpack(node.value.target, node.value.pattern, node.value.from, node.value.to);
            default:
                return node;
        }
    })),
    x = innerPattern,
    x0 = expandSlice,
    y = flatten;
(expandBindings = (function() {
    var z = x.apply(null, arguments);
    return y(x0(z));
}));
(expandBinding = (function(binding) {
    return expandBindings(binding.value, binding.pattern);
}));
(expandArgumentsPattern = (function(parameters, thisObj) {
    var elementsPrefix = unpackParameters(parameters.id, parameters.elements),
        selfPrefix = (parameters.self ? expandBindings(thisObj, parameters.self) : []),
        argumentsPrefix = (parameters.id ? expandBindings(identifier("arguments"), parameters.id) : []);
    return flatten(concat(argumentsPrefix, elementsPrefix, selfPrefix));
}));
(exports["expandBinding"] = expandBinding);
(exports["expandBindings"] = expandBindings);
(exports["expandArgumentsPattern"] = expandArgumentsPattern);
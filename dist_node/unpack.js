/*
 * THIS FILE IS AUTO GENERATED from 'lib/unpack.kep'
 * DO NOT EDIT
*/"use strict";
var ast_expression = require("khepri-ast")["expression"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    fun = require("./fun"),
    concat = fun["concat"],
    flatten = fun["flatten"],
    innerPattern, unpackParameters, identifier = ast_value.Identifier.create.bind(null, null),
    number = ast_value.Literal.create.bind(null, null, "number"),
    relativeUnpack = (function(start, target, indx, pattern) {
        return innerPattern(ast_expression.MemberExpression.create(null, target, ast_expression.BinaryExpression.create(
            null, "+", ast_expression.CallExpression.create(null, ast_expression.MemberExpression.create(
                null, identifier("Math"), identifier("max")), [ast_expression.MemberExpression.create(
                null, target, identifier("length")), number(start)]), indx), true), pattern);
    }),
    sliceUnpack = (function(target, id, from, to) {
        return innerPattern(ast_expression.CallExpression.create(null, ast_expression.MemberExpression.create(null,
            ast_expression.MemberExpression.create(null, ast_expression.ArrayExpression.create(null, []),
                identifier("slice")), identifier("call")), ((to === 0) ? [target, number(from)] : [target,
            number(from), number((-to))
        ])), id);
    }),
    objectElement = (function(innerBase, pattern, key, recursive) {
        return (pattern ? flatten(innerPattern(innerBase, pattern)) : ast_declaration.Binding.create(null,
            ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null, key.value)), innerBase,
            recursive));
    }),
    objectElementUnpack = (function(base, pattern, key, recursive) {
        return objectElement(ast_expression.MemberExpression.create(null, base, key, true), pattern, key, recursive);
    });
(innerPattern = (function(base, pattern, recursive) {
    switch (pattern.type) {
        case "IdentifierPattern":
            return [ast_declaration.Binding.create(null, pattern, base, recursive)];
        case "AsPattern":
            return fun.concat(innerPattern(base, pattern.id), flatten(innerPattern(pattern.id, pattern.target,
                recursive)));
        case "ObjectPattern":
            return flatten(fun.map((function(node) {
                var type = node["type"],
                    target = node["target"],
                    key = node["key"];
                return (((type === "EllipsisPattern") && node.id) ? sliceUnpack(pattern.ud.id.id,
                    node.id, node.ud.from, node.ud.to) : ((node.ud && (!isNaN(node.ud.start))) ?
                    relativeUnpack(node.ud.start, pattern.ud.id.id, key, target) :
                    objectElementUnpack(pattern.ud.id.id, target, key, recursive)));
            }), pattern.elements));
        default:
            return [];
    }
}));
(unpackParameters = (function(pre, mid, post) {
    return flatten(concat(fun.map((function(x) {
            switch (x.type) {
                case "SinkPattern":
                case "IdentifierPattern":
                    return [];
                case "AsPattern":
                    return flatten(innerPattern(x.id, x.target));
                default:
                    return innerPattern(x, x);
            }
        }), pre), ((mid && mid.id) ? sliceUnpack(identifier("arguments"), mid.id, pre.length, post.length) : []),
        fun.map((function(x, i) {
            return relativeUnpack((pre.length + post.length), identifier("arguments"), number(((-
                post.length) + i)), x);
        }), (post || []))));
}));
(exports["innerPattern"] = innerPattern);
(exports["unpackParameters"] = unpackParameters);
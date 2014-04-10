/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/unpack.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/expression", "khepri-ast/declaration", "khepri-ast/pattern",
    "khepri-ast/value", "./ast", "./fun"
], (function(require, exports, ast_expression, ast_declaration, ast_pattern, ast_value, __o, fun) {
    "use strict";
    var type = __o["type"],
        concat = fun["concat"],
        flatten = fun["flatten"],
        innerPattern, unpackParameters, identifier = ast_value.Identifier.create.bind(null, null),
        number = ast_value.Literal.create.bind(null, null, "number"),
        relativeUnpack = (function(target, start, indx, pattern) {
            return innerPattern(ast_expression.MemberExpression.create(null, target, ast_expression.BinaryExpression
                .create(null, "-", ast_expression.CallExpression.create(null, ast_expression.MemberExpression
                    .create(null, identifier("Math"), identifier("max")), [ast_expression.MemberExpression
                        .create(null, target, identifier("length")), number(start)
                    ]), number(indx)), true), pattern);
        }),
        sliceUnpack = (function(target, id, from, to) {
            return innerPattern(ast_expression.CallExpression.create(null, ast_expression.MemberExpression.create(
                null, ast_expression.MemberExpression.create(null, ast_expression.ArrayExpression.create(
                    null, []), identifier("slice")), identifier("call")), ((to === 0) ? [target,
                number(from)
            ] : [target, number(from), number((-to))])), id);
        });
    (innerPattern = (function(base, pattern, recursive) {
        switch (pattern.type) {
            case "IdentifierPattern":
                return [ast_declaration.Binding.create(null, pattern, base, recursive)];
            case "AsPattern":
                return fun.concat(innerPattern(base, pattern.id), flatten(innerPattern(pattern.id,
                    pattern.target, recursive)));
            case "ObjectPattern":
                return flatten(fun.map((function(node) {
                    var base0, pattern0, key, innerBase;
                    return ((type(node) === "SliceUnpack") ? sliceUnpack(pattern.ud.id.id,
                        node.pattern, node.from, node.to) : ((type(node) ===
                        "RelativeUnpack") ? relativeUnpack(pattern.ud.id.id, node.min,
                        node.index, node.pattern) : ((base0 = pattern.ud.id.id), (
                        pattern0 = node.target), (key = node.key), (innerBase =
                        ast_expression.MemberExpression.create(null, base0, key,
                            true)), (pattern0 ? flatten(innerPattern(innerBase,
                        pattern0)) : ast_declaration.Binding.create(null,
                        ast_pattern.IdentifierPattern.create(null,
                            ast_value.Identifier.create(null, key.value)),
                        innerBase, recursive)))));
                }), pattern.elements));
            default:
                return [];
        }
    }));
    (unpackParameters = (function(args, elements) {
        return flatten(fun.map((function(x) {
            switch (x.type) {
                case "SinkPattern":
                case "IdentifierPattern":
                    return [];
                case "SliceUnpack":
                    return sliceUnpack(args, x.pattern, x.from, x.to);
                case "RelativeUnpack":
                    return relativeUnpack(args, x.min, x.index, x.pattern);
                case "AsPattern":
                    return flatten(innerPattern(x.id, x.target));
                default:
                    return innerPattern(x, x);
            }
        }), elements));
    }));
    (exports["innerPattern"] = innerPattern);
    (exports["unpackParameters"] = unpackParameters);
}));
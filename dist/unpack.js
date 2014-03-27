/*
 * THIS FILE IS AUTO GENERATED from 'lib/unpack.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast/expression", "khepri-ast/declaration", "khepri-ast/pattern",
    "khepri-ast/value", "./fun"
], (function(require, exports, ast_expression, ast_declaration, ast_pattern, ast_value, fun) {
    "use strict";
    var innerPattern, unpackParameters, objectElementUnpack = (function(base, pattern, key) {
            var innerBase = ast_expression.MemberExpression.create(null, base, key, true);
            return (pattern ? fun.flatten(innerPattern(innerBase, pattern)) : ast_declaration.Binding.create(
                null, ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null, key.value)),
                innerBase));
        });
    (innerPattern = (function(base, pattern) {
        switch (pattern.type) {
            case "IdentifierPattern":
                return [ast_declaration.Binding.create(null, pattern, base)];
            case "AsPattern":
                return fun.concat(innerPattern(base, pattern.id), fun.flatten(innerPattern(pattern.id,
                    pattern.target)));
            case "ObjectPattern":
                return fun.flatten(fun.map((function(__o) {
                    var target = __o["target"],
                        key = __o["key"];
                    return objectElementUnpack(pattern.ud.id, target, key);
                }), pattern.elements));
            default:
                return [];
        }
    }));
    (unpackParameters = (function(elements) {
        return fun.map((function(x) {
            switch (x.type) {
                case "SinkPattern":
                case "IdentifierPattern":
                    return [];
                case "AsPattern":
                    return fun.flatten(innerPattern(x.id, x.target));
                default:
                    return innerPattern(x, x);
            }
        }), elements);
    }));
    (exports["innerPattern"] = innerPattern);
    (exports["unpackParameters"] = unpackParameters);
}));
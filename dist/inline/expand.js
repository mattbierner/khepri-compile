/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/expand.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/declaration", "khepri-ast/expression", "khepri-ast/pattern",
    "khepri-ast/value", "../ast", "../fun", "./rename"
], (function(require, exports, ast_declaration, ast_expression, ast_pattern, ast_value, __o, __o0, rename) {
    "use strict";
    var getUid = __o["getUid"],
        concat = __o0["concat"],
        map = __o0["map"],
        expandCallee, expandCurry, getParmeterIds = map.bind(null, (function(x) {
            return getUid(x.id);
        })),
        argsToBindings = (function(parameters, args) {
            return map((function(x, i) {
                return ast_declaration.Binding.create(null, x, (args[i] || ast_value.Identifier.create(
                    null, "undefined")));
            }), parameters.elements);
        });
    (expandCallee = (function(uid, callee, args) {
        var target = ((callee.type === "LetExpression") ? callee.body : callee),
            bindings = argsToBindings(target.params, args);
        return rename(uid, getParmeterIds(target.params.elements), ast_expression.LetExpression.create(
            null, concat((callee.bindings || []), bindings), target.body));
    }));
    (expandCurry = (function(uid, base, args) {
        var first, rest, map0, body, target = ((base.type === "LetExpression") ? base.body : base);
        return ((!target.params.elements.length) ? base : ((first = target.params.elements[0]), (rest =
            target.params.elements.slice(1)), (map0 = [getUid(first.id)]), (body =
            ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                null, null, rest, target.params.self), target.body)), rename(uid, map0, ((first &&
            (((first.type === "IdentifierPattern") || (first.type === "AsPattern")) ||
                (first.type === "ObjectPattern"))) ? ast_expression.LetExpression.create(
            null, concat((base.bindings || []), ast_declaration.Binding.create(null,
                first, args[0])), body) : body))));
    }));
    (exports["expandCallee"] = expandCallee);
    (exports["expandCurry"] = expandCurry);
}));
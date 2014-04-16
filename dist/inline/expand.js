/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline/expand.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast/declaration", "khepri-ast/expression", "khepri-ast/pattern",
    "khepri-ast/value", "../ast", "../fun", "./rename", "../builtin"
], (function(require, exports, ast_declaration, ast_expression, ast_pattern, ast_value, __o, __o0, __o1, __o2) {
    "use strict";
    var getUid = __o["getUid"],
        concat = __o0["concat"],
        map = __o0["map"],
        rename = __o1["rename"],
        builtins = __o2["builtins"],
        expandCallee, expandCurry;
    (expandCallee = (function(uid, callee, args) {
        var target = ((callee.type === "LetExpression") ? callee.body : callee),
            closure = ((target.ud && target.ud.closure) || []),
            parameters = target.params,
            bindings = map((function(x, i) {
                return ast_declaration.Binding.create(null, rename(uid, [], x), (args[i] ||
                    builtins.undefined));
            }), parameters.elements),
            arg, argBinding = (target.params.id ? ((arg = target.params.id), ast_declaration.Binding.create(
                null, rename(uid, [], arg), ast_expression.ArrayExpression.create(null, args.map(
                    (function(x, i) {
                        return (bindings[i] ? bindings[i].pattern.id : x);
                    }))))) : []);
        return ast_expression.LetExpression.create(null, concat((callee.bindings || []), bindings,
            argBinding), rename(uid, closure, target.body));
    }));
    (expandCurry = (function(uid, base, args) {
        var first, rest, map0, body, target = ((base.type === "LetExpression") ? base.body : base);
        return ((!target.params.elements.length) ? base : ((first = target.params.elements[0]), (rest =
            target.params.elements.slice(1)), (map0 = [getUid(first.id)]), (body =
            ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                null, null, rest, target.params.self), rename(uid, map0, target.body))), ((
            first && (((first.type === "IdentifierPattern") || (first.type === "AsPattern")) ||
                (first.type === "ObjectPattern"))) ? ast_expression.LetExpression.create(
            null, concat((base.bindings || []), ast_declaration.Binding.create(null, rename(
                uid, map0, first), args[0])), body) : body)));
    }));
    (exports["expandCallee"] = expandCallee);
    (exports["expandCurry"] = expandCurry);
}));
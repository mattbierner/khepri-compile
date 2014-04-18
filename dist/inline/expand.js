/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline/expand.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast/declaration", "khepri-ast/expression", "khepri-ast/pattern",
    "khepri-ast/value", "khepri-ast/node", "../ast", "../fun", "./rename", "../builtin"
], (function(require, exports, ast_declaration, ast_expression, ast_pattern, ast_value, __o, __o0, __o1, __o2, __o3) {
    "use strict";
    var setData = __o["setData"],
        modify = __o["modify"],
        getUid = __o0["getUid"],
        concat = __o1["concat"],
        map = __o1["map"],
        rename = __o2["rename"],
        builtins = __o3["builtins"],
        expandCallee, expandCurry;
    (expandCallee = (function(uid, callee, args) {
        var target = ((callee.type === "LetExpression") ? callee.body : callee),
            closure = ((target.ud && target.ud.locals) || []),
            parameters = target.params,
            bindings = map((function(x, i) {
                return ast_declaration.Binding.create(null, rename(uid, closure, x), (args[i] ||
                    builtins.undefined));
            }), parameters.elements),
            arg, argBinding = (target.params.id ? ((arg = target.params.id), ast_declaration.Binding.create(
                null, rename(uid, closure, arg), ast_expression.ArrayExpression.create(null,
                    args.map((function(x, i) {
                        return (bindings[i] ? bindings[i].pattern.id : x);
                    }))))) : []),
            bindings0 = concat((callee.bindings ? rename(uid, closure, callee.bindings) : []), bindings,
                argBinding);
        return ast_expression.LetExpression.create(null, bindings0, rename(uid, closure, target.body));
    }));
    (expandCurry = (function(uid, base, args) {
        var first, rest, closure, body, target = ((base.type === "LetExpression") ? base.body : base);
        return ((!target.params.elements.length) ? base : ((first = target.params.elements[0]), (rest =
            target.params.elements.slice(1)), (closure = ((target.ud && target.ud.locals) || [])), (
            body = modify(target, ({
                id: null,
                params: ast_pattern.ArgumentsPattern.create(null, null, rename(uid,
                    closure, rest), target.params.self),
                body: rename(uid, closure, target.body)
            }))), ((first && (((first.type === "IdentifierPattern") || (first.type ===
                "AsPattern")) || (first.type === "ObjectPattern"))) ? ast_expression.LetExpression
            .create(null, concat(base.bindings, ast_declaration.Binding.create(null, rename(uid,
                closure, first), args[0])), body) : body)));
    }));
    (exports["expandCallee"] = expandCallee);
    (exports["expandCurry"] = expandCurry);
}));
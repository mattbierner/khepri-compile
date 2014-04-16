/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline/expand.kep'
 * DO NOT EDIT
*/"use strict";
var ast_declaration = require("khepri-ast")["declaration"],
    ast_expression = require("khepri-ast")["expression"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    __o = require("../ast"),
    getUid = __o["getUid"],
    __o0 = require("../fun"),
    concat = __o0["concat"],
    map = __o0["map"],
    __o1 = require("./rename"),
    rename = __o1["rename"],
    __o2 = require("../builtin"),
    builtins = __o2["builtins"],
    expandCallee, expandCurry;
(expandCallee = (function(uid, callee, args) {
    var target = ((callee.type === "LetExpression") ? callee.body : callee),
        closure = ((target.ud && target.ud.closure) || []),
        parameters = target.params,
        bindings = map((function(x, i) {
            return ast_declaration.Binding.create(null, rename(uid, [], x), (args[i] || builtins.undefined));
        }), parameters.elements),
        arg, argBinding = (target.params.id ? ((arg = target.params.id), ast_declaration.Binding.create(null,
            rename(uid, [], arg), ast_expression.ArrayExpression.create(null, args.map((function(x, i) {
                return (bindings[i] ? bindings[i].pattern.id : x);
            }))))) : []);
    return ast_expression.LetExpression.create(null, concat((callee.bindings || []), bindings, argBinding),
        rename(uid, closure, target.body));
}));
(expandCurry = (function(uid, base, args) {
    var first, rest, closure, body, target = ((base.type === "LetExpression") ? base.body : base);
    return ((!target.params.elements.length) ? base : ((first = target.params.elements[0]), (rest = target.params
        .elements.slice(1)), (closure = ((target.ud && target.ud.closure) || [])), (body =
        ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null,
            null, rename(uid, closure, rest), target.params.self), rename(uid, closure, target.body))), (
        (first && (((first.type === "IdentifierPattern") || (first.type === "AsPattern")) || (first.type ===
            "ObjectPattern"))) ? ast_expression.LetExpression.create(null, concat((base.bindings || []),
            ast_declaration.Binding.create(null, rename(uid, closure, first), args[0])), body) : body)));
}));
(exports["expandCallee"] = expandCallee);
(exports["expandCurry"] = expandCurry);
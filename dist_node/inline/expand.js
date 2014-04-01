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
    expandCallee, expandCurry, getParmeterIds = map.bind(null, (function(x) {
        return getUid(x.id);
    })),
    argsToBindings = (function(uid, names, parameters, args) {
        return map((function(x, i) {
            return ast_declaration.Binding.create(null, rename(uid, names, x), (args[i] || ast_value.Identifier
                .create(null, "undefined")));
        }), parameters.elements);
    });
(expandCallee = (function(uid, callee, args) {
    var target = ((callee.type === "LetExpression") ? callee.body : callee),
        ids = getParmeterIds(target.params.elements),
        bindings = argsToBindings(uid, ids, target.params, args);
    return ast_expression.LetExpression.create(null, concat((callee.bindings || []), bindings), rename(uid, ids,
        target.body));
}));
(expandCurry = (function(uid, base, args) {
    var first, rest, map, body, target = ((base.type === "LetExpression") ? base.body : base);
    return ((!target.params.elements.length) ? base : ((first = target.params.elements[0]), (rest = target.params
        .elements.slice(1)), (map = [getUid(first.id)]), (body = ast_expression.FunctionExpression.create(
        null, null, ast_pattern.ArgumentsPattern.create(null, null, rest, target.params.self),
        rename(uid, map, target.body))), ((first && (((first.type === "IdentifierPattern") || (first.type ===
        "AsPattern")) || (first.type === "ObjectPattern"))) ? ast_expression.LetExpression.create(
        null, concat((base.bindings || []), ast_declaration.Binding.create(null, rename(uid, map,
            first), args[0])), body) : body)));
}));
(exports["expandCallee"] = expandCallee);
(exports["expandCurry"] = expandCurry);
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/khepri_peep.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("khepri-ast-zipper"),
    khepriZipper = __o["khepriZipper"],
    __o0 = require("khepri-ast")["node"],
    Node = __o0["Node"],
    setUserData = __o0["setUserData"],
    setData = __o0["setData"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_statement = require("khepri-ast")["statement"],
    ast_expression = require("khepri-ast")["expression"],
    ast_value = require("khepri-ast")["value"],
    fun = require("./fun"),
    __o1 = require("./rewritter"),
    UP = __o1["UP"],
    DOWN = __o1["DOWN"],
    Rewritter = __o1["Rewritter"],
    rewrite = __o1["rewrite"],
    optimize, peepholes = new(Rewritter)();
peepholes.add(["VariableDeclaration"], true, (function(_) {
    return true;
}), (function(__o2) {
    var declarations = __o2["declarations"],
        bound = fun.flattenr(declarations);
    return (bound.length ? ast_declaration.VariableDeclaration.create(null, bound) : null);
}));
peepholes.add(["LetExpression"], true, (function(_) {
    return true;
}), (function(__o2) {
    var bindings = __o2["bindings"],
        body = __o2["body"],
        bound = fun.flattenr(bindings);
    return (bound.length ? ast_expression.LetExpression.create(null, bound, body) : body);
}));
peepholes.add(["WithStatement"], true, (function(_) {
    return true;
}), (function(__o2) {
    var bindings = __o2["bindings"],
        body = __o2["body"],
        bound = fun.flattenr(bindings);
    return (bound.length ? ast_statement.WithStatement.create(null, bound, body) : body);
}));
peepholes.add(["LetExpression"], true, (function(node) {
    return (node.body.type === "LetExpression");
}), (function(node) {
    return ((node.body.type === "LetExpression") ? ast_expression.LetExpression.create(null, fun.concat(node.bindings,
        node.body.bindings), node.body.body) : node);
}));
peepholes.add(["CurryExpression"], true, (function(node) {
    return (node.base.type === "CurryExpression");
}), (function(node) {
    return ast_expression.CurryExpression.create(null, node.base.base, fun.concat(node.base.args, node.args));
}));
peepholes.add(["ReturnStatement"], false, (function(node) {
    return (node.argument && (node.argument.type === "LetExpression"));
}), (function(node) {
    return ast_statement.WithStatement.create(null, node.argument.bindings, ast_statement.BlockStatement.create(
        null, [ast_statement.ReturnStatement.create(node.loc, node.argument.body)]));
}));
peepholes.add(["FunctionExpression"], false, (function(node) {
    return (node.body.type === "LetExpression");
}), (function(node) {
    return ast_expression.FunctionExpression.create(null, node.id, node.params, ast_statement.BlockStatement.create(
        null, [ast_statement.WithStatement.create(null, node.body.bindings, ast_statement.BlockStatement.create(
            null, [ast_statement.ReturnStatement.create(node.loc, node.body.body)]))]));
}));
peepholes.add(["ExpressionStatement"], true, (function(node) {
    return (node.expression && (node.expression.type === "LetExpression"));
}), (function(node) {
    return ast_statement.WithStatement.create(null, node.expression.bindings, ast_statement.BlockStatement.create(
        null, [ast_statement.ExpressionStatement.create(node.loc, node.expression.body)]));
}));
peepholes.add(["ExpressionStatement"], true, (function(node) {
    return ((node.expression && (node.expression.type === "AssignmentExpression")) && (node.expression.right.type ===
        "LetExpression"));
}), (function(node) {
    return ast_statement.WithStatement.create(null, node.expression.right.bindings, ast_statement.BlockStatement
        .create(null, [ast_statement.ExpressionStatement.create(node.loc, ast_expression.AssignmentExpression.create(
            node.expression.loc, node.expression.operator, node.expression.left, node.expression.right
            .body))]));
}));
(optimize = (function(ast, data) {
    return rewrite(peepholes, khepriZipper(ast));
}));
(exports["optimize"] = optimize);
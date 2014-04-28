/*
 * THIS FILE IS AUTO GENERATED from 'lib/khepri_peep.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast/declaration", "khepri-ast/statement", "khepri-ast/expression", "./ast",
    "./fun", "./rewriter"
], (function(require, exports, ast_declaration, ast_statement, ast_expression, __o, __o0, __o1) {
    "use strict";
    var type = __o["type"],
        concat = __o0["concat"],
        flattenr = __o0["flattenr"],
        UP = __o1["UP"],
        DOWN = __o1["DOWN"],
        Rewriter = __o1["Rewriter"],
        rewrite = __o1["rewrite"],
        optimize, x, x0, x1, x2, x3, x4, peepholes = new(Rewriter)(),
        always = (function(_) {
            return true;
        });
    peepholes.add("LetExpression", UP, ((x = type), (function(z) {
        var z0 = z.body,
            y = x(z0);
        return ("LetExpression" === y);
    })), (function(node) {
        return ast_expression.LetExpression.create(node.loc, concat(node.bindings, node.body.bindings),
            node.body.body);
    }));
    peepholes.add("CurryExpression", UP, ((x0 = type), (function(z) {
        var z0 = z.base,
            y = x0(z0);
        return ("CurryExpression" === y);
    })), (function(node) {
        return ast_expression.CurryExpression.create(node.loc, node.base.base, concat(node.base.args,
            node.args));
    }));
    peepholes.add("CallExpression", UP, ((x1 = type), (function(z) {
        var z0 = z.callee,
            y = x1(z0);
        return ("CurryExpression" === y);
    })), (function(node) {
        return ast_expression.CallExpression.create(node.loc, node.callee.base, concat(node.callee.args,
            node.args));
    }));
    peepholes.add("VariableDeclaration", UP, always, (function(__o2) {
        var loc = __o2["loc"],
            declarations = __o2["declarations"],
            bound = flattenr(declarations);
        return (bound.length ? ast_declaration.VariableDeclaration.create(loc, bound) : null);
    }));
    peepholes.add("LetExpression", UP, always, (function(__o2) {
        var loc = __o2["loc"],
            bindings = __o2["bindings"],
            body = __o2["body"],
            bound = flattenr(bindings);
        return (bound.length ? ast_expression.LetExpression.create(loc, bound, body) : body);
    }));
    peepholes.add("WithStatement", UP, always, (function(__o2) {
        var loc = __o2["loc"],
            bindings = __o2["bindings"],
            body = __o2["body"],
            bound = flattenr(bindings);
        return (bound.length ? ast_statement.WithStatement.create(loc, bound, body) : body);
    }));
    peepholes.add("ReturnStatement", false, ((x2 = type), (function(z) {
        var z0 = z.argument,
            y = x2(z0);
        return ("LetExpression" === y);
    })), (function(node) {
        return ast_statement.WithStatement.create(null, node.argument.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ReturnStatement.create(node.loc, node.argument.body)]));
    }));
    peepholes.add("FunctionExpression", DOWN, ((x3 = type), (function(z) {
        var z0 = z.body,
            y = x3(z0);
        return ("LetExpression" === y);
    })), (function(node) {
        return ast_expression.FunctionExpression.create(null, node.id, node.params, ast_statement.BlockStatement
            .create(null, [ast_statement.WithStatement.create(null, node.body.bindings, ast_statement.BlockStatement
                .create(null, [ast_statement.ReturnStatement.create(node.loc, node.body.body)])
            )]));
    }));
    peepholes.add("ExpressionStatement", UP, ((x4 = type), (function(z) {
        var z0 = z.expression,
            y = x4(z0);
        return ("LetExpression" === y);
    })), (function(node) {
        return ast_statement.WithStatement.create(null, node.expression.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ExpressionStatement.create(node.loc, node.expression.body)]));
    }));
    peepholes.add("ExpressionStatement", UP, (function(node) {
        return ((node.expression && (node.expression.type === "AssignmentExpression")) && (node.expression
            .right.type === "LetExpression"));
    }), (function(node) {
        return ast_statement.WithStatement.create(null, node.expression.right.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ExpressionStatement.create(node.loc, ast_expression.AssignmentExpression
                .create(node.expression.loc, node.expression.operator, node.expression.left,
                    node.expression.right.body))]));
    }));
    (optimize = rewrite.bind(null, peepholes));
    (exports["optimize"] = optimize);
}));
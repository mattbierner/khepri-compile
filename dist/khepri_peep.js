/*
 * THIS FILE IS AUTO GENERATED from 'lib/khepri_peep.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast/declaration", "khepri-ast/statement", "khepri-ast/expression",
    "khepri-ast/value", "./fun", "./rewriter"
], (function(require, exports, ast_declaration, ast_statement, ast_expression, ast_value, __o, __o0) {
    "use strict";
    var concat = __o["concat"],
        flattenr = __o["flattenr"],
        UP = __o0["UP"],
        DOWN = __o0["DOWN"],
        Rewriter = __o0["Rewriter"],
        rewrite = __o0["rewrite"],
        optimize, peepholes = new(Rewriter)(),
        always = (function(_) {
            return true;
        });
    peepholes.add("LetExpression", UP, (function(node) {
        return (node.body.type === "LetExpression");
    }), (function(node) {
        return ast_expression.LetExpression.create(node.loc, concat(node.bindings, node.body.bindings),
            node.body.body);
    }));
    peepholes.add("CurryExpression", UP, (function(node) {
        return (node.base.type === "CurryExpression");
    }), (function(node) {
        return ast_expression.CurryExpression.create(node.loc, node.base.base, concat(node.base.args,
            node.args));
    }));
    peepholes.add("CallExpression", UP, (function(node) {
        return (node.callee.type === "CurryExpression");
    }), (function(node) {
        return ast_expression.CallExpression.create(node.loc, node.callee.base, concat(node.callee.args,
            node.args));
    }));
    peepholes.add("VariableDeclaration", UP, always, (function(__o1) {
        var loc = __o1["loc"],
            declarations = __o1["declarations"],
            bound = flattenr(declarations);
        return (bound.length ? ast_declaration.VariableDeclaration.create(loc, bound) : null);
    }));
    peepholes.add("LetExpression", UP, always, (function(__o1) {
        var loc = __o1["loc"],
            bindings = __o1["bindings"],
            body = __o1["body"],
            bound = flattenr(bindings);
        return (bound.length ? ast_expression.LetExpression.create(loc, bound, body) : body);
    }));
    peepholes.add("WithStatement", UP, always, (function(__o1) {
        var loc = __o1["loc"],
            bindings = __o1["bindings"],
            body = __o1["body"],
            bound = flattenr(bindings);
        return (bound.length ? ast_statement.WithStatement.create(loc, bound, body) : body);
    }));
    peepholes.add("ReturnStatement", false, (function(node) {
        return (node.argument && (node.argument.type === "LetExpression"));
    }), (function(node) {
        return ast_statement.WithStatement.create(null, node.argument.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ReturnStatement.create(node.loc, node.argument.body)]));
    }));
    peepholes.add("FunctionExpression", DOWN, (function(node) {
        return (node.body.type === "LetExpression");
    }), (function(node) {
        return ast_expression.FunctionExpression.create(null, node.id, node.params, ast_statement.BlockStatement
            .create(null, [ast_statement.WithStatement.create(null, node.body.bindings, ast_statement.BlockStatement
                .create(null, [ast_statement.ReturnStatement.create(node.loc, node.body.body)])
            )]));
    }));
    peepholes.add("ExpressionStatement", UP, (function(node) {
        return (node.expression && (node.expression.type === "LetExpression"));
    }), (function(node) {
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
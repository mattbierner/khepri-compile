/*
 * THIS FILE IS AUTO GENERATED from 'lib/khepri_peep.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast-zipper", "khepri-ast/declaration", "khepri-ast/statement",
    "khepri-ast/expression", "khepri-ast/value", "./fun", "./rewritter"
], (function(require, exports, __o, ast_declaration, ast_statement, ast_expression, ast_value, __o0, __o1) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        concat = __o0["concat"],
        flattenr = __o0["flattenr"],
        UP = __o1["UP"],
        DOWN = __o1["DOWN"],
        Rewritter = __o1["Rewritter"],
        rewrite = __o1["rewrite"],
        optimize, peepholes = new(Rewritter)(),
        always = (function(_) {
            return true;
        });
    peepholes.add(["VariableDeclaration"], UP, always, (function(__o) {
        var loc = __o["loc"],
            declarations = __o["declarations"],
            bound = flattenr(declarations);
        return (bound.length ? ast_declaration.VariableDeclaration.create(loc, bound) : null);
    }));
    peepholes.add(["LetExpression"], UP, always, (function(__o) {
        var loc = __o["loc"],
            bindings = __o["bindings"],
            body = __o["body"],
            bound = flattenr(bindings);
        return (bound.length ? ast_expression.LetExpression.create(loc, bound, body) : body);
    }));
    peepholes.add(["WithStatement"], UP, always, (function(__o) {
        var loc = __o["loc"],
            bindings = __o["bindings"],
            body = __o["body"],
            bound = flattenr(bindings);
        return (bound.length ? ast_statement.WithStatement.create(loc, bound, body) : body);
    }));
    peepholes.add(["LetExpression"], UP, (function(node) {
        return (node.body.type === "LetExpression");
    }), (function(node) {
        return ast_expression.LetExpression.create(node.loc, concat(node.bindings, node.body.bindings),
            node.body.body);
    }));
    peepholes.add(["CurryExpression"], UP, (function(node) {
        return (node.base.type === "CurryExpression");
    }), (function(node) {
        return ast_expression.CurryExpression.create(node.loc, node.base.base, concat(node.base.args,
            node.args));
    }));
    peepholes.add(["ReturnStatement"], false, (function(node) {
        return (node.argument && (node.argument.type === "LetExpression"));
    }), (function(node) {
        return ast_statement.WithStatement.create(null, node.argument.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ReturnStatement.create(node.loc, node.argument.body)]));
    }));
    peepholes.add(["FunctionExpression"], DOWN, (function(node) {
        return (node.body.type === "LetExpression");
    }), (function(node) {
        return ast_expression.FunctionExpression.create(null, node.id, node.params, ast_statement.BlockStatement
            .create(null, [ast_statement.WithStatement.create(null, node.body.bindings, ast_statement.BlockStatement
                .create(null, [ast_statement.ReturnStatement.create(node.loc, node.body.body)])
            )]));
    }));
    peepholes.add(["ExpressionStatement"], UP, (function(node) {
        return (node.expression && (node.expression.type === "LetExpression"));
    }), (function(node) {
        return ast_statement.WithStatement.create(null, node.expression.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ExpressionStatement.create(node.loc, node.expression.body)]));
    }));
    peepholes.add(["ExpressionStatement"], UP, (function(node) {
        return ((node.expression && (node.expression.type === "AssignmentExpression")) && (node.expression
            .right.type === "LetExpression"));
    }), (function(node) {
        return ast_statement.WithStatement.create(null, node.expression.right.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ExpressionStatement.create(node.loc, ast_expression.AssignmentExpression
                .create(node.expression.loc, node.expression.operator, node.expression.left,
                    node.expression.right.body))]));
    }));
    (optimize = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(rewrite.bind(null, peepholes), khepriZipper));
    (exports["optimize"] = optimize);
}));
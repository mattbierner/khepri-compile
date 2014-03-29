/*
 * THIS FILE IS AUTO GENERATED from 'lib/khepri_peep.kep'
 * DO NOT EDIT
*/"use strict";
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
    __o1 = require("akh")["base"],
    next = __o1["next"],
    seq = __o1["sequence"],
    seqa = __o1["sequencea"],
    Unique = require("akh")["unique"],
    ZipperT = require("zipper-m")["trans"]["zipper"],
    walk = require("zipper-m")["walk"],
    fun = require("./fun"),
    optimize, M = ZipperT(Unique),
    run = (function(c, ctx, seed) {
        return Unique.runUnique(ZipperT.runZipperT(c, ctx), seed);
    }),
    pass = M.of(null),
    node = M.node,
    modify = M.modifyNode,
    set = M.setNode,
    unique = M.liftInner(Unique.unique),
    peepholes = ({}),
    addPeephole = (function(types, up, condition, f) {
        var entry = ({
            "condition": condition,
            "map": f,
            "up": up
        });
        types.forEach((function(type) {
            (peepholes[type] = (peepholes[type] ? fun.concat(peepholes[type], entry) : [entry]));
        }));
    });
addPeephole(["VariableDeclaration"], true, (function(_) {
    return true;
}), modify((function(__o) {
    var declarations = __o["declarations"],
        bound = fun.flattenr(declarations);
    return (bound.length ? ast_declaration.VariableDeclaration.create(null, bound) : null);
})));
addPeephole(["LetExpression"], true, (function(_) {
    return true;
}), modify((function(__o) {
    var bindings = __o["bindings"],
        body = __o["body"],
        bound = fun.flattenr(bindings);
    return (bound.length ? ast_expression.LetExpression.create(null, bound, body) : body);
})));
addPeephole(["WithStatement"], true, (function(_) {
    return true;
}), modify((function(__o) {
    var bindings = __o["bindings"],
        body = __o["body"],
        bound = fun.flattenr(bindings);
    return (bound.length ? ast_statement.WithStatement.create(null, bound, body) : body);
})));
addPeephole(["LetExpression"], true, (function(node) {
    return (node.body.type === "LetExpression");
}), modify((function(node) {
    return ((node.body.type === "LetExpression") ? ast_expression.LetExpression.create(null, fun.concat(
        node.bindings, node.body.bindings), node.body.body) : node);
})));
addPeephole(["CurryExpression"], true, (function(node) {
    return (node.base.type === "CurryExpression");
}), modify((function(node) {
    return ast_expression.CurryExpression.create(null, node.base.base, fun.concat(node.base.args, node.args));
})));
addPeephole(["ReturnStatement"], false, (function(node) {
    return (node.argument && (node.argument.type === "LetExpression"));
}), modify((function(node) {
    return ast_statement.WithStatement.create(null, node.argument.bindings, ast_statement.BlockStatement.create(
        null, [ast_statement.ReturnStatement.create(node.loc, node.argument.body)]));
})));
addPeephole(["FunctionExpression"], false, (function(node) {
    return (node.body.type === "LetExpression");
}), modify((function(node) {
    return ast_expression.FunctionExpression.create(null, node.id, node.params, ast_statement.BlockStatement
        .create(null, [ast_statement.WithStatement.create(null, node.body.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ReturnStatement.create(node.loc, node.body.body)]))]));
})));
addPeephole(["ExpressionStatement"], true, (function(node) {
    return (node.expression && (node.expression.type === "LetExpression"));
}), modify((function(node) {
    return ast_statement.WithStatement.create(null, node.expression.bindings, ast_statement.BlockStatement.create(
        null, [ast_statement.ExpressionStatement.create(node.loc, node.expression.body)]));
})));
addPeephole(["ExpressionStatement"], true, (function(node) {
    return ((node.expression && (node.expression.type === "AssignmentExpression")) && (node.expression.right.type ===
        "LetExpression"));
}), modify((function(node) {
    return ast_statement.WithStatement.create(null, node.expression.right.bindings, ast_statement.BlockStatement
        .create(null, [ast_statement.ExpressionStatement.create(node.loc, ast_expression.AssignmentExpression
            .create(node.expression.loc, node.expression.operator, node.expression.left, node.expression
                .right.body))]));
})));
var upTransforms = (function(node) {
    return ((node && peepholes[node.type]) || [])
        .filter((function(x) {
            return (x.up && x.condition(node));
        }));
}),
    downTransforms = (function(node) {
        return ((node && peepholes[node.type]) || [])
            .filter((function(x) {
                return ((!x.up) && x.condition(node));
            }));
    }),
    transform = (function(node, transforms) {
        return (transforms.length ? seqa(transforms.map((function(x) {
            return x.map;
        }))) : pass);
    }),
    _transform = node.chain((function(node) {
        return transform(node, downTransforms(node));
    })),
    _transformPost = node.chain((function(node) {
        return transform(node, upTransforms(node));
    }));
(optimize = (function(ast, data) {
    return run(next(walk(M, _transform, _transformPost), node), khepriZipper(ast), data.unique);
}));
(exports["optimize"] = optimize);
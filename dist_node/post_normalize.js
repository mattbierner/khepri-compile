/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/post_normalize.kep'
 * DO NOT EDIT
*/
"use strict";
var tree = require("neith")["tree"],
    __o = require("neith")["walk"],
    walk = __o["walk"],
    zipper = require("neith")["zipper"],
    __o0 = require("khepri-ast-zipper"),
    khepriZipper = __o0["khepriZipper"],
    __o1 = require("khepri-ast")["node"],
    setData = __o1["setData"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_statement = require("khepri-ast")["statement"],
    ast_expression = require("khepri-ast")["expression"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_package = require("khepri-ast")["package"],
    ast_value = require("khepri-ast")["value"],
    fun = require("./fun"),
    flattenr = fun["flattenr"],
    __o2 = require("./unpack"),
    innerPattern = __o2["innerPattern"],
    unpackParameters = __o2["unpackParameters"],
    normalize, DOWN = false,
    UP = true,
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
addPeephole(["LetExpression"], UP, (function(_) {
    return true;
}), (function(node) {
    return ast_expression.LetExpression.create(node.loc, flattenr(node.bindings.map((function(x) {
        return innerPattern(x.value, x.pattern);
    }))), node.body);
}));
addPeephole(["FunctionExpression"], UP, (function(_) {
    return true;
}), (function(node) {
    var params = fun.map((function(x) {
        switch (x.type) {
            case "IdentifierPattern":
                return x;
            default:
                return ast_pattern.IdentifierPattern.create(null, ((x.id && x.id.id) || x.ud.id));
        }
    }), fun.filter((function(x) {
        return (x.type !== "EllipsisPattern");
    }), node.params.elements)),
        bindings = unpackParameters(node.params.elements),
        body = ((node.body.type === "BlockStatement") ? ast_statement.BlockStatement.create(null, [
            ast_statement.WithStatement.create(null, bindings, node.body)
        ]) : ast_expression.LetExpression.create(null, bindings, node.body));
    return ast_expression.FunctionExpression.create(null, node.id, ast_pattern.ArgumentsPattern.create(null,
        node.params.id, params, node.params.self), body);
}));
addPeephole(["BinaryExpression"], true, (function(node) {
    return (node.operator === "|>");
}), (function(__o) {
    var left = __o["left"],
        right = __o["right"];
    return ast_expression.CallExpression.create(null, right, [left]);
}));
addPeephole(["BinaryExpression"], true, (function(node) {
    return (node.operator === "<|");
}), (function(__o) {
    var left = __o["left"],
        right = __o["right"];
    return ast_expression.CallExpression.create(null, left, [right]);
}));
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
    transform = (function(ctx, transforms) {
        return (transforms.length ? tree.modifyNode((function(node) {
            return transforms.reduce((function(p, c) {
                return c.map(p);
            }), node);
        }), ctx) : ctx);
    }),
    opt = walk.bind(null, (function(ctx) {
        var node = tree.node(ctx);
        return transform(ctx, downTransforms(node));
    }), (function(ctx) {
        var node = tree.node(ctx);
        return transform(ctx, upTransforms(node));
    }));
(normalize = (function(ast) {
    return tree.node(zipper.root(opt(khepriZipper(ast))));
}));
(exports["normalize"] = normalize);
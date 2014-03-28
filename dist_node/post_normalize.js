/*
 * THIS FILE IS AUTO GENERATED from 'lib/post_normalize.kep'
 * DO NOT EDIT
*/"use strict";
var tree = require("neith")["tree"],
    __o = require("neith")["walk"],
    walk = __o["walk"],
    zipper = require("neith")["zipper"],
    __o0 = require("khepri-ast-zipper"),
    khepriZipper = __o0["khepriZipper"],
    ast_statement = require("khepri-ast")["statement"],
    ast_expression = require("khepri-ast")["expression"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    __o1 = require("./ast"),
    isBlockFunction = __o1["isBlockFunction"],
    __o2 = require("./fun"),
    concat = __o2["concat"],
    flattenr = __o2["flattenr"],
    filter = __o2["filter"],
    map = __o2["map"],
    __o3 = require("./unpack"),
    innerPattern = __o3["innerPattern"],
    unpackParameters = __o3["unpackParameters"],
    __o4 = require("./builtin"),
    builtins = __o4["builtins"],
    definitions = __o4["definitions"],
    normalize, expandBinding, DOWN = false,
    UP = true,
    always = (function(_) {
        return true;
    }),
    peepholes = ({}),
    addPeephole = (function(types, up, condition, f) {
        var entry = ({
            "condition": condition,
            "map": f,
            "up": up
        });
        types.forEach((function(type) {
            (peepholes[type] = concat((peepholes[type] || []), entry));
        }));
    });
addPeephole(["LetExpression"], UP, always, ((expandBinding = (function(binding) {
    return innerPattern(binding.value, binding.pattern, binding.recursive);
})), (function(node) {
    return ast_expression.LetExpression.create(node.loc, flattenr(map(expandBinding, node.bindings)), node.body);
})));
addPeephole(["FunctionExpression"], UP, always, (function(node) {
    var params = map((function(x) {
        switch (x.type) {
            case "IdentifierPattern":
                return x;
            default:
                return ast_pattern.IdentifierPattern.create(null, ((x.id && x.id.id) || x.ud.id));
        }
    }), filter((function(x) {
        return (x.type !== "EllipsisPattern");
    }), node.params.elements)),
        bindings = unpackParameters(node.params.elements),
        body = (isBlockFunction(node) ? ast_statement.BlockStatement.create(null, [ast_statement.WithStatement.create(
            null, bindings, node.body)]) : ast_expression.LetExpression.create(null, bindings, node.body));
    return ast_expression.FunctionExpression.create(null, node.id, ast_pattern.ArgumentsPattern.create(null,
        node.params.id, params, node.params.self), body);
}));
addPeephole(["BinaryExpression"], UP, (function(node) {
    return (node.operator === "|>");
}), (function(__o) {
    var left = __o["left"],
        right = __o["right"];
    return ast_expression.CallExpression.create(null, right, [left]);
}));
addPeephole(["BinaryExpression"], UP, (function(node) {
    return (node.operator === "<|");
}), (function(__o) {
    var left = __o["left"],
        right = __o["right"];
    return ast_expression.CallExpression.create(null, left, [right]);
}));
addPeephole(["BinaryExpression"], UP, (function(node) {
    return ((((node.operator === "\\>") || (node.operator === "\\>>")) || (node.operator === "<\\")) || (node.operator ===
        "<<\\"));
}), (function(__o) {
    var operator = __o["operator"],
        left = __o["left"],
        right = __o["right"];
    return ast_expression.CallExpression.create(null, definitions[operator], [left, right]);
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
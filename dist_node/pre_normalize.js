/*
 * THIS FILE IS AUTO GENERATED from 'lib/pre_normalize.kep'
 * DO NOT EDIT
*/"use strict";
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
addPeephole(["PackageExport"], UP, (function(node) {
    return (!node.alias);
}), (function(node) {
    return ast_package.PackageExport.create(node.loc, node.id, ast_value.Literal.create(null, "string", node.id
        .name));
}));
addPeephole(["LetExpression"], UP, (function(node) {
    return (node.bindings.length > 1);
}), (function(__o) {
    var loc = __o["loc"],
        bindings = __o["bindings"],
        body = __o["body"];
    return fun.foldr((function(p, c) {
        return ast_expression.LetExpression.create(loc, [c], p);
    }), body, bindings);
}));
addPeephole(["CurryExpression"], DOWN, (function(node) {
    return (node.args.length > 1);
}), (function(node) {
    return fun.foldl((function(p, arg) {
        return ast_expression.CurryExpression.create(null, p, [arg]);
    }), node.base, node.args);
}));
addPeephole(["ArrayPattern"], DOWN, (function(_) {
    return true;
}), (function(node) {
    var loc = node["loc"],
        elements = node["elements"];
    return ast_pattern.ObjectPattern.create(loc, fun.map((function(x, i) {
        return ast_pattern.ObjectPatternElement.create(null, ast_value.Literal.create(null,
            "number", i), x);
    }), elements));
}));
addPeephole(["ObjectPatternElement"], DOWN, (function(node) {
    return (!node.target);
}), (function(node) {
    var loc = node["loc"],
        key = node["key"];
    switch (key.type) {
        case "IdentifierPattern":
            return ast_pattern.ObjectPatternElement.create(null, ast_value.Literal.create(null, "string", key.id
                .name), key);
        case "AsPattern":
            return ast_pattern.ObjectPatternElement.create(null, ast_value.Literal.create(null, "string", key.id
                .id.name), key);
        default:
            return node;
    }
}));
addPeephole(["AsPattern"], DOWN, (function(node) {
    return ((!node.target.ud) || (!node.target.ud.id));
}), (function(node) {
    return ast_pattern.AsPattern.create(null, node.id, setData(node.target, "id", node.id));
}));
addPeephole(["ObjectPattern"], UP, (function(node) {
    return ((!node.ud) || (!node.ud.id));
}), (function(node) {
    var id = ast_pattern.IdentifierPattern.create(node.loc, ast_value.Identifier.create(null, "__o"));
    (id.reserved = true);
    return ast_pattern.AsPattern.create(null, id, setData(ast_pattern.ObjectPattern.create(null, node.elements),
        "id", id));
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
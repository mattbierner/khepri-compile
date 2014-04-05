/*
 * THIS FILE IS AUTO GENERATED from 'lib/pre_normalize.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("khepri-ast-zipper"),
    khepriZipper = __o["khepriZipper"],
    __o0 = require("khepri-ast")["node"],
    setData = __o0["setData"],
    ast_expression = require("khepri-ast")["expression"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_package = require("khepri-ast")["package"],
    ast_value = require("khepri-ast")["value"],
    __o1 = require("./fun"),
    map = __o1["map"],
    foldl = __o1["foldl"],
    foldr = __o1["foldr"],
    __o2 = require("./rewriter"),
    UP = __o2["UP"],
    DOWN = __o2["DOWN"],
    Rewriter = __o2["Rewriter"],
    rewrite = __o2["rewrite"],
    normalize, string = ast_value.Literal.create.bind(null, null, "string"),
    peepholes = new(Rewriter)();
peepholes.add("PackageExport", UP, (function(node) {
    return (!node.alias);
}), (function(node) {
    return ast_package.PackageExport.create(node.loc, node.id, string(node.id.name));
}));
peepholes.add("LetExpression", UP, (function(node) {
    return (node.bindings.length > 1);
}), (function(__o) {
    var bindings = __o["bindings"],
        body = __o["body"];
    return foldr((function(p, c) {
        return ast_expression.LetExpression.create(null, [c], p);
    }), body, bindings);
}));
peepholes.add("CurryExpression", DOWN, (function(node) {
    return (node.args.length > 1);
}), (function(__o) {
    var base = __o["base"],
        args = __o["args"];
    return foldl((function(p, arg) {
        return ast_expression.CurryExpression.create(null, p, [arg]);
    }), base, args);
}));
peepholes.add("ArrayPattern", DOWN, (function(_) {
    return true;
}), (function(node) {
    var loc = node["loc"],
        elements = node["elements"];
    return ast_pattern.ObjectPattern.create(loc, map((function(x, i) {
        return ast_pattern.ObjectPatternElement.create(null, string((i + "")), x);
    }), elements));
}));
peepholes.add("ObjectPatternElement", DOWN, (function(node) {
    return (!node.target);
}), (function(node) {
    var key = node["key"];
    switch (key.type) {
        case "IdentifierPattern":
            return ast_pattern.ObjectPatternElement.create(node.loc, string(key.id.name), key);
        case "AsPattern":
            return ast_pattern.ObjectPatternElement.create(node.loc, string(key.id.id.name), key);
        default:
            return node;
    }
}));
peepholes.add("AsPattern", DOWN, (function(node) {
    return ((!node.target.ud) || (!node.target.ud.id));
}), (function(node) {
    return ast_pattern.AsPattern.create(node.loc, node.id, setData(node.target, "id", node.id));
}));
peepholes.add("ObjectPattern", UP, (function(node) {
    return ((!node.ud) || (!node.ud.id));
}), (function(node) {
    var id = setData(ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null, "__o")),
        "reserved", true);
    return ast_pattern.AsPattern.create(null, id, setData(node, "id", id));
}));
(normalize = (function(f, g) {
    return (function(x) {
        return f(g(x));
    });
})(rewrite.bind(null, peepholes), khepriZipper));
(exports["normalize"] = normalize);
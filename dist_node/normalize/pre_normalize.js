/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/normalize/pre_normalize.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("khepri-ast")["node"],
    ast_expression = require("khepri-ast")["expression"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_package = require("khepri-ast")["package"],
    ast_value = require("khepri-ast")["value"],
    __o0 = require("../pseudo/pattern"),
    __o1 = require("../ast"),
    __o2 = require("../fun"),
    __o3 = require("../rewriter"),
    normalize, modify = __o["modify"],
    setData = __o["setData"],
    getData = __o["getData"],
    SliceUnpack = __o0["SliceUnpack"],
    RelativeUnpack = __o0["RelativeUnpack"],
    type = __o1["type"],
    concat = __o2["concat"],
    map = __o2["map"],
    foldl = __o2["foldl"],
    foldr = __o2["foldr"],
    UP = __o3["UP"],
    DOWN = __o3["DOWN"],
    Rewriter = __o3["Rewriter"],
    rewrite = __o3["rewrite"],
    string = ast_value.Literal.create.bind(null, null, "string"),
    number = ast_value.Literal.create.bind(null, null, "number"),
    always = (function(_) {
        return true;
    }),
    rewrites = new(Rewriter)();
rewrites.add("PackageExport", UP, (function(z) {
    var x = z.alias;
    return (!x);
}), (function(__o4) {
    var id = __o4["id"],
        loc = __o4["loc"];
    return ast_package.PackageExport.create(loc, id, string(id.name));
}));
rewrites.add("LetExpression", UP, (function(node) {
    return (node.bindings.length > 1);
}), (function(__o4) {
    var bindings = __o4["bindings"],
        body = __o4["body"];
    return foldr((function(p, c) {
        return ast_expression.LetExpression.create(null, [c], p);
    }), body, bindings);
}));
rewrites.add("CurryExpression", DOWN, (function(node) {
    return (node.args.length > 1);
}), (function(__o4) {
    var base = __o4["base"],
        args = __o4["args"];
    return foldl((function(p, arg) {
        return ast_expression.CurryExpression.create(null, p, [arg]);
    }), base, args);
}));
rewrites.add("ArrayPattern", DOWN, (function(_) {
    return true;
}), (function(__o4) {
    var loc = __o4["loc"],
        elements = __o4["elements"],
        indx = elements.map(type)
            .indexOf("EllipsisPattern"),
        __o5 = ((indx < 0) ? [elements, null, []] : [elements.slice(0, indx), elements[indx], elements.slice((
            indx + 1))]),
        pre = __o5[0],
        mid = __o5[1],
        post = __o5[2],
        pre0;
    return ast_pattern.ObjectPattern.create(loc, ((pre0 = map((function(x, i) {
        return ast_pattern.ObjectPatternElement.create(null, number(i), x);
    }), pre)), concat(pre0, ((mid && mid.id) ? SliceUnpack.create(null, mid.id, null, pre0.length, post
        .length) : []), map((function(x, i) {
        return RelativeUnpack.create(null, x, null, (post.length - i), (post.length + pre0.length));
    }), post))));
}));
rewrites.add("ArgumentsPattern", UP, (function(node) {
    return (node.elements.map(type)
        .indexOf("EllipsisPattern") >= 0);
}), (function(node) {
    var node0, elements = node.elements,
        indx = elements.map(type)
            .indexOf("EllipsisPattern"),
        __o4 = ((indx < 0) ? [elements, null, []] : [elements.slice(0, indx), elements[indx], elements.slice((
            indx + 1))]),
        pre = __o4[0],
        mid = __o4[1],
        post = __o4[2],
        id = (node.id || ((node0 = ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null,
            "__args"))), setData(node0, "reserved", true)));
    return modify(node, ({
        id: id,
        elements: concat(pre, ((mid && mid.id) ? SliceUnpack.create(null, mid.id, null, pre.length,
            post.length) : []), map((function(x, i) {
            return RelativeUnpack.create(null, x, null, (post.length - i), (post.length +
                pre.length));
        }), post))
    }));
}));
rewrites.add("ObjectPatternElement", DOWN, (function(z) {
    var x = z.target;
    return (!x);
}), (function(node) {
    var key = node["key"];
    switch (type(key)) {
        case "IdentifierPattern":
            return ast_pattern.ObjectPatternElement.create(node.loc, string(key.id.name), key);
        case "AsPattern":
            return ast_pattern.ObjectPatternElement.create(node.loc, string(key.id.id.name), key);
        default:
            return node;
    }
}));
rewrites.add("AsPattern", DOWN, (function(node) {
    return (!getData(node.target, "id"));
}), (function(node) {
    return ast_pattern.AsPattern.create(node.loc, node.id, setData(node.target, "id", node.id));
}));
rewrites.add("ObjectPattern", UP, (function(node) {
    return (!getData(node, "id"));
}), (function(node) {
    var node0 = ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null, "__o")),
        id = setData(node0, "reserved", true);
    return ast_pattern.AsPattern.create(null, id, setData(node, "id", id));
}));
rewrites.add("SinkPattern", DOWN, always, (function(node) {
    var loc = node["loc"],
        node0 = ast_pattern.IdentifierPattern.create(loc, ast_value.Identifier.create(null, "_"));
    return setData(node0, "reserved", true);
}));
(normalize = rewrite.bind(null, rewrites));
(exports["normalize"] = normalize);
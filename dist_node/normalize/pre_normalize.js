/*
 * THIS FILE IS AUTO GENERATED from 'lib/normalize/pre_normalize.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("khepri-ast")["node"],
    modify = __o["modify"],
    setData = __o["setData"],
    ast_expression = require("khepri-ast")["expression"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_package = require("khepri-ast")["package"],
    ast_value = require("khepri-ast")["value"],
    __o0 = require("../pseudo/pattern"),
    SliceUnpack = __o0["SliceUnpack"],
    RelativeUnpack = __o0["RelativeUnpack"],
    __o1 = require("../ast"),
    type = __o1["type"],
    __o2 = require("../fun"),
    concat = __o2["concat"],
    map = __o2["map"],
    foldl = __o2["foldl"],
    foldr = __o2["foldr"],
    flatten = __o2["flatten"],
    __o3 = require("../rewriter"),
    UP = __o3["UP"],
    DOWN = __o3["DOWN"],
    Rewriter = __o3["Rewriter"],
    rewrite = __o3["rewrite"],
    normalize, string = ast_value.Literal.create.bind(null, null, "string"),
    number = ast_value.Literal.create.bind(null, null, "number"),
    always = (function(_) {
        return true;
    }),
    peepholes = new(Rewriter)();
peepholes.add("PackageExport", UP, (function(x) {
    var x0 = x.alias;
    return (!x0);
}), (function(node) {
    return ast_package.PackageExport.create(node.loc, node.id, string(node.id.name));
}));
peepholes.add("LetExpression", UP, (function(node) {
    return (node.bindings.length > 1);
}), (function(__o4) {
    var bindings = __o4["bindings"],
        body = __o4["body"];
    return foldr((function(p, c) {
        return ast_expression.LetExpression.create(null, [c], p);
    }), body, bindings);
}));
peepholes.add("CurryExpression", DOWN, (function(node) {
    return (node.args.length > 1);
}), (function(__o4) {
    var base = __o4["base"],
        args = __o4["args"];
    return foldl((function(p, arg) {
        return ast_expression.CurryExpression.create(null, p, [arg]);
    }), base, args);
}));
peepholes.add("ArrayPattern", DOWN, (function(_) {
    return true;
}), (function(__o4) {
    var loc = __o4["loc"],
        elements = __o4["elements"],
        pre0, indx = elements.map(type)
            .indexOf("EllipsisPattern"),
        __o5 = ((indx < 0) ? [elements, null, []] : [elements.slice(0, indx), elements[indx], elements.slice((
            indx + 1))]),
        pre = __o5[0],
        mid = __o5[1],
        post = __o5[2];
    return ast_pattern.ObjectPattern.create(loc, ((pre0 = map((function(x, i) {
        return ast_pattern.ObjectPatternElement.create(null, number(i), x);
    }), pre)), concat(pre0, ((mid && mid.id) ? SliceUnpack.create(null, mid.id, null, pre0.length, post
        .length) : []), map((function(x, i) {
        return RelativeUnpack.create(null, x, null, (post.length - i), (post.length + pre0.length));
    }), post))));
}));
peepholes.add("ArgumentsPattern", UP, (function(node) {
    return (node.elements.map(type)
        .indexOf("EllipsisPattern") >= 0);
}), (function(node) {
    var elements = node.elements,
        indx = elements.map(type)
            .indexOf("EllipsisPattern"),
        __o4 = ((indx < 0) ? [elements, null, []] : [elements.slice(0, indx), elements[indx], elements.slice((
            indx + 1))]),
        pre = __o4[0],
        mid = __o4[1],
        post = __o4[2],
        node0, id = (node.id || ((node0 = ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(
            null, "__args"))), setData(node0, "reserved", true)));
    return modify(node, ({
        "id": id,
        "elements": concat(pre, ((mid && mid.id) ? SliceUnpack.create(null, mid.id, null, pre.length,
            post.length) : []), map((function(x, i) {
            return RelativeUnpack.create(null, x, null, (post.length - i), (post.length +
                pre.length));
        }), post))
    }));
}));
peepholes.add("ObjectPatternElement", DOWN, (function(x) {
    var x0 = x.target;
    return (!x0);
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
    var node0 = ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null, "__o")),
        id = setData(node0, "reserved", true);
    return ast_pattern.AsPattern.create(null, id, setData(node, "id", id));
}));
peepholes.add("SinkPattern", DOWN, always, (function(__o4) {
    var loc = __o4["loc"],
        node = ast_pattern.IdentifierPattern.create(loc, ast_value.Identifier.create(null, "_"));
    return setData(node, "reserved", true);
}));
(normalize = rewrite.bind(null, peepholes));
(exports["normalize"] = normalize);
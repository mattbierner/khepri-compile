/*
 * THIS FILE IS AUTO GENERATED from 'lib/ecma_peep.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("ecma-ast-zipper"),
    ecmaZipper = __o["ecmaZipper"],
    __o0 = require("ecma-ast")["node"],
    modify = __o0["modify"],
    __o1 = require("./ast"),
    type = __o1["type"],
    __o2 = require("./fun"),
    concat = __o2["concat"],
    flatten = __o2["flatten"],
    map = __o2["map"],
    foldr = __o2["foldr"],
    __o3 = require("./rewriter"),
    UP = __o3["UP"],
    DOWN = __o3["DOWN"],
    Rewriter = __o3["Rewriter"],
    rewrite = __o3["rewrite"],
    optimize, x, y, flattenBlockBody = ((x = map.bind(null, (function(x0) {
        return (((!x0) || (type(x0) === "EmptyStatement")) ? [] : ((type(x0) === "BlockStatement") ? x0
            .body : x0));
    }))), (y = flatten), (function(x0) {
        return y(x(x0));
    })),
    mergeBlockDeclarations = foldr.bind(null, (function(p, c) {
        return (((type(c) === "VariableDeclaration") && (type(p[0]) === "VariableDeclaration")) ? concat(modify(
            c, ({
                "declarations": concat(c.declarations, p[0].declarations)
            })), p.slice(1)) : concat(c, p));
    }), []),
    peepholes = new(Rewriter)(),
    always = (function(_) {
        return true;
    });
peepholes.add("VariableDeclaration", DOWN, always, (function(node) {
    var declarations = node.declarations.filter((function(x0) {
        return (!(!x0));
    }));
    return modify(node, ({
        "declarations": declarations
    }));
}));
peepholes.add("VariableDeclaration", UP, (function(node) {
    return (!node.declarations.length);
}), (function(_) {
    return null;
}));
peepholes.add(["Program", "BlockStatement"], UP, always, (function(node) {
    return modify(node, ({
        "body": flattenBlockBody(node.body)
    }));
}));
peepholes.add(["Program", "BlockStatement"], UP, always, (function(node) {
    return modify(node, ({
        "body": mergeBlockDeclarations(node.body)
    }));
}));
var x0 = ecmaZipper,
    y0 = rewrite.bind(null, peepholes);
(optimize = (function(x1) {
    return y0(x0(x1));
}));
(exports["optimize"] = optimize);
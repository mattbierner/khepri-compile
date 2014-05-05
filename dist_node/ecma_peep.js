/*
 * THIS FILE IS AUTO GENERATED from 'lib/ecma_peep.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("ecma-ast")["node"],
    __o0 = require("./ast"),
    __o1 = require("./fun"),
    __o2 = require("./rewriter"),
    optimize, modify = __o["modify"],
    type = __o0["type"],
    concat = __o1["concat"],
    flatten = __o1["flatten"],
    map = __o1["map"],
    foldr = __o1["foldr"],
    UP = __o2["UP"],
    DOWN = __o2["DOWN"],
    Rewriter = __o2["Rewriter"],
    rewrite = __o2["rewrite"],
    x, flattenBlockBody = ((x = map.bind(null, (function(x0) {
        return (((!x0) || (type(x0) === "EmptyStatement")) ? [] : ((type(x0) === "BlockStatement") ? x0
            .body : x0));
    }))), (function(z) {
        return flatten(x(z));
    })),
    mergeBlockDeclarations = foldr.bind(null, (function(p, c) {
        return (((type(c) === "VariableDeclaration") && (type(p[0]) === "VariableDeclaration")) ? concat(modify(
            c, ({
                declarations: concat(c.declarations, p[0].declarations)
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
        declarations: declarations
    }));
}));
peepholes.add("VariableDeclaration", UP, (function(node) {
    return (!node.declarations.length);
}), (function(_) {
    return null;
}));
peepholes.add(["Program", "BlockStatement"], UP, always, (function(node) {
    return modify(node, ({
        body: flattenBlockBody(node.body)
    }));
}));
peepholes.add(["Program", "BlockStatement"], UP, always, (function(node) {
    return modify(node, ({
        body: mergeBlockDeclarations(node.body)
    }));
}));
(optimize = rewrite.bind(null, peepholes));
(exports["optimize"] = optimize);
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/ecma_peep.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("ecma-ast-zipper"),
    ecmaZipper = __o["ecmaZipper"],
    __o0 = require("ecma-ast")["node"],
    modify = __o0["modify"],
    ast_value = require("ecma-ast")["value"],
    ast_declaration = require("ecma-ast")["declaration"],
    ast_statement = require("ecma-ast")["statement"],
    ast_expression = require("ecma-ast")["expression"],
    fun = require("./fun"),
    __o1 = require("./rewriter"),
    UP = __o1["UP"],
    DOWN = __o1["DOWN"],
    Rewriter = __o1["Rewriter"],
    rewrite = __o1["rewrite"],
    optimize, peepholes = new(Rewriter)();
peepholes.add(["VariableDeclaration"], false, (function(_) {
    return true;
}), (function(node) {
    var declarations = node.declarations.filter((function(x) {
        return (!(!x));
    }));
    return modify(node, ({
        "declarations": declarations
    }), ({}));
}));
peepholes.add(["VariableDeclaration"], true, (function(node) {
    return (!node.declarations.length);
}), (function(_) {
    return null;
}));
peepholes.add(["Program", "BlockStatement"], true, (function(_) {
    return true;
}), (function(node) {
    return modify(node, ({
        "body": fun.flatten(node.body.map((function(x) {
            return ((x && (x.type === "BlockStatement")) ? x.body : x);
        })))
    }), ({}));
}));
peepholes.add(["Program", "BlockStatement"], true, (function(_) {
    return true;
}), (function(node) {
    return modify(node, ({
        "body": node.body.reduceRight((function(p, c) {
            return (((((c && (c.type === "VariableDeclaration")) && p.length) && p[0]) && (p[0]
                .type === "VariableDeclaration")) ? fun.concat(modify(c, ({
                "declarations": fun.concat(c.declarations, p[0].declarations)
            }), ({})), p.slice(1)) : fun.concat(c, p));
        }), [])
    }), ({}));
}));
peepholes.add(["Program", "BlockStatement"], true, (function(_) {
    return true;
}), (function(node) {
    return modify(node, ({
        "body": fun.flatten(node.body.map((function(x) {
            return (((!x) || (x.type === "EmptyStatement")) ? [] : x);
        })))
    }), ({}));
}));
(optimize = (function(ast) {
    return rewrite(peepholes, ecmaZipper(ast));
}));
(exports["optimize"] = optimize);
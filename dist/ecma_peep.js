/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/ecma_peep.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "ecma-ast-zipper", "ecma-ast/node", "ecma-ast/value", "ecma-ast/declaration",
    "ecma-ast/statement", "ecma-ast/expression", "./fun", "./rewritter"
], (function(require, exports, __o, __o0, ast_value, ast_declaration, ast_statement, ast_expression, fun, __o1) {
    "use strict";
    var ecmaZipper = __o["ecmaZipper"],
        modify = __o0["modify"],
        UP = __o1["UP"],
        DOWN = __o1["DOWN"],
        Rewritter = __o1["Rewritter"],
        rewrite = __o1["rewrite"],
        optimize, peepholes = new(Rewritter)();
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
                return (((((c && (c.type === "VariableDeclaration")) && p.length) && p[
                    0]) && (p[0].type === "VariableDeclaration")) ? fun.concat(
                    modify(c, ({
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
}));
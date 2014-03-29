/*
 * THIS FILE IS AUTO GENERATED from 'lib/pre_normalize.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast-zipper", "khepri-ast/node", "khepri-ast/declaration", "khepri-ast/statement",
    "khepri-ast/expression", "khepri-ast/pattern", "khepri-ast/package", "khepri-ast/value", "./fun", "./rewritter"
], (function(require, exports, __o, __o0, ast_declaration, ast_statement, ast_expression, ast_pattern, ast_package,
    ast_value, fun, __o1) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        setData = __o0["setData"],
        UP = __o1["UP"],
        DOWN = __o1["DOWN"],
        Rewritter = __o1["Rewritter"],
        rewrite = __o1["rewrite"],
        normalize, peepholes = new(Rewritter)();
    peepholes.add(["PackageExport"], UP, (function(node) {
        return (!node.alias);
    }), (function(node) {
        return ast_package.PackageExport.create(node.loc, node.id, ast_value.Literal.create(null,
            "string", node.id.name));
    }));
    peepholes.add(["LetExpression"], UP, (function(node) {
        return (node.bindings.length > 1);
    }), (function(__o) {
        var loc = __o["loc"],
            bindings = __o["bindings"],
            body = __o["body"];
        return fun.foldr((function(p, c) {
            return ast_expression.LetExpression.create(loc, [c], p);
        }), body, bindings);
    }));
    peepholes.add(["CurryExpression"], DOWN, (function(node) {
        return (node.args.length > 1);
    }), (function(node) {
        return fun.foldl((function(p, arg) {
            return ast_expression.CurryExpression.create(null, p, [arg]);
        }), node.base, node.args);
    }));
    peepholes.add(["ArrayPattern"], DOWN, (function(_) {
        return true;
    }), (function(node) {
        var loc = node["loc"],
            elements = node["elements"];
        return ast_pattern.ObjectPattern.create(loc, fun.map((function(x, i) {
            return ast_pattern.ObjectPatternElement.create(null, ast_value.Literal.create(
                null, "number", i), x);
        }), elements));
    }));
    peepholes.add(["ObjectPatternElement"], DOWN, (function(node) {
        return (!node.target);
    }), (function(node) {
        var loc = node["loc"],
            key = node["key"];
        switch (key.type) {
            case "IdentifierPattern":
                return ast_pattern.ObjectPatternElement.create(null, ast_value.Literal.create(null,
                    "string", key.id.name), key);
            case "AsPattern":
                return ast_pattern.ObjectPatternElement.create(null, ast_value.Literal.create(null,
                    "string", key.id.id.name), key);
            default:
                return node;
        }
    }));
    peepholes.add(["AsPattern"], DOWN, (function(node) {
        return ((!node.target.ud) || (!node.target.ud.id));
    }), (function(node) {
        return ast_pattern.AsPattern.create(null, node.id, setData(node.target, "id", node.id));
    }));
    peepholes.add(["ObjectPattern"], UP, (function(node) {
        return ((!node.ud) || (!node.ud.id));
    }), (function(node) {
        var id = ast_pattern.IdentifierPattern.create(node.loc, ast_value.Identifier.create(null, "__o"));
        (id.reserved = true);
        return ast_pattern.AsPattern.create(null, id, setData(ast_pattern.ObjectPattern.create(null,
            node.elements), "id", id));
    }));
    (normalize = (function(ast) {
        return rewrite(peepholes, khepriZipper(ast));
    }));
    (exports["normalize"] = normalize);
}));
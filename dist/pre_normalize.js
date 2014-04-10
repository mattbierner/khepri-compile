/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/pre_normalize.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast-zipper", "khepri-ast/node", "khepri-ast/expression", "khepri-ast/pattern",
    "khepri-ast/package", "khepri-ast/value", "./pseudo/pattern", "./ast", "./fun", "./rewriter"
], (function(require, exports, __o, __o0, ast_expression, ast_pattern, ast_package, ast_value, __o1, __o2, __o3,
    __o4) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        modify = __o0["modify"],
        setData = __o0["setData"],
        SliceUnpack = __o1["SliceUnpack"],
        RelativeUnpack = __o1["RelativeUnpack"],
        type = __o2["type"],
        concat = __o3["concat"],
        map = __o3["map"],
        foldl = __o3["foldl"],
        foldr = __o3["foldr"],
        flatten = __o3["flatten"],
        UP = __o4["UP"],
        DOWN = __o4["DOWN"],
        Rewriter = __o4["Rewriter"],
        rewrite = __o4["rewrite"],
        normalize, string = ast_value.Literal.create.bind(null, null, "string"),
        number = ast_value.Literal.create.bind(null, null, "number"),
        peepholes = new(Rewriter)();
    peepholes.add("PackageExport", UP, (function(node) {
        return (!node.alias);
    }), (function(node) {
        return ast_package.PackageExport.create(node.loc, node.id, string(node.id.name));
    }));
    peepholes.add("LetExpression", UP, (function(node) {
        return (node.bindings.length > 1);
    }), (function(__o5) {
        var bindings = __o5["bindings"],
            body = __o5["body"];
        return foldr((function(p, c) {
            return ast_expression.LetExpression.create(null, [c], p);
        }), body, bindings);
    }));
    peepholes.add("CurryExpression", DOWN, (function(node) {
        return (node.args.length > 1);
    }), (function(__o5) {
        var base = __o5["base"],
            args = __o5["args"];
        return foldl((function(p, arg) {
            return ast_expression.CurryExpression.create(null, p, [arg]);
        }), base, args);
    }));
    var splitUnpackList = (function(elements) {
        var indx = elements.map(type)
            .indexOf("EllipsisPattern");
        return ((indx < 0) ? [elements, null, []] : [elements.slice(0, indx), elements[indx], elements.slice(
            (indx + 1))]);
    }),
        createUnpackList = (function(pre, mid, post) {
            return concat(pre, ((mid && mid.id) ? SliceUnpack.create(null, mid.id, pre.length, post.length) : []),
                map((function(x, i) {
                    return RelativeUnpack.create(null, x, (post.length - i), (post.length + pre.length));
                }), post));
        });
    peepholes.add("ArrayPattern", DOWN, (function(_) {
        return true;
    }), (function(__o5) {
        var loc = __o5["loc"],
            elements = __o5["elements"],
            __o6 = splitUnpackList(elements),
            pre = __o6[0],
            mid = __o6[1],
            post = __o6[2];
        return ast_pattern.ObjectPattern.create(loc, createUnpackList(map((function(x, i) {
            return ast_pattern.ObjectPatternElement.create(null, number(i), x);
        }), pre), mid, post));
    }));
    peepholes.add("ArgumentsPattern", UP, (function(node) {
        return (node.elements.map(type)
            .indexOf("EllipsisPattern") >= 0);
    }), (function(node) {
        var __o5 = splitUnpackList(node.elements),
            pre = __o5[0],
            mid = __o5[1],
            post = __o5[2],
            id = (node.id || setData(ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(
                null, "__args")), "reserved", true));
        return modify(node, ({
            "id": id,
            "elements": createUnpackList(pre, mid, post)
        }), ({}));
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
        var id = setData(ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null,
            "__o")), "reserved", true);
        return ast_pattern.AsPattern.create(null, id, setData(node, "id", id));
    }));
    var x = khepriZipper,
        y = rewrite.bind(null, peepholes);
    (normalize = (function(x0) {
        return y(x(x0));
    }));
    (exports["normalize"] = normalize);
}));
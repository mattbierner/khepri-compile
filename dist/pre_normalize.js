/*
 * THIS FILE IS AUTO GENERATED from 'lib/pre_normalize.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast-zipper", "khepri-ast/node", "khepri-ast/expression", "khepri-ast/pattern",
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
    var splitArrayPattern = (function(elements) {
        var indx = elements.map(type)
            .indexOf("EllipsisPattern");
        return ((indx < 0) ? [elements, null, []] : [elements.slice(0, indx), elements[indx], elements.slice(
            (indx + 1))]);
    });
    peepholes.add("ArrayPattern", DOWN, (function(_) {
        return true;
    }), (function(node) {
        var loc = node["loc"],
            elements = node["elements"],
            __o = splitArrayPattern(elements),
            pre = __o[0],
            mid = __o[1],
            post = __o[2];
        return ast_pattern.ObjectPattern.create(loc, flatten(concat(map((function(x, i) {
                return ast_pattern.ObjectPatternElement.create(null, number(i), x);
            }), pre), ((mid && mid.id) ? SliceUnpack.create(null, mid.id, pre.length, post.length) : []),
            map((function(x, i) {
                return RelativeUnpack.create(null, x, ((-post.length) + i), (pre.length +
                    post.length));
            }), post))));
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
    peepholes.add("ArgumentsPattern", UP, (function(node) {
        return ((!node.id) && (node.elements.map(type)
            .indexOf("EllipsisPattern") >= 0));
    }), (function(node) {
        var id = setData(ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null,
            "__args")), "reserved", true);
        return setData(modify(node, ({
            "id": id
        }), ({})), "id", id);
    }));
    (normalize = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(rewrite.bind(null, peepholes), khepriZipper));
    (exports["normalize"] = normalize);
}));
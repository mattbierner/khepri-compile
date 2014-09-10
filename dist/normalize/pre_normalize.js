/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/normalize/pre_normalize.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "khepri-ast/expression", "khepri-ast/pattern", "khepri-ast/package",
    "khepri-ast/value", "../pseudo/pattern", "../ast", "../fun", "../rewriter"
], (function(require, exports, __o, ast_expression, ast_pattern, ast_package, ast_value, __o0, __o1, __o2, __o3) {
    "use strict";
    var normalize, modify = __o["modify"],
        SliceUnpack = __o0["SliceUnpack"],
        RelativeUnpack = __o0["RelativeUnpack"],
        type = __o1["type"],
        getUd = __o1["getUd"],
        setUd = __o1["setUd"],
        constant = __o2["constant"],
        concat = __o2["concat"],
        map = __o2["map"],
        foldl = __o2["foldl"],
        foldr = __o2["foldr"],
        UP = __o3["UP"],
        DOWN = __o3["DOWN"],
        Rewriter = __o3["Rewriter"],
        rewrite = __o3["rewrite"],
        __args, y, y0, __o4, string = ast_value.Literal.create.bind(null, null, "string"),
        number = ast_value.Literal.create.bind(null, null, "number"),
        markReserved = setUd.bind(null, "reserved", true),
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
    rewrites.add("LetExpression", UP, (function(z) {
        var y = z.bindings.length;
        return (y > 1);
    }), (function(__o4) {
        var bindings = __o4["bindings"],
            body = __o4["body"];
        return foldr((function(p, c) {
            return ast_expression.LetExpression.create(null, [c], p);
        }), body, bindings);
    }));
    rewrites.add("CurryExpression", DOWN, (function(z) {
        var y = z.args.length;
        return (y > 1);
    }), (function(__o4) {
        var base = __o4["base"],
            args = __o4["args"];
        return foldl((function(p, arg) {
            return ast_expression.CurryExpression.create(null, p, [arg]);
        }), base, args);
    }));
    var markChecked = (function(x) {
        return (((type(x) === "ObjectPattern") || (type(x) === "ArrayPattern")) ? modify(x, ({}), ({
            checked: true
        })) : ((type(x) === "AsPattern") ? modify(x, ({
            target: markChecked(x.target)
        })) : x));
    });
    rewrites.add("ArrayPattern", DOWN, (function(_) {
        return true;
    }), (function(__o4) {
        var loc = __o4["loc"],
            elements = __o4["elements"],
            checked = __o4["checked"],
            elements0 = (checked ? map(markChecked, elements) : elements),
            indx = elements0.map(type)
                .indexOf("EllipsisPattern"),
            __o5 = ((indx < 0) ? [elements0, null, []] : [elements0.slice(0, indx), elements0[indx],
                elements0.slice((indx + 1))
            ]),
            pre = __o5[0],
            mid = __o5[1],
            post = __o5[2],
            pre0;
        return ast_pattern.ObjectPattern.create(loc, ((pre0 = map((function(x, i) {
            return ast_pattern.ObjectPatternElement.create(null, number(i), x);
        }), pre)), concat(pre0, ((mid && mid.id) ? SliceUnpack.create(null, mid.id, null, pre0.length,
            post.length) : []), map((function(x, i) {
            return RelativeUnpack.create(null, x, null, (post.length - i), (post.length +
                pre0.length));
        }), post))), checked);
    }));
    rewrites.add("ObjectPattern", DOWN, (function(x) {
        return x.checked;
    }), (function(node) {
        return modify(node, ({
            elements: map((function(element) {
                var x, x0;
                return modify(element, ({
                    target: ((x = element.target), (((type(x) ===
                        "ObjectPattern") || (type(x) ===
                        "ArrayPattern")) ? modify(x, ({}), ({
                        checked: true
                    })) : ((type(x) === "AsPattern") ? modify(x, ({
                        target: markChecked(x.target)
                    })) : x))),
                    key: ((x0 = element.key), (((type(x0) === "ObjectPattern") ||
                        (type(x0) === "ArrayPattern")) ? modify(x0, ({}), ({
                        checked: true
                    })) : ((type(x0) === "AsPattern") ? modify(x0, ({
                        target: markChecked(x0.target)
                    })) : x0)))
                }));
            }), node.elements)
        }));
    }));
    rewrites.add("ArgumentsPattern", UP, (function(node) {
        return (node.elements.map(type)
            .indexOf("EllipsisPattern") >= 0);
    }), ((__args = markReserved(ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null,
        "__args")))), (function(node) {
        var elements = node.elements,
            indx = elements.map(type)
                .indexOf("EllipsisPattern"),
            __o4 = ((indx < 0) ? [elements, null, []] : [elements.slice(0, indx), elements[indx],
                elements.slice((indx + 1))
            ]),
            pre = __o4[0],
            mid = __o4[1],
            post = __o4[2];
        return modify(node, ({
            id: (node.id || __args),
            elements: concat(pre, ((mid && mid.id) ? SliceUnpack.create(null, mid.id, null,
                pre.length, post.length) : []), map((function(x, i) {
                return RelativeUnpack.create(null, x, null, (post.length - i), (
                    post.length + pre.length));
            }), post))
        }));
    })));
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
    rewrites.add("AsPattern", DOWN, ((y = getUd.bind(null, "id")), (function(z) {
        var x = y(z.target);
        return (!x);
    })), (function(node) {
        return ast_pattern.AsPattern.create(null, node.id, setUd("id", node.id, node.target));
    }));
    rewrites.add("ObjectPattern", UP, ((y0 = getUd.bind(null, "id")), (function(z) {
        var x = y0(z);
        return (!x);
    })), ((__o4 = markReserved(ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null,
        "__o")))), (function(node) {
        return ast_pattern.AsPattern.create(null, __o4, setUd("id", __o4, node));
    })));
    rewrites.add("SinkPattern", DOWN, always, constant(markReserved(ast_pattern.IdentifierPattern.create(null,
        ast_value.Identifier.create(null, "_")))));
    (normalize = rewrite.bind(null, rewrites));
    (exports["normalize"] = normalize);
}));
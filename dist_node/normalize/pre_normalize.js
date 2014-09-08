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
    __o0 = require("../pseudo/expression"),
    __o1 = require("../pseudo/pattern"),
    __o2 = require("../ast"),
    __o3 = require("../fun"),
    __o4 = require("../rewriter"),
    normalize, modify = __o["modify"],
    CheckedMemberExpression = __o0["CheckedMemberExpression"],
    SliceUnpack = __o1["SliceUnpack"],
    RelativeUnpack = __o1["RelativeUnpack"],
    type = __o2["type"],
    getUd = __o2["getUd"],
    setUd = __o2["setUd"],
    constant = __o3["constant"],
    concat = __o3["concat"],
    map = __o3["map"],
    foldl = __o3["foldl"],
    foldr = __o3["foldr"],
    UP = __o4["UP"],
    DOWN = __o4["DOWN"],
    Rewriter = __o4["Rewriter"],
    rewrite = __o4["rewrite"],
    __args, y, y0, __o5, string = ast_value.Literal.create.bind(null, null, "string"),
    number = ast_value.Literal.create.bind(null, null, "number"),
    markReserved = setUd.bind(null, "reserved", true),
    always = (function(_) {
        return true;
    }),
    rewrites = new(Rewriter)();
rewrites.add("PackageExport", UP, (function(z) {
    var x = z.alias;
    return (!x);
}), (function(__o5) {
    var id = __o5["id"],
        loc = __o5["loc"];
    return ast_package.PackageExport.create(loc, id, string(id.name));
}));
rewrites.add("LetExpression", UP, (function(node) {
    return (node.bindings.length > 1);
}), (function(__o5) {
    var bindings = __o5["bindings"],
        body = __o5["body"];
    return foldr((function(p, c) {
        return ast_expression.LetExpression.create(null, [c], p);
    }), body, bindings);
}));
rewrites.add("CurryExpression", DOWN, (function(node) {
    return (node.args.length > 1);
}), (function(__o5) {
    var base = __o5["base"],
        args = __o5["args"];
    return foldl((function(p, arg) {
        return ast_expression.CurryExpression.create(null, p, [arg]);
    }), base, args);
}));
rewrites.add("MemberExpression", DOWN, (function(x) {
    return x.checked;
}), (function(node) {
    return CheckedMemberExpression.create(node.loc, node.object, node.property, null, node.computed);
}));
rewrites.add("MemberExpression", UP, (function(z) {
    var z0 = z.object,
        y = type(z0);
    return ("CheckedMemberExpression" === y);
}), (function(node) {
    return CheckedMemberExpression.create(node.loc, node.object, node.property, node.computed);
}));
rewrites.add("CallExpression", UP, (function(__o5) {
    var callee = __o5["callee"];
    return ((type(callee) === "CheckedMemberExpression") || getUd("checked", callee));
}), setUd.bind(null, "checked", true));
var markChecked = (function(x) {
    return (((type(x) === "ObjectPattern") || (type(x) === "ArrayPattern")) ? modify(x, ({}), ({
        checked: true
    })) : ((type(x) === "AsPattern") ? modify(x, ({
        target: markChecked(x.target)
    })) : x));
});
rewrites.add("ArrayPattern", DOWN, (function(_) {
    return true;
}), (function(__o5) {
    var loc = __o5["loc"],
        elements = __o5["elements"],
        checked = __o5["checked"],
        elements0 = (checked ? map(markChecked, elements) : elements),
        indx = elements0.map(type)
            .indexOf("EllipsisPattern"),
        __o6 = ((indx < 0) ? [elements0, null, []] : [elements0.slice(0, indx), elements0[indx], elements0.slice(
            (indx + 1))]),
        pre = __o6[0],
        mid = __o6[1],
        post = __o6[2],
        pre0;
    return ast_pattern.ObjectPattern.create(loc, ((pre0 = map((function(x, i) {
        return ast_pattern.ObjectPatternElement.create(null, number(i), x);
    }), pre)), concat(pre0, ((mid && mid.id) ? SliceUnpack.create(null, mid.id, null, pre0.length, post
        .length) : []), map((function(x, i) {
        return RelativeUnpack.create(null, x, null, (post.length - i), (post.length + pre0.length));
    }), post))), checked);
}));
rewrites.add("ObjectPattern", DOWN, (function(x) {
    return x.checked;
}), (function(node) {
    return modify(node, ({
        elements: map((function(element) {
            var x, x0;
            return modify(element, ({
                target: ((x = element.target), (((type(x) === "ObjectPattern") || (type(
                    x) === "ArrayPattern")) ? modify(x, ({}), ({
                    checked: true
                })) : ((type(x) === "AsPattern") ? modify(x, ({
                    target: markChecked(x.target)
                })) : x))),
                key: ((x0 = element.key), (((type(x0) === "ObjectPattern") || (type(x0) ===
                    "ArrayPattern")) ? modify(x0, ({}), ({
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
}), ((__args = markReserved(ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null, "__args")))), (
    function(node) {
        var elements = node.elements,
            indx = elements.map(type)
                .indexOf("EllipsisPattern"),
            __o5 = ((indx < 0) ? [elements, null, []] : [elements.slice(0, indx), elements[indx], elements.slice(
                (indx + 1))]),
            pre = __o5[0],
            mid = __o5[1],
            post = __o5[2];
        return modify(node, ({
            id: (node.id || __args),
            elements: concat(pre, ((mid && mid.id) ? SliceUnpack.create(null, mid.id, null, pre.length,
                post.length) : []), map((function(x, i) {
                return RelativeUnpack.create(null, x, null, (post.length - i), (post.length +
                    pre.length));
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
})), ((__o5 = markReserved(ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null, "__o")))), (
    function(node) {
        return ast_pattern.AsPattern.create(null, __o5, setUd("id", __o5, node));
    })));
rewrites.add("SinkPattern", DOWN, always, constant(markReserved(ast_pattern.IdentifierPattern.create(null, ast_value.Identifier
    .create(null, "_")))));
(normalize = rewrite.bind(null, rewrites));
(exports["normalize"] = normalize);
/*
 * THIS FILE IS AUTO GENERATED from 'lib/normalize/unpack.kep'
 * DO NOT EDIT
*/"use strict";
var ast_expression = require("khepri-ast")["expression"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    __o = require("../pseudo/pattern"),
    SliceUnpack = __o["SliceUnpack"],
    RelativeUnpack = __o["RelativeUnpack"],
    __o0 = require("../ast"),
    type = __o0["type"],
    fun = require("../fun"),
    concat = fun["concat"],
    flatten = fun["flatten"],
    flattenr = fun["flattenr"],
    map = fun["map"],
    innerPattern, unpackParameters, getParameterNames, relativeUnpack = (function(target, start, indx, pattern) {
        return innerPattern(RelativeUnpack.create(null, pattern, target, indx, start), pattern);
    }),
    sliceUnpack = (function(target, id, from, to) {
        return innerPattern(SliceUnpack.create(null, id, target, from, to), id);
    }),
    expandObjectElement = (function(base, pattern, key) {
        var innerBase = ast_expression.MemberExpression.create(null, base, key, true);
        return (pattern ? flatten(innerPattern(innerBase, pattern)) : ast_declaration.Binding.create(null,
            ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null, key.value)), innerBase
        ));
    }),
    expandObject = (function(base, pattern) {
        return flattenr(map((function(node) {
            return ((type(node) === "SliceUnpack") ? sliceUnpack(pattern.ud.id.id, node.pattern, node.from,
                node.to) : ((type(node) === "RelativeUnpack") ? relativeUnpack(pattern.ud.id.id,
                node.min, node.index, node.pattern) : expandObjectElement(pattern.ud.id.id,
                node.target, node.key)));
        }), pattern.elements));
    }),
    expandAs = (function(base, pattern) {
        return concat(innerPattern(base, pattern.id), flatten(innerPattern(pattern.id, pattern.target)));
    });
(innerPattern = (function(base, pattern) {
    switch (type(pattern)) {
        case "IdentifierPattern":
            return [ast_declaration.Binding.create(null, pattern, base)];
        case "AsPattern":
            return expandAs(base, pattern);
        case "ObjectPattern":
            return expandObject(base, pattern);
        default:
            return [];
    }
}));
(unpackParameters = (function(args, elements) {
    return flatten(map((function(x) {
        switch (type(x)) {
            case "SinkPattern":
            case "IdentifierPattern":
                return [];
            case "SliceUnpack":
                return sliceUnpack(args.id, x.pattern, x.from, x.to);
            case "RelativeUnpack":
                return relativeUnpack(args.id, x.min, x.index, x.pattern);
            case "AsPattern":
                return flatten(innerPattern(x.id, x.target));
            default:
                return innerPattern(x, x);
        }
    }), elements));
}));
var x = flattenr,
    y = map.bind(null, (function(x0) {
        switch (type(x0)) {
            case "IdentifierPattern":
                return x0;
            case "AsPattern":
                return x0.id;
            case "SliceUnpack":
            case "RelativeUnpack":
                return [];
            default:
                x0;
        }
    }));
(getParameterNames = (function(z) {
    return x(y(z));
}));
(exports["innerPattern"] = innerPattern);
(exports["unpackParameters"] = unpackParameters);
(exports["getParameterNames"] = getParameterNames);
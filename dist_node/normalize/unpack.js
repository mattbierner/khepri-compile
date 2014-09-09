/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/normalize/unpack.kep'
 * DO NOT EDIT
*/
"use strict";
var ast_expression = require("khepri-ast")["expression"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    __o = require("../pseudo/pattern"),
    __o0 = require("../pseudo/expression"),
    __o1 = require("../ast"),
    __o2 = require("../fun"),
    innerPattern, unpackParameters, getParameterNames, SliceUnpack = __o["SliceUnpack"],
    RelativeUnpack = __o["RelativeUnpack"],
    CheckedMemberExpression = __o0["CheckedMemberExpression"],
    type = __o1["type"],
    concat = __o2["concat"],
    flatten = __o2["flatten"],
    flattenr = __o2["flattenr"],
    map = __o2["map"],
    expandObjectElement = (function(base, pattern, key, checked) {
        var innerBase = (checked ? CheckedMemberExpression.create(null, base, key, base.id.id) : ast_expression.MemberExpression
            .create(null, base, key, true));
        return (pattern ? flatten(innerPattern(innerBase, pattern)) : ast_declaration.Binding.create(null,
            ast_pattern.IdentifierPattern.create(null, ast_value.Identifier.create(null, key.value)), innerBase
        ));
    }),
    expandObject = (function(base, pattern, checked) {
        return flattenr(map((function(node) {
            var target, pattern0, from, to, target0, start, indx, pattern1;
            return ((type(node) === "SliceUnpack") ? ((target = pattern.ud.id.id), (pattern0 = node.pattern), (
                from = node.from), (to = node.to), innerPattern(SliceUnpack.create(null,
                pattern0, target, from, to), pattern0)) : ((type(node) === "RelativeUnpack") ? ((
                target0 = pattern.ud.id.id), (start = node.min), (indx = node.index), (
                pattern1 = node.pattern), innerPattern(RelativeUnpack.create(null, pattern1,
                target0, indx, start), pattern1)) : expandObjectElement(pattern.ud.id.id, node.target,
                node.key, pattern.checked)));
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
            return expandObject(base, pattern, pattern.checked);
        default:
            return [];
    }
}));
(unpackParameters = (function(args, elements) {
    return flatten(map((function(x) {
        switch (type(x)) {
            case "IdentifierPattern":
                return [];
            case "SliceUnpack":
                {
                    var target = args.id,
                        pattern = x.pattern,
                        from = x.from,
                        to = x.to;
                    return innerPattern(SliceUnpack.create(null, pattern, target, from, to),
                        pattern);
                }
            case "RelativeUnpack":
                {
                    var target0 = args.id,
                        start = x.min,
                        indx = x.index,
                        pattern0 = x.pattern;
                    return innerPattern(RelativeUnpack.create(null, pattern0, target0, indx, start),
                        pattern0);
                }
            case "AsPattern":
                return flatten(innerPattern(x.id, x.target));
            default:
                return innerPattern(x, x);
        }
    }), elements));
}));
var y = map.bind(null, (function(x) {
    switch (type(x)) {
        case "AsPattern":
            return x.id;
        case "SliceUnpack":
        case "RelativeUnpack":
            return [];
        default:
            return x;
    }
}));
(getParameterNames = (function(z) {
    return flattenr(y(z));
}));
(exports["innerPattern"] = innerPattern);
(exports["unpackParameters"] = unpackParameters);
(exports["getParameterNames"] = getParameterNames);
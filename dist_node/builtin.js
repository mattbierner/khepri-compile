/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/builtin.kep'
 * DO NOT EDIT
*/
"use strict";
var ast_expression = require("khepri-ast")["expression"],
    __o = require("khepri-ast")["node"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    __o0 = require("./ast"),
    __o1 = require("./fun"),
    builtins, definitions, member, modify = __o["modify"],
    type = __o0["type"],
    getUid = __o0["getUid"],
    setUid = __o0["setUid"],
    setLocals = __o0["setLocals"],
    flip = __o1["flip"],
    forEach = __o1["forEach"],
    uid6, xArg0, uid7, xArg1, uid8, yArg0, unique = (function() {
        var x = 0;
        return (function() {
            (x = (x + 1));
            return x;
        });
    })();
(definitions = ({}));
(builtins = ({}));
var addSymbol = (function(name, id, def) {
    (builtins[name] = id);
    (definitions[name] = def);
}),
    registerAliasedSymbol = (function(name, alias, def) {
        var uid;
        addSymbol(name, ((uid = unique()), setUid(uid, ast_value.Identifier.create(null, alias))), def);
    }),
    uid = unique();
(builtins["require"] = setUid(uid, ast_value.Identifier.create(null, "require")));
var uid0 = unique();
(builtins["exports"] = setUid(uid0, ast_value.Identifier.create(null, "exports")));
var uid1 = unique();
(builtins["module"] = setUid(uid1, ast_value.Identifier.create(null, "module")));
var uid2 = unique();
(builtins["undefined"] = setUid(uid2, ast_value.Identifier.create(null, "undefined")));
forEach([
    ["typeof", "__typeof"],
    ["void", "__void"],
    ["~", "__bnot"],
    ["!", "__lnot"],
    ["++", "__plus"],
    ["--", "__minus"]
], (function(__o2) {
    var op = __o2[0],
        name = __o2[1],
        uid3, xArg;
    registerAliasedSymbol(op, name, ((uid3 = unique()), (xArg = setUid(uid3, ast_value.Identifier.create(null,
        "x"))), setLocals([getUid(xArg)], ast_expression.FunctionExpression.create(null, null,
        ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern.create(null,
            xArg)]), ast_expression.UnaryExpression.create(null, op, xArg)))));
}));
var uid3 = unique(),
    xArg = setUid(uid3, ast_value.Identifier.create(null, "x")),
    uid4 = unique(),
    yArg = setUid(uid4, ast_value.Identifier.create(null, "y")),
    uid5 = unique(),
    zArg = setUid(uid5, ast_value.Identifier.create(null, "z")),
    ternaryOperator = setLocals([getUid(xArg), getUid(yArg), getUid(zArg)], ast_expression.FunctionExpression.create(
        null, null, ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern.create(null,
            xArg), ast_pattern.IdentifierPattern.create(null, yArg), ast_pattern.IdentifierPattern.create(
            null, zArg)]), ast_expression.ConditionalExpression.create(null, xArg, yArg, zArg)));
registerAliasedSymbol("?", "__cond", ternaryOperator);
var binary = (function(op) {
    var uid6 = unique(),
        xArg0 = setUid(uid6, ast_value.Identifier.create(null, "x")),
        uid7 = unique(),
        yArg0 = setUid(uid7, ast_value.Identifier.create(null, "y"));
    return setLocals([getUid(xArg0), getUid(yArg0)], ast_expression.FunctionExpression.create(null, null,
        ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern.create(null, xArg0),
            ast_pattern.IdentifierPattern.create(null, yArg0)
        ]), op(xArg0, yArg0)));
}),
    registerBinary = (function(op, name, impl) {
        registerAliasedSymbol(op, name, binary(impl));
    });
forEach([
    ["+", "__add"],
    ["-", "__sub"],
    ["*", "__mul"],
    ["/", "__div"],
    ["%", "__mod"],
    ["<<", "__blas"],
    [">>", "__bras"],
    [">>>", "__brls"],
    ["&", "__band"],
    ["^", "__bxor"],
    ["|", "__bor"],
    ["<", "__lt"],
    [">", "__gt"],
    ["<=", "__lte"],
    [">=", "__gte"],
    ["==", "__eq"],
    ["!=", "__neq"],
    ["===", "__seq"],
    ["!==", "__sneq"],
    ["instanceof", "__instanceof"],
    ["||", "__or"],
    ["&&", "__and"]
], (function(__o2) {
    var op = __o2[0],
        name = __o2[1];
    registerBinary(op, name, ast_expression.BinaryExpression.create.bind(null, null, op));
}));
registerAliasedSymbol("_", "_", ((uid6 = unique()), (xArg0 = setUid(uid6, ast_value.Identifier.create(null, "f"))),
    setLocals([getUid(xArg0)], ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
        null, null, [ast_pattern.IdentifierPattern.create(null, xArg0)]), ((uid7 = unique()), (xArg1 =
        setUid(uid7, ast_value.Identifier.create(null, "x"))), (uid8 = unique()), (yArg0 = setUid(uid8,
        ast_value.Identifier.create(null, "y"))), setLocals([getUid(xArg1), getUid(yArg0)],
        ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null,
            null, [ast_pattern.IdentifierPattern.create(null, xArg1), ast_pattern.IdentifierPattern
                .create(null, yArg0)
            ]), ast_expression.CallExpression.create(null, xArg0, [yArg0, xArg1]))))))));
registerBinary("new", "__new", (function(x, y) {
    return ast_expression.NewExpression.create(null, x, [y]);
}));
registerBinary(".", "__dot", (function(x, y) {
    return ast_expression.MemberExpression.create(null, x, y, true);
}));
registerBinary("??", "__chk", (function(x, y) {
    return ast_expression.BinaryExpression.create(null, "&&", x, ast_expression.CallExpression.create(null, y, [
        x
    ]));
}));
registerBinary("@", "__curry", (function(x, y) {
    return ast_expression.CurryExpression.create(null, x, [y]);
}));
var pipe = (function(callee, arg) {
    return ast_expression.CallExpression.create(null, callee, [arg]);
});
registerBinary("<|", "__pipe", pipe);
registerBinary("|>", "__rpipe", flip(pipe));
var pipe0 = (function(callee, arg) {
    return ast_expression.CallExpression.create(null, ast_expression.MemberExpression.create(null, callee, setUid(
        undefined, ast_value.Identifier.create(null, "apply"))), [ast_value.Literal.create(null, "null"), arg]);
});
registerBinary("<<|", "__pipen", pipe0);
registerBinary("|>>", "__rpipen", flip(pipe0));
var singleCompose = (function(f, g) {
    var uid9 = unique(),
        xArg2 = setUid(uid9, ast_value.Identifier.create(null, "z"));
    return setLocals([getUid(xArg2)], ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
        .create(null, null, [ast_pattern.IdentifierPattern.create(null, xArg2)]), ast_expression.CallExpression
        .create(null, f, [ast_expression.CallExpression.create(null, g, [xArg2])])));
});
registerBinary("<\\", "__compose", singleCompose);
registerBinary("\\>", "__rcompose", flip(singleCompose));
var multiCompose = (function(f, g) {
    var uid9 = unique(),
        args = setUid(uid9, ast_value.Identifier.create(null, "args"));
    return setLocals([getUid(args)], ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
        .create(null, ast_pattern.IdentifierPattern.create(null, args), [], null), ast_expression.CallExpression
        .create(null, f, [ast_expression.CallExpression.create(null, ast_expression.MemberExpression.create(
            null, g, setUid(undefined, ast_value.Identifier.create(null, "apply"))), [ast_value.Literal
            .create(null, "null"), args
        ])])));
});
registerBinary("<<\\", "__composen", multiCompose);
registerBinary("\\>>", "__rcomposen", flip(multiCompose));
var subDotHole = (function(expr, arg) {
    return ((type(expr) === "MemberExpression") ? modify(expr, ({
        "object": (expr.object ? subDotHole(expr.object, arg) : arg)
    })) : ((type(expr) === "CallExpression") ? modify(expr, ({
        "callee": subDotHole(expr.callee, arg)
    })) : expr));
});
(member = (function(expr, uid9) {
    var xArg2 = setUid(uid9, ast_value.Identifier.create(null, "x"));
    return setLocals([getUid(xArg2)], ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
        .create(null, null, [ast_pattern.IdentifierPattern.create(null, xArg2)]), ((type(expr) ===
            "MemberExpression") ? modify(expr, ({
            "object": (expr.object ? subDotHole(expr.object, xArg2) : xArg2)
        })) : ((type(expr) === "CallExpression") ? modify(expr, ({
            "callee": subDotHole(expr.callee, xArg2)
        })) : expr))));
}));
(exports["builtins"] = builtins);
(exports["definitions"] = definitions);
(exports["member"] = member);
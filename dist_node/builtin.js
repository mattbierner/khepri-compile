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
    setUd = __o0["setUd"],
    getUid = __o0["getUid"],
    setUid = __o0["setUid"],
    setLocals = __o0["setLocals"],
    flip = __o1["flip"],
    identifier = (function(name, uid) {
        return setUid(uid, ast_value.Identifier.create(null, name));
    }),
    unique = (function() {
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
        addSymbol(name, identifier(alias, unique()), def);
    }),
    uid = unique();
(builtins["require"] = setUid(uid, ast_value.Identifier.create(null, "require")));
var uid0 = unique();
(builtins["exports"] = setUid(uid0, ast_value.Identifier.create(null, "exports")));
var uid1 = unique();
(builtins["module"] = setUid(uid1, ast_value.Identifier.create(null, "module")));
var uid2 = unique();
(builtins["undefined"] = setUid(uid2, ast_value.Identifier.create(null, "undefined")));
var uid3, uid4, xArg, uid5, xArg0, uid6, yArg;
[
    ["typeof", "__typeof"],
    ["void", "__void"],
    ["~", "__bnot"],
    ["!", "__lnot"],
    ["++", "__plus"],
    ["--", "__minus"]
].forEach((function(__o2) {
    var op = __o2[0],
        name = __o2[1],
        xArg;
    registerAliasedSymbol(op, name, ((xArg = identifier("x", unique())), setLocals([getUid(xArg)],
        ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null,
                null, [ast_pattern.IdentifierPattern.create(null, xArg)]), ast_expression.UnaryExpression
            .create(null, op, xArg)))));
}));
addSymbol("_", ((uid3 = unique()), setUid(uid3, ast_value.Identifier.create(null, "_"))), ((uid4 = unique()), (xArg =
    setUid(uid4, ast_value.Identifier.create(null, "x"))), setLocals([getUid(xArg)], ast_expression.FunctionExpression
    .create(null, null, ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern.create(
        null, xArg)]), ((uid5 = unique()), (xArg0 = setUid(uid5, ast_value.Identifier.create(null, "x"))), (
        uid6 = unique()), (yArg = setUid(uid6, ast_value.Identifier.create(null, "y"))), setLocals([
        getUid(xArg0), getUid(yArg)
    ], ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
        null, null, [ast_pattern.IdentifierPattern.create(null, xArg0), ast_pattern.IdentifierPattern
            .create(null, yArg)
        ]), ast_expression.CallExpression.create(null, xArg, [yArg, xArg0]))))))));
var uid7 = unique(),
    xArg1 = setUid(uid7, ast_value.Identifier.create(null, "x")),
    uid8 = unique(),
    yArg0 = setUid(uid8, ast_value.Identifier.create(null, "y")),
    uid9 = unique(),
    zArg = setUid(uid9, ast_value.Identifier.create(null, "z")),
    ternaryOperator = setLocals([getUid(xArg1), getUid(yArg0), getUid(zArg)], ast_expression.FunctionExpression.create(
        null, null, ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern.create(null,
            xArg1), ast_pattern.IdentifierPattern.create(null, yArg0), ast_pattern.IdentifierPattern.create(
            null, zArg)]), ast_expression.ConditionalExpression.create(null, xArg1, yArg0, zArg)));
registerAliasedSymbol("?", "__cond", ternaryOperator);
var binary = (function(op) {
    var xArg2 = identifier("x", unique()),
        yArg1 = identifier("y", unique());
    return setLocals([getUid(xArg2), getUid(yArg1)], ast_expression.FunctionExpression.create(null, null,
        ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern.create(null, xArg2),
            ast_pattern.IdentifierPattern.create(null, yArg1)
        ]), op(xArg2, yArg1)));
}),
    registerBinary = (function(op, name, impl) {
        registerAliasedSymbol(op, name, binary(impl));
    }),
    binaryOp = (function(op) {
        return (function(x, y) {
            return ast_expression.BinaryExpression.create(null, op, x, y);
        });
    });
[
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
].forEach((function(__o2) {
    var op = __o2[0],
        name = __o2[1];
    registerBinary(op, name, binaryOp(op));
}));
registerBinary("new", "__new", (function(x, y) {
    return ast_expression.NewExpression.create(null, x, [y]);
}));
registerBinary(".", "__dot", (function(x, y) {
    return ast_expression.MemberExpression.create(null, x, y, true);
}));
registerBinary("??", "__chk", (function(x, y) {
    return ast_expression.BinaryExpression.create(null, "&&", x, setUd("id", identifier("__x", unique()),
        ast_expression.CallExpression.create(null, y, [x])));
}));
registerBinary("@", "__curry", (function(x, y) {
    return ast_expression.CurryExpression.create(null, x, [y]);
}));
var pipe = (function(callee, arg) {
    return ast_expression.CallExpression.create(null, callee, [arg]);
});
registerBinary("<|", "__pipe", pipe);
registerBinary("|>", "__rpipe", flip(pipe));
var singleCompose = (function(f, g) {
    var xArg2 = identifier("z", unique());
    return setLocals([getUid(xArg2)], ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
        .create(null, null, [ast_pattern.IdentifierPattern.create(null, xArg2)]), ast_expression.FunctionExpression
        .create(null, null, ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern.create(
            null, xArg2)]), ast_expression.CallExpression.create(null, f, [ast_expression.CallExpression.create(
            null, g, [xArg2])]))));
});
registerBinary("<\\", "__compose", singleCompose);
registerBinary("\\>", "__rcompose", flip(singleCompose));
var multiCompose = (function(f, g) {
    var xArg2 = identifier("args", unique());
    return setLocals([getUid(xArg2)], ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
        .create(null, null, [ast_pattern.IdentifierPattern.create(null, xArg2)]), ast_expression.FunctionExpression
        .create(null, null, ast_pattern.ArgumentsPattern.create(null, ast_pattern.IdentifierPattern.create(null,
            xArg2), [], null), ast_expression.CallExpression.create(null, f, [ast_expression.CallExpression
            .create(null, ast_expression.MemberExpression.create(null, g, identifier("apply")), [
                ast_value.Literal.create(null, "null"), xArg2
            ])
        ]))));
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
(member = (function(expr, uid10) {
    var xArg2 = identifier("x", uid10);
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
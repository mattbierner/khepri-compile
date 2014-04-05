/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/builtin.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "khepri-ast/pattern", "khepri-ast/expression", "khepri-ast/value"], (
    function(require, exports, ast_node, ast_pattern, ast_expression, ast_value) {
        "use strict";
        var setData = ast_node["setData"],
            setUserData = ast_node["setUserData"],
            builtins, definitions, flip = (function(f) {
                return (function(x, y) {
                    return f(y, x);
                });
            }),
            unique = (function() {
                var x = 0;
                return (function() {
                    (x = (x + 1));
                    return x;
                });
            })(),
            identifier = (function(name, uid) {
                return setData(ast_value.Identifier.create(null, name), "uid", uid);
            });
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
        (builtins["require"] = setData(ast_value.Identifier.create(null, "require"), "uid", uid));
        var uid0 = unique();
        (builtins["exports"] = setData(ast_value.Identifier.create(null, "exports"), "uid", uid0));
        var uid1 = unique();
        (builtins["module"] = setData(ast_value.Identifier.create(null, "module"), "uid", uid1));
        var unary = (function(op) {
            var xArg = identifier("x", unique());
            return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                null, null, [ast_pattern.IdentifierPattern.create(null, xArg)]), op(xArg));
        }),
            unaryOp = (function(op) {
                var op0 = (function(x) {
                    return ast_expression.UnaryExpression.create(null, op, x);
                }),
                    xArg = identifier("x", unique());
                return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                        null, null, [ast_pattern.IdentifierPattern.create(null, xArg)]), ast_expression.UnaryExpression
                    .create(null, op, xArg));
            });
        [
            ["typeof", "__typeof"],
            ["void", "__void"],
            ["~", "__bnot"],
            ["!", "__lnot"],
            ["++", "__plus"],
            ["--", "__minus"]
        ].forEach((function(__o) {
            var op0, xArg, op = __o[0],
                name = __o[1];
            registerAliasedSymbol(op, name, ((op0 = (function(x) {
                return ast_expression.UnaryExpression.create(null, op, x);
            })), (xArg = identifier("x", unique())), ast_expression.FunctionExpression.create(null,
                null, ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern
                    .create(null, xArg)
                ]), ast_expression.UnaryExpression.create(null, op, xArg))));
        }));
        var uid2 = unique(),
            xArg = setData(ast_value.Identifier.create(null, "x"), "uid", uid2),
            uid3 = unique(),
            yArg = setData(ast_value.Identifier.create(null, "y"), "uid", uid3),
            uid4 = unique(),
            zArg = setData(ast_value.Identifier.create(null, "z"), "uid", uid4),
            ternaryOperator = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                    null, null, [ast_pattern.IdentifierPattern.create(null, xArg), ast_pattern.IdentifierPattern.create(
                        null, yArg), ast_pattern.IdentifierPattern.create(null, zArg)]), ast_expression.ConditionalExpression
                .create(null, xArg, yArg, zArg));
        registerAliasedSymbol("?", "__cond", ternaryOperator);
        var binary = (function(op) {
            var xArg0 = identifier("x", unique()),
                yArg0 = identifier("y", unique());
            return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                null, null, [ast_pattern.IdentifierPattern.create(null, xArg0), ast_pattern.IdentifierPattern
                    .create(null, yArg0)
                ]), op(xArg0, yArg0));
        }),
            registerBinary = (function(op, name, impl) {
                var f;
                registerAliasedSymbol(op, name, binary(impl));
                registerAliasedSymbol(("_" + op), (name + "r"), binary(((f = impl), (function(x, y) {
                    return f(y, x);
                }))));
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
            ["instanceof", "__instanceof"]
        ].forEach((function(__o) {
            var op = __o[0],
                name = __o[1];
            registerBinary(op, name, binaryOp(op));
        }));
        var logicalOp = (function(op) {
            return (function(x, y) {
                return ast_expression.LogicalExpression.create(null, op, x, y);
            });
        });
        [
            ["||", "__or"],
            ["&&", "__and"]
        ].forEach((function(__o) {
            var op = __o[0],
                name = __o[1];
            registerBinary(op, name, (function(x, y) {
                return ast_expression.LogicalExpression.create(null, op, x, y);
            }));
        }));
        registerBinary("new", "__new", (function(x, y) {
            return ast_expression.NewExpression.create(null, x, [y]);
        }));
        registerBinary(".", "__dot", (function(x, y) {
            return ast_expression.MemberExpression.create(null, x, y, true);
        }));
        registerBinary("@", "__curry", (function(x, y) {
            return ast_expression.CurryExpression.create(null, x, [y]);
        }));
        var f, pipe = (function(callee, arg) {
                return ast_expression.CallExpression.create(null, callee, [arg]);
            });
        registerBinary("<|", "__pipe", pipe);
        registerBinary("|>", "__rpipe", ((f = pipe), (function(x, y) {
            var callee = y,
                arg = x;
            return ast_expression.CallExpression.create(null, callee, [arg]);
        })));
        var f0, singleCompose = (function(f0, g) {
                var x = identifier("x", unique());
                return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                        null, null, [ast_pattern.IdentifierPattern.create(null, x)]), ast_expression.CallExpression
                    .create(null, f0, [ast_expression.CallExpression.create(null, g, [x])]));
            });
        registerBinary("<\\", "__compose", singleCompose);
        registerBinary("\\>", "__rcompose", ((f0 = singleCompose), (function(x, y) {
            var f1 = y,
                g = x,
                x0 = identifier("x", unique());
            return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                    null, null, [ast_pattern.IdentifierPattern.create(null, x0)]), ast_expression.CallExpression
                .create(null, f1, [ast_expression.CallExpression.create(null, g, [x0])]));
        })));
        var f1, multiCompose = (function(f1, g) {
                return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                    null, null, []), ast_expression.CallExpression.create(null, f1, [ast_expression.CallExpression
                    .create(null, ast_expression.MemberExpression.create(null, g, identifier("apply")), [
                        ast_value.Literal.create(null, "null"), identifier("arguments")
                    ])
                ]));
            });
        registerBinary("<<\\", "__composen", multiCompose);
        registerBinary("\\>>", "__rcomposen", ((f1 = multiCompose), (function(x, y) {
            var f2 = y,
                g = x;
            return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                null, null, []), ast_expression.CallExpression.create(null, f2, [ast_expression.CallExpression
                .create(null, ast_expression.MemberExpression.create(null, g, identifier(
                    "apply")), [ast_value.Literal.create(null, "null"), identifier(
                    "arguments")])
            ]));
        })));
        (exports["builtins"] = builtins);
        (exports["definitions"] = definitions);
    }));
/*
 * THIS FILE IS AUTO GENERATED from 'lib/package_manager/amd.kep'
 * DO NOT EDIT
*/"use strict";
var ast_declaration = require("khepri-ast")["declaration"],
    ast_expression = require("khepri-ast")["expression"],
    __o = require("khepri-ast")["node"],
    setData = __o["setData"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_statement = require("khepri-ast")["statement"],
    ast_value = require("khepri-ast")["value"],
    fun = require("../fun"),
    builtins = require("../builtin"),
    definePackage, importPackage, concat = Function.prototype.call.bind(Array.prototype.concat),
    map = Function.prototype.call.bind(Array.prototype.map),
    path = (function(path) {
        return path.split("::")
            .join("/");
    });
(importPackage = (function(imp) {
    var packagePath = path(imp);
    return ast_expression.CallExpression.create(null, builtins.require, [ast_value.Literal.create(null,
        "string", packagePath)]);
}));
(definePackage = (function(loc, exports, imports, targets, body) {
    var exportedNames = ((exports.type === "PackageExports") ? fun.map((function(x) {
        return x.id.name;
    }), exports.exports) : [exports.id.name]),
        exportHeader = ast_declaration.VariableDeclaration.create(null, map(exportedNames, (function(x) {
            return ast_declaration.VariableDeclarator.create(null, ast_value.Identifier.create(null,
                x));
        }))),
        exportBody = ((exports.type === "PackageExports") ? map(exports.exports, (function(x) {
            return ast_statement.ExpressionStatement.create(null, ast_expression.AssignmentExpression
                .create(null, "=", ast_expression.MemberExpression.create(null, builtins.exports, x
                    .alias, true), x.id));
        })) : ast_statement.ReturnStatement.create(null, exports.id)),
        packageBody = setData(ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
            .create(null, null, concat(ast_pattern.IdentifierPattern.create(null, builtins.require),
                ast_pattern.IdentifierPattern.create(null, builtins.exports), map(imports, (function(x) {
                    return targets[x.from.value];
                })))), ast_statement.BlockStatement.create(body.loc, concat(exportHeader, body, exportBody))
        ), "prefix", ast_statement.ExpressionStatement.create(null, ast_value.Literal.create(null, "string",
            "use strict")));
    return ast_statement.ExpressionStatement.create(loc, ast_expression.CallExpression.create(loc, ast_value.Identifier
        .create(null, "define"), [ast_expression.ArrayExpression.create(null, concat(builtins.require,
            builtins.exports, map(imports, (function(x) {
                return ast_value.Literal.create(null, "string", path(x.from.value));
            })))), packageBody]));
}));
(exports["definePackage"] = definePackage);
(exports["importPackage"] = importPackage);
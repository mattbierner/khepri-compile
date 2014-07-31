/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/transform/package_manager/amd.kep'
 * DO NOT EDIT
*/
"use strict";
var ast_declaration = require("khepri-ast")["declaration"],
    ast_expression = require("khepri-ast")["expression"],
    __o = require("khepri-ast")["node"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_program = require("khepri-ast")["program"],
    ast_statement = require("khepri-ast")["statement"],
    ast_value = require("khepri-ast")["value"],
    fun = require("../../fun"),
    __o0 = require("../../builtin"),
    definePackage, defineProgram, importPackage, setData = __o["setData"],
    builtins = __o0["builtins"],
    concat = Function.prototype.call.bind(Array.prototype.concat),
    map = Function.prototype.call.bind(Array.prototype.map),
    path = (function(path0) {
        return path0.split("::")
            .join("/");
    });
(defineProgram = (function(body) {
    return ast_program.Program.create(null, fun.concat(ast_statement.ExpressionStatement.create(null, ast_value
        .Literal.create(null, "string", "use strict")), body));
}));
(importPackage = (function(imp) {
    var packagePath = path(imp);
    return ast_expression.CallExpression.create(null, builtins.require, [ast_value.Literal.create(null,
        "string", packagePath)]);
}));
(definePackage = (function(loc, exports0, imports, targets, body) {
    var exportedNames = ((exports0.type === "PackageExports") ? fun.map((function(x) {
        return x.id.name;
    }), exports0.exports) : [exports0.id.name]),
        exportHeader = ast_declaration.VariableDeclaration.create(null, map(exportedNames, (function(x) {
            return ast_declaration.VariableDeclarator.create(null, ast_value.Identifier.create(null,
                x));
        }))),
        exportBody = ((exports0.type === "PackageExports") ? map(exports0.exports, (function(x) {
            return ast_statement.ExpressionStatement.create(null, ast_expression.AssignmentExpression
                .create(null, ast_expression.MemberExpression.create(null, builtins.exports, x.alias,
                    true), x.id));
        })) : ast_statement.ReturnStatement.create(null, exports0.id)),
        packageBody = setData(ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
            .create(null, null, concat(ast_pattern.IdentifierPattern.create(null, builtins.require),
                ast_pattern.IdentifierPattern.create(null, builtins.exports), map(imports, (function(x) {
                    return targets[x.value.from];
                })))), ast_statement.BlockStatement.create(body.loc, concat(exportHeader, body, exportBody))
        ), "prefix", [ast_statement.ExpressionStatement.create(null, ast_value.Literal.create(null,
            "string", "use strict"))]);
    return ast_statement.ExpressionStatement.create(loc, ast_expression.CallExpression.create(loc, ast_value.Identifier
        .create(null, "define"), [ast_expression.ArrayExpression.create(null, concat(ast_value.Literal.create(
                null, "string", "require"), ast_value.Literal.create(null, "string", "exports"),
            map(imports, (function(x) {
                return ast_value.Literal.create(null, "string", path(x.value.from));
            })))), packageBody]));
}));
(exports["definePackage"] = definePackage);
(exports["defineProgram"] = defineProgram);
(exports["importPackage"] = importPackage);
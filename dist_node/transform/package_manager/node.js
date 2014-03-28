/*
 * THIS FILE IS AUTO GENERATED from 'lib/transform/package_manager/node.kep'
 * DO NOT EDIT
*/"use strict";
var ast_declaration = require("khepri-ast")["declaration"],
    ast_expression = require("khepri-ast")["expression"],
    ast_statement = require("khepri-ast")["statement"],
    ast_program = require("khepri-ast")["program"],
    ast_value = require("khepri-ast")["value"],
    fun = require("../../fun"),
    __o = require("../../builtin"),
    builtins = __o["builtins"],
    definePackage, defineProgram, importPackage, concat = Array.prototype.concat.bind([]),
    map = Function.prototype.call.bind(Array.prototype.map);
(defineProgram = (function(body) {
    return ast_program.Program.create(null, fun.concat(ast_statement.ExpressionStatement.create(null, ast_value
        .Literal.create(null, "string", "use strict")), body));
}));
(importPackage = (function(path) {
    var segs = path.split("::");
    return segs.slice(1)
        .reduce((function(p, c) {
            return ast_expression.MemberExpression.create(null, p, ast_value.Literal.create(null,
                "string", c), true);
        }), ast_expression.CallExpression.create(null, builtins.require, [ast_value.Literal.create(null,
            "string", segs[0])]));
}));
(definePackage = (function(loc, exports, imports, targets, globals, body) {
    var exportedNames = ((exports.type === "PackageExports") ? fun.map((function(x) {
        return x.id.name;
    }), exports.exports) : [exports.id.name]),
        exportHeader = ast_declaration.VariableDeclaration.create(null, map(exportedNames, (function(x) {
            return ast_declaration.VariableDeclarator.create(null, ast_value.Identifier.create(null,
                x));
        }))),
        exportBody = ((exports.type === "PackageExports") ? map(exports.exports, (function(x) {
            return ast_statement.ExpressionStatement.create(null, ast_expression.AssignmentExpression
                .create(null, "=", ast_expression.MemberExpression.create(null, ast_value.Identifier
                    .create(null, "exports"), x.alias, true), x.id));
        })) : ast_statement.ExpressionStatement.create(null, ast_expression.AssignmentExpression.create(
            null, "=", ast_expression.MemberExpression.create(null, ast_value.Identifier.create(null,
                "module"), ast_value.Identifier.create(null, "exports")), exports.id)));
    return ast_statement.BlockStatement.create(loc, [ast_statement.ExpressionStatement.create(null, ast_value.Literal
        .create(null, "string", "use strict")), ast_statement.WithStatement.create(null, map(imports, (
        function(x) {
            return ast_declaration.Binding.create(null, x.pattern, importPackage(x.from.value));
        })), ast_statement.BlockStatement.create(null, concat(globals, exportHeader, body,
        exportBody)))]);
}));
(exports["definePackage"] = definePackage);
(exports["defineProgram"] = defineProgram);
(exports["importPackage"] = importPackage);
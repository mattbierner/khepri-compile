/*
 * THIS FILE IS AUTO GENERATED from 'lib/package_manager/node.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast/declaration", "khepri-ast/expression", "khepri-ast/statement",
    "khepri-ast/value", "../fun", "../builtin"
], (function(require, exports, ast_declaration, ast_expression, ast_statement, ast_value, fun, builtin) {
    "use strict";
    var definePackage, importPackage, concat = Array.prototype.concat.bind([]),
        map = Function.prototype.call.bind(Array.prototype.map);
    (importPackage = (function(path) {
        var segs = path.split("::");
        return segs.slice(1)
            .reduce((function(p, c) {
                return ast_expression.MemberExpression.create(null, p, ast_value.Literal.create(
                    null, "string", c), true);
            }), ast_expression.CallExpression.create(null, builtin.require, [ast_value.Literal.create(
                null, "string", segs[0])]));
    }));
    (definePackage = (function(loc, exports, imports, targets, body) {
        var exportedNames = ((exports.type === "PackageExports") ? fun.map((function(x) {
            return x.id.name;
        }), exports.exports) : [exports.id.name]),
            exportHeader = ast_declaration.VariableDeclaration.create(null, map(exportedNames, (
                function(x) {
                    return ast_declaration.VariableDeclarator.create(null, ast_value.Identifier
                        .create(null, x));
                }))),
            exportBody = ((exports.type === "PackageExports") ? map(exports.exports, (function(x) {
                return ast_statement.ExpressionStatement.create(null, ast_expression.AssignmentExpression
                    .create(null, "=", ast_expression.MemberExpression.create(null,
                            ast_value.Identifier.create(null, "exports"), x.alias, true), x
                        .id));
            })) : ast_statement.ExpressionStatement.create(null, ast_expression.AssignmentExpression
                .create(null, "=", ast_expression.MemberExpression.create(null, ast_value.Identifier
                        .create(null, "module"), ast_value.Identifier.create(null, "exports")),
                    exports.id)));
        return ast_statement.BlockStatement.create(loc, [ast_statement.ExpressionStatement.create(null,
                ast_value.Literal.create(null, "string", "use strict")), ast_statement.WithStatement
            .create(null, map(imports, (function(x) {
                return ast_declaration.Binding.create(null, x.pattern, importPackage(x.from
                    .value));
            })), ast_statement.BlockStatement.create(null, concat(exportHeader, body,
                exportBody)))
        ]);
    }));
    (exports["definePackage"] = definePackage);
    (exports["importPackage"] = importPackage);
}));
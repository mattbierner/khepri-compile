/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/transform/package_manager/node.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/declaration", "khepri-ast/expression", "khepri-ast/statement",
    "khepri-ast/program", "khepri-ast/value", "../../fun", "../../builtin"
], (function(require, exports, ast_declaration, ast_expression, ast_statement, ast_program, ast_value, fun, __o) {
    "use strict";
    var definePackage, defineProgram, importPackage, builtins = __o["builtins"],
        concat = Array.prototype.concat.bind([]),
        map = Function.prototype.call.bind(Array.prototype.map);
    (defineProgram = (function(body) {
        return ast_program.Program.create(null, fun.concat(ast_statement.ExpressionStatement.create(
            null, ast_value.Literal.create(null, "string", "use strict")), body));
    }));
    (importPackage = (function(path) {
        var segs = path.split("::");
        return segs.slice(1)
            .reduce((function(p, c) {
                return ast_expression.MemberExpression.create(null, p, ast_value.Literal.create(
                    null, "string", c), true);
            }), ast_expression.CallExpression.create(null, builtins.require, [ast_value.Literal.create(
                null, "string", segs[0])]));
    }));
    (definePackage = (function(loc, exports0, imports, targets, body) {
        var exportedNames = ((exports0.type === "PackageExports") ? fun.map((function(x) {
            return x.id.name;
        }), exports0.exports) : [exports0.id.name]),
            exportHeader = ast_declaration.VariableDeclaration.create(null, map(exportedNames, (
                function(x) {
                    return ast_declaration.VariableDeclarator.create(null, ast_value.Identifier
                        .create(null, x));
                }))),
            exportBody = ((exports0.type === "PackageExports") ? map(exports0.exports, (function(x) {
                return ast_statement.ExpressionStatement.create(null, ast_expression.AssignmentExpression
                    .create(null, "=", ast_expression.MemberExpression.create(null,
                            ast_value.Identifier.create(null, "exports"), x.alias, true), x
                        .id));
            })) : ast_statement.ExpressionStatement.create(null, ast_expression.AssignmentExpression
                .create(null, "=", ast_expression.MemberExpression.create(null, ast_value.Identifier
                        .create(null, "module"), ast_value.Identifier.create(null, "exports")),
                    exports0.id)));
        return ast_statement.BlockStatement.create(loc, [ast_statement.ExpressionStatement.create(null,
                ast_value.Literal.create(null, "string", "use strict")), ast_statement.WithStatement
            .create(null, map(imports, (function(x) {
                return ast_declaration.Binding.create(null, x.pattern, importPackage(x.value
                    .from));
            })), ast_statement.BlockStatement.create(null, concat(exportHeader, body,
                exportBody)))
        ]);
    }));
    (exports["definePackage"] = definePackage);
    (exports["defineProgram"] = defineProgram);
    (exports["importPackage"] = importPackage);
}));
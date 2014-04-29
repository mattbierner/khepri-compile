/*
 * THIS FILE IS AUTO GENERATED from 'lib/transform/translation.kep'
 * DO NOT EDIT
*/define(["require", "exports", "ecma-ast/clause", "ecma-ast/declaration", "ecma-ast/expression", "ecma-ast/node",
    "ecma-ast/program", "ecma-ast/statement", "ecma-ast/value", "khepri-ast/declaration", "khepri-ast/expression",
    "khepri-ast/statement", "khepri-ast/pattern", "khepri-ast/value", "../ast", "../fun", "./unpack"
], (function(require, exports, ecma_clause, ecma_declaration, ecma_expression, ecma_node, ecma_program,
    ecma_statement, ecma_value, khepri_declaration, khepri_expression, khepri_statement, khepri_pattern,
    khepri_value, __o, fun, __o0) {
    "use strict";
    var type = __o["type"],
        tryGetUd = __o["tryGetUd"],
        getUid = __o["getUid"],
        setUid = __o["setUid"],
        concat = fun["concat"],
        flatten = fun["flatten"],
        flip = fun["flip"],
        filter = fun["filter"],
        map = fun["map"],
        reduce = fun["reduce"],
        expandBinding = __o0["expandBinding"],
        expandArgumentsPattern = __o0["expandArgumentsPattern"],
        program, assignmentExpression, unaryExpression, binaryExpression, logicalExpression,
            conditionalExpression, newExpression, callExpression, memberExpression, functionExpression,
            letExpression, curryExpression, blockStatement, withStatement, expressionStatement, returnStatement,
            throwStatement, breakStatement, continueStatement, ifStatement, switchStatement, forStatement,
            doWhileStatement, whileStatement, tryStatement, packageBlock, x, y, x0, y0, x1, y1, identifier = (
                function(loc, name, uid) {
                    return setUid(uid, ecma_value.Identifier.create(loc, name));
                }),
        variableDeclaration = ecma_declaration.VariableDeclaration.create,
        variableDeclarator = ecma_declaration.VariableDeclarator.create,
        idsToDeclarators = ((x = map.bind(null, (function(x0) {
            return (x0 && ecma_declaration.VariableDeclarator.create(null, identifier(null, x0)));
        }))), (y = ecma_declaration.VariableDeclaration.create.bind(null, null)), (function(z) {
            return y(x(z));
        })),
        bindingToDeclarator = (function(x0) {
            return variableDeclarator(null, x0.pattern.id, x0.value);
        }),
        unpack = ((x0 = expandBinding), (y0 = map.bind(null, (function(x1) {
            return variableDeclarator(null, x1.pattern.id, x1.value);
        }))), (function(z) {
            return y0(x0(z));
        })),
        unpackAssign = ((x1 = expandBinding), (y1 = map.bind(null, (function(x2) {
            return ecma_expression.AssignmentExpression.create(null, "=", x2.pattern.id, x2.value);
        }))), (function(z) {
            return y1(x1(z));
        }));
    (program = (function(bindings, node) {
        return ecma_program.Program.create(node.loc, concat(tryGetUd([], "prefix", node),
            idsToDeclarators(bindings), node.body));
    }));
    (assignmentExpression = (function(node) {
        return ecma_expression.AssignmentExpression.create(node.loc, "=", node.left, node.right);
    }));
    var mapOp = (function(op) {
        switch (op) {
            case "++":
                return "+";
            case "--":
                return "-";
            default:
                return op;
        }
    });
    (unaryExpression = (function(node) {
        return ecma_expression.UnaryExpression.create(node.loc, mapOp(node.operator), node.argument);
    }));
    (binaryExpression = (function(node) {
        return ecma_expression.BinaryExpression.create(node.loc, node.operator, node.left, node.right);
    }));
    (logicalExpression = (function(node) {
        return ecma_expression.LogicalExpression.create(node.loc, node.operator, node.left, node.right);
    }));
    (conditionalExpression = (function(node) {
        return ecma_expression.ConditionalExpression.create(node.loc, node.test, node.consequent, node.alternate);
    }));
    (newExpression = (function(node) {
        return ecma_expression.NewExpression.create(node.loc, node.callee, node.args);
    }));
    (callExpression = (function(node) {
        return ecma_expression.CallExpression.create(node.loc, node.callee, node.args);
    }));
    (memberExpression = (function(node) {
        return ecma_expression.MemberExpression.create(node.loc, node.object, node.property, node.computed);
    }));
    (letExpression = (function(loc, bindings, body) {
        return ecma_expression.SequenceExpression.create(null, flatten(concat(map(unpackAssign,
            bindings), body)));
    }));
    (curryExpression = (function(loc, base, args) {
        return ecma_expression.CallExpression.create(loc, ecma_expression.MemberExpression.create(null,
            base, identifier(null, "bind")), concat(ecma_value.Literal.create(null, "null", null),
            args));
    }));
    (blockStatement = (function(bindings, node) {
        return ecma_statement.BlockStatement.create(node.loc, concat(idsToDeclarators(bindings), node.body));
    }));
    (withStatement = (function(loc, bindings, body) {
        var vars = flatten(map(unpack, bindings)),
            prefix = variableDeclaration(null, vars);
        return ecma_statement.BlockStatement.create(loc, concat(prefix, body.body));
    }));
    (functionExpression = (function(loc, id, parameters, functionBody, prefix) {
        var params = parameters.elements,
            bindings = map(bindingToDeclarator, expandArgumentsPattern(parameters, ecma_expression.ThisExpression
                .create(null))),
            body = ((type(functionBody) === "BlockStatement") ? functionBody.body : khepri_statement.ReturnStatement
                .create(null, functionBody));
        return khepri_expression.FunctionExpression.create(loc, id, params, khepri_statement.BlockStatement
            .create(body.loc, concat((prefix || []), variableDeclaration(null, bindings), body)));
    }));
    (expressionStatement = (function(node) {
        return ecma_statement.ExpressionStatement.create(node.loc, node.expression);
    }));
    (ifStatement = (function(node) {
        return ecma_statement.IfStatement.create(node.loc, node.test, node.consequent, node.alternate);
    }));
    (switchStatement = (function(node) {
        return ecma_statement.SwitchStatement.create(node.loc, node.discriminant, node.cases);
    }));
    (returnStatement = (function(node) {
        return ecma_statement.ReturnStatement.create(node.loc, node.argument);
    }));
    (throwStatement = (function(node) {
        return ecma_statement.ThrowStatement.create(node.loc, node.argument);
    }));
    (breakStatement = (function(node) {
        return ecma_statement.BreakStatement.create(node.loc, null);
    }));
    (continueStatement = (function(node) {
        return ecma_statement.ContinueStatement.create(node.loc, null);
    }));
    (tryStatement = (function(node) {
        return ecma_statement.TryStatement.create(node.loc, node.block, node.handler, node.finalizer);
    }));
    (whileStatement = (function(node) {
        return ecma_statement.WhileStatement.create(node.loc, node.test, node.body);
    }));
    (doWhileStatement = (function(node) {
        return ecma_statement.DoWhileStatement.create(node.loc, node.body, node.test);
    }));
    (forStatement = (function(node) {
        return ecma_statement.ForStatement.create(node.loc, node.init, node.test, node.update, node.body);
    }));
    var x2, x3, filterImports = filter.bind(null, ((x2 = type), (function(z) {
            var z0 = z.value,
                y2 = x2(z0);
            return ("Import" === y2);
        }))),
        getImports = filter.bind(null, ((x3 = type), (function(z) {
            var z0 = z.value,
                y2 = x3(z0);
            return ("Import" !== y2);
        })));
    (packageBlock = (function(packageManager, loc, exports0, body) {
        var imports = ((type(body) === "WithStatement") ? filterImports(body.bindings) : []),
            targets = reduce(imports, (function(p, c) {
                (p[c.value.from] = c.pattern.id);
                return p;
            }), ({})),
            fBody = ((type(body) === "WithStatement") ? khepri_statement.WithStatement.create(null,
                getImports(body.bindings), body.body) : body);
        return packageManager.definePackage(loc, exports0, imports, targets, fBody);
    }));
    (exports["program"] = program);
    (exports["assignmentExpression"] = assignmentExpression);
    (exports["unaryExpression"] = unaryExpression);
    (exports["binaryExpression"] = binaryExpression);
    (exports["logicalExpression"] = logicalExpression);
    (exports["conditionalExpression"] = conditionalExpression);
    (exports["newExpression"] = newExpression);
    (exports["callExpression"] = callExpression);
    (exports["memberExpression"] = memberExpression);
    (exports["functionExpression"] = functionExpression);
    (exports["letExpression"] = letExpression);
    (exports["curryExpression"] = curryExpression);
    (exports["blockStatement"] = blockStatement);
    (exports["withStatement"] = withStatement);
    (exports["expressionStatement"] = expressionStatement);
    (exports["returnStatement"] = returnStatement);
    (exports["throwStatement"] = throwStatement);
    (exports["breakStatement"] = breakStatement);
    (exports["continueStatement"] = continueStatement);
    (exports["ifStatement"] = ifStatement);
    (exports["switchStatement"] = switchStatement);
    (exports["forStatement"] = forStatement);
    (exports["doWhileStatement"] = doWhileStatement);
    (exports["whileStatement"] = whileStatement);
    (exports["tryStatement"] = tryStatement);
    (exports["packageBlock"] = packageBlock);
}));
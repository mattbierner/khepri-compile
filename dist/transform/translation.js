/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/transform/translation.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "ecma-ast/clause", "ecma-ast/declaration", "ecma-ast/expression", "ecma-ast/node",
    "ecma-ast/program", "ecma-ast/statement", "ecma-ast/value", "khepri-ast/declaration", "khepri-ast/expression",
    "khepri-ast/pattern", "khepri-ast/statement", "khepri-ast/value", "../ast", "../fun", "./unpack"
], (function(require, exports, ecma_clause, ecma_declaration, ecma_expression, ecma_node, ecma_program,
    ecma_statement, ecma_value, khepri_declaration, khepri_expression, khepri_pattern, khepri_statement,
    khepri_value, __o, fun, __o0) {
    "use strict";
    var useStrict, identifier, program, variableDeclaration, variableDeclarator, assignmentExpression,
            deleteExpression, unaryExpression, binaryExpression, logicalExpression, conditionalExpression,
            newExpression, callExpression, applyExpression, memberExpression, checkedMemberExpression,
            arrayExpression, objectExpression, objectValue, functionExpression, functionExpressionPost,
            explicitClosure, letExpression, curryExpression, catchClause, switchCase, emptyStatement,
            blockStatement, withStatement, expressionStatement, returnStatement, throwStatement, breakStatement,
            continueStatement, ifStatement, switchStatement, forStatement, doWhileStatement, whileStatement,
            tryStatement, packageBlock, type = __o["type"],
        tryGetUd = __o["tryGetUd"],
        setUid = __o["setUid"],
        concat = fun["concat"],
        flatten = fun["flatten"],
        filter = fun["filter"],
        map = fun["map"],
        reduce = fun["reduce"],
        expandBinding = __o0["expandBinding"],
        expandArgumentsPattern = __o0["expandArgumentsPattern"],
        x, y, y0, y1, reservedEcmaIdentifiers = ["break", "case", "catch", "continue", "debugger", "default",
            "delete", "do", "else", "finally", "for", "function", "if", "in", "instanceof", "typeof", "new",
            "var", "return", "void", "switch", "while", "this", "with", "throw", "try", "class", "enum",
            "extends", "super", "const", "export", "import", "implements", "let", "private", "public",
            "interface", "package", "protected", "static", "yield", "true", "false", "null"
        ];
    (useStrict = ecma_statement.ExpressionStatement.create(null, ecma_value.Literal.create(null, "string",
        "use strict")));
    (identifier = (function(loc, name, uid) {
        return setUid(uid, ecma_value.Identifier.create(loc, name));
    }));
    (variableDeclaration = (function(node) {
        return ecma_declaration.VariableDeclaration.create(node.loc, node.declarations);
    }));
    (variableDeclarator = (function(node) {
        return ecma_declaration.VariableDeclarator.create(node.loc, node.id, node.init);
    }));
    var idsToDeclarators = ((x = map.bind(null, (function(x0) {
        return (x0 && ecma_declaration.VariableDeclarator.create(null, identifier(null, x0)));
    }))), (y = ecma_declaration.VariableDeclaration.create.bind(null, null)), (function(z) {
        return y(x(z));
    })),
        bindingToDeclarator = (function(x0) {
            return ecma_declaration.VariableDeclarator.create(null, x0.pattern.id, x0.value);
        }),
        unpack = ((y0 = map.bind(null, bindingToDeclarator)), (function(z) {
            return y0(expandBinding(z));
        })),
        unpackAssign = ((y1 = map.bind(null, (function(x0) {
            return ecma_expression.AssignmentExpression.create(null, "=", x0.pattern.id, x0.value);
        }))), (function(z) {
            return y1(expandBinding(z));
        }));
    (program = (function(bindings, node) {
        return ecma_program.Program.create(node.loc, concat(tryGetUd([], "prefix", node),
            idsToDeclarators(bindings), node.body));
    }));
    (assignmentExpression = (function(node) {
        return ecma_expression.AssignmentExpression.create(node.loc, "=", node.left, node.right);
    }));
    (deleteExpression = (function(node) {
        return ecma_expression.UnaryExpression.create(node.loc, "delete", node.argument);
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
    (applyExpression = (function(__o1) {
        var callee = __o1["callee"],
            args = __o1["args"];
        return ecma_expression.CallExpression.create(null, ecma_expression.MemberExpression.create(null,
            callee, identifier(null, "apply")), [ecma_value.Literal.create(null, "null"), args]);
    }));
    (memberExpression = (function(__o1) {
        var loc = __o1["loc"],
            object = __o1["object"],
            property = __o1["property"],
            computed = __o1["computed"],
            name;
        return ((((!computed) && (type(property) === "Identifier")) && ((name = property.name), (
                reservedEcmaIdentifiers.indexOf(name) >= 0))) ? ecma_expression.MemberExpression.create(
                loc, object, ecma_value.Literal.create(property.loc, "string", property.name), true) :
            ecma_expression.MemberExpression.create(loc, object, property, computed));
    }));
    (checkedMemberExpression = (function(node) {
        var id = node.id;
        return khepri_expression.BinaryExpression.create(null, "&&", id, khepri_expression.MemberExpression
            .create(null, id, node.property, node.computed));
    }));
    (letExpression = (function(node) {
        return ecma_expression.SequenceExpression.create(node.loc, flatten(concat(map(unpackAssign,
            node.bindings), node.body)));
    }));
    (curryExpression = (function(node) {
        return ecma_expression.CallExpression.create(node.loc, ecma_expression.MemberExpression.create(
            null, node.base, identifier(null, "bind")), concat(ecma_value.Literal.create(null,
            "null", null), node.args));
    }));
    (functionExpression = (function(loc, id, parameters, functionBody, prefix) {
        var params = parameters.elements,
            bindings = map(bindingToDeclarator, expandArgumentsPattern(parameters, ecma_expression.ThisExpression
                .create(null))),
            body = ((type(functionBody) === "BlockStatement") ? functionBody.body : khepri_statement.ReturnStatement
                .create(null, functionBody));
        return khepri_expression.FunctionExpression.create(loc, id, params, khepri_statement.BlockStatement
            .create(body.loc, concat((prefix || []), ecma_declaration.VariableDeclaration.create(null,
                bindings), body)));
    }));
    (functionExpressionPost = (function(node) {
        return ecma_expression.FunctionExpression.create(null, node.id, node.params, node.body);
    }));
    (explicitClosure = (function(locals, node) {
        return ecma_expression.CallExpression.create(null, ecma_expression.FunctionExpression.create(
            null, null, locals, ecma_statement.BlockStatement.create(null, [ecma_statement.ReturnStatement
                .create(null, node)
            ])), locals);
    }));
    (arrayExpression = (function(node) {
        return ecma_expression.ArrayExpression.create(node.loc, node.elements);
    }));
    (objectExpression = (function(node) {
        return ecma_expression.ObjectExpression.create(node.loc, node.properties);
    }));
    (objectValue = (function(__o1) {
        var loc = __o1["loc"],
            key = __o1["key"],
            value = __o1["value"],
            name;
        return ecma_value.ObjectValue.create(loc, (((type(key) === "Identifier") && ((name = key.name), (
            reservedEcmaIdentifiers.indexOf(name) >= 0))) ? ecma_value.Literal.create(key.loc,
            "string", key.name) : key), value);
    }));
    (catchClause = (function(node) {
        return ecma_clause.CatchClause.create(node.loc, node.param, node.body);
    }));
    (switchCase = (function(node) {
        return ecma_clause.SwitchCase.create(node.loc, node.test, node.consequent);
    }));
    (emptyStatement = (function(node) {
        return ecma_statement.EmptyStatement.create(node.loc);
    }));
    (blockStatement = (function(bindings, node) {
        return ecma_statement.BlockStatement.create(node.loc, concat(idsToDeclarators(bindings), node.body));
    }));
    (withStatement = (function(node) {
        var vars = flatten(map(unpack, node.bindings)),
            prefix = ecma_declaration.VariableDeclaration.create(null, vars);
        return ecma_statement.BlockStatement.create(node.loc, concat(prefix, node.body.body));
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
    var filterImports = filter.bind(null, (function(z) {
        var z0 = z.value,
            y2 = type(z0);
        return ("Import" === y2);
    })),
        getImports = filter.bind(null, (function(z) {
            var z0 = z.value,
                y2 = type(z0);
            return ("Import" !== y2);
        }));
    (packageBlock = (function(packageManager, __o1) {
        var loc = __o1["loc"],
            exports0 = __o1["exports"],
            body = __o1["body"],
            imports = ((type(body) === "WithStatement") ? filterImports(body.bindings) : []),
            targets = reduce(imports, (function(p, c) {
                (p[c.value.from] = c.pattern.id);
                return p;
            }), ({})),
            fBody = ((type(body) === "WithStatement") ? khepri_statement.WithStatement.create(null,
                getImports(body.bindings), body.body) : body);
        return packageManager.definePackage(loc, exports0, imports, targets, fBody);
    }));
    (exports["useStrict"] = useStrict);
    (exports["identifier"] = identifier);
    (exports["program"] = program);
    (exports["variableDeclaration"] = variableDeclaration);
    (exports["variableDeclarator"] = variableDeclarator);
    (exports["assignmentExpression"] = assignmentExpression);
    (exports["deleteExpression"] = deleteExpression);
    (exports["unaryExpression"] = unaryExpression);
    (exports["binaryExpression"] = binaryExpression);
    (exports["logicalExpression"] = logicalExpression);
    (exports["conditionalExpression"] = conditionalExpression);
    (exports["newExpression"] = newExpression);
    (exports["callExpression"] = callExpression);
    (exports["applyExpression"] = applyExpression);
    (exports["memberExpression"] = memberExpression);
    (exports["checkedMemberExpression"] = checkedMemberExpression);
    (exports["arrayExpression"] = arrayExpression);
    (exports["objectExpression"] = objectExpression);
    (exports["objectValue"] = objectValue);
    (exports["functionExpression"] = functionExpression);
    (exports["functionExpressionPost"] = functionExpressionPost);
    (exports["explicitClosure"] = explicitClosure);
    (exports["letExpression"] = letExpression);
    (exports["curryExpression"] = curryExpression);
    (exports["catchClause"] = catchClause);
    (exports["switchCase"] = switchCase);
    (exports["emptyStatement"] = emptyStatement);
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
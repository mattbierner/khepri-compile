/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/transform/translation.kep'
 * DO NOT EDIT
*/
"use strict";
var ecma_clause = require("ecma-ast")["clause"],
    ecma_declaration = require("ecma-ast")["declaration"],
    ecma_expression = require("ecma-ast")["expression"],
    ecma_node = require("ecma-ast")["node"],
    ecma_program = require("ecma-ast")["program"],
    ecma_statement = require("ecma-ast")["statement"],
    ecma_value = require("ecma-ast")["value"],
    khepri_expression = require("khepri-ast")["expression"],
    khepri_statement = require("khepri-ast")["statement"],
    khepri_value = require("khepri-ast")["value"],
    __o = require("../ast"),
    fun = require("../fun"),
    __o0 = require("./unpack"),
    program, assignmentExpression, unaryExpression, binaryExpression, logicalExpression, conditionalExpression,
        newExpression, callExpression, memberExpression, functionExpression, letExpression, curryExpression,
        blockStatement, withStatement, expressionStatement, returnStatement, throwStatement, breakStatement,
        continueStatement, ifStatement, switchStatement, forStatement, doWhileStatement, whileStatement, tryStatement,
        packageBlock, type = __o["type"],
    tryGetUd = __o["tryGetUd"],
    setUid = __o["setUid"],
    concat = fun["concat"],
    flatten = fun["flatten"],
    filter = fun["filter"],
    map = fun["map"],
    reduce = fun["reduce"],
    expandBinding = __o0["expandBinding"],
    expandArgumentsPattern = __o0["expandArgumentsPattern"],
    x, y, y0, y1, identifier = (function(loc, name, uid) {
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
    unpack = ((y0 = map.bind(null, (function(x0) {
        return variableDeclarator(null, x0.pattern.id, x0.value);
    }))), (function(z) {
        return y0(expandBinding(z));
    })),
    unpackAssign = ((y1 = map.bind(null, (function(x0) {
        return ecma_expression.AssignmentExpression.create(null, "=", x0.pattern.id, x0.value);
    }))), (function(z) {
        return y1(expandBinding(z));
    }));
(program = (function(bindings, node) {
    return ecma_program.Program.create(node.loc, concat(tryGetUd([], "prefix", node), idsToDeclarators(bindings),
        node.body));
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
    return ecma_expression.SequenceExpression.create(null, flatten(concat(map(unpackAssign, bindings), body)));
}));
(curryExpression = (function(loc, base, args) {
    return ecma_expression.CallExpression.create(loc, ecma_expression.MemberExpression.create(null, base,
        identifier(null, "bind")), concat(ecma_value.Literal.create(null, "null", null), args));
}));
(functionExpression = (function(loc, id, parameters, functionBody, prefix) {
    var params = parameters.elements,
        bindings = map(bindingToDeclarator, expandArgumentsPattern(parameters, ecma_expression.ThisExpression.create(
            null))),
        body = ((type(functionBody) === "BlockStatement") ? functionBody.body : khepri_statement.ReturnStatement
            .create(null, functionBody));
    return khepri_expression.FunctionExpression.create(loc, id, params, khepri_statement.BlockStatement.create(
        body.loc, concat((prefix || []), variableDeclaration(null, bindings), body)));
}));
(blockStatement = (function(bindings, node) {
    return ecma_statement.BlockStatement.create(node.loc, concat(idsToDeclarators(bindings), node.body));
}));
(withStatement = (function(loc, bindings, body) {
    var vars = flatten(map(unpack, bindings)),
        prefix = variableDeclaration(null, vars);
    return ecma_statement.BlockStatement.create(loc, concat(prefix, body.body));
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
(packageBlock = (function(packageManager, loc, exports0, body) {
    var imports = ((type(body) === "WithStatement") ? filterImports(body.bindings) : []),
        targets = reduce(imports, (function(p, c) {
            (p[c.value.from] = c.pattern.id);
            return p;
        }), ({})),
        fBody = ((type(body) === "WithStatement") ? khepri_statement.WithStatement.create(null, getImports(body
            .bindings), body.body) : body);
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
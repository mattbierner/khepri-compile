/*
 * THIS FILE IS AUTO GENERATED from 'lib/transform/transform.kep'
 * DO NOT EDIT
*/"use strict";
var ecma_clause = require("ecma-ast")["clause"],
    ecma_declaration = require("ecma-ast")["declaration"],
    ecma_expression = require("ecma-ast")["expression"],
    ecma_node = require("ecma-ast")["node"],
    ecma_program = require("ecma-ast")["program"],
    ecma_statement = require("ecma-ast")["statement"],
    ecma_value = require("ecma-ast")["value"],
    __o = require("ecma-ast-zipper"),
    ecmaZipper = __o["ecmaZipper"],
    khepri_declaration = require("khepri-ast")["declaration"],
    khepri_expression = require("khepri-ast")["expression"],
    khepri_node = require("khepri-ast")["node"],
    setData = khepri_node["setData"],
    khepri_statement = require("khepri-ast")["statement"],
    khepri_value = require("khepri-ast")["value"],
    Unique = require("akh")["unique"],
    StateT = require("akh")["trans"]["statei"],
    __o0 = require("akh")["base"],
    liftM2 = __o0["liftM2"],
    seq = __o0["sequence"],
    sequencea = __o0["sequencea"],
    TreeZipperT = require("zipper-m")["trans"]["tree"],
    __o1 = require("../ast"),
    type = __o1["type"],
    tryGetUd = __o1["tryGetUd"],
    getUd = __o1["getUd"],
    getUid = __o1["getUid"],
    setUid = __o1["setUid"],
    scope = require("../lexical/scope"),
    Scope = scope["Scope"],
    fun = require("../fun"),
    concat = fun["concat"],
    flatten = fun["flatten"],
    flip = fun["flip"],
    filter = fun["filter"],
    foldr = fun["foldr"],
    map = fun["map"],
    reduce = fun["reduce"],
    __o2 = require("../builtin"),
    builtins = __o2["builtins"],
    __o3 = require("./unpack"),
    expandBinding = __o3["expandBinding"],
    expandBindings = __o3["expandBindings"],
    expandArgumentsPattern = __o3["expandArgumentsPattern"],
    state = require("./state"),
    State = state["State"],
    _ = require("./package_manager/amd"),
    _0 = require("./package_manager/node"),
    transform, x, y, f, f0, y0, y1, x0, x1, x2, y2, y3, x3, y4, x4, y5, x5, y6, filterImports, getImports, x6, x7,
        __args, actions, __args0, actions0, __args, actions, __args, actions, __args, actions, __args, actions, __args,
        actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions,
        __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args,
        actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions,
        __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args,
        actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions,
        __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args,
        actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions,
        __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args,
        actions, __args, actions, __args, actions, useStrict, __args, actions, uid, f1, uid0, f2, _trans, M =
        TreeZipperT(StateT(Unique)),
    run = (function(m, s, ctx, seed) {
        return Unique.runUnique(StateT.evalStateT(TreeZipperT.runTreeZipperT(m, ctx), s), seed);
    }),
    pass = M.of(null),
    cons = liftM2.bind(null, concat),
    enumeration = foldr.bind(null, flip(cons), M.of([])),
    extract = M.lift(M.inner.get),
    modifyState = ((x = M.lift), (y = M.inner.modify), (function(z) {
        return x(y(z));
    })),
    inspectStateWith = M.chain.bind(null, extract),
    packageManager = extract.map((function(x0) {
        return x0.packageManager;
    })),
    node = M.node,
    withNode = M.chain.bind(null, node),
    modify = M.modifyNode,
    set = M.setNode,
    up = M.up,
    down = M.down,
    right = M.right,
    moveChild = M.child,
    checkTop = node.chain((function(x0) {
        return _trans(x0);
    })),
    inspectScope = (function(f) {
        return extract.map((function(z) {
            return f(z.scope);
        }));
    }),
    modifyScope = (function(f) {
        return modifyState((function(s) {
            return s.setScope(f(s.scope));
        }));
    }),
    enterBlock = ((f = scope.push), modifyState((function(s) {
        return s.setScope(f(s.scope));
    }))),
    exitBlock = ((f0 = scope.pop), modifyState((function(s) {
        return s.setScope(f0(s.scope));
    }))),
    getMapping = (function(uid) {
        return inspectScope((function(s) {
            return s.getMapping(uid);
        }));
    }),
    addVar = (function(id, uid) {
        return modifyScope(scope.addVar.bind(null, id, uid));
    }),
    pushBindings = modifyState(state.pushBindings),
    popBindings = modifyState(state.popBindings),
    getBindings = M.chain.bind(null, inspectStateWith(((y0 = map.bind(null, (function(uid) {
        return inspectScope((function(s) {
            return s.getMapping(uid);
        }));
    }))), (y1 = state.getBindings), (function(z) {
        var z0 = y1(z);
        return enumeration(y0(z0));
    })))),
    addBindingsForBindingsList = ((x0 = map.bind(null, ((y2 = expandBindings.bind(null, null)), (function(z) {
        return y2(z.pattern);
    })))), (x1 = flatten), (x2 = map.bind(null, ((y3 = getUid), (function(z) {
        var z0 = z.pattern;
        return y3(z0.id);
    })))), (function(z) {
        var z0 = x0(z),
            z1 = x1(z0),
            bindings = x2(z1);
        return modifyState(state.addBindings.bind(null, bindings));
    })),
    identifier = (function(loc, name, uid) {
        return setUid(uid, ecma_value.Identifier.create(loc, name));
    }),
    variableDeclaration = khepri_declaration.VariableDeclaration.create,
    variableDeclarator = ecma_declaration.VariableDeclarator.create,
    idsToDeclarators = ((x3 = map.bind(null, (function(x4) {
        return (x4 && ecma_declaration.VariableDeclarator.create(null, identifier(null, x4)));
    }))), (y4 = ecma_declaration.VariableDeclaration.create.bind(null, null)), (function(z) {
        return y4(x3(z));
    })),
    bindingToDeclarator = (function(x4) {
        return variableDeclarator(null, x4.pattern.id, x4.value);
    }),
    unpack = ((x4 = expandBinding), (y5 = map.bind(null, (function(x5) {
        return variableDeclarator(null, x5.pattern.id, x5.value);
    }))), (function(z) {
        return y5(x4(z));
    })),
    unpackAssign = ((x5 = expandBinding), (y6 = map.bind(null, (function(x6) {
        return ecma_expression.AssignmentExpression.create(null, "=", x6.pattern.id, x6.value);
    }))), (function(z) {
        return y6(x5(z));
    })),
    withStatement = (function(loc, bindings, body) {
        var vars = flatten(map(unpack, bindings)),
            prefix = variableDeclaration(null, vars);
        return khepri_statement.BlockStatement.create(loc, concat(prefix, body.body));
    }),
    functionExpression = (function(loc, id, parameters, functionBody, prefix) {
        var params = parameters.elements,
            bindings = map(bindingToDeclarator, expandArgumentsPattern(parameters, ecma_expression.ThisExpression.create(
                null))),
            body = ((type(functionBody) === "BlockStatement") ? functionBody.body : khepri_statement.ReturnStatement
                .create(null, functionBody));
        return khepri_expression.FunctionExpression.create(loc, id, params, khepri_statement.BlockStatement.create(
            body.loc, concat((prefix || []), variableDeclaration(null, bindings), body)));
    }),
    letExpression = (function(loc, bindings, body) {
        return ecma_expression.SequenceExpression.create(null, flatten(concat(map(unpackAssign, bindings), body)));
    }),
    curryExpression = (function(loc, base, args) {
        return ecma_expression.CallExpression.create(loc, ecma_expression.MemberExpression.create(null, base,
            identifier(null, "bind")), concat(ecma_value.Literal.create(null, "null", null), args));
    }),
    packageBlock = ((filterImports = filter.bind(null, ((x6 = type), (function(z) {
        var z0 = z.value,
            y7 = x6(z0);
        return ("Import" === y7);
    })))), (getImports = filter.bind(null, ((x7 = type), (function(z) {
        var z0 = z.value,
            y7 = x7(z0);
        return ("Import" !== y7);
    })))), (function(packageManager0, loc, exports0, body) {
        var imports = ((type(body) === "WithStatement") ? filterImports(body.bindings) : []),
            targets = reduce(imports, (function(p, c) {
                (p[c.value.from] = c.pattern.id);
                return p;
            }), ({})),
            fBody = ((type(body) === "WithStatement") ? khepri_statement.WithStatement.create(null, getImports(
                body.bindings), body.body) : body);
        return packageManager0.definePackage(loc, exports0, imports, targets, fBody);
    })),
    transformers = ({}),
    addTransform = (function(type0, check) {
        if (Array.isArray(type0)) type0.forEach((function(x8) {
            return addTransform(x8, check);
        }));
        else {
            (transformers[type0] = check);
        }
    }),
    _transform = withNode((function(node0) {
        return _trans(node0);
    }));
addTransform("VariableDeclaration", seq(((__args = ["declarations", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("declarations"), sequencea(actions), up)), modify((function(__o4) {
    var loc = __o4["loc"],
        declarations = __o4["declarations"];
    return ecma_declaration.VariableDeclaration.create(loc, declarations);
}))));
addTransform("Binding", seq(((__args0 = ["pattern", ((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("id"), sequencea(actions), up))]), (actions0 = [].slice.call(__args0, 1)), seq(moveChild(
    "pattern"), sequencea(actions0), up)), ((__args = ["value", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("value"), sequencea(actions), up))));
addTransform("VariableDeclarator", seq(((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("id"), sequencea(actions), up)), ((__args = ["init", checkTop]), (actions = [].slice.call(__args,
    1)), seq(moveChild("init"), sequencea(actions), up)), modify((function(node0) {
    return ecma_declaration.VariableDeclarator.create(node0.loc, node0.id, node0.init);
}))));
addTransform("StaticDeclaration", modify((function(__o4) {
    var loc = __o4["loc"];
    return ecma_statement.EmptyStatement.create(loc);
})));
addTransform("CatchClause", seq(((__args = ["param", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "param"), sequencea(actions), up)), ((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("body"), sequencea(actions), up)), modify((function(node0) {
    return ecma_clause.CatchClause.create(node0.loc, node0.param, node0.body);
}))));
addTransform("SwitchCase", seq(((__args = ["test", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "test"), sequencea(actions), up)), ((__args = ["consequent", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("consequent"), sequencea(actions), up)), modify((function(node0) {
    return ecma_clause.SwitchCase.create(node0.loc, node0.test, node0.consequent);
}))));
addTransform("BlockStatement", seq(pushBindings, ((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("body"), sequencea(actions), up)), getBindings((function(bindings) {
    return modify((function(node0) {
        return ecma_statement.BlockStatement.create(node0.loc, concat(idsToDeclarators(bindings),
            node0.body));
    }));
})), popBindings));
addTransform("ExpressionStatement", seq(((__args = ["expression", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("expression"), sequencea(actions), up)), modify((function(node0) {
    return ecma_statement.ExpressionStatement.create(node0.loc, node0.expression);
}))));
addTransform("IfStatement", seq(((__args = ["test", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "test"), sequencea(actions), up)), ((__args = ["consequent", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("consequent"), sequencea(actions), up)), ((__args = ["alternate", checkTop]), (actions = [].slice
    .call(__args, 1)), seq(moveChild("alternate"), sequencea(actions), up)), modify((function(node0) {
    return ecma_statement.IfStatement.create(node0.loc, node0.test, node0.consequent, node0.alternate);
}))));
addTransform("WithStatement", seq(modify((function(node0) {
    return withStatement(node0.loc, node0.bindings, node0.body);
})), _transform));
addTransform("SwitchStatement", seq(((__args = ["discriminant", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("discriminant"), sequencea(actions), up)), ((__args = ["cases", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("cases"), sequencea(actions), up)), modify((function(node0) {
    return ecma_statement.SwitchStatement.create(node0.loc, node0.discriminant, node0.cases);
}))));
addTransform("ReturnStatement", seq(((__args = ["argument", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("argument"), sequencea(actions), up)), modify((function(node0) {
    return ecma_statement.ReturnStatement.create(node0.loc, node0.argument);
}))));
addTransform("ThrowStatement", seq(((__args = ["argument", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("argument"), sequencea(actions), up)), modify((function(node0) {
    return ecma_statement.ThrowStatement.create(node0.loc, node0.argument);
}))));
addTransform("BreakStatement", modify((function(node0) {
    return ecma_statement.BreakStatement.create(node0.loc, null);
})));
addTransform("ContinueStatement", modify((function(node0) {
    return ecma_statement.ContinueStatement.create(node0.loc, null);
})));
addTransform("TryStatement", seq(((__args = ["block", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "block"), sequencea(actions), up)), ((__args = ["handler", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("handler"), sequencea(actions), up)), ((__args = ["finalizer", checkTop]), (actions = [].slice
    .call(__args, 1)), seq(moveChild("finalizer"), sequencea(actions), up)), modify((function(node0) {
    return ecma_statement.TryStatement.create(node0.loc, node0.block, node0.handler, node0.finalizer);
}))));
addTransform("WhileStatement", seq(((__args = ["test", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "test"), sequencea(actions), up)), ((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("body"), sequencea(actions), up)), modify((function(node0) {
    return ecma_statement.WhileStatement.create(node0.loc, node0.test, node0.body);
}))));
addTransform("DoWhileStatement", seq(((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("body"), sequencea(actions), up)), ((__args = ["test", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("test"), sequencea(actions), up)), modify((function(node0) {
    return ecma_statement.DoWhileStatement.create(node0.loc, node0.body, node0.test);
}))));
addTransform("ForStatement", seq(((__args = ["init", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "init"), sequencea(actions), up)), ((__args = ["test", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("test"), sequencea(actions), up)), ((__args = ["update", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("update"), sequencea(actions), up)), ((__args = ["body", checkTop]), (actions = []
    .slice.call(__args, 1)), seq(moveChild("body"), sequencea(actions), up)), modify((function(node0) {
    return ecma_statement.ForStatement.create(node0.loc, node0.init, node0.test, node0.update, node0.body);
}))));
addTransform("AssignmentExpression", seq(((__args = ["left", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("left"), sequencea(actions), up)), ((__args = ["right", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("right"), sequencea(actions), up)), modify((function(node0) {
    return ecma_expression.AssignmentExpression.create(node0.loc, "=", node0.left, node0.right);
}))));
addTransform("UnaryExpression", seq(((__args = ["argument", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("argument"), sequencea(actions), up)), modify((function(node0) {
    return ecma_expression.UnaryExpression.create(node0.loc, ((node0.operator === "++") ? "+" : ((node0
        .operator === "--") ? "-" : node0.operator)), node0.argument);
}))));
addTransform("BinaryExpression", seq(((__args = ["left", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("left"), sequencea(actions), up)), ((__args = ["right", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("right"), sequencea(actions), up)), modify((function(node0) {
    return ecma_expression.BinaryExpression.create(node0.loc, node0.operator, node0.left, node0.right);
}))));
addTransform("LogicalExpression", seq(((__args = ["left", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("left"), sequencea(actions), up)), ((__args = ["right", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("right"), sequencea(actions), up)), modify((function(node0) {
    return ecma_expression.LogicalExpression.create(node0.loc, node0.operator, node0.left, node0.right);
}))));
addTransform("ConditionalExpression", seq(((__args = ["test", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("test"), sequencea(actions), up)), ((__args = ["consequent", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("consequent"), sequencea(actions), up)), ((__args = ["alternate", checkTop]), (
    actions = [].slice.call(__args, 1)), seq(moveChild("alternate"), sequencea(actions), up)), modify((function(
    node0) {
    return ecma_expression.ConditionalExpression.create(node0.loc, node0.test, node0.consequent, node0.alternate);
}))));
addTransform("NewExpression", seq(((__args = ["callee", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "callee"), sequencea(actions), up)), ((__args = ["args", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("args"), sequencea(actions), up)), modify((function(node0) {
    return ecma_expression.NewExpression.create(node0.loc, node0.callee, node0.args);
}))));
addTransform("CallExpression", seq(((__args = ["callee", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("callee"), sequencea(actions), up)), ((__args = ["args", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("args"), sequencea(actions), up)), modify((function(node0) {
    return ecma_expression.CallExpression.create(node0.loc, node0.callee, node0.args);
}))));
addTransform("MemberExpression", seq(((__args = ["object", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("object"), sequencea(actions), up)), ((__args = ["property", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("property"), sequencea(actions), up)), modify((function(node0) {
    return ecma_expression.MemberExpression.create(node0.loc, node0.object, node0.property, node0.computed);
}))));
addTransform("LetExpression", seq(((__args = ["bindings", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("bindings"), sequencea(actions), up)), withNode((function(z) {
    return addBindingsForBindingsList(z.bindings);
})), ((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("body"), sequencea(
    actions), up)), modify((function(node0) {
    return letExpression(node0.loc, node0.bindings, node0.body);
}))));
addTransform("CurryExpression", seq(((__args = ["base", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "base"), sequencea(actions), up)), ((__args = ["args", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("args"), sequencea(actions), up)), modify((function(node0) {
    return curryExpression(node0.loc, node0.base, node0.args);
}))));
addTransform("FunctionExpression", seq(enterBlock, modify((function(node0) {
    return functionExpression(node0.loc, node0.id, node0.params, node0.body, getUd("prefix", node0));
})), ((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("id"), sequencea(actions),
    up)), ((__args = ["params", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("params"),
    sequencea(actions), up)), ((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("body"), sequencea(actions), up)), modify((function(node0) {
    return ecma_expression.FunctionExpression.create(null, node0.id, node0.params, node0.body);
})), exitBlock));
addTransform("ArrayExpression", seq(((__args = ["elements", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("elements"), sequencea(actions), up)), modify((function(node0) {
    return ecma_expression.ArrayExpression.create(node0.loc, node0.elements);
}))));
addTransform("ObjectExpression", seq(((__args = ["properties", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("properties"), sequencea(actions), up)), modify((function(node0) {
    return ecma_expression.ObjectExpression.create(node0.loc, node0.properties);
}))));
addTransform("ObjectValue", seq(((__args = ["key", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "key"), sequencea(actions), up)), ((__args = ["value", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("value"), sequencea(actions), up)), modify((function(node0) {
    return ecma_value.ObjectValue.create(node0.loc, node0.key, node0.value);
}))));
addTransform("ArgumentsPattern", seq(((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "id"), sequencea(actions), up)), ((__args = ["elements", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("elements"), sequencea(actions), up)), ((__args = ["self", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("self"), sequencea(actions), up))));
addTransform(["IdentifierPattern", "AsPattern"], seq(((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("id"), sequencea(actions), up)), modify((function(x8) {
    return x8.id;
}))));
addTransform(["ObjectPattern", "EllipsisPattern"], seq(modify(getUd.bind(null, "id"))));
addTransform("Program", ((useStrict = khepri_statement.ExpressionStatement.create(null, khepri_value.Literal.create(
    null, "string", "use strict"))), seq(pushBindings, modify((function(node0) {
    return ((type(node0.body) === "Package") ? node0 : setData(node0, "prefix", useStrict));
})), ((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("body"), sequencea(
    actions), up)), getBindings((function(bindings) {
    return modify((function(node0) {
        return ecma_program.Program.create(node0.loc, concat(tryGetUd([], "prefix", node0),
            idsToDeclarators(bindings), node0.body));
    }));
})))));
addTransform("Package", seq(packageManager.chain((function(packageManager0) {
    return modify((function(node0) {
        return packageBlock(packageManager0, node0.loc, node0.exports, node0.body);
    }));
})), _transform));
addTransform("Import", packageManager.chain((function(packageManager0) {
    return modify((function(node0) {
        return packageManager0.importPackage(node0.from);
    }));
})));
addTransform("Identifier", withNode((function(node0) {
    return (getUid(node0) ? seq(addVar(node0.name, getUid(node0)), getMapping(getUid(node0))
        .chain((function(name) {
            return set(identifier(node0.loc, name, getUid(node0)));
        }))) : set(identifier(node0.loc, node0.name)));
})));
(_trans = (function(node0) {
    if (Array.isArray(node0)) {
        if ((!node0.length)) return pass;
        return seq(down, sequencea(node0.map((function(_1, i) {
            return ((i === (node0.length - 1)) ? checkTop : seq(checkTop, right));
        }))), up);
    }
    return (transformers[type(node0)] || pass);
}));
var transformProgram = seq(((uid = getUid(builtins.require)), (f1 = scope.addVar.bind(null, "require", uid)),
    modifyState((function(s) {
        return s.setScope(f1(s.scope));
    }))), ((uid0 = getUid(builtins.exports)), (f2 = scope.addVar.bind(null, "exports", uid0)), modifyState((
    function(s) {
        return s.setScope(f2(s.scope));
    }))), checkTop, node.map(ecmaZipper)),
    getPackageManager = (function(manager) {
        var amd_manager = require("./package_manager/amd"),
            node_manager = require("./package_manager/node");
        return ((manager === "node") ? node_manager : amd_manager);
    });
(transform = (function(ast, manager) {
    var packageManager0 = getPackageManager(manager),
        s = State.empty.setPackageManager(packageManager0);
    return run(transformProgram, s, ast);
}));
(exports["transform"] = transform);
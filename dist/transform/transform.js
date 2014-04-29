/*
 * THIS FILE IS AUTO GENERATED from 'lib/transform/transform.kep'
 * DO NOT EDIT
*/define(["require", "exports", "ecma-ast/clause", "ecma-ast/declaration", "ecma-ast/expression", "ecma-ast/statement",
    "ecma-ast/value", "ecma-ast-zipper", "akh/unique", "akh/trans/statei", "akh/base", "zipper-m/trans/tree",
    "../ast", "../lexical/scope", "../fun", "../builtin", "./unpack", "./state", "./translation",
    "./package_manager/amd", "./package_manager/node"
], (function(require, exports, ecma_clause, ecma_declaration, ecma_expression, ecma_statement, ecma_value, __o,
    Unique, StateT, __o0, TreeZipperT, __o1, scope, __o2, __o3, __o4, state, translation, _, _0) {
    "use strict";
    var ecmaZipper = __o["ecmaZipper"],
        liftM2 = __o0["liftM2"],
        seq = __o0["sequence"],
        sequencea = __o0["sequencea"],
        type = __o1["type"],
        getUd = __o1["getUd"],
        setUd = __o1["setUd"],
        getUid = __o1["getUid"],
        setUid = __o1["setUid"],
        Scope = scope["Scope"],
        concat = __o2["concat"],
        flatten = __o2["flatten"],
        flip = __o2["flip"],
        foldr = __o2["foldr"],
        map = __o2["map"],
        builtins = __o3["builtins"],
        expandBindings = __o4["expandBindings"],
        State = state["State"],
        transform, x, y, f, f0, y0, y1, x0, x1, x2, y2, y3, __args, actions, __args0, actions0, __args, actions,
            __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args,
            actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions,
            __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args,
            actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions,
            __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args,
            actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions,
            __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args,
            actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions,
            __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args,
            actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions,
            __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args,
            actions, useStrict, __args, actions, uid, f1, uid0, f2, _trans, M = TreeZipperT(StateT(Unique)),
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
        transformers = ({}),
        addTransform = (function(type0, check) {
            if (Array.isArray(type0)) type0.forEach((function(x3) {
                return addTransform(x3, check);
            }));
            else {
                (transformers[type0] = check);
            }
        }),
        _transform = withNode((function(node0) {
            return _trans(node0);
        }));
    addTransform("VariableDeclaration", seq(((__args = ["declarations", checkTop]), (actions = [].slice.call(
        __args, 1)), seq(moveChild("declarations"), sequencea(actions), up)), modify((function(__o5) {
        var loc = __o5["loc"],
            declarations = __o5["declarations"];
        return ecma_declaration.VariableDeclaration.create(loc, declarations);
    }))));
    addTransform("Binding", seq(((__args0 = ["pattern", ((__args = ["id", checkTop]), (actions = [].slice.call(
        __args, 1)), seq(moveChild("id"), sequencea(actions), up))]), (actions0 = [].slice.call(
        __args0, 1)), seq(moveChild("pattern"), sequencea(actions0), up)), ((__args = ["value",
        checkTop
    ]), (actions = [].slice.call(__args, 1)), seq(moveChild("value"), sequencea(actions), up))));
    addTransform("VariableDeclarator", seq(((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("id"), sequencea(actions), up)), ((__args = ["init", checkTop]), (actions = [].slice
        .call(__args, 1)), seq(moveChild("init"), sequencea(actions), up)), modify((function(node0) {
        return ecma_declaration.VariableDeclarator.create(node0.loc, node0.id, node0.init);
    }))));
    addTransform("StaticDeclaration", modify((function(__o5) {
        var loc = __o5["loc"];
        return ecma_statement.EmptyStatement.create(loc);
    })));
    addTransform("CatchClause", seq(((__args = ["param", checkTop]), (actions = [].slice.call(__args, 1)), seq(
        moveChild("param"), sequencea(actions), up)), ((__args = ["body", checkTop]), (actions = [].slice
        .call(__args, 1)), seq(moveChild("body"), sequencea(actions), up)), modify((function(node0) {
        return ecma_clause.CatchClause.create(node0.loc, node0.param, node0.body);
    }))));
    addTransform("SwitchCase", seq(((__args = ["test", checkTop]), (actions = [].slice.call(__args, 1)), seq(
        moveChild("test"), sequencea(actions), up)), ((__args = ["consequent", checkTop]), (actions = []
        .slice.call(__args, 1)), seq(moveChild("consequent"), sequencea(actions), up)), modify((
        function(node0) {
            return ecma_clause.SwitchCase.create(node0.loc, node0.test, node0.consequent);
        }))));
    addTransform("BlockStatement", seq(pushBindings, ((__args = ["body", checkTop]), (actions = [].slice.call(
        __args, 1)), seq(moveChild("body"), sequencea(actions), up)), getBindings((function(bindings) {
        return modify(translation.blockStatement.bind(null, bindings));
    })), popBindings));
    addTransform("ExpressionStatement", seq(((__args = ["expression", checkTop]), (actions = [].slice.call(
        __args, 1)), seq(moveChild("expression"), sequencea(actions), up)), modify((function(node0) {
        return ecma_statement.ExpressionStatement.create(node0.loc, node0.expression);
    }))));
    addTransform("IfStatement", seq(((__args = ["test", checkTop]), (actions = [].slice.call(__args, 1)), seq(
            moveChild("test"), sequencea(actions), up)), ((__args = ["consequent", checkTop]), (actions = []
            .slice.call(__args, 1)), seq(moveChild("consequent"), sequencea(actions), up)), ((__args = [
            "alternate", checkTop
        ]), (actions = [].slice.call(__args, 1)), seq(moveChild("alternate"), sequencea(actions), up)),
        modify((function(node0) {
            return ecma_statement.IfStatement.create(node0.loc, node0.test, node0.consequent, node0
                .alternate);
        }))));
    addTransform("WithStatement", seq(((__args = ["bindings", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("bindings"), sequencea(actions), up)), ((__args = ["body", checkTop]), (actions = []
        .slice.call(__args, 1)), seq(moveChild("body"), sequencea(actions), up)), modify((function(
        node0) {
        return translation.withStatement(node0.loc, node0.bindings, node0.body);
    }))));
    addTransform("SwitchStatement", seq(((__args = ["discriminant", checkTop]), (actions = [].slice.call(__args,
        1)), seq(moveChild("discriminant"), sequencea(actions), up)), ((__args = ["cases", checkTop]), (
        actions = [].slice.call(__args, 1)), seq(moveChild("cases"), sequencea(actions), up)), modify((
        function(node0) {
            return ecma_statement.SwitchStatement.create(node0.loc, node0.discriminant, node0.cases);
        }))));
    addTransform("ReturnStatement", seq(((__args = ["argument", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("argument"), sequencea(actions), up)), modify((function(node0) {
        return ecma_statement.ReturnStatement.create(node0.loc, node0.argument);
    }))));
    addTransform("ThrowStatement", seq(((__args = ["argument", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("argument"), sequencea(actions), up)), modify((function(node0) {
        return ecma_statement.ThrowStatement.create(node0.loc, node0.argument);
    }))));
    addTransform("BreakStatement", modify((function(node0) {
        return ecma_statement.BreakStatement.create(node0.loc, null);
    })));
    addTransform("ContinueStatement", modify((function(node0) {
        return ecma_statement.ContinueStatement.create(node0.loc, null);
    })));
    addTransform("TryStatement", seq(((__args = ["block", checkTop]), (actions = [].slice.call(__args, 1)), seq(
            moveChild("block"), sequencea(actions), up)), ((__args = ["handler", checkTop]), (actions = [].slice
            .call(__args, 1)), seq(moveChild("handler"), sequencea(actions), up)), ((__args = ["finalizer",
            checkTop
        ]), (actions = [].slice.call(__args, 1)), seq(moveChild("finalizer"), sequencea(actions), up)),
        modify((function(node0) {
            return ecma_statement.TryStatement.create(node0.loc, node0.block, node0.handler, node0.finalizer);
        }))));
    addTransform("WhileStatement", seq(((__args = ["test", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("test"), sequencea(actions), up)), ((__args = ["body", checkTop]), (actions = [].slice
        .call(__args, 1)), seq(moveChild("body"), sequencea(actions), up)), modify((function(node0) {
        return ecma_statement.WhileStatement.create(node0.loc, node0.test, node0.body);
    }))));
    addTransform("DoWhileStatement", seq(((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("body"), sequencea(actions), up)), ((__args = ["test", checkTop]), (actions = [].slice
        .call(__args, 1)), seq(moveChild("test"), sequencea(actions), up)), modify((function(node0) {
        return ecma_statement.DoWhileStatement.create(node0.loc, node0.body, node0.test);
    }))));
    addTransform("ForStatement", seq(((__args = ["init", checkTop]), (actions = [].slice.call(__args, 1)), seq(
        moveChild("init"), sequencea(actions), up)), ((__args = ["test", checkTop]), (actions = [].slice
        .call(__args, 1)), seq(moveChild("test"), sequencea(actions), up)), ((__args = ["update",
        checkTop
    ]), (actions = [].slice.call(__args, 1)), seq(moveChild("update"), sequencea(actions), up)), ((
        __args = ["body", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("body"),
        sequencea(actions), up)), modify((function(node0) {
        return ecma_statement.ForStatement.create(node0.loc, node0.init, node0.test, node0.update,
            node0.body);
    }))));
    addTransform("AssignmentExpression", seq(((__args = ["left", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("left"), sequencea(actions), up)), ((__args = ["right", checkTop]), (actions = []
        .slice.call(__args, 1)), seq(moveChild("right"), sequencea(actions), up)), modify(translation.assignmentExpression)));
    addTransform("UnaryExpression", seq(((__args = ["argument", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("argument"), sequencea(actions), up)), modify(translation.unaryExpression)));
    addTransform("BinaryExpression", seq(((__args = ["left", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("left"), sequencea(actions), up)), ((__args = ["right", checkTop]), (actions = []
        .slice.call(__args, 1)), seq(moveChild("right"), sequencea(actions), up)), modify(translation.binaryExpression)));
    addTransform("LogicalExpression", seq(((__args = ["left", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("left"), sequencea(actions), up)), ((__args = ["right", checkTop]), (actions = []
        .slice.call(__args, 1)), seq(moveChild("right"), sequencea(actions), up)), modify(translation.logicalExpression)));
    addTransform("ConditionalExpression", seq(((__args = ["test", checkTop]), (actions = [].slice.call(__args,
        1)), seq(moveChild("test"), sequencea(actions), up)), ((__args = ["consequent", checkTop]), (
        actions = [].slice.call(__args, 1)), seq(moveChild("consequent"), sequencea(actions), up)), ((
        __args = ["alternate", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
        "alternate"), sequencea(actions), up)), modify(translation.conditionalExpression)));
    addTransform("NewExpression", seq(((__args = ["callee", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("callee"), sequencea(actions), up)), ((__args = ["args", checkTop]), (actions = []
        .slice.call(__args, 1)), seq(moveChild("args"), sequencea(actions), up)), modify(translation.newExpression)));
    addTransform("CallExpression", seq(((__args = ["callee", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("callee"), sequencea(actions), up)), ((__args = ["args", checkTop]), (actions = []
        .slice.call(__args, 1)), seq(moveChild("args"), sequencea(actions), up)), modify(translation.callExpression)));
    addTransform("MemberExpression", seq(((__args = ["object", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("object"), sequencea(actions), up)), ((__args = ["property", checkTop]), (actions = []
        .slice.call(__args, 1)), seq(moveChild("property"), sequencea(actions), up)), modify(
        translation.memberExpression)));
    addTransform("LetExpression", seq(((__args = ["bindings", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("bindings"), sequencea(actions), up)), withNode((function(z) {
        return addBindingsForBindingsList(z.bindings);
    })), ((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("body"),
        sequencea(actions), up)), modify((function(node0) {
        return translation.letExpression(node0.loc, node0.bindings, node0.body);
    }))));
    addTransform("CurryExpression", seq(((__args = ["base", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("base"), sequencea(actions), up)), ((__args = ["args", checkTop]), (actions = [].slice
        .call(__args, 1)), seq(moveChild("args"), sequencea(actions), up)), modify((function(node0) {
        return translation.curryExpression(node0.loc, node0.base, node0.args);
    }))));
    addTransform("FunctionExpression", seq(enterBlock, ((__args = ["id", checkTop]), (actions = [].slice.call(
        __args, 1)), seq(moveChild("id"), sequencea(actions), up)), modify((function(node0) {
        return translation.functionExpression(node0.loc, node0.id, node0.params, node0.body,
            getUd("prefix", node0));
    })), ((__args = ["params", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("params"),
        sequencea(actions), up)), ((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("body"), sequencea(actions), up)), modify((function(node0) {
        return ecma_expression.FunctionExpression.create(null, node0.id, node0.params, node0.body);
    })), exitBlock));
    addTransform("ArrayExpression", seq(((__args = ["elements", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("elements"), sequencea(actions), up)), modify((function(node0) {
        return ecma_expression.ArrayExpression.create(node0.loc, node0.elements);
    }))));
    addTransform("ObjectExpression", seq(((__args = ["properties", checkTop]), (actions = [].slice.call(__args,
        1)), seq(moveChild("properties"), sequencea(actions), up)), modify((function(node0) {
        return ecma_expression.ObjectExpression.create(node0.loc, node0.properties);
    }))));
    addTransform("ObjectValue", seq(((__args = ["key", checkTop]), (actions = [].slice.call(__args, 1)), seq(
        moveChild("key"), sequencea(actions), up)), ((__args = ["value", checkTop]), (actions = [].slice
        .call(__args, 1)), seq(moveChild("value"), sequencea(actions), up)), modify((function(node0) {
        return ecma_value.ObjectValue.create(node0.loc, node0.key, node0.value);
    }))));
    addTransform(["RelativeUnpack", "SliceUnpack"], ((__args = ["target", checkTop]), (actions = [].slice.call(
        __args, 1)), seq(moveChild("target"), sequencea(actions), up)));
    addTransform("ArgumentsPattern", seq(((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("id"), sequencea(actions), up)), ((__args = ["elements", checkTop]), (actions = []
        .slice.call(__args, 1)), seq(moveChild("elements"), sequencea(actions), up)), ((__args = [
        "self", checkTop
    ]), (actions = [].slice.call(__args, 1)), seq(moveChild("self"), sequencea(actions), up))));
    addTransform(["IdentifierPattern", "AsPattern"], seq(((__args = ["id", checkTop]), (actions = [].slice.call(
        __args, 1)), seq(moveChild("id"), sequencea(actions), up)), modify((function(x3) {
        return x3.id;
    }))));
    addTransform(["ObjectPattern", "EllipsisPattern"], seq(modify(getUd.bind(null, "id"))));
    addTransform("Program", ((useStrict = ecma_statement.ExpressionStatement.create(null, ecma_value.Literal.create(
        null, "string", "use strict"))), seq(pushBindings, modify((function(node0) {
        return ((type(node0.body) === "Package") ? node0 : setUd("prefix", useStrict, node0));
    })), ((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("body"),
        sequencea(actions), up)), getBindings((function(bindings) {
        return modify(translation.program.bind(null, bindings));
    })))));
    addTransform("Package", seq(packageManager.chain((function(packageManager0) {
        return modify((function(node0) {
            return translation.packageBlock(packageManager0, node0.loc, node0.exports,
                node0.body);
        }));
    })), _transform));
    addTransform("Import", packageManager.chain((function(packageManager0) {
        var y4;
        return modify(((y4 = packageManager0.importPackage), (function(z) {
            return y4(z.from);
        })));
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
        }))), ((uid0 = getUid(builtins.exports)), (f2 = scope.addVar.bind(null, "exports", uid0)),
        modifyState((function(s) {
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
}));
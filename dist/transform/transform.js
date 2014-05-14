/*
 * THIS FILE IS AUTO GENERATED from 'lib/transform/transform.kep'
 * DO NOT EDIT
*/define(["require", "exports", "ecma-ast/expression", "ecma-ast-zipper", "akh/unique", "akh/trans/statei", "akh/base",
    "zipper-m/trans/tree", "../ast", "../lexical/scope", "../fun", "../builtin", "./unpack", "./state",
    "./translation", "./package_manager/amd", "./package_manager/node"
], (function(require, exports, ecma_expression, __o, Unique, StateT, __o0, TreeZipperT, __o1, scope, __o2, __o3,
    __o4, state, translate, _, _0) {
    "use strict";
    var transform, ecmaZipper = __o["ecmaZipper"],
        liftM2 = __o0["liftM2"],
        seq = __o0["sequence"],
        sequencea = __o0["sequencea"],
        type = __o1["type"],
        getUd = __o1["getUd"],
        setUd = __o1["setUd"],
        getUid = __o1["getUid"],
        concat = __o2["concat"],
        flatten = __o2["flatten"],
        flip = __o2["flip"],
        foldr = __o2["foldr"],
        map = __o2["map"],
        builtins = __o3["builtins"],
        expandBindings = __o4["expandBindings"],
        State = state["State"],
        x, y, f, f0, y0, y1, y2, x0, x1, __args, actions, __args1, actions0, __args0, actions1, __args2,
            actions2, __args3, actions3, __args4, actions4, __args5, actions5, __args6, actions6, __args7,
            actions7, __args8, actions8, __args9, actions9, __args10, actions10, __args11, actions11, __args12,
            actions12, __args13, actions13, __args14, actions14, __args15, actions15, __args16, actions16,
            __args17, actions17, __args18, actions18, __args19, actions19, __args20, actions20, __args21,
            actions21, __args22, actions22, __args23, actions23, __args24, actions24, __args25, actions25,
            __args26, actions26, __args27, actions27, __args28, actions28, __args29, actions29, __args30,
            actions30, __args31, actions31, __args32, actions32, __args33, actions33, __args34, actions34,
            __args35, actions35, __args36, actions36, __args37, actions37, __args38, actions38, __args39,
            actions39, __args40, actions40, __args41, actions41, __args42, actions42, __args43, actions43,
            __args44, actions44, __args45, actions45, __args46, actions46, __args47, actions47, __args48,
            actions48, __args49, actions49, __args50, actions51, __args51, actions52, __args52, actions53,
            actions50, __args53, actions54, __args54, actions55, __args55, actions56, __args56, actions57,
            __args57, actions58, __args58, actions59, __args59, actions60, __args60, actions61, __args61,
            actions62, __args62, actions63, move, uid, f1, uid0, f2, _trans, M = TreeZipperT(StateT(Unique)),
        run = (function(m, s, ctx, seed) {
            return Unique.runUnique(StateT.evalStateT(TreeZipperT.runTreeZipperT(m, ctx), s), seed);
        }),
        pass = M.of(null),
        cons = liftM2.bind(null, concat),
        enumeration = foldr.bind(null, flip(cons), M.of([])),
        node = M.node,
        withNode = M.chain.bind(null, node),
        modify = M.modifyNode,
        set = M.setNode,
        up = M.up,
        down = M.down,
        right = M.right,
        moveChild = M.child,
        checkTop = node.chain((function(x) {
            return _trans(x);
        })),
        extract = M.lift(M.inner.get),
        modifyState = ((x = M.lift), (y = M.inner.modify), (function(z) {
            return x(y(z));
        })),
        inspectStateWith = M.chain.bind(null, extract),
        packageManager = extract.map((function(x0) {
            return x0.packageManager;
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
            return inspectScope(scope.getMapping.bind(null, uid));
        }),
        pushBindings = modifyState(state.pushBindings),
        popBindings = modifyState(state.popBindings),
        getBindings = M.chain.bind(null, inspectStateWith(((y0 = map.bind(null, getMapping)), (y1 = state.getBindings), (
            function(z) {
                var z0 = y1(z);
                return enumeration(y0(z0));
            })))),
        addBindingsForBindingsList = ((x0 = map.bind(null, ((y2 = expandBindings.bind(null, null)), (function(z) {
            return y2(z.pattern);
        })))), (x1 = map.bind(null, (function(z) {
            var z0 = z.pattern;
            return getUid(z0.id);
        }))), (function(z) {
            var z0 = x0(z),
                z1 = flatten(z0),
                bindings = x1(z1);
            return modifyState(state.addBindings.bind(null, bindings));
        })),
        transformers = ({}),
        addTransform = (function(type0, check) {
            if (Array.isArray(type0)) type0.forEach((function(x2) {
                return addTransform(x2, check);
            }));
            else {
                (transformers[type0] = check);
            }
        });
    addTransform("VariableDeclaration", seq(((__args = ["declarations", checkTop]), (actions = [].slice.call(
        __args, 1)), seq(moveChild("declarations"), sequencea(actions), up)), modify(translate.variableDeclaration)));
    addTransform("Binding", seq(((__args0 = ["pattern", ((__args1 = ["id", checkTop]), (actions0 = [].slice.call(
        __args1, 1)), seq(moveChild("id"), sequencea(actions0), up))]), (actions1 = [].slice.call(
        __args0, 1)), seq(moveChild("pattern"), sequencea(actions1), up)), ((__args2 = ["value",
        checkTop
    ]), (actions2 = [].slice.call(__args2, 1)), seq(moveChild("value"), sequencea(actions2), up))));
    addTransform("VariableDeclarator", seq(((__args3 = ["id", checkTop]), (actions3 = [].slice.call(__args3, 1)),
        seq(moveChild("id"), sequencea(actions3), up)), ((__args4 = ["init", checkTop]), (actions4 = []
        .slice.call(__args4, 1)), seq(moveChild("init"), sequencea(actions4), up)), modify(translate.variableDeclarator)));
    addTransform("StaticDeclaration", modify(translate.emptyStatement));
    addTransform("CatchClause", seq(((__args5 = ["param", checkTop]), (actions5 = [].slice.call(__args5, 1)),
        seq(moveChild("param"), sequencea(actions5), up)), ((__args6 = ["body", checkTop]), (actions6 = []
        .slice.call(__args6, 1)), seq(moveChild("body"), sequencea(actions6), up)), modify(translate.catchClause)));
    addTransform("SwitchCase", seq(((__args7 = ["test", checkTop]), (actions7 = [].slice.call(__args7, 1)), seq(
        moveChild("test"), sequencea(actions7), up)), ((__args8 = ["consequent", checkTop]), (actions8 = []
        .slice.call(__args8, 1)), seq(moveChild("consequent"), sequencea(actions8), up)), modify(
        translate.switchCase)));
    addTransform("BlockStatement", seq(pushBindings, ((__args9 = ["body", checkTop]), (actions9 = [].slice.call(
        __args9, 1)), seq(moveChild("body"), sequencea(actions9), up)), getBindings((function(bindings) {
        return modify(translate.blockStatement.bind(null, bindings));
    })), popBindings));
    addTransform("ExpressionStatement", seq(((__args10 = ["expression", checkTop]), (actions10 = [].slice.call(
        __args10, 1)), seq(moveChild("expression"), sequencea(actions10), up)), modify(translate.expressionStatement)));
    addTransform("IfStatement", seq(((__args11 = ["test", checkTop]), (actions11 = [].slice.call(__args11, 1)),
        seq(moveChild("test"), sequencea(actions11), up)), ((__args12 = ["consequent", checkTop]), (
        actions12 = [].slice.call(__args12, 1)), seq(moveChild("consequent"), sequencea(actions12),
        up)), ((__args13 = ["alternate", checkTop]), (actions13 = [].slice.call(__args13, 1)), seq(
        moveChild("alternate"), sequencea(actions13), up)), modify(translate.ifStatement)));
    addTransform("WithStatement", seq(((__args14 = ["bindings", checkTop]), (actions14 = [].slice.call(__args14,
            1)), seq(moveChild("bindings"), sequencea(actions14), up)), ((__args15 = ["body", checkTop]), (
            actions15 = [].slice.call(__args15, 1)), seq(moveChild("body"), sequencea(actions15), up)),
        modify(translate.withStatement)));
    addTransform("SwitchStatement", seq(((__args16 = ["discriminant", checkTop]), (actions16 = [].slice.call(
            __args16, 1)), seq(moveChild("discriminant"), sequencea(actions16), up)), ((__args17 = ["cases",
            checkTop
        ]), (actions17 = [].slice.call(__args17, 1)), seq(moveChild("cases"), sequencea(actions17), up)),
        modify(translate.switchStatement)));
    addTransform("ReturnStatement", seq(((__args18 = ["argument", checkTop]), (actions18 = [].slice.call(
        __args18, 1)), seq(moveChild("argument"), sequencea(actions18), up)), modify(translate.returnStatement)));
    addTransform("ThrowStatement", seq(((__args19 = ["argument", checkTop]), (actions19 = [].slice.call(
        __args19, 1)), seq(moveChild("argument"), sequencea(actions19), up)), modify(translate.throwStatement)));
    addTransform("BreakStatement", modify(translate.breakStatement));
    addTransform("ContinueStatement", modify(translate.continueStatement));
    addTransform("TryStatement", seq(((__args20 = ["block", checkTop]), (actions20 = [].slice.call(__args20, 1)),
        seq(moveChild("block"), sequencea(actions20), up)), ((__args21 = ["handler", checkTop]), (
        actions21 = [].slice.call(__args21, 1)), seq(moveChild("handler"), sequencea(actions21), up)), (
        (__args22 = ["finalizer", checkTop]), (actions22 = [].slice.call(__args22, 1)), seq(moveChild(
            "finalizer"), sequencea(actions22), up)), modify(translate.tryStatement)));
    addTransform("WhileStatement", seq(((__args23 = ["test", checkTop]), (actions23 = [].slice.call(__args23, 1)),
        seq(moveChild("test"), sequencea(actions23), up)), ((__args24 = ["body", checkTop]), (actions24 = []
        .slice.call(__args24, 1)), seq(moveChild("body"), sequencea(actions24), up)), modify(translate.whileStatement)));
    addTransform("DoWhileStatement", seq(((__args25 = ["body", checkTop]), (actions25 = [].slice.call(__args25,
            1)), seq(moveChild("body"), sequencea(actions25), up)), ((__args26 = ["test", checkTop]), (
            actions26 = [].slice.call(__args26, 1)), seq(moveChild("test"), sequencea(actions26), up)),
        modify(translate.doWhileStatement)));
    addTransform("ForStatement", seq(((__args27 = ["init", checkTop]), (actions27 = [].slice.call(__args27, 1)),
        seq(moveChild("init"), sequencea(actions27), up)), ((__args28 = ["test", checkTop]), (actions28 = []
        .slice.call(__args28, 1)), seq(moveChild("test"), sequencea(actions28), up)), ((__args29 = [
        "update", checkTop
    ]), (actions29 = [].slice.call(__args29, 1)), seq(moveChild("update"), sequencea(actions29), up)), (
        (__args30 = ["body", checkTop]), (actions30 = [].slice.call(__args30, 1)), seq(moveChild("body"),
            sequencea(actions30), up)), modify(translate.forStatement)));
    addTransform("AssignmentExpression", seq(((__args31 = ["left", checkTop]), (actions31 = [].slice.call(
            __args31, 1)), seq(moveChild("left"), sequencea(actions31), up)), ((__args32 = ["right",
            checkTop
        ]), (actions32 = [].slice.call(__args32, 1)), seq(moveChild("right"), sequencea(actions32), up)),
        modify(translate.assignmentExpression)));
    addTransform("UnaryExpression", seq(((__args33 = ["argument", checkTop]), (actions33 = [].slice.call(
        __args33, 1)), seq(moveChild("argument"), sequencea(actions33), up)), modify(translate.unaryExpression)));
    addTransform("BinaryExpression", seq(((__args34 = ["operator", checkTop]), (actions34 = [].slice.call(
        __args34, 1)), seq(moveChild("operator"), sequencea(actions34), up)), ((__args35 = ["left",
        checkTop
    ]), (actions35 = [].slice.call(__args35, 1)), seq(moveChild("left"), sequencea(actions35), up)), ((
        __args36 = ["right", checkTop]), (actions36 = [].slice.call(__args36, 1)), seq(moveChild(
        "right"), sequencea(actions36), up)), modify(translate.binaryExpression)));
    addTransform("ConditionalExpression", seq(((__args37 = ["test", checkTop]), (actions37 = [].slice.call(
        __args37, 1)), seq(moveChild("test"), sequencea(actions37), up)), ((__args38 = ["consequent",
        checkTop
    ]), (actions38 = [].slice.call(__args38, 1)), seq(moveChild("consequent"), sequencea(actions38),
        up)), ((__args39 = ["alternate", checkTop]), (actions39 = [].slice.call(__args39, 1)), seq(
        moveChild("alternate"), sequencea(actions39), up)), modify(translate.conditionalExpression)));
    addTransform("NewExpression", seq(((__args40 = ["callee", checkTop]), (actions40 = [].slice.call(__args40,
            1)), seq(moveChild("callee"), sequencea(actions40), up)), ((__args41 = ["args", checkTop]), (
            actions41 = [].slice.call(__args41, 1)), seq(moveChild("args"), sequencea(actions41), up)),
        modify(translate.newExpression)));
    addTransform("CallExpression", seq(((__args42 = ["callee", checkTop]), (actions42 = [].slice.call(__args42,
            1)), seq(moveChild("callee"), sequencea(actions42), up)), ((__args43 = ["args", checkTop]), (
            actions43 = [].slice.call(__args43, 1)), seq(moveChild("args"), sequencea(actions43), up)),
        modify(translate.callExpression)));
    addTransform("MemberExpression", seq(((__args44 = ["object", checkTop]), (actions44 = [].slice.call(
        __args44, 1)), seq(moveChild("object"), sequencea(actions44), up)), ((__args45 = ["property",
        checkTop
    ]), (actions45 = [].slice.call(__args45, 1)), seq(moveChild("property"), sequencea(actions45),
        up)), modify(translate.memberExpression)));
    addTransform("LetExpression", seq(((__args46 = ["bindings", checkTop]), (actions46 = [].slice.call(__args46,
        1)), seq(moveChild("bindings"), sequencea(actions46), up)), withNode((function(z) {
        return addBindingsForBindingsList(z.bindings);
    })), ((__args47 = ["body", checkTop]), (actions47 = [].slice.call(__args47, 1)), seq(moveChild(
        "body"), sequencea(actions47), up)), modify(translate.letExpression)));
    addTransform("CurryExpression", seq(((__args48 = ["base", checkTop]), (actions48 = [].slice.call(__args48,
            1)), seq(moveChild("base"), sequencea(actions48), up)), ((__args49 = ["args", checkTop]), (
            actions49 = [].slice.call(__args49, 1)), seq(moveChild("args"), sequencea(actions49), up)),
        modify(translate.curryExpression)));
    addTransform("FunctionExpression", ((actions50 = [((__args50 = ["id", checkTop]), (actions51 = [].slice.call(
        __args50, 1)), seq(moveChild("id"), sequencea(actions51), up)), modify((function(node0) {
        return translate.functionExpression(node0.loc, node0.id, node0.params, node0.body,
            getUd("prefix", node0));
    })), ((__args51 = ["params", checkTop]), (actions52 = [].slice.call(__args51, 1)), seq(
        moveChild("params"), sequencea(actions52), up)), ((__args52 = ["body", checkTop]), (
        actions53 = [].slice.call(__args52, 1)), seq(moveChild("body"), sequencea(actions53),
        up)), modify((function(node0) {
        return ecma_expression.FunctionExpression.create(null, node0.id, node0.params,
            node0.body);
    }))]), seq(enterBlock, sequencea(actions50), exitBlock)));
    addTransform("ArrayExpression", seq(((__args53 = ["elements", checkTop]), (actions54 = [].slice.call(
        __args53, 1)), seq(moveChild("elements"), sequencea(actions54), up)), modify(translate.arrayExpression)));
    addTransform("ObjectExpression", seq(((__args54 = ["properties", checkTop]), (actions55 = [].slice.call(
        __args54, 1)), seq(moveChild("properties"), sequencea(actions55), up)), modify(translate.objectExpression)));
    addTransform("ObjectValue", seq(((__args55 = ["key", checkTop]), (actions56 = [].slice.call(__args55, 1)),
        seq(moveChild("key"), sequencea(actions56), up)), ((__args56 = ["value", checkTop]), (actions57 = []
        .slice.call(__args56, 1)), seq(moveChild("value"), sequencea(actions57), up)), modify(translate
        .objectValue)));
    addTransform("IdentifierPattern", seq(((__args57 = ["id", checkTop]), (actions58 = [].slice.call(__args57,
        1)), seq(moveChild("id"), sequencea(actions58), up)), modify((function(x2) {
        return x2.id;
    }))));
    addTransform(["RelativeUnpack", "SliceUnpack"], ((__args58 = ["target", checkTop]), (actions59 = [].slice.call(
        __args58, 1)), seq(moveChild("target"), sequencea(actions59), up)));
    addTransform("ArgumentsPattern", seq(((__args59 = ["id", checkTop]), (actions60 = [].slice.call(__args59, 1)),
        seq(moveChild("id"), sequencea(actions60), up)), ((__args60 = ["elements", checkTop]), (
        actions61 = [].slice.call(__args60, 1)), seq(moveChild("elements"), sequencea(actions61),
        up)), ((__args61 = ["self", checkTop]), (actions62 = [].slice.call(__args61, 1)), seq(moveChild(
        "self"), sequencea(actions62), up))));
    addTransform("Program", seq(pushBindings, modify((function(node0) {
        return ((type(node0.body) === "Package") ? node0 : setUd("prefix", translate.useStrict,
            node0));
    })), ((__args62 = ["body", checkTop]), (actions63 = [].slice.call(__args62, 1)), seq(moveChild(
        "body"), sequencea(actions63), up)), getBindings((function(bindings) {
        return modify(translate.program.bind(null, bindings));
    }))));
    addTransform("Package", seq(packageManager.chain((function(packageManager0) {
        return modify(translate.packageBlock.bind(null, packageManager0));
    })), checkTop));
    addTransform("Import", packageManager.chain((function(packageManager0) {
        var y3;
        return modify(((y3 = packageManager0.importPackage), (function(z) {
            return y3(z.from);
        })));
    })));
    addTransform("Identifier", withNode((function(node0) {
        var id, uid, uid0;
        return (getUid(node0) ? seq(((id = node0.name), (uid = getUid(node0)), modifyScope(scope.addVar
                .bind(null, id, uid))), ((uid0 = getUid(node0)), inspectScope(scope.getMapping.bind(
                null, uid0)))
            .chain((function(name) {
                return set(translate.identifier(node0.loc, name, getUid(node0)));
            }))) : set(translate.identifier(node0.loc, node0.name)));
    })));
    var visitArray = ((move = (function(x2, i, a) {
        return ((i === (a.length - 1)) ? checkTop : seq(checkTop, right));
    })), (function(node0) {
        return (node0.length ? seq(down, sequencea(map(move, node0)), up) : pass);
    }));
    (_trans = (function(node0) {
        return (Array.isArray(node0) ? visitArray(node0) : (transformers[type(node0)] || pass));
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
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/transform/transform.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/trans/state", "akh/unique", "akh/base", "zipper-m/trans/tree", "ecma-ast-zipper",
    "../ast", "../lexical/scope", "../fun", "../builtin", "./unpack", "./state", "./translation",
    "./package_manager/amd", "./package_manager/node"
], (function(require, exports, StateT, Unique, __o, TreeZipperT, __o0, __o1, scope, __o2, __o3, __o4, state,
    translate, _, _0) {
    "use strict";
    var transform, liftM2 = __o["liftM2"],
        seq = __o["sequence"],
        sequencea = __o["sequencea"],
        ecmaZipper = __o0["ecmaZipper"],
        type = __o1["type"],
        getUd = __o1["getUd"],
        setUd = __o1["setUd"],
        getUid = __o1["getUid"],
        getClosure = __o1["getClosure"],
        concat = __o2["concat"],
        flatten = __o2["flatten"],
        flip = __o2["flip"],
        foldr = __o2["foldr"],
        map = __o2["map"],
        builtins = __o3["builtins"],
        expandBindings = __o4["expandBindings"],
        State = state["State"],
        x, y, f, f0, newCtx, newCtx0, y0, y1, y2, x0, x1, __args, actions, __args1, actions0, __args0, actions1,
            __args2, actions2, __args3, actions3, __args4, actions4, __args5, actions5, __args6, actions6,
            __args7, actions7, __args8, actions8, __args9, actions9, __args10, actions10, __args11, actions11,
            __args12, actions12, __args13, actions13, __args14, actions14, __args15, actions15, __args16,
            actions16, __args17, actions17, __args18, actions18, __args19, actions19, __args20, actions20,
            __args21, actions21, __args22, actions22, __args23, actions23, __args24, actions24, __args25,
            actions25, __args26, actions26, __args27, actions27, __args28, actions28, __args29, actions29,
            __args30, actions30, __args31, actions31, __args32, actions32, __args33, actions33, __args34,
            actions34, __args35, actions35, __args36, actions36, __args37, actions37, __args38, actions38,
            __args39, actions39, __args40, actions40, __args41, actions41, __args42, actions42, __args43,
            actions43, __args44, actions44, __args45, actions45, __args46, actions46, __args47, actions47,
            __args48, actions48, __args49, actions49, __args50, actions50, __args51, actions51, __args52,
            actions52, __args53, actions53, __args54, actions55, __args55, actions56, __args56, actions57,
            __args57, actions58, __args58, actions59, __args59, actions60, __args60, actions61, __args61,
            actions62, __args63, actions64, __args64, actions65, __args65, actions66, __args66, actions67, move,
            uid, f1, uid0, f2, _trans, M = TreeZipperT(StateT(Unique)),
        run = (function(m, s, ctx) {
            return Unique.runUnique(StateT.evalStateT(TreeZipperT.runTreeZipperT(m, ctx), s));
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
        getContext = extract.map((function(x0) {
            return x0.ctx;
        })),
        setContext = (function(ctx) {
            return modifyState((function(s) {
                return s.setCtx(ctx);
            }));
        }),
        loopBlock = ((newCtx = state.LOOP_CTX), (function() {
            var actions = arguments;
            return getContext.chain((function(ctx) {
                return seq(setContext(newCtx), sequencea(actions), setContext(ctx));
            }));
        })),
        funcBlock = ((newCtx0 = state.NORMAL_CTX), (function() {
            var actions = arguments;
            return getContext.chain((function(ctx) {
                return seq(setContext(newCtx0), sequencea(actions), setContext(ctx));
            }));
        })),
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
            return getUid(z.pattern.id);
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
        }),
        x2 = addTransform.bind(null, "VariableDeclaration"),
        y3 = seq(((__args = ["declarations", checkTop]), (actions = [__args[1]]), seq(moveChild("declarations"),
            sequencea(actions), up)), modify(translate.variableDeclaration));
    x2(y3);
    var x3 = addTransform.bind(null, "Binding"),
        y4 = seq(((__args0 = ["pattern", ((__args1 = ["id", checkTop]), (actions0 = [__args1[1]]), seq(
            moveChild("id"), sequencea(actions0), up))]), (actions1 = [__args0[1]]), seq(moveChild(
            "pattern"), sequencea(actions1), up)), ((__args2 = ["value", checkTop]), (actions2 = [__args2[1]]),
            seq(moveChild("value"), sequencea(actions2), up)));
    x3(y4);
    var x4 = addTransform.bind(null, "VariableDeclarator"),
        y5 = seq(((__args3 = ["id", checkTop]), (actions3 = [__args3[1]]), seq(moveChild("id"), sequencea(
            actions3), up)), ((__args4 = ["init", checkTop]), (actions4 = [__args4[1]]), seq(moveChild(
            "init"), sequencea(actions4), up)), modify(translate.variableDeclarator));
    x4(y5);
    var x5 = addTransform.bind(null, "StaticDeclaration"),
        y6 = modify(translate.emptyStatement);
    x5(y6);
    var x6 = addTransform.bind(null, "CatchClause"),
        y7 = seq(((__args5 = ["param", checkTop]), (actions5 = [__args5[1]]), seq(moveChild("param"), sequencea(
            actions5), up)), ((__args6 = ["body", checkTop]), (actions6 = [__args6[1]]), seq(moveChild(
            "body"), sequencea(actions6), up)), modify(translate.catchClause));
    x6(y7);
    var x7 = addTransform.bind(null, "SwitchCase"),
        y8 = seq(((__args7 = ["test", checkTop]), (actions7 = [__args7[1]]), seq(moveChild("test"), sequencea(
            actions7), up)), ((__args8 = ["consequent", checkTop]), (actions8 = [__args8[1]]), seq(
            moveChild("consequent"), sequencea(actions8), up)), modify(translate.switchCase));
    x7(y8);
    var x8 = addTransform.bind(null, "BlockStatement"),
        y9 = seq(pushBindings, ((__args9 = ["body", checkTop]), (actions9 = [__args9[1]]), seq(moveChild("body"),
            sequencea(actions9), up)), getBindings((function(bindings) {
            return modify(translate.blockStatement.bind(null, bindings));
        })), popBindings);
    x8(y9);
    var x9 = addTransform.bind(null, "ExpressionStatement"),
        y10 = seq(((__args10 = ["expression", checkTop]), (actions10 = [__args10[1]]), seq(moveChild(
            "expression"), sequencea(actions10), up)), modify(translate.expressionStatement));
    x9(y10);
    var x10 = addTransform.bind(null, "IfStatement"),
        y11 = seq(((__args11 = ["test", checkTop]), (actions11 = [__args11[1]]), seq(moveChild("test"),
            sequencea(actions11), up)), ((__args12 = ["consequent", checkTop]), (actions12 = [__args12[1]]),
            seq(moveChild("consequent"), sequencea(actions12), up)), ((__args13 = ["alternate", checkTop]), (
            actions13 = [__args13[1]]), seq(moveChild("alternate"), sequencea(actions13), up)), modify(
            translate.ifStatement));
    x10(y11);
    var x11 = addTransform.bind(null, "WithStatement"),
        y12 = seq(((__args14 = ["bindings", checkTop]), (actions14 = [__args14[1]]), seq(moveChild("bindings"),
            sequencea(actions14), up)), ((__args15 = ["body", checkTop]), (actions15 = [__args15[1]]), seq(
            moveChild("body"), sequencea(actions15), up)), modify(translate.withStatement));
    x11(y12);
    var x12 = addTransform.bind(null, "SwitchStatement"),
        y13 = seq(((__args16 = ["discriminant", checkTop]), (actions16 = [__args16[1]]), seq(moveChild(
            "discriminant"), sequencea(actions16), up)), ((__args17 = ["cases", checkTop]), (actions17 = [
            __args17[1]
        ]), seq(moveChild("cases"), sequencea(actions17), up)), modify(translate.switchStatement));
    x12(y13);
    var x13 = addTransform.bind(null, "ReturnStatement"),
        y14 = seq(((__args18 = ["argument", checkTop]), (actions18 = [__args18[1]]), seq(moveChild("argument"),
            sequencea(actions18), up)), modify(translate.returnStatement));
    x13(y14);
    var x14 = addTransform.bind(null, "ThrowStatement"),
        y15 = seq(((__args19 = ["argument", checkTop]), (actions19 = [__args19[1]]), seq(moveChild("argument"),
            sequencea(actions19), up)), modify(translate.throwStatement));
    x14(y15);
    var x15 = addTransform.bind(null, "BreakStatement"),
        y16 = modify(translate.breakStatement);
    x15(y16);
    var x16 = addTransform.bind(null, "ContinueStatement"),
        y17 = modify(translate.continueStatement);
    x16(y17);
    var x17 = addTransform.bind(null, "TryStatement"),
        y18 = seq(((__args20 = ["block", checkTop]), (actions20 = [__args20[1]]), seq(moveChild("block"),
            sequencea(actions20), up)), ((__args21 = ["handler", checkTop]), (actions21 = [__args21[1]]),
            seq(moveChild("handler"), sequencea(actions21), up)), ((__args22 = ["finalizer", checkTop]), (
            actions22 = [__args22[1]]), seq(moveChild("finalizer"), sequencea(actions22), up)), modify(
            translate.tryStatement));
    x17(y18);
    var x18 = addTransform.bind(null, "WhileStatement"),
        y19 = seq(((__args23 = ["test", checkTop]), (actions23 = [__args23[1]]), seq(moveChild("test"),
            sequencea(actions23), up)), loopBlock(((__args24 = ["body", checkTop]), (actions24 = [__args24[
            1]]), seq(moveChild("body"), sequencea(actions24), up))), modify(translate.whileStatement));
    x18(y19);
    var x19 = addTransform.bind(null, "DoWhileStatement"),
        y20 = seq(loopBlock(((__args25 = ["body", checkTop]), (actions25 = [__args25[1]]), seq(moveChild("body"),
            sequencea(actions25), up))), ((__args26 = ["test", checkTop]), (actions26 = [__args26[1]]), seq(
            moveChild("test"), sequencea(actions26), up)), modify(translate.doWhileStatement));
    x19(y20);
    var x20 = addTransform.bind(null, "ForStatement"),
        y21 = seq(((__args27 = ["init", checkTop]), (actions27 = [__args27[1]]), seq(moveChild("init"),
            sequencea(actions27), up)), ((__args28 = ["test", checkTop]), (actions28 = [__args28[1]]), seq(
            moveChild("test"), sequencea(actions28), up)), ((__args29 = ["update", checkTop]), (actions29 = [
            __args29[1]
        ]), seq(moveChild("update"), sequencea(actions29), up)), loopBlock(((__args30 = ["body", checkTop]), (
            actions30 = [__args30[1]]), seq(moveChild("body"), sequencea(actions30), up))), modify(
            translate.forStatement));
    x20(y21);
    var x21 = addTransform.bind(null, "AssignmentExpression"),
        y22 = seq(((__args31 = ["left", checkTop]), (actions31 = [__args31[1]]), seq(moveChild("left"),
            sequencea(actions31), up)), ((__args32 = ["right", checkTop]), (actions32 = [__args32[1]]), seq(
            moveChild("right"), sequencea(actions32), up)), modify(translate.assignmentExpression));
    x21(y22);
    var x22 = addTransform.bind(null, "UnaryExpression"),
        y23 = seq(((__args33 = ["argument", checkTop]), (actions33 = [__args33[1]]), seq(moveChild("argument"),
            sequencea(actions33), up)), modify(translate.unaryExpression));
    x22(y23);
    var x23 = addTransform.bind(null, "BinaryExpression"),
        y24 = seq(((__args34 = ["operator", checkTop]), (actions34 = [__args34[1]]), seq(moveChild("operator"),
            sequencea(actions34), up)), ((__args35 = ["left", checkTop]), (actions35 = [__args35[1]]), seq(
            moveChild("left"), sequencea(actions35), up)), ((__args36 = ["right", checkTop]), (actions36 = [
            __args36[1]
        ]), seq(moveChild("right"), sequencea(actions36), up)), modify(translate.binaryExpression));
    x23(y24);
    var x24 = addTransform.bind(null, "ConditionalExpression"),
        y25 = seq(((__args37 = ["test", checkTop]), (actions37 = [__args37[1]]), seq(moveChild("test"),
            sequencea(actions37), up)), ((__args38 = ["consequent", checkTop]), (actions38 = [__args38[1]]),
            seq(moveChild("consequent"), sequencea(actions38), up)), ((__args39 = ["alternate", checkTop]), (
            actions39 = [__args39[1]]), seq(moveChild("alternate"), sequencea(actions39), up)), modify(
            translate.conditionalExpression));
    x24(y25);
    var x25 = addTransform.bind(null, "NewExpression"),
        y26 = seq(((__args40 = ["callee", checkTop]), (actions40 = [__args40[1]]), seq(moveChild("callee"),
            sequencea(actions40), up)), ((__args41 = ["args", checkTop]), (actions41 = [__args41[1]]), seq(
            moveChild("args"), sequencea(actions41), up)), modify(translate.newExpression));
    x25(y26);
    var x26 = addTransform.bind(null, "CallExpression"),
        y27 = seq(((__args42 = ["callee", checkTop]), (actions42 = [__args42[1]]), seq(moveChild("callee"),
            sequencea(actions42), up)), ((__args43 = ["args", checkTop]), (actions43 = [__args43[1]]), seq(
            moveChild("args"), sequencea(actions43), up)), modify(translate.callExpression));
    x26(y27);
    var x27 = addTransform.bind(null, "ApplyExpression"),
        y28 = seq(((__args44 = ["callee", checkTop]), (actions44 = [__args44[1]]), seq(moveChild("callee"),
            sequencea(actions44), up)), ((__args45 = ["args", checkTop]), (actions45 = [__args45[1]]), seq(
            moveChild("args"), sequencea(actions45), up)), modify(translate.applyExpression));
    x27(y28);
    var x28 = addTransform.bind(null, "MemberExpression"),
        y29 = seq(((__args46 = ["object", checkTop]), (actions46 = [__args46[1]]), seq(moveChild("object"),
            sequencea(actions46), up)), ((__args47 = ["property", checkTop]), (actions47 = [__args47[1]]),
            seq(moveChild("property"), sequencea(actions47), up)), modify(translate.memberExpression));
    x28(y29);
    var x29 = addTransform.bind(null, "CheckedMemberExpression"),
        y30 = seq(((__args48 = ["object", checkTop]), (actions48 = [__args48[1]]), seq(moveChild("object"),
                sequencea(actions48), up)), ((__args49 = ["property", checkTop]), (actions49 = [__args49[1]]),
                seq(moveChild("property"), sequencea(actions49), up)), modify(translate.checkedMemberExpression),
            checkTop);
    x29(y30);
    var x30 = addTransform.bind(null, "LetExpression"),
        y31 = seq(((__args50 = ["bindings", checkTop]), (actions50 = [__args50[1]]), seq(moveChild("bindings"),
            sequencea(actions50), up)), withNode((function(z) {
            return addBindingsForBindingsList(z.bindings);
        })), ((__args51 = ["body", checkTop]), (actions51 = [__args51[1]]), seq(moveChild("body"),
            sequencea(actions51), up)), modify(translate.letExpression));
    x30(y31);
    var x31 = addTransform.bind(null, "CurryExpression"),
        y32 = seq(((__args52 = ["base", checkTop]), (actions52 = [__args52[1]]), seq(moveChild("base"),
            sequencea(actions52), up)), ((__args53 = ["args", checkTop]), (actions53 = [__args53[1]]), seq(
            moveChild("args"), sequencea(actions53), up)), modify(translate.curryExpression));
    x31(y32);
    var createExplicitClosure = (function(locals) {
        return enumeration(map((function(uid) {
            return inspectScope(scope.getMapping.bind(null, uid))
                .map((function(name) {
                    return translate.identifier(node.loc, name, uid);
                }));
        }), locals))
            .chain((function(locals0) {
                return modify((function(node0) {
                    return translate.explicitClosure(locals0, node0);
                }));
            }));
    }),
        x32 = addTransform.bind(null, "FunctionExpression"),
        actions54 = [((__args54 = ["id", checkTop]), (actions55 = [__args54[1]]), seq(moveChild("id"),
            sequencea(actions55), up)), modify((function(node0) {
            return translate.functionExpression(node0.loc, node0.id, node0.params, node0.body,
                getUd("prefix", node0));
        })), ((__args55 = ["params", checkTop]), (actions56 = [__args55[1]]), seq(moveChild("params"),
            sequencea(actions56), up)), ((__args56 = ["body", checkTop]), (actions57 = [__args56[1]]), seq(
            moveChild("body"), sequencea(actions57), up)), modify(translate.functionExpressionPost)],
        y33 = seq(enterBlock, sequencea(actions54), exitBlock),
        evaluate = funcBlock(y33),
        y34 = getContext.chain((function(ctx) {
            return ((ctx === state.LOOP_CTX) ? withNode((function(node0) {
                return seq(evaluate, createExplicitClosure(getClosure(node0)));
            })) : evaluate);
        }));
    x32(y34);
    var x33 = addTransform.bind(null, "ArrayExpression"),
        y35 = seq(((__args57 = ["elements", checkTop]), (actions58 = [__args57[1]]), seq(moveChild("elements"),
            sequencea(actions58), up)), modify(translate.arrayExpression));
    x33(y35);
    var x34 = addTransform.bind(null, "ObjectExpression"),
        y36 = seq(((__args58 = ["properties", checkTop]), (actions59 = [__args58[1]]), seq(moveChild(
            "properties"), sequencea(actions59), up)), modify(translate.objectExpression));
    x34(y36);
    var x35 = addTransform.bind(null, "ObjectValue"),
        y37 = seq(((__args59 = ["key", checkTop]), (actions60 = [__args59[1]]), seq(moveChild("key"), sequencea(
            actions60), up)), ((__args60 = ["value", checkTop]), (actions61 = [__args60[1]]), seq(moveChild(
            "value"), sequencea(actions61), up)), modify(translate.objectValue));
    x35(y37);
    var x36 = addTransform.bind(null, "IdentifierPattern"),
        y38 = seq(((__args61 = ["id", checkTop]), (actions62 = [__args61[1]]), seq(moveChild("id"), sequencea(
            actions62), up)), modify((function(x37) {
            return x37.id;
        })));
    x36(y38);
    var x37 = addTransform.bind(null, ["RelativeUnpack", "SliceUnpack"]),
        __args62 = ["target", checkTop],
        actions63 = [__args62[1]],
        y39 = seq(moveChild("target"), sequencea(actions63), up);
    x37(y39);
    var x38 = addTransform.bind(null, "ArgumentsPattern"),
        y40 = seq(((__args63 = ["id", checkTop]), (actions64 = [__args63[1]]), seq(moveChild("id"), sequencea(
            actions64), up)), ((__args64 = ["elements", checkTop]), (actions65 = [__args64[1]]), seq(
            moveChild("elements"), sequencea(actions65), up)), ((__args65 = ["self", checkTop]), (actions66 = [
            __args65[1]
        ]), seq(moveChild("self"), sequencea(actions66), up)));
    x38(y40);
    var x39 = addTransform.bind(null, "Program"),
        y41 = seq(pushBindings, modify((function(node0) {
            return ((type(node0.body) === "Package") ? node0 : setUd("prefix", translate.useStrict,
                node0));
        })), ((__args66 = ["body", checkTop]), (actions67 = [__args66[1]]), seq(moveChild("body"),
            sequencea(actions67), up)), getBindings((function(bindings) {
            return modify(translate.program.bind(null, bindings));
        })));
    x39(y41);
    var x40 = addTransform.bind(null, "Package"),
        y42 = seq(packageManager.chain((function(packageManager0) {
            return modify(translate.packageBlock.bind(null, packageManager0));
        })), checkTop);
    x40(y42);
    var x41 = addTransform.bind(null, "Import"),
        y43 = packageManager.chain((function(packageManager0) {
            var y44;
            return modify(((y44 = packageManager0.importPackage), (function(z) {
                return y44(z.from);
            })));
        }));
    x41(y43);
    var x42 = addTransform.bind(null, "Identifier"),
        y44 = withNode((function(node0) {
            var id, uid, uid0, x43, y45;
            return (getUid(node0) ? seq(((id = node0.name), (uid = getUid(node0)), modifyScope(scope.addVar
                    .bind(null, id, uid))), ((uid0 = getUid(node0)), inspectScope(scope.getMapping.bind(
                    null, uid0)))
                .chain((function(name) {
                    var x43 = set,
                        y45 = translate.identifier(node0.loc, name, getUid(node0));
                    return x43(y45);
                }))) : ((x43 = set), (y45 = translate.identifier(node0.loc, node0.name)), x43(y45)));
        }));
    x42(y44);
    var visitArray = ((move = (function(x43, i, a) {
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
/*
 * THIS FILE IS AUTO GENERATED from 'lib/reachable.kep'
 * DO NOT EDIT
*/define(["require", "exports", "hamt", "khepri-ast/node", "akh/base", "akh/state", "zipper-m/trans/tree", "./fun",
    "./ast"
], (function(require, exports, hamt, __o, __o0, StateM, TreeZipperT, __o1, __o2) {
    "use strict";
    var modify = __o["modify"],
        next = __o0["next"],
        seq = __o0["sequence"],
        seqa = __o0["sequencea"],
        map = __o1["map"],
        type = __o2["type"],
        getUid = __o2["getUid"],
        optimize, inc, x, y, move, __args, actions, __args0, actions0, __args1, actions1, __args2, actions2,
            __args3, actions3, __args4, actions4, __args5, actions5, __args6, actions6, __args7, actions7,
            __args8, actions8, __args9, actions9, __args10, actions10, __args11, actions11, __args12, actions12,
            __args13, actions13, __args14, actions14, __args15, actions15, __args16, actions16, __args17,
            actions17, __args18, actions18, __args19, actions19, __args20, actions20, __args21, actions21,
            __args22, actions22, __args23, actions23, __args24, actions24, __args25, actions25, __args26,
            actions26, __args27, actions27, __args28, actions28, __args29, actions29, __args30, actions30,
            __args31, actions31, __args32, actions32, __args33, actions33, __args34, actions34, __args35,
            actions35, __args36, actions36, __args37, actions37, consequent, __args38, actions38, __args39,
            actions39, __args40, actions40, __args41, actions41, __args42, actions42, __args43, actions43,
            __args44, actions44, __args45, actions45, __args46, actions46, consequent0, __args47, actions47,
            __args48, actions48, __args49, actions49, x0, _check, stateEmpty = hamt.empty,
        stateAddReference = ((inc = (function(x) {
            return ((x + 1) || 1);
        })), (function(uid, bindings) {
            return hamt.modify(uid, inc, bindings);
        })),
        stateIsReachable = (function(uid, bindings) {
            return hamt.get(uid, bindings);
        }),
        M = TreeZipperT(StateM),
        run = (function(c, ctx) {
            return StateM.evalState(TreeZipperT.runTreeZipperT(c, ctx), stateEmpty);
        }),
        pass = M.of(null),
        extractCtx = M.get,
        extract = M.chain.bind(null, M.node),
        set = M.setNode,
        up = M.up,
        down = M.down,
        left = M.left,
        rightmost = M.rightmost,
        moveChild = M.child,
        child = (function(edge) {
            var __args = arguments,
                actions = [].slice.call(__args, 1);
            return seq(moveChild(edge), seqa(actions), up);
        }),
        getState = M.lift(M.inner.get),
        modifyState = ((x = M.lift), (y = M.inner.modify), (function(z) {
            return x(y(z));
        })),
        isReachable = (function(uid, yes, no) {
            return (uid ? getState.chain((function(s) {
                return (stateIsReachable(uid, s) ? yes : no);
            })) : yes);
        }),
        removeBinding = set([]),
        checkTop = extract((function(x0) {
            return _check(x0);
        })),
        visitArray = ((move = (function(x0, i) {
            return (i ? next(checkTop, left) : checkTop);
        })), (function(node) {
            return (node.length ? seq(down, rightmost, seqa(map(move, node)
                .reverse()), up) : pass);
        })),
        peepholes = ({}),
        addRewrite = (function(type0, f) {
            if (Array.isArray(type0)) type0.forEach((function(type1) {
                return addRewrite(type1, f);
            }));
            else {
                (peepholes[type0] = f);
            }
        });
    addRewrite("Program", ((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
        "body"), seqa(actions), up)));
    addRewrite("Package", seq(((__args0 = ["exports", checkTop]), (actions0 = [].slice.call(__args0, 1)), seq(
        moveChild("exports"), seqa(actions0), up)), ((__args1 = ["body", checkTop]), (actions1 = [].slice
        .call(__args1, 1)), seq(moveChild("body"), seqa(actions1), up))));
    addRewrite("PackageExports", ((__args2 = ["exports", checkTop]), (actions2 = [].slice.call(__args2, 1)),
        seq(moveChild("exports"), seqa(actions2), up)));
    addRewrite("PackageExport", ((__args3 = ["id", checkTop]), (actions3 = [].slice.call(__args3, 1)), seq(
        moveChild("id"), seqa(actions3), up)));
    addRewrite("SwitchCase", seq(((__args4 = ["test", checkTop]), (actions4 = [].slice.call(__args4, 1)), seq(
        moveChild("test"), seqa(actions4), up)), ((__args5 = ["consequent", checkTop]), (actions5 = [].slice
        .call(__args5, 1)), seq(moveChild("consequent"), seqa(actions5), up))));
    addRewrite("CatchClause", seq(((__args6 = ["param", checkTop]), (actions6 = [].slice.call(__args6, 1)), seq(
        moveChild("param"), seqa(actions6), up)), ((__args7 = ["body", checkTop]), (actions7 = [].slice
        .call(__args7, 1)), seq(moveChild("body"), seqa(actions7), up))));
    addRewrite("VariableDeclaration", ((__args8 = ["declarations", checkTop]), (actions8 = [].slice.call(
        __args8, 1)), seq(moveChild("declarations"), seqa(actions8), up)));
    addRewrite("VariableDeclarator", extract((function(node) {
        return isReachable(getUid(node.id), child("init", checkTop), removeBinding);
    })));
    addRewrite("Binding", extract((function(node) {
        return isReachable(getUid(node.pattern.id), child("value", checkTop), removeBinding);
    })));
    addRewrite("BlockStatement", ((__args9 = ["body", checkTop]), (actions9 = [].slice.call(__args9, 1)), seq(
        moveChild("body"), seqa(actions9), up)));
    addRewrite("ExpressionStatement", ((__args10 = ["expression", checkTop]), (actions10 = [].slice.call(
        __args10, 1)), seq(moveChild("expression"), seqa(actions10), up)));
    addRewrite("WithStatement", seq(((__args11 = ["body", checkTop]), (actions11 = [].slice.call(__args11, 1)),
        seq(moveChild("body"), seqa(actions11), up)), ((__args12 = ["bindings", checkTop]), (actions12 = []
        .slice.call(__args12, 1)), seq(moveChild("bindings"), seqa(actions12), up))));
    addRewrite("SwitchStatement", seq(((__args13 = ["discriminant", checkTop]), (actions13 = [].slice.call(
        __args13, 1)), seq(moveChild("discriminant"), seqa(actions13), up)), ((__args14 = ["cases",
        checkTop
    ]), (actions14 = [].slice.call(__args14, 1)), seq(moveChild("cases"), seqa(actions14), up))));
    addRewrite(["ReturnStatement", "ThrowStatement"], ((__args15 = ["argument", checkTop]), (actions15 = [].slice
        .call(__args15, 1)), seq(moveChild("argument"), seqa(actions15), up)));
    addRewrite("TryStatement", seq(((__args16 = ["block", checkTop]), (actions16 = [].slice.call(__args16, 1)),
        seq(moveChild("block"), seqa(actions16), up)), ((__args17 = ["handler", checkTop]), (actions17 = []
        .slice.call(__args17, 1)), seq(moveChild("handler"), seqa(actions17), up)), ((__args18 = [
        "finalizer", checkTop
    ]), (actions18 = [].slice.call(__args18, 1)), seq(moveChild("finalizer"), seqa(actions18), up))));
    addRewrite(["WhileStatement", "DoWhileStatement"], seq(((__args19 = ["test", checkTop]), (actions19 = [].slice
        .call(__args19, 1)), seq(moveChild("test"), seqa(actions19), up)), ((__args20 = ["body",
        checkTop
    ]), (actions20 = [].slice.call(__args20, 1)), seq(moveChild("body"), seqa(actions20), up))));
    addRewrite("ForStatement", seq(((__args21 = ["body", checkTop]), (actions21 = [].slice.call(__args21, 1)),
        seq(moveChild("body"), seqa(actions21), up)), ((__args22 = ["update", checkTop]), (actions22 = []
        .slice.call(__args22, 1)), seq(moveChild("update"), seqa(actions22), up)), ((__args23 = ["test",
        checkTop
    ]), (actions23 = [].slice.call(__args23, 1)), seq(moveChild("test"), seqa(actions23), up)), ((
        __args24 = ["init", checkTop]), (actions24 = [].slice.call(__args24, 1)), seq(moveChild(
        "init"), seqa(actions24), up))));
    addRewrite(["ConditionalExpression", "IfStatement"], seq(((__args25 = ["test", checkTop]), (actions25 = [].slice
        .call(__args25, 1)), seq(moveChild("test"), seqa(actions25), up)), ((__args26 = ["consequent",
        checkTop
    ]), (actions26 = [].slice.call(__args26, 1)), seq(moveChild("consequent"), seqa(actions26), up)), (
        (__args27 = ["alternate", checkTop]), (actions27 = [].slice.call(__args27, 1)), seq(moveChild(
            "alternate"), seqa(actions27), up))));
    addRewrite("FunctionExpression", seq(((__args28 = ["body", checkTop]), (actions28 = [].slice.call(__args28,
        1)), seq(moveChild("body"), seqa(actions28), up)), ((__args29 = ["id", checkTop]), (actions29 = []
        .slice.call(__args29, 1)), seq(moveChild("id"), seqa(actions29), up)), ((__args30 = ["params",
        checkTop
    ]), (actions30 = [].slice.call(__args30, 1)), seq(moveChild("params"), seqa(actions30), up))));
    addRewrite("UnaryExpression", ((__args31 = ["argument", checkTop]), (actions31 = [].slice.call(__args31, 1)),
        seq(moveChild("argument"), seqa(actions31), up)));
    addRewrite(["LogicalExpression", "BinaryExpression"], seq(((__args32 = ["left", checkTop]), (actions32 = []
        .slice.call(__args32, 1)), seq(moveChild("left"), seqa(actions32), up)), ((__args33 = ["right",
        checkTop
    ]), (actions33 = [].slice.call(__args33, 1)), seq(moveChild("right"), seqa(actions33), up))));
    addRewrite("AssignmentExpression", seq(((__args34 = ["left", checkTop]), (actions34 = [].slice.call(
        __args34, 1)), seq(moveChild("left"), seqa(actions34), up)), ((__args35 = ["right", checkTop]), (
        actions35 = [].slice.call(__args35, 1)), seq(moveChild("right"), seqa(actions35), up))));
    addRewrite("MemberExpression", seq(((__args36 = ["object", checkTop]), (actions36 = [].slice.call(__args36,
        1)), seq(moveChild("object"), seqa(actions36), up)), ((__args37 = ["property", checkTop]), (
        actions37 = [].slice.call(__args37, 1)), (consequent = seq(moveChild("property"), seqa(
        actions37), up)), extract((function(node) {
        return (node.computed ? consequent : (undefined || pass));
    })))));
    addRewrite("NewExpression", seq(((__args38 = ["callee", checkTop]), (actions38 = [].slice.call(__args38, 1)),
        seq(moveChild("callee"), seqa(actions38), up)), ((__args39 = ["args", checkTop]), (actions39 = []
        .slice.call(__args39, 1)), seq(moveChild("args"), seqa(actions39), up))));
    addRewrite("CallExpression", seq(((__args40 = ["callee", checkTop]), (actions40 = [].slice.call(__args40, 1)),
        seq(moveChild("callee"), seqa(actions40), up)), ((__args41 = ["args", checkTop]), (actions41 = []
        .slice.call(__args41, 1)), seq(moveChild("args"), seqa(actions41), up))));
    addRewrite("CurryExpression", seq(((__args42 = ["base", checkTop]), (actions42 = [].slice.call(__args42, 1)),
        seq(moveChild("base"), seqa(actions42), up)), ((__args43 = ["args", checkTop]), (actions43 = []
        .slice.call(__args43, 1)), seq(moveChild("args"), seqa(actions43), up))));
    addRewrite("LetExpression", seq(((__args44 = ["body", checkTop]), (actions44 = [].slice.call(__args44, 1)),
        seq(moveChild("body"), seqa(actions44), up)), ((__args45 = ["bindings", checkTop]), (actions45 = []
        .slice.call(__args45, 1)), seq(moveChild("bindings"), seqa(actions45), up))));
    addRewrite(["SliceUnpack", "RelativeUnpack"], ((__args46 = ["target", checkTop]), (actions46 = [].slice.call(
        __args46, 1)), seq(moveChild("target"), seqa(actions46), up)));
    addRewrite("ArgumentsPattern", ((consequent0 = extract((function(node) {
        return seq(isReachable(getUid(node.id.id), pass, set(modify(node, ({
            id: null
        })))));
    }))), extract((function(node) {
        return (node.id ? consequent0 : (undefined || pass));
    }))));
    addRewrite("ArrayExpression", ((__args47 = ["elements", checkTop]), (actions47 = [].slice.call(__args47, 1)),
        seq(moveChild("elements"), seqa(actions47), up)));
    addRewrite("ObjectExpression", ((__args48 = ["properties", checkTop]), (actions48 = [].slice.call(__args48,
        1)), seq(moveChild("properties"), seqa(actions48), up)));
    addRewrite("ObjectValue", ((__args49 = ["value", checkTop]), (actions49 = [].slice.call(__args49, 1)), seq(
        moveChild("value"), seqa(actions49), up)));
    addRewrite("Identifier", extract(((x0 = getUid), (function(z) {
        var uid = x0(z);
        return (uid ? modifyState(stateAddReference.bind(null, uid)) : pass);
    }))));
    (_check = (function(node) {
        return (Array.isArray(node) ? visitArray(node) : (peepholes[type(node)] || pass));
    }));
    (optimize = (function(ast) {
        return run(next(checkTop, extractCtx.map((function(node) {
            return ({
                tree: node
            });
        }))), ast);
    }));
    (exports["optimize"] = optimize);
}));
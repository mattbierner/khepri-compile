/*
 * THIS FILE IS AUTO GENERATED from 'lib/reachable.kep'
 * DO NOT EDIT
*/"use strict";
var hamt = require("hamt"),
    __o = require("khepri-ast")["node"],
    modify = __o["modify"],
    __o0 = require("akh")["base"],
    next = __o0["next"],
    seq = __o0["sequence"],
    seqa = __o0["sequencea"],
    StateM = require("akh")["state"],
    TreeZipperT = require("zipper-m")["trans"]["tree"],
    __o1 = require("./fun"),
    flip = __o1["flip"],
    map = __o1["map"],
    __o2 = require("./ast"),
    type = __o2["type"],
    getUid = __o2["getUid"],
    optimize, inc, x, y, move, __args, actions, __args0, actions0, __args1, actions1, __args2, actions2, __args3,
        actions3, __args4, actions4, __args5, actions5, __args6, actions6, __args7, actions7, __args8, actions8, test,
        __args9, actions9, yes, no, y0, test0, __args10, actions10, yes0, no0, y1, __args11, actions11, __args12,
        actions12, __args13, actions13, __args14, actions14, __args15, actions15, __args16, actions16, __args17,
        actions17, __args18, actions18, __args19, actions19, __args20, actions20, __args21, actions21, __args22,
        actions22, __args23, actions23, __args24, actions24, __args25, actions25, __args26, actions26, __args27,
        actions27, __args28, actions28, __args29, actions29, __args30, actions30, __args31, actions31, __args32,
        actions32, __args33, actions33, __args34, actions34, __args35, actions35, __args36, actions36, __args37,
        actions37, __args38, actions38, __args39, actions39, consequent, __args40, actions40, __args41, actions41,
        __args42, actions42, __args43, actions43, __args44, actions44, __args45, actions45, __args46, actions46,
        __args47, actions47, __args48, actions48, test1, yes1, no1, consequent0, y2, __args49, actions49, __args50,
        actions50, __args51, actions51, x0, _check, stateEmpty = hamt.empty,
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
    inspect = flip(M.map)
        .bind(null, M.node),
    extract = M.chain.bind(null, M.node),
    set = M.setNode,
    up = M.up,
    down = M.down,
    left = M.left,
    rightmost = M.rightmost,
    moveChild = M.child,
    getState = M.lift(M.inner.get),
    modifyState = ((x = M.lift), (y = M.inner.modify), (function(z) {
        return x(y(z));
    })),
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
addRewrite("Program", ((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("body"), seqa(
    actions), up)));
addRewrite("Package", seq(((__args0 = ["exports", checkTop]), (actions0 = [].slice.call(__args0, 1)), seq(moveChild(
    "exports"), seqa(actions0), up)), ((__args1 = ["body", checkTop]), (actions1 = [].slice.call(__args1, 1)),
    seq(moveChild("body"), seqa(actions1), up))));
addRewrite("PackageExports", ((__args2 = ["exports", checkTop]), (actions2 = [].slice.call(__args2, 1)), seq(moveChild(
    "exports"), seqa(actions2), up)));
addRewrite("PackageExport", ((__args3 = ["id", checkTop]), (actions3 = [].slice.call(__args3, 1)), seq(moveChild("id"),
    seqa(actions3), up)));
addRewrite("SwitchCase", seq(((__args4 = ["test", checkTop]), (actions4 = [].slice.call(__args4, 1)), seq(moveChild(
    "test"), seqa(actions4), up)), ((__args5 = ["consequent", checkTop]), (actions5 = [].slice.call(__args5, 1)),
    seq(moveChild("consequent"), seqa(actions5), up))));
addRewrite("CatchClause", seq(((__args6 = ["param", checkTop]), (actions6 = [].slice.call(__args6, 1)), seq(moveChild(
    "param"), seqa(actions6), up)), ((__args7 = ["body", checkTop]), (actions7 = [].slice.call(__args7, 1)),
    seq(moveChild("body"), seqa(actions7), up))));
addRewrite("VariableDeclaration", ((__args8 = ["declarations", checkTop]), (actions8 = [].slice.call(__args8, 1)), seq(
    moveChild("declarations"), seqa(actions8), up)));
addRewrite("VariableDeclarator", ((test = inspect(((y0 = getUid), (function(z) {
    return y0(z.id);
})))), (__args9 = ["init", checkTop]), (actions9 = [].slice.call(__args9, 1)), (yes = seq(moveChild("init"),
    seqa(actions9), up)), (no = removeBinding), test.chain((function(uid) {
    return (uid ? getState.chain((function(s) {
        return (stateIsReachable(uid, s) ? yes : no);
    })) : yes);
}))));
addRewrite("Binding", ((test0 = inspect(((y1 = getUid), (function(z) {
    var z0 = z.pattern;
    return y1(z0.id);
})))), (__args10 = ["value", checkTop]), (actions10 = [].slice.call(__args10, 1)), (yes0 = seq(moveChild(
    "value"), seqa(actions10), up)), (no0 = removeBinding), test0.chain((function(uid) {
    return (uid ? getState.chain((function(s) {
        return (stateIsReachable(uid, s) ? yes0 : no0);
    })) : yes0);
}))));
addRewrite("BlockStatement", ((__args11 = ["body", checkTop]), (actions11 = [].slice.call(__args11, 1)), seq(moveChild(
    "body"), seqa(actions11), up)));
addRewrite("ExpressionStatement", ((__args12 = ["expression", checkTop]), (actions12 = [].slice.call(__args12, 1)), seq(
    moveChild("expression"), seqa(actions12), up)));
addRewrite("WithStatement", seq(((__args13 = ["body", checkTop]), (actions13 = [].slice.call(__args13, 1)), seq(
    moveChild("body"), seqa(actions13), up)), ((__args14 = ["bindings", checkTop]), (actions14 = [].slice.call(
    __args14, 1)), seq(moveChild("bindings"), seqa(actions14), up))));
addRewrite("SwitchStatement", seq(((__args15 = ["discriminant", checkTop]), (actions15 = [].slice.call(__args15, 1)),
    seq(moveChild("discriminant"), seqa(actions15), up)), ((__args16 = ["cases", checkTop]), (actions16 = [].slice
    .call(__args16, 1)), seq(moveChild("cases"), seqa(actions16), up))));
addRewrite(["ReturnStatement", "ThrowStatement"], ((__args17 = ["argument", checkTop]), (actions17 = [].slice.call(
    __args17, 1)), seq(moveChild("argument"), seqa(actions17), up)));
addRewrite("TryStatement", seq(((__args18 = ["block", checkTop]), (actions18 = [].slice.call(__args18, 1)), seq(
    moveChild("block"), seqa(actions18), up)), ((__args19 = ["handler", checkTop]), (actions19 = [].slice.call(
    __args19, 1)), seq(moveChild("handler"), seqa(actions19), up)), ((__args20 = ["finalizer", checkTop]), (
    actions20 = [].slice.call(__args20, 1)), seq(moveChild("finalizer"), seqa(actions20), up))));
addRewrite(["WhileStatement", "DoWhileStatement"], seq(((__args21 = ["test", checkTop]), (actions21 = [].slice.call(
    __args21, 1)), seq(moveChild("test"), seqa(actions21), up)), ((__args22 = ["body", checkTop]), (actions22 = []
    .slice.call(__args22, 1)), seq(moveChild("body"), seqa(actions22), up))));
addRewrite("ForStatement", seq(((__args23 = ["body", checkTop]), (actions23 = [].slice.call(__args23, 1)), seq(
    moveChild("body"), seqa(actions23), up)), ((__args24 = ["update", checkTop]), (actions24 = [].slice.call(
    __args24, 1)), seq(moveChild("update"), seqa(actions24), up)), ((__args25 = ["test", checkTop]), (actions25 = []
    .slice.call(__args25, 1)), seq(moveChild("test"), seqa(actions25), up)), ((__args26 = ["init", checkTop]), (
    actions26 = [].slice.call(__args26, 1)), seq(moveChild("init"), seqa(actions26), up))));
addRewrite(["ConditionalExpression", "IfStatement"], seq(((__args27 = ["test", checkTop]), (actions27 = [].slice.call(
    __args27, 1)), seq(moveChild("test"), seqa(actions27), up)), ((__args28 = ["consequent", checkTop]), (
    actions28 = [].slice.call(__args28, 1)), seq(moveChild("consequent"), seqa(actions28), up)), ((__args29 = [
    "alternate", checkTop
]), (actions29 = [].slice.call(__args29, 1)), seq(moveChild("alternate"), seqa(actions29), up))));
addRewrite("FunctionExpression", seq(((__args30 = ["body", checkTop]), (actions30 = [].slice.call(__args30, 1)), seq(
    moveChild("body"), seqa(actions30), up)), ((__args31 = ["id", checkTop]), (actions31 = [].slice.call(
    __args31, 1)), seq(moveChild("id"), seqa(actions31), up)), ((__args32 = ["params", checkTop]), (actions32 = []
    .slice.call(__args32, 1)), seq(moveChild("params"), seqa(actions32), up))));
addRewrite("UnaryExpression", ((__args33 = ["argument", checkTop]), (actions33 = [].slice.call(__args33, 1)), seq(
    moveChild("argument"), seqa(actions33), up)));
addRewrite(["LogicalExpression", "BinaryExpression"], seq(((__args34 = ["left", checkTop]), (actions34 = [].slice.call(
    __args34, 1)), seq(moveChild("left"), seqa(actions34), up)), ((__args35 = ["right", checkTop]), (actions35 = []
    .slice.call(__args35, 1)), seq(moveChild("right"), seqa(actions35), up))));
addRewrite("AssignmentExpression", seq(((__args36 = ["left", checkTop]), (actions36 = [].slice.call(__args36, 1)), seq(
    moveChild("left"), seqa(actions36), up)), ((__args37 = ["right", checkTop]), (actions37 = [].slice.call(
    __args37, 1)), seq(moveChild("right"), seqa(actions37), up))));
addRewrite("MemberExpression", seq(((__args38 = ["object", checkTop]), (actions38 = [].slice.call(__args38, 1)), seq(
    moveChild("object"), seqa(actions38), up)), ((__args39 = ["property", checkTop]), (actions39 = [].slice.call(
    __args39, 1)), (consequent = seq(moveChild("property"), seqa(actions39), up)), extract((function(node) {
    return (node.computed ? consequent : (undefined || pass));
})))));
addRewrite("NewExpression", seq(((__args40 = ["callee", checkTop]), (actions40 = [].slice.call(__args40, 1)), seq(
    moveChild("callee"), seqa(actions40), up)), ((__args41 = ["args", checkTop]), (actions41 = [].slice.call(
    __args41, 1)), seq(moveChild("args"), seqa(actions41), up))));
addRewrite("CallExpression", seq(((__args42 = ["callee", checkTop]), (actions42 = [].slice.call(__args42, 1)), seq(
    moveChild("callee"), seqa(actions42), up)), ((__args43 = ["args", checkTop]), (actions43 = [].slice.call(
    __args43, 1)), seq(moveChild("args"), seqa(actions43), up))));
addRewrite("CurryExpression", seq(((__args44 = ["base", checkTop]), (actions44 = [].slice.call(__args44, 1)), seq(
    moveChild("base"), seqa(actions44), up)), ((__args45 = ["args", checkTop]), (actions45 = [].slice.call(
    __args45, 1)), seq(moveChild("args"), seqa(actions45), up))));
addRewrite("LetExpression", seq(((__args46 = ["body", checkTop]), (actions46 = [].slice.call(__args46, 1)), seq(
    moveChild("body"), seqa(actions46), up)), ((__args47 = ["bindings", checkTop]), (actions47 = [].slice.call(
    __args47, 1)), seq(moveChild("bindings"), seqa(actions47), up))));
addRewrite(["SliceUnpack", "RelativeUnpack"], ((__args48 = ["target", checkTop]), (actions48 = [].slice.call(__args48,
    1)), seq(moveChild("target"), seqa(actions48), up)));
addRewrite("ArgumentsPattern", ((test1 = inspect(((y2 = getUid), (function(z) {
    var z0 = z.id;
    return y2(z0.id);
})))), (yes1 = pass), (no1 = extract((function(node) {
    return set(modify(node, ({
        id: null
    })));
}))), (consequent0 = test1.chain((function(uid) {
    return (uid ? getState.chain((function(s) {
        return (stateIsReachable(uid, s) ? yes1 : no1);
    })) : yes1);
}))), extract((function(node) {
    return (node.id ? consequent0 : (undefined || pass));
}))));
addRewrite("ArrayExpression", ((__args49 = ["elements", checkTop]), (actions49 = [].slice.call(__args49, 1)), seq(
    moveChild("elements"), seqa(actions49), up)));
addRewrite("ObjectExpression", ((__args50 = ["properties", checkTop]), (actions50 = [].slice.call(__args50, 1)), seq(
    moveChild("properties"), seqa(actions50), up)));
addRewrite("ObjectValue", ((__args51 = ["value", checkTop]), (actions51 = [].slice.call(__args51, 1)), seq(moveChild(
    "value"), seqa(actions51), up)));
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
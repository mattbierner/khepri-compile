/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/reachable/reachable.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "akh/base", "akh/state", "zipper-m/trans/tree", "../fun", "../ast",
    "./state", "./m"
], (function(require, exports, __o, __o0, StateM, TreeZipperT, __o1, __o2, __o3, Reachable) {
    "use strict";
    var removeUnreachable, modify = __o["modify"],
        seq = __o0["sequence"],
        sequencea = __o0["sequencea"],
        flip = __o1["flip"],
        map = __o1["map"],
        type = __o2["type"],
        getUd = __o2["getUd"],
        getUid = __o2["getUid"],
        empty = __o3["empty"],
        x, y, move, __args, actions, __args0, actions0, __args1, actions1, __args2, actions2, __args3, actions3,
            __args4, actions4, __args5, actions5, __args6, actions6, __args7, actions7, __args8, actions8, test,
            __args9, actions9, yes, __args10, actions10, consequent, test0, __args11, actions11, yes0,
            alternate, __args12, actions12, __args13, actions13, __args14, actions14, __args15, actions15,
            __args16, actions16, __args17, actions17, __args18, actions18, __args19, actions19, __args20,
            actions20, __args21, actions21, __args22, actions22, __args23, actions23, __args24, actions24,
            __args25, actions25, __args26, actions26, __args27, actions27, __args28, actions28, __args29,
            actions29, __args30, actions30, __args31, actions31, __args32, actions32, __args33, actions33,
            __args34, actions34, __args35, actions35, __args36, actions36, __args37, actions37, __args38,
            actions38, consequent0, __args39, actions39, __args40, actions40, __args41, actions41, __args42,
            actions42, __args43, actions43, __args44, actions44, __args45, actions45, __args46, actions46,
            test1, no, consequent1, __args47, actions47, __args48, actions48, __args49, actions49, _check,
            isReserved = getUd.bind(null, "reserved"),
        M = TreeZipperT(Reachable),
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
        addReference = ((x = M.lift), (y = M.inner.addReference), (function(z) {
            return x(y(z));
        })),
        removeBinding = set([]),
        checkTop = extract((function(x0) {
            return _check(x0);
        })),
        visitArray = ((move = (function(x0, i) {
            return (i ? seq(checkTop, left) : checkTop);
        })), (function(node) {
            return (node.length ? seq(down, rightmost, sequencea(map(move, node)
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
    addRewrite("Program", ((__args = ["body", checkTop]), (actions = [__args[1]]), seq(moveChild("body"),
        sequencea(actions), up)));
    addRewrite("Package", seq(((__args0 = ["exports", checkTop]), (actions0 = [__args0[1]]), seq(moveChild(
        "exports"), sequencea(actions0), up)), ((__args1 = ["body", checkTop]), (actions1 = [__args1[1]]),
        seq(moveChild("body"), sequencea(actions1), up))));
    addRewrite("PackageExports", ((__args2 = ["exports", checkTop]), (actions2 = [__args2[1]]), seq(moveChild(
        "exports"), sequencea(actions2), up)));
    addRewrite("PackageExport", ((__args3 = ["id", checkTop]), (actions3 = [__args3[1]]), seq(moveChild("id"),
        sequencea(actions3), up)));
    addRewrite("SwitchCase", seq(((__args4 = ["test", checkTop]), (actions4 = [__args4[1]]), seq(moveChild(
        "test"), sequencea(actions4), up)), ((__args5 = ["consequent", checkTop]), (actions5 = [__args5[
        1]]), seq(moveChild("consequent"), sequencea(actions5), up))));
    addRewrite("CatchClause", seq(((__args6 = ["param", checkTop]), (actions6 = [__args6[1]]), seq(moveChild(
        "param"), sequencea(actions6), up)), ((__args7 = ["body", checkTop]), (actions7 = [__args7[1]]),
        seq(moveChild("body"), sequencea(actions7), up))));
    addRewrite("VariableDeclaration", ((__args8 = ["declarations", checkTop]), (actions8 = [__args8[1]]), seq(
        moveChild("declarations"), sequencea(actions8), up)));
    addRewrite("VariableDeclarator", ((test = inspect((function(x0) {
        return x0.id;
    }))), (__args9 = ["init", checkTop]), (actions9 = [__args9[1]]), (yes = seq(moveChild("init"),
        sequencea(actions9), up)), test.chain((function(uid) {
        return M.lift(M.inner.isReachable(uid))
            .chain((function(reachable) {
                return (reachable ? yes : removeBinding);
            }));
    }))));
    addRewrite("Binding", ((__args10 = ["value", checkTop]), (actions10 = [__args10[1]]), (consequent = seq(
        moveChild("value"), sequencea(actions10), up)), (test0 = inspect((function(x0) {
        return x0.pattern.id;
    }))), (__args11 = ["value", checkTop]), (actions11 = [__args11[1]]), (yes0 = seq(moveChild("value"),
        sequencea(actions11), up)), (alternate = test0.chain((function(uid) {
        return M.lift(M.inner.isReachable(uid))
            .chain((function(reachable) {
                return (reachable ? yes0 : removeBinding);
            }));
    }))), extract((function(node) {
        return (isReserved(node) ? consequent : (alternate || pass));
    }))));
    addRewrite("BlockStatement", ((__args12 = ["body", checkTop]), (actions12 = [__args12[1]]), seq(moveChild(
        "body"), sequencea(actions12), up)));
    addRewrite("ExpressionStatement", ((__args13 = ["expression", checkTop]), (actions13 = [__args13[1]]), seq(
        moveChild("expression"), sequencea(actions13), up)));
    addRewrite("WithStatement", seq(((__args14 = ["body", checkTop]), (actions14 = [__args14[1]]), seq(
        moveChild("body"), sequencea(actions14), up)), ((__args15 = ["bindings", checkTop]), (actions15 = [
        __args15[1]
    ]), seq(moveChild("bindings"), sequencea(actions15), up))));
    addRewrite("SwitchStatement", seq(((__args16 = ["discriminant", checkTop]), (actions16 = [__args16[1]]),
        seq(moveChild("discriminant"), sequencea(actions16), up)), ((__args17 = ["cases", checkTop]), (
        actions17 = [__args17[1]]), seq(moveChild("cases"), sequencea(actions17), up))));
    addRewrite(["ReturnStatement", "ThrowStatement"], ((__args18 = ["argument", checkTop]), (actions18 = [
        __args18[1]
    ]), seq(moveChild("argument"), sequencea(actions18), up)));
    addRewrite("TryStatement", seq(((__args19 = ["block", checkTop]), (actions19 = [__args19[1]]), seq(
        moveChild("block"), sequencea(actions19), up)), ((__args20 = ["handler", checkTop]), (actions20 = [
        __args20[1]
    ]), seq(moveChild("handler"), sequencea(actions20), up)), ((__args21 = ["finalizer", checkTop]), (
        actions21 = [__args21[1]]), seq(moveChild("finalizer"), sequencea(actions21), up))));
    addRewrite(["WhileStatement", "DoWhileStatement"], seq(((__args22 = ["test", checkTop]), (actions22 = [
        __args22[1]
    ]), seq(moveChild("test"), sequencea(actions22), up)), ((__args23 = ["body", checkTop]), (actions23 = [
        __args23[1]
    ]), seq(moveChild("body"), sequencea(actions23), up))));
    addRewrite("ForStatement", seq(((__args24 = ["body", checkTop]), (actions24 = [__args24[1]]), seq(moveChild(
        "body"), sequencea(actions24), up)), ((__args25 = ["update", checkTop]), (actions25 = [__args25[
        1]]), seq(moveChild("update"), sequencea(actions25), up)), ((__args26 = ["test", checkTop]), (
        actions26 = [__args26[1]]), seq(moveChild("test"), sequencea(actions26), up)), ((__args27 = [
        "init", checkTop
    ]), (actions27 = [__args27[1]]), seq(moveChild("init"), sequencea(actions27), up))));
    addRewrite(["ConditionalExpression", "IfStatement"], seq(((__args28 = ["test", checkTop]), (actions28 = [
        __args28[1]
    ]), seq(moveChild("test"), sequencea(actions28), up)), ((__args29 = ["consequent", checkTop]), (
        actions29 = [__args29[1]]), seq(moveChild("consequent"), sequencea(actions29), up)), ((__args30 = [
        "alternate", checkTop
    ]), (actions30 = [__args30[1]]), seq(moveChild("alternate"), sequencea(actions30), up))));
    addRewrite("FunctionExpression", seq(((__args31 = ["body", checkTop]), (actions31 = [__args31[1]]), seq(
        moveChild("body"), sequencea(actions31), up)), ((__args32 = ["id", checkTop]), (actions32 = [
        __args32[1]
    ]), seq(moveChild("id"), sequencea(actions32), up)), ((__args33 = ["params", checkTop]), (actions33 = [
        __args33[1]
    ]), seq(moveChild("params"), sequencea(actions33), up))));
    addRewrite(["UnaryExpression", "DeleteExpression"], ((__args34 = ["argument", checkTop]), (actions34 = [
        __args34[1]
    ]), seq(moveChild("argument"), sequencea(actions34), up)));
    addRewrite(["BinaryExpression", "AssignmentExpression"], seq(((__args35 = ["left", checkTop]), (actions35 = [
        __args35[1]
    ]), seq(moveChild("left"), sequencea(actions35), up)), ((__args36 = ["right", checkTop]), (
        actions36 = [__args36[1]]), seq(moveChild("right"), sequencea(actions36), up))));
    addRewrite(["MemberExpression", "CheckedMemberExpression"], seq(((__args37 = ["object", checkTop]), (
        actions37 = [__args37[1]]), seq(moveChild("object"), sequencea(actions37), up)), ((__args38 = [
        "property", checkTop
    ]), (actions38 = [__args38[1]]), (consequent0 = seq(moveChild("property"), sequencea(actions38),
        up)), extract((function(node) {
        return (node.computed ? consequent0 : (undefined || pass));
    })))));
    addRewrite(["CallExpression", "NewExpression", "ApplyExpression"], seq(((__args39 = ["callee", checkTop]), (
        actions39 = [__args39[1]]), seq(moveChild("callee"), sequencea(actions39), up)), ((__args40 = [
        "args", checkTop
    ]), (actions40 = [__args40[1]]), seq(moveChild("args"), sequencea(actions40), up))));
    addRewrite("CurryExpression", seq(((__args41 = ["base", checkTop]), (actions41 = [__args41[1]]), seq(
        moveChild("base"), sequencea(actions41), up)), ((__args42 = ["args", checkTop]), (actions42 = [
        __args42[1]
    ]), seq(moveChild("args"), sequencea(actions42), up))));
    addRewrite("OperatorExpression", ((__args43 = ["operator", checkTop]), (actions43 = [__args43[1]]), seq(
        moveChild("operator"), sequencea(actions43), up)));
    addRewrite("LetExpression", seq(((__args44 = ["body", checkTop]), (actions44 = [__args44[1]]), seq(
        moveChild("body"), sequencea(actions44), up)), ((__args45 = ["bindings", checkTop]), (actions45 = [
        __args45[1]
    ]), seq(moveChild("bindings"), sequencea(actions45), up))));
    addRewrite(["SliceUnpack", "RelativeUnpack"], ((__args46 = ["target", checkTop]), (actions46 = [__args46[1]]),
        seq(moveChild("target"), sequencea(actions46), up)));
    addRewrite("ArgumentsPattern", ((test1 = inspect((function(x0) {
        return x0.id.id;
    }))), (no = extract((function(node) {
        return set(modify(node, ({
            id: null
        })));
    }))), (consequent1 = test1.chain((function(uid) {
        return M.lift(M.inner.isReachable(uid))
            .chain((function(reachable) {
                return (reachable ? pass : no);
            }));
    }))), extract((function(node) {
        return (node.id ? consequent1 : (undefined || pass));
    }))));
    addRewrite("ArrayExpression", ((__args47 = ["elements", checkTop]), (actions47 = [__args47[1]]), seq(
        moveChild("elements"), sequencea(actions47), up)));
    addRewrite("ObjectExpression", ((__args48 = ["properties", checkTop]), (actions48 = [__args48[1]]), seq(
        moveChild("properties"), sequencea(actions48), up)));
    addRewrite("ObjectValue", ((__args49 = ["value", checkTop]), (actions49 = [__args49[1]]), seq(moveChild(
        "value"), sequencea(actions49), up)));
    addRewrite("Identifier", extract((function(z) {
        return addReference(getUid(z));
    })));
    (_check = (function(node) {
        return (Array.isArray(node) ? visitArray(node) : (peepholes[type(node)] || pass));
    }));
    (removeUnreachable = (function(ast, prune) {
        var state = empty.setPrune(prune),
            c = seq(checkTop, extractCtx);
        return StateM.evalState(TreeZipperT.runTreeZipperT(c, ast), state);
    }));
    return removeUnreachable;
}));
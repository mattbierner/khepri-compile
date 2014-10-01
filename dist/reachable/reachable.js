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
        Empty = __o3["Empty"],
        x, y, move, __args0, actions0, __args1, actions1, __args4, actions4, __args5, actions5, __args6,
            actions6, __args7, actions7, __args14, actions14, __args15, actions15, __args16, actions16,
            __args17, actions17, __args19, actions19, __args20, actions20, __args21, actions21, __args22,
            actions22, __args23, actions23, __args24, actions24, __args25, actions25, __args26, actions26,
            __args27, actions27, __args28, actions28, __args29, actions29, __args30, actions30, __args31,
            actions31, __args32, actions32, __args33, actions33, __args35, actions35, __args36, actions36,
            __args37, actions37, __args38, actions38, consequent0, __args39, actions39, __args40, actions40,
            __args41, actions41, __args42, actions42, __args44, actions44, __args45, actions45, _check,
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
        }),
        x0 = addRewrite.bind(null, "Program"),
        __args = ["body", checkTop],
        actions = [__args[1]],
        y0 = seq(moveChild("body"), sequencea(actions), up);
    x0(y0);
    var x1 = addRewrite.bind(null, "Package"),
        y1 = seq(((__args0 = ["exports", checkTop]), (actions0 = [__args0[1]]), seq(moveChild("exports"),
            sequencea(actions0), up)), ((__args1 = ["body", checkTop]), (actions1 = [__args1[1]]), seq(
            moveChild("body"), sequencea(actions1), up)));
    x1(y1);
    var x2 = addRewrite.bind(null, "PackageExports"),
        __args2 = ["exports", checkTop],
        actions2 = [__args2[1]],
        y2 = seq(moveChild("exports"), sequencea(actions2), up);
    x2(y2);
    var x3 = addRewrite.bind(null, "PackageExport"),
        __args3 = ["id", checkTop],
        actions3 = [__args3[1]],
        y3 = seq(moveChild("id"), sequencea(actions3), up);
    x3(y3);
    var x4 = addRewrite.bind(null, "SwitchCase"),
        y4 = seq(((__args4 = ["test", checkTop]), (actions4 = [__args4[1]]), seq(moveChild("test"), sequencea(
            actions4), up)), ((__args5 = ["consequent", checkTop]), (actions5 = [__args5[1]]), seq(
            moveChild("consequent"), sequencea(actions5), up)));
    x4(y4);
    var x5 = addRewrite.bind(null, "CatchClause"),
        y5 = seq(((__args6 = ["param", checkTop]), (actions6 = [__args6[1]]), seq(moveChild("param"), sequencea(
            actions6), up)), ((__args7 = ["body", checkTop]), (actions7 = [__args7[1]]), seq(moveChild(
            "body"), sequencea(actions7), up)));
    x5(y5);
    var x6 = addRewrite.bind(null, "VariableDeclaration"),
        __args8 = ["declarations", checkTop],
        actions8 = [__args8[1]],
        y6 = seq(moveChild("declarations"), sequencea(actions8), up);
    x6(y6);
    var x7 = addRewrite.bind(null, "VariableDeclarator"),
        test = inspect((function(z) {
            return getUid(z.id);
        })),
        __args9 = ["init", checkTop],
        actions9 = [__args9[1]],
        yes = seq(moveChild("init"), sequencea(actions9), up),
        y7 = test.chain((function(uid) {
            return M.lift(M.inner.isReachable(uid))
                .chain((function(reachable) {
                    return (reachable ? yes : removeBinding);
                }));
        }));
    x7(y7);
    var x8 = addRewrite.bind(null, "Binding"),
        __args10 = ["value", checkTop],
        actions10 = [__args10[1]],
        consequent = seq(moveChild("value"), sequencea(actions10), up),
        test0 = inspect((function(z) {
            return getUid(z.pattern.id);
        })),
        __args11 = ["value", checkTop],
        actions11 = [__args11[1]],
        yes0 = seq(moveChild("value"), sequencea(actions11), up),
        alternate = test0.chain((function(uid) {
            return M.lift(M.inner.isReachable(uid))
                .chain((function(reachable) {
                    return (reachable ? yes0 : removeBinding);
                }));
        })),
        y8 = extract((function(node) {
            return (isReserved(node) ? consequent : (alternate || pass));
        }));
    x8(y8);
    var x9 = addRewrite.bind(null, "BlockStatement"),
        __args12 = ["body", checkTop],
        actions12 = [__args12[1]],
        y9 = seq(moveChild("body"), sequencea(actions12), up);
    x9(y9);
    var x10 = addRewrite.bind(null, "ExpressionStatement"),
        __args13 = ["expression", checkTop],
        actions13 = [__args13[1]],
        y10 = seq(moveChild("expression"), sequencea(actions13), up);
    x10(y10);
    var x11 = addRewrite.bind(null, "WithStatement"),
        y11 = seq(((__args14 = ["body", checkTop]), (actions14 = [__args14[1]]), seq(moveChild("body"),
            sequencea(actions14), up)), ((__args15 = ["bindings", checkTop]), (actions15 = [__args15[1]]),
            seq(moveChild("bindings"), sequencea(actions15), up)));
    x11(y11);
    var x12 = addRewrite.bind(null, "SwitchStatement"),
        y12 = seq(((__args16 = ["discriminant", checkTop]), (actions16 = [__args16[1]]), seq(moveChild(
            "discriminant"), sequencea(actions16), up)), ((__args17 = ["cases", checkTop]), (actions17 = [
            __args17[1]
        ]), seq(moveChild("cases"), sequencea(actions17), up)));
    x12(y12);
    var x13 = addRewrite.bind(null, ["ReturnStatement", "ThrowStatement"]),
        __args18 = ["argument", checkTop],
        actions18 = [__args18[1]],
        y13 = seq(moveChild("argument"), sequencea(actions18), up);
    x13(y13);
    var x14 = addRewrite.bind(null, "TryStatement"),
        y14 = seq(((__args19 = ["block", checkTop]), (actions19 = [__args19[1]]), seq(moveChild("block"),
            sequencea(actions19), up)), ((__args20 = ["handler", checkTop]), (actions20 = [__args20[1]]),
            seq(moveChild("handler"), sequencea(actions20), up)), ((__args21 = ["finalizer", checkTop]), (
            actions21 = [__args21[1]]), seq(moveChild("finalizer"), sequencea(actions21), up)));
    x14(y14);
    var x15 = addRewrite.bind(null, ["WhileStatement", "DoWhileStatement"]),
        y15 = seq(((__args22 = ["test", checkTop]), (actions22 = [__args22[1]]), seq(moveChild("test"),
            sequencea(actions22), up)), ((__args23 = ["body", checkTop]), (actions23 = [__args23[1]]), seq(
            moveChild("body"), sequencea(actions23), up)));
    x15(y15);
    var x16 = addRewrite.bind(null, "ForStatement"),
        y16 = seq(((__args24 = ["body", checkTop]), (actions24 = [__args24[1]]), seq(moveChild("body"),
            sequencea(actions24), up)), ((__args25 = ["update", checkTop]), (actions25 = [__args25[1]]),
            seq(moveChild("update"), sequencea(actions25), up)), ((__args26 = ["test", checkTop]), (
            actions26 = [__args26[1]]), seq(moveChild("test"), sequencea(actions26), up)), ((__args27 = [
            "init", checkTop
        ]), (actions27 = [__args27[1]]), seq(moveChild("init"), sequencea(actions27), up)));
    x16(y16);
    var x17 = addRewrite.bind(null, ["ConditionalExpression", "IfStatement"]),
        y17 = seq(((__args28 = ["test", checkTop]), (actions28 = [__args28[1]]), seq(moveChild("test"),
            sequencea(actions28), up)), ((__args29 = ["consequent", checkTop]), (actions29 = [__args29[1]]),
            seq(moveChild("consequent"), sequencea(actions29), up)), ((__args30 = ["alternate", checkTop]), (
            actions30 = [__args30[1]]), seq(moveChild("alternate"), sequencea(actions30), up)));
    x17(y17);
    var x18 = addRewrite.bind(null, "FunctionExpression"),
        y18 = seq(((__args31 = ["body", checkTop]), (actions31 = [__args31[1]]), seq(moveChild("body"),
            sequencea(actions31), up)), ((__args32 = ["id", checkTop]), (actions32 = [__args32[1]]), seq(
            moveChild("id"), sequencea(actions32), up)), ((__args33 = ["params", checkTop]), (actions33 = [
            __args33[1]
        ]), seq(moveChild("params"), sequencea(actions33), up)));
    x18(y18);
    var x19 = addRewrite.bind(null, ["UnaryExpression", "DeleteExpression"]),
        __args34 = ["argument", checkTop],
        actions34 = [__args34[1]],
        y19 = seq(moveChild("argument"), sequencea(actions34), up);
    x19(y19);
    var x20 = addRewrite.bind(null, ["BinaryExpression", "AssignmentExpression"]),
        y20 = seq(((__args35 = ["left", checkTop]), (actions35 = [__args35[1]]), seq(moveChild("left"),
            sequencea(actions35), up)), ((__args36 = ["right", checkTop]), (actions36 = [__args36[1]]), seq(
            moveChild("right"), sequencea(actions36), up)));
    x20(y20);
    var x21 = addRewrite.bind(null, ["MemberExpression", "CheckedMemberExpression"]),
        y21 = seq(((__args37 = ["object", checkTop]), (actions37 = [__args37[1]]), seq(moveChild("object"),
            sequencea(actions37), up)), ((__args38 = ["property", checkTop]), (actions38 = [__args38[1]]), (
            consequent0 = seq(moveChild("property"), sequencea(actions38), up)), extract((function(node) {
            return (node.computed ? consequent0 : (undefined || pass));
        }))));
    x21(y21);
    var x22 = addRewrite.bind(null, ["CallExpression", "NewExpression", "ApplyExpression"]),
        y22 = seq(((__args39 = ["callee", checkTop]), (actions39 = [__args39[1]]), seq(moveChild("callee"),
            sequencea(actions39), up)), ((__args40 = ["args", checkTop]), (actions40 = [__args40[1]]), seq(
            moveChild("args"), sequencea(actions40), up)));
    x22(y22);
    var x23 = addRewrite.bind(null, "CurryExpression"),
        y23 = seq(((__args41 = ["base", checkTop]), (actions41 = [__args41[1]]), seq(moveChild("base"),
            sequencea(actions41), up)), ((__args42 = ["args", checkTop]), (actions42 = [__args42[1]]), seq(
            moveChild("args"), sequencea(actions42), up)));
    x23(y23);
    var x24 = addRewrite.bind(null, "OperatorExpression"),
        __args43 = ["operator", checkTop],
        actions43 = [__args43[1]],
        y24 = seq(moveChild("operator"), sequencea(actions43), up);
    x24(y24);
    var x25 = addRewrite.bind(null, "LetExpression"),
        y25 = seq(((__args44 = ["body", checkTop]), (actions44 = [__args44[1]]), seq(moveChild("body"),
            sequencea(actions44), up)), ((__args45 = ["bindings", checkTop]), (actions45 = [__args45[1]]),
            seq(moveChild("bindings"), sequencea(actions45), up)));
    x25(y25);
    var x26 = addRewrite.bind(null, ["SliceUnpack", "RelativeUnpack"]),
        __args46 = ["target", checkTop],
        actions46 = [__args46[1]],
        y26 = seq(moveChild("target"), sequencea(actions46), up);
    x26(y26);
    var x27 = addRewrite.bind(null, "ArgumentsPattern"),
        test1 = inspect((function(z) {
            return getUid(z.id.id);
        })),
        yes1 = pass,
        no = extract((function(node) {
            return set(modify(node, ({
                id: null
            })));
        })),
        consequent1 = test1.chain((function(uid) {
            return M.lift(M.inner.isReachable(uid))
                .chain((function(reachable) {
                    return (reachable ? yes1 : no);
                }));
        })),
        y27 = extract((function(node) {
            return (node.id ? consequent1 : (undefined || pass));
        }));
    x27(y27);
    var x28 = addRewrite.bind(null, "ArrayExpression"),
        __args47 = ["elements", checkTop],
        actions47 = [__args47[1]],
        y28 = seq(moveChild("elements"), sequencea(actions47), up);
    x28(y28);
    var x29 = addRewrite.bind(null, "ObjectExpression"),
        __args48 = ["properties", checkTop],
        actions48 = [__args48[1]],
        y29 = seq(moveChild("properties"), sequencea(actions48), up);
    x29(y29);
    var x30 = addRewrite.bind(null, "ObjectValue"),
        __args49 = ["value", checkTop],
        actions49 = [__args49[1]],
        y30 = seq(moveChild("value"), sequencea(actions49), up);
    x30(y30);
    var x31 = addRewrite.bind(null, "Identifier"),
        y31 = extract((function(z) {
            return addReference(getUid(z));
        }));
    x31(y31);
    (_check = (function(node) {
        return (Array.isArray(node) ? visitArray(node) : (peepholes[type(node)] || pass));
    }));
    var c = seq(checkTop, extractCtx);
    (removeUnreachable = (function(ctx) {
        return StateM.evalState(TreeZipperT.runTreeZipperT(c, ctx), Empty);
    }));
    return removeUnreachable;
}));
/*
 * THIS FILE IS AUTO GENERATED from 'lib/reachable.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/record", "hamt", "neith/zipper", "khepri-ast/node", "akh/base", "akh/state",
    "zipper-m/trans/tree", "./ast"
], (function(require, exports, record, hamt, zipper, __o, __o0, StateM, TreeZipperT, __o1) {
    "use strict";
    var Node = __o["Node"],
        setData = __o["setData"],
        next = __o0["next"],
        seq = __o0["sequence"],
        seqa = __o0["sequencea"],
        type = __o1["type"],
        getUid = __o1["getUid"],
        optimize, x, y, __args, actions, __args0, actions, __args1, actions, __args2, actions, __args3, actions,
            __args4, actions, __args5, actions, __args6, actions, __args7, actions, __args8, actions, __args9,
            actions, __args10, actions, __args11, actions, __args12, actions, __args13, actions, __args14,
            actions, __args15, actions, __args16, actions, __args17, actions, __args18, actions, __args19,
            actions, __args20, actions, __args21, actions, __args22, actions, __args23, actions, __args24,
            actions, __args25, actions, __args26, actions, __args27, actions, __args28, actions, __args29,
            actions, __args30, actions, __args31, actions, __args32, actions, __args33, actions, x0, consequent,
            alternate, __args34, actions, __args35, actions, __args36, actions, __args37, actions, consequent0,
            __args38, actions, __args39, actions, __args40, actions, __args41, actions, __args42, actions,
            __args43, actions, __args44, actions, __args45, actions, __args46, actions, __args47, actions,
            __args48, actions, __args49, actions, x1, State = record.declare(null, ["bindings"]);
    (State.empty = State.create(hamt.empty));
    (State.prototype.setReference = (function(uid, count) {
        var __o2 = this,
            bindings = __o2["bindings"];
        return State.create(hamt.set(uid, count, bindings));
    }));
    (State.prototype.addReference = (function(uid) {
        var __o2 = this,
            bindings = __o2["bindings"];
        return State.create(hamt.modify(uid, (function(x) {
            return ((x + 1) || 1);
        }), bindings));
    }));
    (State.prototype.getCount = (function(uid) {
        var __o2 = this,
            bindings = __o2["bindings"];
        return hamt.get(uid, bindings);
    }));
    (State.prototype.isReachable = State.prototype.getCount);
    var _check, M = TreeZipperT(StateM),
        run = (function(c, ctx) {
            return StateM.evalState(TreeZipperT.runTreeZipperT(c, ctx), State.empty);
        }),
        pass = M.of(null),
        getState = M.lift(M.inner.get),
        modifyState = ((x = M.lift), (y = M.inner.modify), (function(x0) {
            return x(y(x0));
        })),
        setCount = (function(uid, count) {
            return (uid ? modifyState((function(s) {
                return s.setReference(uid, count);
            })) : pass);
        }),
        getCount = (function(uid, yes, no) {
            return (uid ? getState.map((function(s) {
                return s.getCount(uid);
            })) : M.of(0));
        }),
        isReachable = (function(uid, yes, no) {
            return (uid ? getState.chain((function(s) {
                return (s.isReachable(uid) ? yes : no);
            })) : yes);
        }),
        extractCtx = M.get,
        extract = M.chain.bind(null, M.node),
        set = M.setNode,
        up = M.up,
        moveChild = M.child,
        child = (function(edge) {
            var __args = arguments,
                actions = [].slice.call(__args, 1);
            return seq(moveChild(edge), seqa(actions), up);
        }),
        checkTop = extract((function(x0) {
            return _check(x0);
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
    addRewrite("Package", seq(((__args0 = ["exports", checkTop]), (actions = [].slice.call(__args0, 1)), seq(
        moveChild("exports"), seqa(actions), up)), ((__args1 = ["body", checkTop]), (actions = [].slice
        .call(__args1, 1)), seq(moveChild("body"), seqa(actions), up))));
    addRewrite("PackageExports", ((__args2 = ["exports", checkTop]), (actions = [].slice.call(__args2, 1)), seq(
        moveChild("exports"), seqa(actions), up)));
    addRewrite("PackageExport", ((__args3 = ["id", checkTop]), (actions = [].slice.call(__args3, 1)), seq(
        moveChild("id"), seqa(actions), up)));
    addRewrite("SwitchCase", seq(((__args4 = ["test", checkTop]), (actions = [].slice.call(__args4, 1)), seq(
        moveChild("test"), seqa(actions), up)), ((__args5 = ["consequent", checkTop]), (actions = [].slice
        .call(__args5, 1)), seq(moveChild("consequent"), seqa(actions), up))));
    addRewrite("CatchClause", seq(((__args6 = ["param", checkTop]), (actions = [].slice.call(__args6, 1)), seq(
        moveChild("param"), seqa(actions), up)), ((__args7 = ["body", checkTop]), (actions = [].slice.call(
        __args7, 1)), seq(moveChild("body"), seqa(actions), up))));
    addRewrite("VariableDeclaration", ((__args8 = ["declarations", checkTop]), (actions = [].slice.call(__args8,
        1)), seq(moveChild("declarations"), seqa(actions), up)));
    addRewrite("VariableDeclarator", extract((function(node) {
        return isReachable(getUid(node.id), child("init", checkTop), set([]));
    })));
    addRewrite("Binding", extract((function(node) {
        return isReachable(getUid(node.pattern.id), child("value", checkTop), set([]));
    })));
    addRewrite("BlockStatement", ((__args9 = ["body", checkTop]), (actions = [].slice.call(__args9, 1)), seq(
        moveChild("body"), seqa(actions), up)));
    addRewrite("ExpressionStatement", ((__args10 = ["expression", checkTop]), (actions = [].slice.call(__args10,
        1)), seq(moveChild("expression"), seqa(actions), up)));
    addRewrite("WithStatement", seq(((__args11 = ["body", checkTop]), (actions = [].slice.call(__args11, 1)),
        seq(moveChild("body"), seqa(actions), up)), ((__args12 = ["bindings", checkTop]), (actions = []
        .slice.call(__args12, 1)), seq(moveChild("bindings"), seqa(actions), up))));
    addRewrite("SwitchStatement", seq(((__args13 = ["discriminant", checkTop]), (actions = [].slice.call(
        __args13, 1)), seq(moveChild("discriminant"), seqa(actions), up)), ((__args14 = ["cases",
        checkTop
    ]), (actions = [].slice.call(__args14, 1)), seq(moveChild("cases"), seqa(actions), up))));
    addRewrite(["ReturnStatement", "ThrowStatement"], ((__args15 = ["argument", checkTop]), (actions = [].slice
        .call(__args15, 1)), seq(moveChild("argument"), seqa(actions), up)));
    addRewrite("TryStatement", seq(((__args16 = ["block", checkTop]), (actions = [].slice.call(__args16, 1)),
        seq(moveChild("block"), seqa(actions), up)), ((__args17 = ["handler", checkTop]), (actions = []
        .slice.call(__args17, 1)), seq(moveChild("handler"), seqa(actions), up)), ((__args18 = [
        "finalizer", checkTop
    ]), (actions = [].slice.call(__args18, 1)), seq(moveChild("finalizer"), seqa(actions), up))));
    addRewrite(["WhileStatement", "DoWhileStatement"], seq(((__args19 = ["test", checkTop]), (actions = [].slice
        .call(__args19, 1)), seq(moveChild("test"), seqa(actions), up)), ((__args20 = ["body", checkTop]), (
        actions = [].slice.call(__args20, 1)), seq(moveChild("body"), seqa(actions), up))));
    addRewrite("ForStatement", seq(((__args21 = ["body", checkTop]), (actions = [].slice.call(__args21, 1)),
        seq(moveChild("body"), seqa(actions), up)), ((__args22 = ["update", checkTop]), (actions = [].slice
        .call(__args22, 1)), seq(moveChild("update"), seqa(actions), up)), ((__args23 = ["test",
        checkTop
    ]), (actions = [].slice.call(__args23, 1)), seq(moveChild("test"), seqa(actions), up)), ((__args24 = [
        "init", checkTop
    ]), (actions = [].slice.call(__args24, 1)), seq(moveChild("init"), seqa(actions), up))));
    addRewrite(["ConditionalExpression", "IfStatement"], seq(((__args25 = ["test", checkTop]), (actions = [].slice
        .call(__args25, 1)), seq(moveChild("test"), seqa(actions), up)), ((__args26 = ["consequent",
        checkTop
    ]), (actions = [].slice.call(__args26, 1)), seq(moveChild("consequent"), seqa(actions), up)), ((
        __args27 = ["alternate", checkTop]), (actions = [].slice.call(__args27, 1)), seq(moveChild(
        "alternate"), seqa(actions), up))));
    addRewrite("FunctionExpression", seq(((__args28 = ["id", checkTop]), (actions = [].slice.call(__args28, 1)),
        seq(moveChild("id"), seqa(actions), up)), ((__args29 = ["params", checkTop]), (actions = [].slice
        .call(__args29, 1)), seq(moveChild("params"), seqa(actions), up)), ((__args30 = ["body",
        checkTop
    ]), (actions = [].slice.call(__args30, 1)), seq(moveChild("body"), seqa(actions), up))));
    addRewrite("UnaryExpression", ((__args31 = ["argument", checkTop]), (actions = [].slice.call(__args31, 1)),
        seq(moveChild("argument"), seqa(actions), up)));
    addRewrite(["LogicalExpression", "BinaryExpression"], seq(((__args32 = ["left", checkTop]), (actions = [].slice
        .call(__args32, 1)), seq(moveChild("left"), seqa(actions), up)), ((__args33 = ["right",
        checkTop
    ]), (actions = [].slice.call(__args33, 1)), seq(moveChild("right"), seqa(actions), up))));
    addRewrite("AssignmentExpression", ((x0 = type), (consequent = extract((function(node) {
        var uid = getUid(node.left);
        return getCount(uid)
            .chain((function(count) {
                return (count ? seq(child("right", checkTop), setCount(uid, count)) :
                    set(null));
            }));
    }))), (alternate = seq(((__args34 = ["left", checkTop]), (actions = [].slice.call(__args34, 1)),
        seq(moveChild("left"), seqa(actions), up)), ((__args35 = ["right", checkTop]), (actions = []
        .slice.call(__args35, 1)), seq(moveChild("right"), seqa(actions), up)))), extract((function(
        node) {
        var x1, y0;
        return (((x1 = node.left), (y0 = x0(x1)), ("Identifier" === y0)) ? consequent : (
            alternate || pass));
    }))));
    addRewrite("MemberExpression", seq(((__args36 = ["object", checkTop]), (actions = [].slice.call(__args36, 1)),
        seq(moveChild("object"), seqa(actions), up)), ((__args37 = ["property", checkTop]), (actions = []
            .slice.call(__args37, 1)), (consequent0 = seq(moveChild("property"), seqa(actions), up)),
        extract((function(node) {
            return (node.computed ? consequent0 : (undefined || pass));
        })))));
    addRewrite("NewExpression", seq(((__args38 = ["callee", checkTop]), (actions = [].slice.call(__args38, 1)),
        seq(moveChild("callee"), seqa(actions), up)), ((__args39 = ["args", checkTop]), (actions = [].slice
        .call(__args39, 1)), seq(moveChild("args"), seqa(actions), up))));
    addRewrite("CallExpression", seq(((__args40 = ["callee", checkTop]), (actions = [].slice.call(__args40, 1)),
        seq(moveChild("callee"), seqa(actions), up)), ((__args41 = ["args", checkTop]), (actions = [].slice
        .call(__args41, 1)), seq(moveChild("args"), seqa(actions), up))));
    addRewrite("CurryExpression", seq(((__args42 = ["base", checkTop]), (actions = [].slice.call(__args42, 1)),
        seq(moveChild("base"), seqa(actions), up)), ((__args43 = ["args", checkTop]), (actions = [].slice
        .call(__args43, 1)), seq(moveChild("args"), seqa(actions), up))));
    addRewrite("LetExpression", seq(((__args44 = ["body", checkTop]), (actions = [].slice.call(__args44, 1)),
        seq(moveChild("body"), seqa(actions), up)), ((__args45 = ["bindings", checkTop]), (actions = []
        .slice.call(__args45, 1)), seq(moveChild("bindings"), seqa(actions), up))));
    addRewrite("ArgumentsPattern", ((__args46 = ["id", checkTop]), (actions = [].slice.call(__args46, 1)), seq(
        moveChild("id"), seqa(actions), up)));
    addRewrite("ArrayExpression", ((__args47 = ["elements", checkTop]), (actions = [].slice.call(__args47, 1)),
        seq(moveChild("elements"), seqa(actions), up)));
    addRewrite("ObjectExpression", ((__args48 = ["properties", checkTop]), (actions = [].slice.call(__args48, 1)),
        seq(moveChild("properties"), seqa(actions), up)));
    addRewrite("ObjectValue", ((__args49 = ["value", checkTop]), (actions = [].slice.call(__args49, 1)), seq(
        moveChild("value"), seqa(actions), up)));
    addRewrite("Identifier", extract(((x1 = getUid), (function(x2) {
        var uid = x1(x2);
        return (uid ? modifyState((function(s) {
            return s.addReference(uid);
        })) : pass);
    }))));
    (_check = (function(node) {
        if (Array.isArray(node)) {
            if ((!node.length)) return pass;
            return seq(down, rightmost, node.reduceRight((function(p, c, i) {
                return next(p, (i ? next(checkTop, left) : checkTop));
            }), pass), up);
        }
        if (((node instanceof Node) && peepholes[node.type])) return peepholes[node.type];
        return pass;
    }));
    (optimize = (function(ast, data) {
        return run(next(checkTop, extractCtx.chain((function(node) {
            return M.of(({
                "tree": node
            }));
        }))), ast);
    }));
    (exports["optimize"] = optimize);
}));
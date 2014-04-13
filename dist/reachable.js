/*
 * THIS FILE IS AUTO GENERATED from 'lib/reachable.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/record", "hamt", "neith/zipper", "khepri-ast/node", "akh/base", "akh/state",
    "zipper-m/trans/tree", "zipper-m/walk", "./ast"
], (function(require, exports, record, hamt, zipper, __o, __o0, StateM, TreeZipperT, walk, __o1) {
    "use strict";
    var Node = __o["Node"],
        setData = __o["setData"],
        next = __o0["next"],
        seq = __o0["sequence"],
        seqa = __o0["sequencea"],
        type = __o1["type"],
        getUid = __o1["getUid"],
        optimize, x, y, consequent, x0, State = record.declare(null, ["bindings"]);
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
        isReachable = (function(uid, yes, no) {
            return (uid ? getState.chain((function(s) {
                return (s.isReachable(uid) ? yes : no);
            })) : yes);
        }),
        extractCtx = M.get,
        extract = M.chain.bind(null, M.node),
        set = M.setNode,
        up = M.up,
        down = M.down,
        left = M.left,
        rightmost = M.move(zipper.rightmost),
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
    addRewrite("Program", child("body", checkTop));
    addRewrite("Package", child("body", checkTop));
    addRewrite("SwitchCase", seq(child("test", checkTop), child("consequent", checkTop)));
    addRewrite("CatchClause", seq(child("param", checkTop), child("body", checkTop)));
    addRewrite("VariableDeclaration", child("declarations", checkTop));
    addRewrite("VariableDeclarator", extract((function(node) {
        return isReachable(getUid(node.id), child("init", checkTop), set([]));
    })));
    addRewrite("Binding", extract((function(node) {
        return isReachable(getUid(node.pattern.id), child("value", checkTop), set([]));
    })));
    addRewrite("BlockStatement", child("body", checkTop));
    addRewrite("ExpressionStatement", child("expression", checkTop));
    addRewrite("WithStatement", seq(child("body", checkTop), child("bindings", checkTop)));
    addRewrite("SwitchStatement", seq(child("discriminant", checkTop), child("cases", checkTop)));
    addRewrite(["ReturnStatement", "ThrowStatement"], child("argument", checkTop));
    addRewrite("TryStatement", seq(child("block", checkTop), child("handler", checkTop), child("finalizer",
        checkTop)));
    addRewrite(["WhileStatement", "DoWhileStatement"], seq(child("test", checkTop), child("body", checkTop)));
    addRewrite("ForStatement", seq(child("body", checkTop), child("update", checkTop), child("test", checkTop),
        child("init", checkTop)));
    addRewrite(["ConditionalExpression", "IfStatement"], seq(child("test", checkTop), child("consequent",
        checkTop), child("alternate", checkTop)));
    addRewrite("FunctionExpression", seq(child("id", checkTop), child("params", checkTop), child("body",
        checkTop)));
    addRewrite("UnaryExpression", child("argument", checkTop));
    addRewrite(["LogicalExpression", "BinaryExpression"], seq(child("left", checkTop), child("right", checkTop)));
    addRewrite("AssignmentExpression", seq(child("left", checkTop), child("right", checkTop)));
    addRewrite("MemberExpression", seq(child("object", checkTop), ((consequent = child("property", checkTop)),
        extract((function(node) {
            return (node.computed ? consequent : (undefined || pass));
        })))));
    addRewrite("NewExpression", seq(child("callee", checkTop), child("args", checkTop)));
    addRewrite("CallExpression", seq(child("callee", checkTop), child("args", checkTop)));
    addRewrite("CurryExpression", seq(child("base", checkTop), child("args", checkTop)));
    addRewrite("LetExpression", seq(child("body", checkTop), child("bindings", checkTop)));
    addRewrite("ArrayExpression", child("elements", checkTop));
    addRewrite("ObjectExpression", child("properties", checkTop));
    addRewrite("ObjectValue", child("value", checkTop));
    addRewrite("Identifier", extract(((x0 = getUid), (function(x1) {
        var uid = x0(x1);
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
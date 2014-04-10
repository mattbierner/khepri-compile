/*
 * THIS FILE IS AUTO GENERATED from 'lib/reachable.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/record", "hashtrie", "neith/zipper", "khepri-ast-zipper", "khepri-ast/node",
    "khepri-ast/declaration", "khepri-ast/statement", "khepri-ast/expression", "khepri-ast/pattern",
    "khepri-ast/value", "akh/base", "akh/state", "zipper-m/trans/zipper", "zipper-m/walk", "./ast"
], (function(require, exports, record, hashtrie, zipper, __o, __o0, ast_declaration, ast_statement, ast_expression,
    ast_pattern, ast_value, __o1, StateM, ZipperT, walk, __o2) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        Node = __o0["Node"],
        setData = __o0["setData"],
        next = __o1["next"],
        seq = __o1["sequence"],
        seqa = __o1["sequencea"],
        getUd = __o2["getUd"],
        getUid = __o2["getUid"],
        optimize, x, y, consequent, alternate, State = record.declare(null, ["bindings", "scope"]);
    (State.empty = State.create(hashtrie.empty, [hashtrie.empty, null]));
    (State.prototype.addReference = (function(uid) {
        var __o3 = this,
            bindings = __o3["bindings"],
            scope = __o3["scope"];
        return State.create(hashtrie.set(uid, null, bindings));
    }));
    (State.prototype.isReachable = (function(uid) {
        var __o3 = this,
            bindings = __o3["bindings"],
            scope = __o3["scope"];
        return hashtrie.has(uid, bindings);
    }));
    var _check, M = ZipperT(StateM),
        run = (function(c, ctx) {
            return StateM.evalState(ZipperT.runZipperT(c, ctx), State.empty);
        }),
        pass = M.of(null),
        getState = M.lift(M.inner.get),
        modifyState = ((x = M.lift), (y = M.inner.modify), (function(x0) {
            return x(y(x0));
        })),
        addReference = (function(uid) {
            return (uid ? modifyState((function(s) {
                return s.addReference(uid);
            })) : pass);
        }),
        isReachable = (function(uid, yes, no) {
            return (uid ? getState.chain((function(s) {
                return (s.isReachable(uid) ? yes : no);
            })) : yes);
        }),
        extract = M.chain.bind(null, M.node),
        set = M.setNode,
        up = M.up,
        down = M.down,
        left = M.left,
        rightmost = M.move(zipper.rightmost),
        moveChild = M.child,
        child = (function(edge) {
            var actions = [].slice.call(arguments, 1);
            return seq(moveChild(edge), seqa(actions), up);
        }),
        checkTop = extract((function(x0) {
            return _check(x0);
        })),
        visitChild = (function(edge) {
            return child(edge, checkTop);
        }),
        peepholes = ({}),
        addRewrite = (function(type, f) {
            if (Array.isArray(type)) type.forEach((function(type0) {
                return addRewrite(type0, f);
            }));
            else {
                (peepholes[type] = f);
            }
        });
    addRewrite("Program", child("body", checkTop));
    addRewrite("Package", child("body", checkTop));
    addRewrite("SwitchCase", seq(child("test", checkTop), child("consequent", checkTop)));
    addRewrite("CatchClause", seq(child("param", checkTop), child("body", checkTop)));
    addRewrite("VariableDeclaration", child("declarations", checkTop));
    addRewrite("VariableDeclarator", extract((function(node) {
        return isReachable(getUid(node.id), visitChild("init"), set([]));
    })));
    addRewrite("Binding", extract((function(node) {
        return isReachable(getUid(node.pattern.id), visitChild("value"), set([]));
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
    addRewrite(["AssignmentExpression", "LogicalExpression", "BinaryExpression"], seq(child("left", checkTop),
        child("right", checkTop)));
    addRewrite("MemberExpression", seq(child("object", checkTop), ((consequent = child("property", checkTop)), (
        alternate = undefined), extract((function(node) {
        return (node.computed ? consequent : (alternate || pass));
    })))));
    addRewrite("NewExpression", seq(child("callee", checkTop), child("args", checkTop)));
    addRewrite("CallExpression", seq(child("callee", checkTop), child("args", checkTop)));
    addRewrite("CurryExpression", seq(child("base", checkTop), child("args", checkTop)));
    addRewrite("LetExpression", seq(child("body", checkTop), child("bindings", checkTop)));
    addRewrite("ArrayExpression", child("elements", checkTop));
    addRewrite("ObjectExpression", child("properties", checkTop));
    addRewrite("ObjectValue", child("value", checkTop));
    addRewrite("Identifier", extract((function(node) {
        return addReference(getUid(node));
    })));
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
        return run(next(checkTop, extract((function(node) {
            return M.of(({
                "tree": node
            }));
        }))), khepriZipper(ast));
    }));
    (exports["optimize"] = optimize);
}));
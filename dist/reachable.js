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
        optimize, State = record.declare(null, ["bindings", "scope"]);
    (State.empty = State.create(hashtrie.empty, [hashtrie.empty, null]));
    (State.prototype.addReference = (function(uid) {
        var __o = this,
            bindings = __o["bindings"],
            scope = __o["scope"];
        return State.create(hashtrie.set(uid, null, bindings), [hashtrie.set(uid, null, scope[0]),
            scope[1]
        ]);
    }));
    (State.prototype.isReachable = (function(uid) {
        var __o = this,
            bindings = __o["bindings"],
            scope = __o["scope"];
        return hashtrie.has(uid, bindings);
    }));
    var _check, M = ZipperT(StateM),
        run = (function(c, ctx) {
            return StateM.evalState(ZipperT.runZipperT(c, ctx), State.empty);
        }),
        pass = M.of(null),
        getState = M.lift(M.inner.get),
        modifyState = (function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(M.lift, M.inner.modify),
        addReference = (function(uid) {
            return modifyState((function(s) {
                return s.addReference(uid);
            }));
        }),
        isReachable = (function(uid) {
            return getState.map((function(s) {
                return s.isReachable(uid);
            }));
        }),
        extract = M.chain.bind(null, M.node),
        modify = M.modifyNode,
        set = M.setNode,
        up = M.up,
        down = M.down,
        left = M.left,
        rightmost = M.move(zipper.rightmost),
        moveChild = M.child,
        when = (function(test, consequent, alternate) {
            return extract((function(node) {
                return (test(node) ? consequent : (alternate || pass));
            }));
        }),
        child = (function(edge) {
            var args = arguments;
            return seq(moveChild(edge), seqa([].slice.call(args, 1)), up);
        }),
        checkTop = extract((function(x) {
            return _check(x);
        })),
        visitChild = (function(edge) {
            return child(edge, checkTop);
        }),
        peepholes = ({}),
        addRewrite = (function(type, f) {
            if (Array.isArray(type)) type.forEach((function(type) {
                return addRewrite(type, f);
            }));
            else(peepholes[type] = f);
        });
    addRewrite("Program", visitChild("body"));
    addRewrite("Package", visitChild("body"));
    addRewrite("SwitchCase", seq(visitChild("test"), visitChild("consequent")));
    addRewrite("CatchClause", seq(visitChild("param"), visitChild("body")));
    addRewrite("VariableDeclaration", visitChild("declarations"));
    addRewrite("VariableDeclarator", seq(visitChild("id"), when((function(node) {
        return node.init;
    }), extract((function(node) {
        return isReachable(getUid(node.id))
            .chain((function(reachable) {
                return (reachable ? visitChild("init") : set([]));
            }));
    })))));
    addRewrite("Binding", seq(visitChild("pattern"), extract((function(node) {
        return isReachable(getUid(node.pattern.id))
            .chain((function(reachable) {
                return (reachable ? visitChild("value") : set([]));
            }));
    }))));
    addRewrite("BlockStatement", visitChild("body"));
    addRewrite("ExpressionStatement", visitChild("expression"));
    addRewrite("WithStatement", seq(visitChild("body"), visitChild("bindings")));
    addRewrite("SwitchStatement", seq(visitChild("discriminant"), visitChild("cases")));
    addRewrite(["ReturnStatement", "ThrowStatement"], visitChild("argument"));
    addRewrite("TryStatement", seq(visitChild("block"), visitChild("handler"), visitChild("finalizer")));
    addRewrite("WhileStatement", seq(visitChild("test"), visitChild("body")));
    addRewrite("DoWhileStatement", seq(visitChild("body"), visitChild("test")));
    addRewrite("ForStatement", seq(visitChild("init"), visitChild("test"), visitChild("update"), visitChild(
        "body")));
    addRewrite("FunctionExpression", seq(visitChild("id"), visitChild("params"), visitChild("body")));
    addRewrite("UnaryExpression", visitChild("argument"));
    addRewrite(["AssignmentExpression", "LogicalExpression", "BinaryExpression"], seq(visitChild("left"),
        visitChild("right")));
    addRewrite("MemberExpression", seq(visitChild("object"), when((function(node) {
        return node.computed;
    }), visitChild("property"))));
    addRewrite("NewExpression", seq(visitChild("callee"), visitChild("args")));
    addRewrite("CallExpression", seq(visitChild("callee"), visitChild("args")));
    addRewrite("CurryExpression", seq(visitChild("base"), visitChild("args")));
    addRewrite("LetExpression", seq(visitChild("body"), visitChild("bindings")));
    addRewrite("ArgumentsPattern", seq(visitChild("id"), visitChild("elements"), visitChild("self")));
    addRewrite("ArrayExpression", visitChild("elements"));
    addRewrite("ObjectExpression", visitChild("properties"));
    addRewrite("ObjectValue", visitChild("value"));
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
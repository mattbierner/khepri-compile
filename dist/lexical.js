/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lexical.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "khepri-ast/expression", "khepri-ast/pattern", "khepri-ast/value",
    "neith/zipper", "neith/tree", "khepri-ast-zipper", "bes/record", "./scope", "./fun", "./control/base",
    "akh/state", "akh/trans/error"
], (function(require, exports, ast_node, ast_expression, ast_pattern, ast_value, zipper, tree, __o, record, scope,
    fun, __o0, StateM, ErrorT) {
    "use strict";
    var setData = ast_node["setData"],
        setUserData = ast_node["setUserData"],
        khepriZipper = __o["khepriZipper"],
        Scope = scope["Scope"],
        next = __o0["next"],
        seq = __o0["seq"],
        seqa = __o0["seqa"],
        binary = __o0["binary"],
        check, _check, State = record.declare(null, ["ctx", "scope", "unique"]),
        M = ErrorT(StateM),
        run = (function(p, s, ok, err) {
            return (function(x) {
                return StateM.evalState(x, s);
            })(ErrorT.runErrorT(p, (function(f, g) {
                return (function(x) {
                    return f(g(x));
                });
            })(StateM.of, ok), (function(f, g) {
                return (function(x) {
                    return f(g(x));
                });
            })(StateM.of, err)));
        }),
        error = M.fail,
        extract = M.lift(StateM.get),
        setState = (function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(M.lift, StateM.put),
        examineState = M.chain.bind(null, extract),
        modifyState = (function(f) {
            return extract.chain((function(s) {
                return setState(f(s));
            }));
        }),
        unique = M.lift(StateM.get.chain((function(s) {
            return next(StateM.put(s.setUnique((s.unique + 1))), StateM.of(s.unique));
        }))),
        examineScope = (function(f) {
            return examineState((function(s) {
                return f(s.scope);
            }));
        }),
        modifyScope = (function(f) {
            return modifyState((function(s) {
                return State.setScope(s, f(s.scope));
            }));
        }),
        push = modifyScope(scope.push),
        pop = modifyScope(scope.pop),
        inspect = (function(f) {
            return examineState((function(s) {
                return f(tree.node(s.ctx));
            }));
        }),
        extractNode = inspect(M.of),
        move = (function(op) {
            return modifyState((function(s) {
                return State.setCtx(s, op(s.ctx));
            }));
        }),
        up = move(zipper.up),
        down = move(zipper.down),
        left = move(zipper.left),
        right = move(zipper.right),
        child = (function(edge) {
            var args = arguments;
            return seq(move(tree.child.bind(null, edge)), seqa([].slice.call(args, 1)), up);
        }),
        modifyNode = (function(f) {
            return move(tree.modifyNode.bind(null, f));
        }),
        setNode = (function(x) {
            return move(tree.setNode.bind(null, x));
        }),
        checkTop = inspect((function(x) {
            return _check(x);
        })),
        checkChild = (function(edge) {
            return child(edge, checkTop);
        }),
        pass = M.of(),
        block = (function() {
            var body = arguments;
            return seq(push, seqa(body), pop);
        }),
        checkHasBinding = (function(id, loc) {
            return examineScope((function(s) {
                return (s.hasBinding(id) ? pass : error(((("Undeclared identifier:'" + id) +
                    "' at:") + loc)));
            }));
        }),
        checkCanAddOwnBinding = (function(id, loc) {
            return examineScope((function(s) {
                var start, binding, end;
                return (s.hasOwnBinding(id) ? ((start = (loc && loc.start)), (binding = s.getBinding(
                    id)), (end = (binding.loc && binding.loc.start)), error(((((("'" + id) +
                    "' at:") + start) + " already bound for scope from:") + end))) : pass);
            }));
        }),
        checkCanAssign = (function(id, loc) {
            return examineScope((function(s) {
                var b;
                return (s.hasBinding(id) ? ((b = s.getBinding(id)), (b.mutable ? pass : error((((
                    "Assign to immutable variable:'" + id) + "' at:") + loc)))) : pass);
            }));
        }),
        addUid = (function(id) {
            return unique.chain((function(uid) {
                return modifyScope((function(s) {
                    return Scope.addUid(s, id, uid);
                }));
            }));
        }),
        addMutableBinding = (function(id, loc) {
            return seq(modifyScope((function(s) {
                return Scope.addMutableBinding(s, id, loc);
            })), addUid(id));
        }),
        addImmutableBinding = (function(id, loc) {
            return seq(modifyScope((function(s) {
                return Scope.addImmutableBinding(s, id, loc);
            })), addUid(id));
        }),
        addMutableBindingChecked = (function(id, loc) {
            return seq(checkCanAddOwnBinding(id, loc), addMutableBinding(id, loc));
        }),
        addImmutableBindingChecked = (function(id, loc) {
            return seq(checkCanAddOwnBinding(id, loc), addImmutableBinding(id, loc));
        }),
        checks = ({}),
        addCheck = (function(type, check) {
            if (Array.isArray(type)) type.forEach((function(x) {
                return addCheck(x, check);
            }));
            else(checks[type] = check);
        });
    addCheck("Program", block(checkChild("body")));
    addCheck("PackageExports", checkChild("exports"));
    addCheck("PackageExport", inspect((function(node) {
        return addMutableBindingChecked(node.id.name, node.loc);
    })));
    addCheck("Package", block(addImmutableBindingChecked("require", null), addImmutableBindingChecked("exports",
        null), addImmutableBindingChecked("module", null), checkChild("exports"), child("body", inspect(
        (function(node) {
            return ((node.type === "WithStatement") ? seq(checkChild("bindings"), child("body",
                checkChild("body"))) : checkChild("body"));
        })))));
    addCheck("SwitchCase", seq(checkChild("test"), checkChild("consequent")));
    addCheck("CatchClause", block(inspect((function(node) {
        return addImmutableBindingChecked(node.param.name, node.param.loc);
    })), checkChild("param"), child("body", checkChild("body"))));
    addCheck(["StaticDeclaration", "VariableDeclaration"], checkChild("declarations"));
    addCheck("StaticDeclarator", inspect((function(node) {
        return addImmutableBindingChecked(node.id.name, node.loc);
    })));
    addCheck("VariableDeclarator", inspect((function(node) {
        var bind = (node.immutable ? addImmutableBindingChecked(node.id.name, node.loc) :
            addMutableBindingChecked(node.id.name, node.loc));
        return (node.recursive ? seq(bind, checkChild("id"), checkChild("init")) : seq(checkChild(
            "init"), bind, checkChild("id")));
    })));
    addCheck("Binding", inspect((function(node) {
        return (node.recursive ? seq(checkChild("pattern"), checkChild("value")) : seq(checkChild(
            "value"), checkChild("pattern")));
    })));
    addCheck("BlockStatement", block(checkChild("body")));
    addCheck("ExpressionStatement", checkChild("expression"));
    addCheck("IfStatement", seq(checkChild("test"), block(checkChild("consequent")), block(checkChild(
        "alternate"))));
    addCheck("WithStatement", block(checkChild("bindings"), child("body", checkChild("body"))));
    addCheck("SwitchStatement", block(checkChild("discriminant"), checkChild("cases")));
    addCheck(["ReturnStatement", "ThrowStatement"], checkChild("argument"));
    addCheck("TryStatement", seq(checkChild("block"), block(checkChild("handler")), block(checkChild(
        "finalizer"))));
    addCheck("WhileStatement", seq(checkChild("test"), block(checkChild("body"))));
    addCheck("DoWhileStatement", seq(block(checkChild("body")), checkChild("test")));
    addCheck("ForStatement", block(checkChild("init"), checkChild("test"), checkChild("update"), block(
        checkChild("body"))));
    addCheck("FunctionExpression", block(inspect((function(node) {
        return (node.id ? addImmutableBinding(node.id.name, node.loc) : pass);
    })), checkChild("params"), inspect((function(node) {
        return ((node.body.type === "BlockStatement") ? child("body", checkChild("body")) :
            checkChild("body"));
    }))));
    addCheck("UnaryExpression", checkChild("argument"));
    addCheck("AssignmentExpression", seq(child("left", checkTop, inspect((function(left) {
        return ((left.type === "Identifier") ? checkCanAssign(left.name, left.loc) : pass);
    }))), checkChild("right")));
    addCheck(["LogicalExpression", "BinaryExpression"], seq(checkChild("left"), checkChild("right")));
    addCheck("ConditionalExpression", seq(checkChild("test"), checkChild("consequent"), checkChild("alternate")));
    addCheck(["CallExpression", "NewExpression"], seq(checkChild("callee"), checkChild("args")));
    addCheck("MemberExpression", seq(checkChild("object"), inspect((function(node) {
        return (node.computed ? checkChild("property") : pass);
    }))));
    addCheck("ArrayExpression", checkChild("elements"));
    addCheck("ObjectExpression", checkChild("properties"));
    addCheck("LetExpression", block(checkChild("bindings"), checkChild("body")));
    addCheck("CurryExpression", seq(checkChild("base"), checkChild("args")));
    addCheck("SinkPattern", unique.chain((function(uid) {
        return setNode(setData(ast_value.Identifier.create(null, "_"), "uid", uid));
    })));
    addCheck("IdentifierPattern", seq(inspect((function(node) {
        return (node.reserved ? addImmutableBinding(node.id.name, node.loc) :
            addImmutableBindingChecked(node.id.name, node.loc));
    })), checkChild("id")));
    addCheck("ImportPattern", checkChild("pattern"));
    addCheck("AsPattern", seq(checkChild("id"), inspect((function(node) {
        return child("target", modifyNode((function(target) {
            return setData(target, "id", node.id);
        })), checkTop);
    }))));
    addCheck("ObjectPattern", inspect((function(node) {
        if (((!node.ud) || (!node.ud.id))) {
            return seq(unique.chain((function(uid) {
                var id = ast_pattern.IdentifierPattern.create(node.loc, setData(
                    ast_value.Identifier.create(null, "__o"), "uid", uid));
                (id.reserved = true);
                return setNode(ast_pattern.AsPattern.create(null, id, node));
            })), checkTop);
        }
        return checkChild("elements");
    })));
    addCheck("ObjectPatternElement", seq(checkChild("target"), checkChild("key")));
    addCheck("ArgumentsPattern", seq(checkChild("id"), checkChild("elements"), checkChild("self")));
    addCheck("ObjectValue", checkChild("value"));
    addCheck("Identifier", inspect((function(node) {
        return seq(examineScope((function(s) {
            return setNode(setData(node, "uid", s.getUid(node.name)));
        })), checkHasBinding(node.name, node.loc));
    })));
    (_check = (function(node) {
        if (Array.isArray(node)) {
            if ((!node.length)) return pass;
            return seq(down, seqa(node.map((function(_, i) {
                return ((i === (node.length - 1)) ? checkTop : next(checkTop, right));
            }))), up);
        }
        if (((node instanceof ast_node.Node) && checks[node.type])) return checks[node.type];
        return pass;
    }));
    var initialScope = fun.foldl.bind(null, Scope.addImmutableBinding, Scope.empty),
        suc = (function(x, s) {
            return x;
        }),
        fail = (function(x) {
            throw x;
        });
    (check = (function(ast, globals) {
        return run(seq(checkTop, move(zipper.root), extractNode.chain((function(x) {
            return extract.map((function(s) {
                return ({
                    "tree": x,
                    "data": ({
                        "unique": s.unique
                    })
                });
            }));
        }))), new(State)(khepriZipper(ast), initialScope((globals || [])), 1), suc, fail);
    }));
    (exports["check"] = check);
}));
/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lexical.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "khepri-ast/pattern", "khepri-ast/value", "khepri-ast-zipper",
    "akh/base", "akh/trans/state", "akh/identity", "akh/trans/error", "akh/unique", "./scope", "./fun",
    "zipper-m/trans/zipper"
], (function(require, exports, ast_node, ast_pattern, ast_value, __o, __o0, StateT, Identity, ErrorT, Unique, scope,
    __o1, ZipperT) {
    "use strict";
    var setData = ast_node["setData"],
        setUserData = ast_node["setUserData"],
        khepriZipper = __o["khepriZipper"],
        next = __o0["next"],
        seq = __o0["sequence"],
        seqa = __o0["sequencea"],
        Scope = scope["Scope"],
        foldl = __o1["foldl"],
        check, x, y, f, g, x0, y0, f0, g0, x1, y1, f1, g1, x2, y2, f2, g2, x3, y3, f3, g3, x4, y4, f4, g4, x5,
            y5, f5, g5, x6, y6, f6, g6, x7, y7, f7, g7, _check, Zipper = ZipperT(Unique),
        StateM = StateT(Zipper),
        M = ErrorT(StateM),
        run = (function(p, s, ctx, ok, err) {
            var x, y, f, g, x0, y0, f0, g0;
            return Unique.runUnique(ZipperT.runZipperT(StateT.evalStateT(ErrorT.runErrorT(p, ((x = ok), (y =
                StateM.of), (f = y), (g = x), (function(x) {
                return f(g(x));
            })), ((x0 = err), (y0 = StateM.of), (f0 = y0), (g0 = x0), (function(x) {
                return f0(g0(x));
            }))), s), ctx), 1000);
        }),
        error = M.fail,
        lift = M.lift,
        unique = lift(StateM.lift(Zipper.lift(Unique.unique))),
        extract = lift(StateM.get),
        examineScope = M.chain.bind(null, extract),
        modifyScope = ((x = lift), (y = StateM.modify), (f = x), (g = y), (function(x) {
            return f(g(x));
        })),
        push = modifyScope(scope.push),
        pop = modifyScope(scope.pop),
        inspect = M.chain.bind(null, lift(StateM.lift(Zipper.node))),
        extractNode = lift(StateM.lift(Zipper.node)),
        move = ((x0 = lift), (y0 = StateM.lift), (f0 = x0), (g0 = y0), (x1 = (function(x) {
            return f0(g0(x));
        })), (y1 = Zipper.move), (f1 = x1), (g1 = y1), (function(x) {
            return f1(g1(x));
        })),
        up = lift(StateM.lift(Zipper.up)),
        down = lift(StateM.lift(Zipper.down)),
        left = lift(StateM.lift(Zipper.left)),
        right = lift(StateM.lift(Zipper.right)),
        root = lift(StateM.lift(Zipper.root)),
        moveChild = ((x2 = lift), (y2 = StateM.lift), (f2 = x2), (g2 = y2), (x3 = (function(x) {
            return f2(g2(x));
        })), (y3 = Zipper.child), (f3 = x3), (g3 = y3), (function(x) {
            return f3(g3(x));
        })),
        modifyNode = ((x4 = lift), (y4 = StateM.lift), (f4 = x4), (g4 = y4), (x5 = (function(x) {
            return f4(g4(x));
        })), (y5 = Zipper.modifyNode), (f5 = x5), (g5 = y5), (function(x) {
            return f5(g5(x));
        })),
        setNode = ((x6 = lift), (y6 = StateM.lift), (f6 = x6), (g6 = y6), (x7 = (function(x) {
            return f6(g6(x));
        })), (y7 = Zipper.setNode), (f7 = x7), (g7 = y7), (function(x) {
            return f7(g7(x));
        })),
        checkTop = inspect((function(x) {
            return _check(x);
        })),
        child = (function(edge) {
            var args = arguments;
            return seq(moveChild(edge), seqa([].slice.call(args, 1)), up);
        }),
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
        addStaticBinding = (function(id, loc) {
            return modifyScope((function(s) {
                return Scope.addImmutableBinding(s, id, loc);
            }));
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
        addStaticBindingChecked = (function(id, loc) {
            return seq(checkCanAddOwnBinding(id, loc), addStaticBinding(id, loc));
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
    addCheck("Package", block(addImmutableBindingChecked("exports", null), addImmutableBindingChecked("module",
        null), checkChild("exports"), child("body", inspect((function(node) {
        return ((node.type === "WithStatement") ? seq(checkChild("bindings"), child("body",
            checkChild("body"))) : checkChild("body"));
    })))));
    addCheck("SwitchCase", seq(checkChild("test"), checkChild("consequent")));
    addCheck("CatchClause", block(inspect((function(node) {
        return addImmutableBindingChecked(node.param.name, node.param.loc);
    })), checkChild("param"), child("body", checkChild("body"))));
    addCheck(["StaticDeclaration", "VariableDeclaration"], checkChild("declarations"));
    addCheck("StaticDeclarator", inspect((function(node) {
        return addStaticBindingChecked(node.id.name, node.loc);
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
        return modifyNode((function(node) {
            return setData(node, "id", setData(ast_value.Identifier.create(null, "_"),
                "uid", uid));
        }));
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
    addCheck("ObjectPattern", checkChild("elements"));
    addCheck("ObjectPatternElement", seq(checkChild("target"), checkChild("key")));
    addCheck("ArgumentsPattern", seq(checkChild("id"), checkChild("elements"), checkChild("self")));
    addCheck("ObjectValue", checkChild("value"));
    addCheck("Identifier", inspect((function(node) {
        var name = node["name"],
            loc = node["loc"];
        return seq(examineScope((function(s) {
            return setNode(setData(node, "uid", s.getUid(name)));
        })), checkHasBinding(name, loc));
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
    var g8 = (function(x) {
        return x.concat("require");
    }),
        addBindings = foldl.bind(null, Scope.addImmutableBinding, Scope.empty),
        suc = (function(x, s) {
            return x;
        }),
        fail = (function(x) {
            throw x;
        });
    (check = (function(ast, globals, seed) {
        return run(seq(checkTop, root, extractNode.chain((function(x) {
            return unique.chain((function(unique) {
                return extract.map((function(s) {
                    return ({
                        "tree": x,
                        "data": ({
                            "unique": unique
                        })
                    });
                }));
            }));
        }))), addBindings(g8((globals || []))), khepriZipper(ast), suc, fail, seed);
    }));
    (exports["check"] = check);
}));
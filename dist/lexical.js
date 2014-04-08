/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lexical.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "khepri-ast/pattern", "khepri-ast/value", "khepri-ast-zipper",
    "akh/base", "akh/trans/state", "akh/identity", "akh/error", "akh/trans/error", "akh/unique",
    "zipper-m/trans/zipper", "./scope", "./fun"
], (function(require, exports, ast_node, ast_pattern, ast_value, __o, __o0, StateT, Identity, Error, ErrorT, Unique,
    ZipperT, scope, __o1) {
    "use strict";
    var setData = ast_node["setData"],
        setUserData = ast_node["setUserData"],
        khepriZipper = __o["khepriZipper"],
        next = __o0["next"],
        seq = __o0["sequence"],
        seqa = __o0["sequencea"],
        Scope = scope["Scope"],
        foldl = __o1["foldl"],
        check, x, y, x0, y0, x1, y1, x2, y2, reserved = (function(node) {
            return ((node && node.ud) && node.ud.reserved);
        }),
        _check, M = ErrorT(ZipperT(StateT(Unique))),
        run = (function(p, s, ctx, ok, err) {
            var y, y0;
            return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(ErrorT.runErrorT(p, ((y = M.inner.of), (
                function(x) {
                    return y(ok(x));
                })), ((y0 = M.inner.of), (function(x) {
                return y0(err(x));
            }))), ctx), s), 1000);
        }),
        error = M.fail,
        lift = M.lift,
        unique = M.chain.bind(null, M.liftInner.liftInner(Unique.unique)),
        extract = M.liftInner(M.inner.inner.get),
        examineScope = M.chain.bind(null, extract),
        modifyScope = ((x = M.liftInner), (y = M.inner.inner.modify), (function(x0) {
            return x(y(x0));
        })),
        push = modifyScope(scope.push),
        pop = modifyScope(scope.pop),
        inspect = M.chain.bind(null, lift(M.inner.node)),
        extractNode = lift(M.inner.node),
        up = lift(M.inner.up),
        down = lift(M.inner.down),
        right = lift(M.inner.right),
        root = lift(M.inner.root),
        moveChild = ((x0 = lift), (y0 = M.inner.child), (function(x1) {
            return x0(y0(x1));
        })),
        modifyNode = ((x1 = lift), (y1 = M.inner.modifyNode), (function(x2) {
            return x1(y1(x2));
        })),
        setNode = ((x2 = lift), (y2 = M.inner.setNode), (function(x3) {
            return x2(y2(x3));
        })),
        checkTop = inspect((function(x3) {
            return _check(x3);
        })),
        child = (function(edge) {
            var actions = [].slice.call(arguments, 1);
            return seq(moveChild(edge), seqa(actions), up);
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
            return unique((function(uid) {
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
            if (Array.isArray(type)) type.forEach((function(x3) {
                return addCheck(x3, check);
            }));
            else {
                (checks[type] = check);
            }
        });
    addCheck("Program", block(child("body", checkTop)));
    addCheck("PackageExports", child("exports", checkTop));
    addCheck("PackageExport", inspect((function(node) {
        return addMutableBindingChecked(node.id.name, node.loc);
    })));
    addCheck("Package", block(child("exports", checkTop), child("body", inspect((function(node) {
        return ((node.type === "WithStatement") ? seq(checkChild("bindings"), child("body",
            checkChild("body"))) : checkChild("body"));
    })))));
    addCheck("SwitchCase", seq(child("test", checkTop), child("consequent", checkTop)));
    addCheck("CatchClause", block(inspect((function(node) {
        return addImmutableBindingChecked(node.param.name, node.param.loc);
    })), child("param", checkTop), child("body", child("body", checkTop))));
    addCheck(["StaticDeclaration", "VariableDeclaration"], child("declarations", checkTop));
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
    addCheck("BlockStatement", block(child("body", checkTop)));
    addCheck("ExpressionStatement", child("expression", checkTop));
    addCheck("IfStatement", seq(child("test", checkTop), block(child("consequent", checkTop)), block(child(
        "alternate", checkTop))));
    addCheck("WithStatement", block(child("bindings", checkTop), child("body", child("body", checkTop))));
    addCheck("SwitchStatement", block(child("discriminant", checkTop), child("cases", checkTop)));
    addCheck(["ReturnStatement", "ThrowStatement"], child("argument", checkTop));
    addCheck("TryStatement", seq(child("block", checkTop), block(child("handler", checkTop)), block(child(
        "finalizer", checkTop))));
    addCheck("WhileStatement", seq(child("test", checkTop), block(child("body", checkTop))));
    addCheck("DoWhileStatement", seq(block(child("body", checkTop)), child("test", checkTop)));
    addCheck("ForStatement", block(child("init", checkTop), child("test", checkTop), child("update", checkTop),
        block(child("body", checkTop))));
    addCheck("FunctionExpression", block(inspect((function(node) {
        return (node.id ? addImmutableBinding(node.id.name, node.loc) : pass);
    })), child("id", checkTop), child("params", checkTop), inspect((function(node) {
        return ((node.body.type === "BlockStatement") ? child("body", checkChild("body")) :
            checkChild("body"));
    }))));
    addCheck("UnaryExpression", child("argument", checkTop));
    addCheck("AssignmentExpression", seq(child("left", checkTop, inspect((function(left) {
        return ((left.type === "Identifier") ? checkCanAssign(left.name, left.loc) : pass);
    }))), child("right", checkTop)));
    addCheck(["LogicalExpression", "BinaryExpression"], seq(child("left", checkTop), child("right", checkTop)));
    addCheck("ConditionalExpression", seq(child("test", checkTop), child("consequent", checkTop), child(
        "alternate", checkTop)));
    addCheck(["CallExpression", "NewExpression"], seq(child("callee", checkTop), child("args", checkTop)));
    addCheck("MemberExpression", seq(child("object", checkTop), inspect((function(node) {
        return (node.computed ? checkChild("property") : pass);
    }))));
    addCheck("ArrayExpression", child("elements", checkTop));
    addCheck("ObjectExpression", child("properties", checkTop));
    addCheck("LetExpression", block(child("bindings", checkTop), child("body", checkTop)));
    addCheck("CurryExpression", seq(child("base", checkTop), child("args", checkTop)));
    addCheck("SinkPattern", unique((function(uid) {
        return modifyNode((function(node) {
            return ast_pattern.IdentifierPattern.create(node.loc, setData(ast_value.Identifier
                .create(null, "_"), "uid", uid));
        }));
    })));
    addCheck("EllipsisPattern", child("id", checkTop));
    addCheck(["SliceUnpack", "RelativeUnpack", "ImportPattern"], child("pattern", checkTop));
    addCheck("IdentifierPattern", seq(inspect((function(node) {
        return (reserved(node) ? addImmutableBinding(node.id.name, node.loc) :
            addImmutableBindingChecked(node.id.name, node.loc));
    })), child("id", checkTop)));
    addCheck("AsPattern", seq(child("id", checkTop), inspect((function(node) {
        return child("target", modifyNode((function(target) {
            return setData(target, "id", node.id);
        })), checkTop);
    }))));
    addCheck("ObjectPattern", child("elements", checkTop));
    addCheck("ObjectPatternElement", seq(child("target", checkTop), child("key", checkTop)));
    addCheck("ArgumentsPattern", seq(child("id", checkTop), child("elements", checkTop), child("self", checkTop)));
    addCheck("ObjectValue", child("value", checkTop));
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
    var g = (function(x3) {
        return x3.concat("require", "module", "exports");
    }),
        addBindings = foldl.bind(null, Scope.addImmutableBinding, Scope.empty);
    (check = (function(ast, globals, seed) {
        return run(seq(checkTop, root, extractNode.chain((function(x3) {
            return unique((function(unique0) {
                return extract.map((function(s) {
                    return ({
                        "tree": x3,
                        "data": ({
                            "unique": unique0
                        })
                    });
                }));
            }));
        }))), addBindings(g((globals || []))), khepriZipper(ast), Error.of, Error.fail, seed);
    }));
    (exports["check"] = check);
}));
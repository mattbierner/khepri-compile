/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lexical.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "khepri-ast/pattern", "khepri-ast/value", "khepri-ast-zipper",
    "akh/base", "akh/trans/state", "akh/identity", "akh/error", "akh/trans/error", "akh/unique", "./scope", "./fun",
    "zipper-m/trans/zipper"
], (function(require, exports, ast_node, ast_pattern, ast_value, __o, __o0, StateT, Identity, Error, ErrorT, Unique,
    scope, __o1, ZipperT) {
    "use strict";
    var setData = ast_node["setData"],
        setUserData = ast_node["setUserData"],
        khepriZipper = __o["khepriZipper"],
        next = __o0["next"],
        seq = __o0["sequence"],
        seqa = __o0["sequencea"],
        Scope = scope["Scope"],
        foldl = __o1["foldl"],
        check, x, y, x0, y0, x1, y1, x2, y2, x3, y3, _check, M = ErrorT(ZipperT(StateT(Unique))),
        run = (function(p, s, ctx, ok, err) {
            var x, y, x0, y0;
            return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(ErrorT.runErrorT(p, ((x = ok), (y =
                M.inner.of), (function(x0) {
                return y(x(x0));
            })), ((x0 = ok), (y0 = M.inner.of), (function(x1) {
                return y0(x0(x1));
            }))), ctx), s), 1000);
        }),
        error = M.fail,
        lift = M.lift,
        unique = M.liftInner.liftInner(Unique.unique),
        extract = M.liftInner(M.inner.inner.get),
        examineScope = M.chain.bind(null, extract),
        modifyScope = ((x = M.liftInner), (y = M.inner.inner.modify), (function(x0) {
            return x(y(x0));
        })),
        push = modifyScope(scope.push),
        pop = modifyScope(scope.pop),
        inspect = M.chain.bind(null, lift(M.inner.node)),
        extractNode = lift(M.inner.node),
        move = ((x0 = lift), (y0 = M.inner.move), (function(x1) {
            return x0(y0(x1));
        })),
        up = lift(M.inner.up),
        down = lift(M.inner.down),
        left = lift(M.inner.left),
        right = lift(M.inner.right),
        root = lift(M.inner.root),
        moveChild = ((x1 = lift), (y1 = M.inner.child), (function(x2) {
            return x1(y1(x2));
        })),
        modifyNode = ((x2 = lift), (y2 = M.inner.modifyNode), (function(x3) {
            return x2(y2(x3));
        })),
        setNode = ((x3 = lift), (y3 = M.inner.setNode), (function(x4) {
            return x3(y3(x4));
        })),
        checkTop = inspect((function(x4) {
            return _check(x4);
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
            if (Array.isArray(type)) type.forEach((function(x4) {
                return addCheck(x4, check);
            }));
            else {
                (checks[type] = check);
            }
        });
    addCheck.bind(null, "Program")(block(child("body", checkTop)));
    addCheck.bind(null, "PackageExports")(child("exports", checkTop));
    addCheck.bind(null, "PackageExport")(inspect((function(node) {
        return addMutableBindingChecked(node.id.name, node.loc);
    })));
    addCheck.bind(null, "Package")(block(seq(examineScope((function(s) {
        var start, binding, end;
        return (s.hasOwnBinding("exports") ? ((start = (null && null.start)), (binding = s.getBinding(
            "exports")), (end = (binding.loc && binding.loc.start)), error((((
                "'exports' at:" + start) + " already bound for scope from:") +
            end))) : pass);
    })), seq(modifyScope((function(s) {
        return Scope.addImmutableBinding(s, "exports", null);
    })), unique.chain((function(uid) {
        return modifyScope((function(s) {
            return Scope.addUid(s, "exports", uid);
        }));
    })))), seq(examineScope((function(s) {
        var start, binding, end;
        return (s.hasOwnBinding("module") ? ((start = (null && null.start)), (binding = s.getBinding(
            "module")), (end = (binding.loc && binding.loc.start)), error((((
                "'module' at:" + start) + " already bound for scope from:") +
            end))) : pass);
    })), seq(modifyScope((function(s) {
        return Scope.addImmutableBinding(s, "module", null);
    })), unique.chain((function(uid) {
        return modifyScope((function(s) {
            return Scope.addUid(s, "module", uid);
        }));
    })))), child("exports", checkTop), child("body", inspect((function(node) {
        return ((node.type === "WithStatement") ? seq(checkChild("bindings"), child("body",
            checkChild("body"))) : checkChild("body"));
    })))));
    addCheck.bind(null, "SwitchCase")(seq(child("test", checkTop), child("consequent", checkTop)));
    addCheck.bind(null, "CatchClause")(block(inspect((function(node) {
        return addImmutableBindingChecked(node.param.name, node.param.loc);
    })), child("param", checkTop), child("body", child("body", checkTop))));
    addCheck.bind(null, ["StaticDeclaration", "VariableDeclaration"])(child("declarations", checkTop));
    addCheck.bind(null, "StaticDeclarator")(inspect((function(node) {
        return addStaticBindingChecked(node.id.name, node.loc);
    })));
    addCheck.bind(null, "VariableDeclarator")(inspect((function(node) {
        var bind = (node.immutable ? addImmutableBindingChecked(node.id.name, node.loc) :
            addMutableBindingChecked(node.id.name, node.loc));
        return (node.recursive ? seq(bind, checkChild("id"), checkChild("init")) : seq(checkChild(
            "init"), bind, checkChild("id")));
    })));
    addCheck.bind(null, "Binding")(inspect((function(node) {
        return (node.recursive ? seq(checkChild("pattern"), checkChild("value")) : seq(checkChild(
            "value"), checkChild("pattern")));
    })));
    addCheck.bind(null, "BlockStatement")(block(child("body", checkTop)));
    addCheck.bind(null, "ExpressionStatement")(child("expression", checkTop));
    addCheck.bind(null, "IfStatement")(seq(child("test", checkTop), block(child("consequent", checkTop)), block(
        child("alternate", checkTop))));
    addCheck.bind(null, "WithStatement")(block(child("bindings", checkTop), child("body", child("body",
        checkTop))));
    addCheck.bind(null, "SwitchStatement")(block(child("discriminant", checkTop), child("cases", checkTop)));
    addCheck.bind(null, ["ReturnStatement", "ThrowStatement"])(child("argument", checkTop));
    addCheck.bind(null, "TryStatement")(seq(child("block", checkTop), block(child("handler", checkTop)), block(
        child("finalizer", checkTop))));
    addCheck.bind(null, "WhileStatement")(seq(child("test", checkTop), block(child("body", checkTop))));
    addCheck.bind(null, "DoWhileStatement")(seq(block(child("body", checkTop)), child("test", checkTop)));
    addCheck.bind(null, "ForStatement")(block(child("init", checkTop), child("test", checkTop), child("update",
        checkTop), block(child("body", checkTop))));
    addCheck.bind(null, "FunctionExpression")(block(inspect((function(node) {
        return (node.id ? addImmutableBinding(node.id.name, node.loc) : pass);
    })), child("id", checkTop), child("params", checkTop), inspect((function(node) {
        return ((node.body.type === "BlockStatement") ? child("body", checkChild("body")) :
            checkChild("body"));
    }))));
    addCheck.bind(null, "UnaryExpression")(child("argument", checkTop));
    addCheck.bind(null, "AssignmentExpression")(seq(child("left", checkTop, inspect((function(left0) {
        return ((left0.type === "Identifier") ? checkCanAssign(left0.name, left0.loc) :
            pass);
    }))), child("right", checkTop)));
    addCheck.bind(null, ["LogicalExpression", "BinaryExpression"])(seq(child("left", checkTop), child("right",
        checkTop)));
    addCheck.bind(null, "ConditionalExpression")(seq(child("test", checkTop), child("consequent", checkTop),
        child("alternate", checkTop)));
    addCheck.bind(null, ["CallExpression", "NewExpression"])(seq(child("callee", checkTop), child("args",
        checkTop)));
    addCheck.bind(null, "MemberExpression")(seq(child("object", checkTop), inspect((function(node) {
        return (node.computed ? checkChild("property") : pass);
    }))));
    addCheck.bind(null, "ArrayExpression")(child("elements", checkTop));
    addCheck.bind(null, "ObjectExpression")(child("properties", checkTop));
    addCheck.bind(null, "LetExpression")(block(child("bindings", checkTop), child("body", checkTop)));
    addCheck.bind(null, "CurryExpression")(seq(child("base", checkTop), child("args", checkTop)));
    addCheck.bind(null, "SinkPattern")(unique.chain((function(uid) {
        return modifyNode((function(node) {
            return setData(node, "id", setData(ast_value.Identifier.create(null, "_"),
                "uid", uid));
        }));
    })));
    addCheck.bind(null, "IdentifierPattern")(seq(inspect((function(node) {
        return (node.reserved ? addImmutableBinding(node.id.name, node.loc) :
            addImmutableBindingChecked(node.id.name, node.loc));
    })), child("id", checkTop)));
    addCheck.bind(null, "ImportPattern")(child("pattern", checkTop));
    addCheck.bind(null, "AsPattern")(seq(child("id", checkTop), inspect((function(node) {
        return child("target", modifyNode((function(target) {
            return setData(target, "id", node.id);
        })), checkTop);
    }))));
    addCheck.bind(null, "ObjectPattern")(child("elements", checkTop));
    addCheck.bind(null, "ObjectPatternElement")(seq(child("target", checkTop), child("key", checkTop)));
    addCheck.bind(null, "ArgumentsPattern")(seq(child("id", checkTop), child("elements", checkTop), child(
        "self", checkTop)));
    addCheck.bind(null, "ObjectValue")(child("value", checkTop));
    addCheck.bind(null, "Identifier")(inspect((function(node) {
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
    var g = (function(x4) {
        return x4.concat("require");
    }),
        addBindings = foldl.bind(null, Scope.addImmutableBinding, Scope.empty);
    (check = (function(ast, globals, seed) {
        return run(seq(checkTop, root, extractNode.chain((function(x4) {
            return unique.chain((function(unique0) {
                return extract.map((function(s) {
                    return ({
                        "tree": x4,
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
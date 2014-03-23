/*
 * THIS FILE IS AUTO GENERATED from 'lib/lexical.kep'
 * DO NOT EDIT
*/"use strict";
var ast_node = require("khepri-ast")["node"],
    setData = ast_node["setData"],
    setUserData = ast_node["setUserData"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    zipper = require("neith")["zipper"],
    __o = require("khepri-ast-zipper"),
    khepriZipper = __o["khepriZipper"],
    record = require("bes")["record"],
    __o0 = require("akh")["base"],
    next = __o0["next"],
    seq = __o0["sequence"],
    seqa = __o0["sequencea"],
    StateT = require("akh")["trans"]["state"],
    Identity = require("akh")["identity"],
    ErrorT = require("akh")["trans"]["error"],
    scope = require("./scope"),
    Scope = scope["Scope"],
    fun = require("./fun"),
    Zipper = require("./control/zipper"),
    check, _check, State = record.declare(null, ["scope", "unique"]),
    StateM = StateT(Zipper),
    M = ErrorT(StateM),
    run = (function(p, s, ctx, ok, err) {
        return Zipper.run(StateT.evalStateT(ErrorT.runErrorT(p, (function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(StateM.of, ok), (function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(StateM.of, err)), s), ctx);
    }),
    error = M.fail,
    lift = M.lift,
    extract = lift(StateM.get),
    inspectStateWith = M.chain.bind(null, extract),
    modifyState = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(lift, StateM.modify),
    putState = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(lift, StateM.put),
    unique = inspectStateWith((function(s) {
        return next(putState(s.setUnique((s.unique + 1))), M.of(s.unique));
    })),
    examineScope = (function(f) {
        return inspectStateWith((function(s) {
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
    inspect = M.chain.bind(null, lift(StateM.lift(Zipper.node))),
    extractNode = lift(StateM.lift(Zipper.node)),
    move = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })((function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(lift, StateM.lift), Zipper.move),
    up = lift(StateM.lift(Zipper.up)),
    down = lift(StateM.lift(Zipper.down)),
    left = lift(StateM.lift(Zipper.left)),
    right = lift(StateM.lift(Zipper.right)),
    moveChild = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })((function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(lift, StateM.lift), Zipper.child),
    modifyNode = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })((function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(lift, StateM.lift), Zipper.modifyNode),
    setNode = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })((function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(lift, StateM.lift), Zipper.setNode),
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
            return (s.hasBinding(id) ? pass : error(((("Undeclared identifier:'" + id) + "' at:") + loc)));
        }));
    }),
    checkCanAddOwnBinding = (function(id, loc) {
        return examineScope((function(s) {
            var start, binding, end;
            return (s.hasOwnBinding(id) ? ((start = (loc && loc.start)), (binding = s.getBinding(id)), (end =
                (binding.loc && binding.loc.start)), error(((((("'" + id) + "' at:") + start) +
                " already bound for scope from:") + end))) : pass);
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
addCheck("Package", block(addImmutableBindingChecked("require", null), addImmutableBindingChecked("exports", null),
    addImmutableBindingChecked("module", null), checkChild("exports"), child("body", inspect((function(node) {
        return ((node.type === "WithStatement") ? seq(checkChild("bindings"), child("body", checkChild(
            "body"))) : checkChild("body"));
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
    return (node.recursive ? seq(bind, checkChild("id"), checkChild("init")) : seq(checkChild("init"), bind,
        checkChild("id")));
})));
addCheck("Binding", inspect((function(node) {
    return (node.recursive ? seq(checkChild("pattern"), checkChild("value")) : seq(checkChild("value"),
        checkChild("pattern")));
})));
addCheck("BlockStatement", block(checkChild("body")));
addCheck("ExpressionStatement", checkChild("expression"));
addCheck("IfStatement", seq(checkChild("test"), block(checkChild("consequent")), block(checkChild("alternate"))));
addCheck("WithStatement", block(checkChild("bindings"), child("body", checkChild("body"))));
addCheck("SwitchStatement", block(checkChild("discriminant"), checkChild("cases")));
addCheck(["ReturnStatement", "ThrowStatement"], checkChild("argument"));
addCheck("TryStatement", seq(checkChild("block"), block(checkChild("handler")), block(checkChild("finalizer"))));
addCheck("WhileStatement", seq(checkChild("test"), block(checkChild("body"))));
addCheck("DoWhileStatement", seq(block(checkChild("body")), checkChild("test")));
addCheck("ForStatement", block(checkChild("init"), checkChild("test"), checkChild("update"), block(checkChild("body"))));
addCheck("FunctionExpression", block(inspect((function(node) {
    return (node.id ? addImmutableBinding(node.id.name, node.loc) : pass);
})), checkChild("params"), inspect((function(node) {
    return ((node.body.type === "BlockStatement") ? child("body", checkChild("body")) : checkChild(
        "body"));
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
    return (node.reserved ? addImmutableBinding(node.id.name, node.loc) : addImmutableBindingChecked(
        node.id.name, node.loc));
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
            var id = ast_pattern.IdentifierPattern.create(node.loc, setData(ast_value.Identifier
                .create(null, "__o"), "uid", uid));
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
    }))), new(State)(initialScope((globals || [])), 1), khepriZipper(ast), suc, fail);
}));
(exports["check"] = check);
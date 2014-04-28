/*
 * THIS FILE IS AUTO GENERATED from 'lib/transform/transform.kep'
 * DO NOT EDIT
*/"use strict";
var record = require("bes")["record"],
    ecma_clause = require("ecma-ast")["clause"],
    ecma_declaration = require("ecma-ast")["declaration"],
    ecma_expression = require("ecma-ast")["expression"],
    ecma_node = require("ecma-ast")["node"],
    ecma_program = require("ecma-ast")["program"],
    ecma_statement = require("ecma-ast")["statement"],
    ecma_value = require("ecma-ast")["value"],
    khepri_declaration = require("khepri-ast")["declaration"],
    khepri_expression = require("khepri-ast")["expression"],
    khepri_node = require("khepri-ast")["node"],
    setData = khepri_node["setData"],
    khepri_pattern = require("khepri-ast")["pattern"],
    khepri_statement = require("khepri-ast")["statement"],
    khepri_value = require("khepri-ast")["value"],
    Unique = require("akh")["unique"],
    StateT = require("akh")["trans"]["statei"],
    __o = require("akh")["base"],
    liftM2 = __o["liftM2"],
    next = __o["next"],
    seq = __o["sequence"],
    TreeZipperT = require("zipper-m")["trans"]["tree"],
    walk = require("zipper-m")["walk"],
    __o0 = require("../ast"),
    type = __o0["type"],
    getUid = __o0["getUid"],
    scope = require("../lexical/scope"),
    Scope = scope["Scope"],
    fun = require("../fun"),
    concat = fun["concat"],
    flatten = fun["flatten"],
    flip = fun["flip"],
    filter = fun["filter"],
    __o1 = require("../builtin"),
    builtins = __o1["builtins"],
    __o2 = require("./unpack"),
    expandBinding = __o2["expandBinding"],
    expandBindings = __o2["expandBindings"],
    expandArgumentsPattern = __o2["expandArgumentsPattern"],
    _ = require("./package_manager/amd"),
    _0 = require("./package_manager/node"),
    transform, x, y, f, f0, x0, y0, x1, y1, x2, y2, useStrict, uid, uid0, identifier = (function(loc, name) {
        return ecma_value.Identifier.create(loc, name);
    }),
    variableDeclaration = khepri_declaration.VariableDeclaration.create,
    variableDeclarator = ecma_declaration.VariableDeclarator.create,
    State = record.declare(null, ["scope", "packageManager", "bindings"]);
(State.empty = State.create(Scope.empty, null, [
    [], null
]));
var M = TreeZipperT(StateT(Unique)),
    run = (function(m, s, ctx, seed) {
        return Unique.runUnique(StateT.evalStateT(TreeZipperT.runTreeZipperT(m, ctx), s), seed);
    }),
    pass = M.of(null),
    cons = liftM2.bind(null, concat),
    enumeration = fun.foldr.bind(null, flip(cons), M.of([])),
    extract = M.lift(M.inner.get),
    modifyState = ((x = M.lift), (y = M.inner.modify), (function(z) {
        return x(y(z));
    })),
    inspectStateWith = M.chain.bind(null, extract),
    node = M.node,
    withNode = M.chain.bind(null, node),
    modify = M.modifyNode,
    set = M.setNode,
    inspectScope = (function(f) {
        return extract.map((function(z) {
            return f(z.scope);
        }));
    }),
    inspectScopeWith = (function(f) {
        return extract.chain((function(z) {
            return f(z.scope);
        }));
    }),
    packageManager = extract.map((function(x0) {
        return x0.packageManager;
    })),
    setScope = (function(scope0) {
        return modifyState((function(s) {
            return s.setScope(scope0);
        }));
    }),
    enterBlock = ((f = scope.push), modifyState((function(s) {
        return s.setScope(f(s.scope));
    }))),
    exitBlock = ((f0 = scope.pop), modifyState((function(s) {
        return s.setScope(f0(s.scope));
    }))),
    getMapping = (function(uid) {
        return inspectScope((function(s) {
            return s.getMapping(uid);
        }));
    }),
    addVar = (function(id, uid) {
        return inspectScopeWith((function(s) {
            var name;
            return (s.hasMapping(uid) ? setScope(scope.addMutableBinding(s, id)) : ((name = s.getUnusedId(
                id)), setScope(scope.addMapping(scope.addMutableBinding(s, name), uid, name))));
        }));
    }),
    pushBindings = modifyState((function(s) {
        return s.setBindings([
            [], s.bindings
        ]);
    })),
    popBindings = modifyState((function(s) {
        return s.setBindings(s.bindings[1]);
    })),
    addBindings = (function(bindings) {
        return modifyState((function(s) {
            return s.setBindings([s.bindings[0].concat(bindings), s.bindings[1]]);
        }));
    }),
    getBindings = M.chain.bind(null, inspectStateWith(((x0 = enumeration), (y0 = fun.map.bind(null, (function(__o3) {
        var uid = __o3[1];
        return getMapping(uid);
    }))), (function(z) {
        var z0 = z.bindings[0];
        return x0(y0(z0));
    })))),
    _trans, _transform = withNode((function(node0) {
        return _trans(node0);
    })),
    bindingToDeclarator = (function(x1) {
        return variableDeclarator(null, x1.pattern, x1.value);
    }),
    unpack = ((x1 = expandBinding), (y1 = fun.map.bind(null, (function(x2) {
        return variableDeclarator(null, x2.pattern, x2.value);
    }))), (function(z) {
        return y1(x1(z));
    })),
    unpackAssign = ((x2 = expandBinding), (y2 = fun.map.bind(null, (function(x3) {
        return ecma_expression.AssignmentExpression.create(null, "=", x3.pattern, x3.value);
    }))), (function(z) {
        return y2(x2(z));
    })),
    withStatementNoImport = (function(loc, bindings, body) {
        var vars = flatten(fun.map(unpack, bindings)),
            prefix = variableDeclaration(null, vars);
        return khepri_statement.BlockStatement.create(loc, concat(prefix, body.body));
    }),
    withStatement = (function(packageManager0, loc, bindings, body) {
        var flattenImport = (function(imp) {
            return ((type(imp) === "ImportPattern") ? khepri_declaration.Binding.create(null, imp.pattern,
                packageManager0.importPackage(imp.from.value)) : imp);
        });
        return withStatementNoImport(loc, fun.map(flattenImport, bindings), body);
    }),
    functionExpression = (function(loc, id, parameters, functionBody, prefix) {
        var params = parameters.elements,
            bindings = fun.map(bindingToDeclarator, expandArgumentsPattern(parameters, ecma_expression.ThisExpression
                .create(null))),
            body = ((type(functionBody) === "BlockStatement") ? functionBody.body : khepri_statement.ReturnStatement
                .create(null, functionBody));
        return khepri_expression.FunctionExpression.create(loc, id, params, khepri_statement.BlockStatement.create(
            body.loc, concat((prefix || []), variableDeclaration(null, bindings), body)));
    }),
    letExpression = (function(loc, bindings, body) {
        return ecma_expression.SequenceExpression.create(null, flatten(concat(fun.map(unpackAssign, bindings), body)));
    }),
    curryExpression = (function(loc, base, args) {
        return khepri_expression.CallExpression.create(loc, khepri_expression.MemberExpression.create(null, base,
            identifier(null, "bind")), concat(ecma_value.Literal.create(null, "null", null), args));
    }),
    packageBlock = (function(packageManager0, loc, exports0, body) {
        var x3, x4, imports = ((type(body) === "WithStatement") ? filter(((x3 = type), (function(z) {
                var y3 = x3(z);
                return ("ImportPattern" === y3);
            })), body.bindings) : []),
            targets = fun.reduce(imports, (function(p, c) {
                (p[c.from.value] = c.pattern);
                return p;
            }), ({})),
            fBody = ((type(body) === "WithStatement") ? khepri_statement.WithStatement.create(null, filter(((x4 =
                type), (function(z) {
                var y3 = x4(z);
                return ("ImportPattern" !== y3);
            })), body.bindings), body.body) : body);
        return packageManager0.definePackage(loc, exports0, imports, targets, fBody);
    }),
    transformers = ({}),
    addTransform = (function(type0, pre, post) {
        if (Array.isArray(type0)) return type0.map((function(x3) {
            return addTransform(x3, pre, post);
        }));
        (transformers[type0] = ({
            pre: pre,
            post: post
        }));
    });
addTransform("VariableDeclaration", null, modify((function(__o3) {
    var loc = __o3["loc"],
        declarations = __o3["declarations"];
    return ecma_declaration.VariableDeclaration.create(loc, declarations);
})));
addTransform("VariableDeclarator", null, modify((function(node0) {
    return ecma_declaration.VariableDeclarator.create(node0.loc, node0.id, node0.init);
})));
addTransform("StaticDeclaration", modify((function(__o3) {
    var loc = __o3["loc"];
    return ecma_statement.EmptyStatement.create(loc);
})));
addTransform("CatchClause", null, modify((function(node0) {
    return ecma_clause.CatchClause.create(node0.loc, node0.param, node0.body);
})));
addTransform("SwitchCase", null, modify((function(node0) {
    return ecma_clause.SwitchCase.create(node0.loc, node0.test, node0.consequent);
})));
addTransform("BlockStatement", pushBindings, seq(getBindings((function(bindings) {
    return modify((function(node0) {
        return ecma_statement.BlockStatement.create(node0.loc, concat(ecma_declaration.VariableDeclaration
            .create(null, bindings.map((function(x3) {
                return ecma_declaration.VariableDeclarator.create(null,
                    identifier(null, x3));
            }))), node0.body));
    }));
})), popBindings));
addTransform("ExpressionStatement", null, modify((function(node0) {
    return ecma_statement.ExpressionStatement.create(node0.loc, node0.expression);
})));
addTransform("IfStatement", null, modify((function(node0) {
    return ecma_statement.IfStatement.create(node0.loc, node0.test, node0.consequent, node0.alternate);
})));
addTransform("WithStatement", next(packageManager.chain((function(packageManager0) {
    return modify((function(node0) {
        return withStatement(packageManager0, node0.loc, node0.bindings, node0.body);
    }));
})), _transform));
addTransform("SwitchStatement", null, modify((function(node0) {
    return ecma_statement.SwitchStatement.create(node0.loc, node0.discriminant, node0.cases);
})));
addTransform("ReturnStatement", null, modify((function(node0) {
    return ecma_statement.ReturnStatement.create(node0.loc, node0.argument);
})));
addTransform("ThrowStatement", null, modify((function(node0) {
    return ecma_statement.ThrowStatement.create(node0.loc, node0.argument);
})));
addTransform("BreakStatement", modify((function(node0) {
    return ecma_statement.BreakStatement.create(node0.loc, null);
})));
addTransform("ContinueStatement", modify((function(node0) {
    return ecma_statement.ContinueStatement.create(node0.loc, null);
})));
addTransform("TryStatement", null, modify((function(node0) {
    return ecma_statement.TryStatement.create(node0.loc, node0.block, node0.handler, node0.finalizer);
})));
addTransform("WhileStatement", null, modify((function(node0) {
    return ecma_statement.WhileStatement.create(node0.loc, node0.test, node0.body);
})));
addTransform("DoWhileStatement", null, modify((function(node0) {
    return ecma_statement.DoWhileStatement.create(node0.loc, node0.body, node0.test);
})));
addTransform("ForStatement", null, modify((function(node0) {
    return ecma_statement.ForStatement.create(node0.loc, node0.init, node0.test, node0.update, node0.body);
})));
addTransform("AssignmentExpression", null, modify((function(node0) {
    return ecma_expression.AssignmentExpression.create(node0.loc, "=", node0.left, node0.right);
})));
addTransform("UnaryExpression", null, modify((function(node0) {
    return ecma_expression.UnaryExpression.create(node0.loc, ((node0.operator === "++") ? "+" : ((node0.operator ===
        "--") ? "-" : node0.operator)), node0.argument);
})));
addTransform("BinaryExpression", null, modify((function(node0) {
    return ecma_expression.BinaryExpression.create(node0.loc, node0.operator, node0.left, node0.right);
})));
addTransform("LogicalExpression", null, modify((function(node0) {
    return ecma_expression.LogicalExpression.create(node0.loc, node0.operator, node0.left, node0.right);
})));
addTransform("ConditionalExpression", null, modify((function(node0) {
    return ecma_expression.ConditionalExpression.create(node0.loc, node0.test, node0.consequent, node0.alternate);
})));
addTransform("NewExpression", null, modify((function(node0) {
    return ecma_expression.NewExpression.create(node0.loc, node0.callee, node0.args);
})));
addTransform("CallExpression", null, modify((function(node0) {
    return ecma_expression.CallExpression.create(node0.loc, node0.callee, node0.args);
})));
addTransform("MemberExpression", null, modify((function(node0) {
    return ecma_expression.MemberExpression.create(node0.loc, node0.object, node0.property, node0.computed);
})));
addTransform("LetExpression", seq(withNode((function(node0) {
    var bindings = flatten(fun.map((function(x3) {
        return (x3 ? expandBindings(null, x3.pattern) : []);
    }), node0.bindings)),
        identifiers = fun.map((function(x3) {
            return [x3.pattern.id.name, getUid(x3.pattern.id)];
        }), bindings);
    return addBindings(identifiers);
})), modify((function(node0) {
    return letExpression(node0.loc, node0.bindings, node0.body);
}))));
addTransform("CurryExpression", modify((function(node0) {
    return curryExpression(node0.loc, node0.base, node0.args);
})));
addTransform("FunctionExpression", seq(enterBlock, modify((function(node0) {
    return functionExpression(node0.loc, node0.id, node0.params, node0.body, (node0.ud && node0.ud.prefix));
}))), seq(modify((function(node0) {
    return ecma_expression.FunctionExpression.create(null, node0.id, node0.params, node0.body);
})), exitBlock));
addTransform("ArrayExpression", null, modify((function(node0) {
    return ecma_expression.ArrayExpression.create(node0.loc, node0.elements);
})));
addTransform("ObjectExpression", null, modify((function(node0) {
    return ecma_expression.ObjectExpression.create(node0.loc, node0.properties);
})));
addTransform("ObjectValue", null, modify((function(node0) {
    return ecma_value.ObjectValue.create(node0.loc, node0.key, node0.value);
})));
addTransform(["IdentifierPattern", "AsPattern", "ArgumentsPattern"], null, modify((function(x3) {
    return x3.id;
})));
addTransform(["ObjectPattern", "EllipsisPattern", "SinkPattern"], null, modify((function(node0) {
    return (node0.ud && node0.ud.id);
})));
addTransform("Program", ((useStrict = khepri_statement.ExpressionStatement.create(null, khepri_value.Literal.create(
    null, "string", "use strict"))), seq(pushBindings, modify((function(node0) {
    return ((type(node0.body) === "Package") ? node0 : setData(node0, "prefix", useStrict));
})))), getBindings((function(bindings) {
    return modify((function(node0) {
        return ecma_program.Program.create(node0.loc, concat(((node0.ud && node0.ud.prefix) ? node0
            .ud.prefix : []), ecma_declaration.VariableDeclaration.create(null, bindings.map(
            (function(x3) {
                return ecma_declaration.VariableDeclarator.create(null, identifier(
                    null, x3));
            }))), node0.body));
    }));
})));
addTransform("Package", packageManager.chain((function(packageManager0) {
    return modify((function(node0) {
        return packageBlock(packageManager0, node0.loc, node0.exports, node0.body);
    }));
})));
addTransform("Identifier", null, withNode((function(node0) {
    return (getUid(node0) ? next(addVar(node0.name, getUid(node0)), getMapping(getUid(node0))
        .chain((function(name) {
            return set(identifier(node0.loc, name));
        }))) : set(identifier(node0.loc, node0.name)));
})));
(_trans = (function(node0) {
    var t;
    return ((node0 instanceof khepri_node.Node) ? ((t = transformers[type(node0)]), ((t && t.pre) || pass)) :
        pass);
}));
var _transformPost = withNode((function(node0) {
    var t;
    return ((node0 instanceof khepri_node.Node) ? ((t = transformers[type(node0)]), ((t && t.post) || pass)) :
        pass);
})),
    rewrite = walk(M, _transform, _transformPost),
    transformProgram = seq(((uid = getUid(builtins.require)), extract.chain((function(z) {
        var name, s = z.scope;
        return (s.hasMapping(uid) ? setScope(scope.addMutableBinding(s, "require")) : ((name = s.getUnusedId(
            "require")), setScope(scope.addMapping(scope.addMutableBinding(s, name), uid, name))));
    }))), ((uid0 = getUid(builtins.exports)), extract.chain((function(z) {
        var name, s = z.scope;
        return (s.hasMapping(uid0) ? setScope(scope.addMutableBinding(s, "exports")) : ((name = s.getUnusedId(
            "exports")), setScope(scope.addMapping(scope.addMutableBinding(s, name), uid0, name))));
    }))), rewrite, node),
    getPackageManager = (function(manager) {
        var amd_manager = require("./package_manager/amd"),
            node_manager = require("./package_manager/node");
        return ((manager === "node") ? node_manager : amd_manager);
    });
(transform = (function(ast, manager) {
    var packageManager0 = getPackageManager(manager),
        s = State.empty.setPackageManager(packageManager0);
    return run(transformProgram, s, ast);
}));
(exports["transform"] = transform);
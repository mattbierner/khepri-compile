/*
 * THIS FILE IS AUTO GENERATED from 'lib/transform.kep'
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
    khepri_clause = require("khepri-ast")["clause"],
    khepri_declaration = require("khepri-ast")["declaration"],
    khepri_expression = require("khepri-ast")["expression"],
    khepri_node = require("khepri-ast")["node"],
    setData = khepri_node["setData"],
    khepri_pattern = require("khepri-ast")["pattern"],
    khepri_program = require("khepri-ast")["program"],
    khepri_statement = require("khepri-ast")["statement"],
    khepri_value = require("khepri-ast")["value"],
    __o = require("khepri-ast-zipper"),
    khepriZipper = __o["khepriZipper"],
    Unique = require("akh")["unique"],
    StateT = require("akh")["trans"]["state"],
    __o0 = require("akh")["base"],
    next = __o0["next"],
    seq = __o0["sequence"],
    seqa = __o0["sequencea"],
    ZipperT = require("zipper-m")["trans"]["zipper"],
    walk = require("zipper-m")["walk"],
    scope = require("./scope"),
    fun = require("./fun"),
    flip = fun["flip"],
    builtins = require("./builtin"),
    innerPattern = require("./unpack"),
    transform, M = ZipperT(StateT(Unique)),
    run = (function(m, s, ctx, seed) {
        return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(m, ctx), s), seed);
    }),
    ok = M.of,
    bind = M.chain,
    pass = ok(null),
    cons = (function(a, b) {
        return a.chain((function(x) {
            return b.map((function(y) {
                return [x].concat(y);
            }));
        }));
    }),
    enumeration = fun.foldr.bind(null, flip(cons), ok([])),
    State = record.declare(null, ["scope", "packageManager", "bindings"]);
(State.empty = State.create(scope.Scope.empty, null, [
    [], null
]));
var extract = M.lift(M.inner.get),
    setState = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(M.lift, M.inner.put),
    modifyState = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(M.lift, M.inner.modify),
    inspectStateWith = M.chain.bind(null, extract),
    inspectScopeWith = (function(f) {
        return bind(extract, (function(s) {
            return f(s.scope);
        }));
    }),
    packageManager = inspectStateWith((function(s) {
        return ok(s.packageManager);
    })),
    modifyScope = (function(f) {
        return modifyState((function(s) {
            return s.setScope(f(s.scope));
        }));
    }),
    setScope = (function(s) {
        return modifyScope((function() {
            return s;
        }));
    }),
    setBindings = (function(bindings) {
        return modifyState((function(s) {
            return s.setBindings(bindings);
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
    node = M.node,
    modify = M.modifyNode,
    set = M.setNode,
    enterBlock = inspectScopeWith((function(s) {
        return setScope(scope.Scope.empty.setOuter(s));
    })),
    exitBlock = inspectScopeWith((function(s) {
        return setScope(s.outer);
    })),
    addVar = (function(id, uid) {
        return inspectScopeWith((function(s) {
            var name;
            return (s.hasMapping(uid) ? setScope(scope.Scope.addMutableBinding(s, id)) : ((name = s.getUnusedId(
                id)), setScope(scope.Scope.addMapping(scope.Scope.addMutableBinding(s, name), uid,
                name))));
        }));
    }),
    getMapping = (function(uid, f) {
        return inspectScopeWith((function(s) {
            return f(s.getMapping(uid));
        }));
    }),
    getName = (function(name, uid) {
        return getMapping(uid, ok);
    }),
    getBindings = (function(f) {
        return bind(inspectStateWith((function(s) {
            return enumeration(fun.map((function(__o) {
                var name = __o[0],
                    uid = __o[1];
                return getName(name, uid);
            }), s.bindings[0]));
        })), f);
    }),
    _trans, _transform = bind(node, (function(x) {
        return _trans(x);
    })),
    identifier = (function(loc, name) {
        return ecma_value.Identifier.create(loc, name);
    }),
    stringLiteral = (function(loc, value) {
        return ecma_value.Literal.create(loc, "string", value);
    }),
    nullLiteral = (function(loc) {
        return ecma_value.Literal.create(loc, "null", null);
    }),
    variableDeclaration = khepri_declaration.VariableDeclaration.create,
    variableDeclarator = ecma_declaration.VariableDeclarator.create,
    unpack = (function(pattern, value) {
        return fun.map((function(x) {
            return variableDeclarator(null, x.pattern, x.value);
        }), fun.flatten(innerPattern(value, pattern)));
    }),
    unpackAssign = (function(pattern, value) {
        return fun.map((function(x) {
            return ecma_expression.AssignmentExpression.create(null, "=", x.pattern, x.value);
        }), fun.flatten(innerPattern(value, pattern)));
    }),
    unpackParameters = (function(parameters) {
        var elementsPrefix = fun.map((function(x) {
            switch (x.type) {
                case "IdentifierPattern":
                    return [];
                case "AsPattern":
                    return fun.flatten(innerPattern(x.id, x.target));
                default:
                    return innerPattern(x, x);
            }
        }), parameters.elements),
            selfPrefix = (parameters.self ? innerPattern(ecma_expression.ThisExpression.create(null), parameters.self) : []),
            argumentsPrefix = (parameters.id ? innerPattern(identifier(null, "arguments"), parameters.id) : []);
        return fun.flatten(fun.concat(elementsPrefix, selfPrefix, argumentsPrefix));
    }),
    withStatementNoImport = (function(loc, bindings, body) {
        var vars = fun.flatten(fun.map((function(imp) {
            return (imp && unpack(imp.pattern, imp.value));
        }), bindings)),
            prefix = variableDeclaration(null, vars);
        return khepri_statement.BlockStatement.create(loc, fun.concat(prefix, body.body));
    }),
    withStatement = (function(packageManager, loc, bindings, body) {
        var flattenImport = (function(imp) {
            return ((imp && (imp.type === "ImportPattern")) ? khepri_declaration.Binding.create(null, imp.pattern,
                packageManager.importPackage(imp.from.value)) : imp);
        });
        return withStatementNoImport(loc, fun.map(flattenImport, bindings), body);
    }),
    functionExpression = (function(loc, id, parameters, functionBody, prefix) {
        var params = fun.filter((function(x) {
            return (x.type !== "EllipsisPattern");
        }), parameters.elements),
            bindings = fun.map((function(x) {
                return variableDeclarator(null, x.pattern, x.value);
            }), unpackParameters(parameters)),
            body = ((functionBody.type === "BlockStatement") ? functionBody : khepri_statement.BlockStatement.create(
                null, khepri_statement.ReturnStatement.create(null, functionBody)));
        return khepri_expression.FunctionExpression.create(loc, id, params, khepri_statement.BlockStatement.create(
            body.loc, fun.concat((prefix || []), (bindings.length ? variableDeclaration(null, bindings) : []),
                body.body)));
    }),
    letExpression = (function(loc, bindings, body) {
        return ecma_expression.SequenceExpression.create(null, fun.flatten(fun.concat(fun.map((function(x) {
            return (x ? unpackAssign(x.pattern, x.value) : []);
        }), bindings), body)));
    }),
    ternaryOperatorExpression = (function(loc) {
        return khepri_expression.FunctionExpression.create(loc, null, khepri_pattern.ArgumentsPattern.create(null,
            null, [khepri_pattern.IdentifierPattern.create(null, identifier(null, "x")), khepri_pattern.IdentifierPattern
                .create(null, identifier(null, "y")), khepri_pattern.IdentifierPattern.create(null, identifier(
                    null, "z"))
            ]), khepri_expression.ConditionalExpression.create(null, identifier(null, "x"), identifier(null,
            "y"), identifier(null, "z")));
    }),
    curryExpression = (function(loc, base, args) {
        return khepri_expression.CallExpression.create(null, khepri_expression.MemberExpression.create(null, base,
            identifier(null, "bind")), fun.concat(nullLiteral(null), args));
    }),
    pipe = (function(loc, value, target) {
        return khepri_expression.CallExpression.create(loc, target, [value]);
    }),
    singleCompose = (function(loc, f, g) {
        var fo = identifier(null, "f"),
            go = identifier(null, "g");
        return khepri_expression.CallExpression.create(loc, khepri_expression.FunctionExpression.create(null, null,
            khepri_pattern.ArgumentsPattern.create(null, null, [khepri_pattern.IdentifierPattern.create(null,
                fo), khepri_pattern.IdentifierPattern.create(null, go)]), khepri_expression.FunctionExpression.create(
                null, null, khepri_pattern.ArgumentsPattern.create(null, null, [khepri_pattern.IdentifierPattern
                    .create(null, identifier(null, "x"))
                ]), khepri_expression.CallExpression.create(null, fo, [khepri_expression.CallExpression.create(
                    null, go, [identifier(null, "x")])]))), [f, g]);
    }),
    multiCompose = (function(loc, f, g) {
        return khepri_expression.CallExpression.create(loc, khepri_expression.FunctionExpression.create(null, null,
            khepri_pattern.ArgumentsPattern.create(null, null, [khepri_pattern.IdentifierPattern.create(null,
                identifier(null, "f")), khepri_pattern.IdentifierPattern.create(null, identifier(null,
                "g"))]), khepri_expression.FunctionExpression.create(null, null, khepri_pattern.ArgumentsPattern
                .create(null, null, []), khepri_expression.CallExpression.create(null, identifier(null, "f"), [
                    khepri_expression.CallExpression.create(null, khepri_expression.MemberExpression.create(
                        null, identifier(null, "g"), identifier(null, "apply")), [nullLiteral(null),
                        identifier(null, "arguments")
                    ])
                ]))), [f, g]);
    }),
    packageBlock = (function(packageManager, loc, exports, body) {
        var imports = ((body.type === "WithStatement") ? fun.filter((function(x) {
            return (x && (x.type === "ImportPattern"));
        }), body.bindings) : []),
            targets = fun.reduce(imports, (function(p, c) {
                (p[c.from.value] = c.pattern);
                return p;
            }), ({})),
            fBody = ((body.type === "WithStatement") ? khepri_statement.WithStatement.create(null, fun.filter((
                function(x) {
                    return (x && (x.type !== "ImportPattern"));
                }), body.bindings), body.body) : body);
        return packageManager.definePackage(loc, exports, imports, targets, fBody);
    }),
    transformers = ({}),
    addTransform = (function(type, pre, post) {
        var entry = ({
            "pre": pre,
            "post": post
        });
        (transformers[type] = (transformers[type] ? transformers[type].concat(entry) : [entry]));
    });
addTransform("VariableDeclaration", null, modify((function(node) {
    return ecma_declaration.VariableDeclaration.create(node.loc, node.declarations);
})));
addTransform("VariableDeclarator", null, modify((function(node) {
    return ecma_declaration.VariableDeclarator.create(node.loc, node.id, node.init);
})));
addTransform("StaticDeclaration", modify((function(node) {
    return ecma_statement.EmptyStatement.create(node.loc);
})));
addTransform("CatchClause", null, modify((function(node) {
    return ecma_clause.CatchClause.create(node.loc, node.param, node.body);
})));
addTransform("SwitchCase", null, modify((function(node) {
    return ecma_clause.SwitchCase.create(node.loc, node.test, node.consequent);
})));
addTransform("BlockStatement", pushBindings, seq(getBindings((function(bindings) {
    return modify((function(node) {
        return ecma_statement.BlockStatement.create(node.loc, fun.concat(ecma_declaration.VariableDeclaration
            .create(null, bindings.map((function(x) {
                return ecma_declaration.VariableDeclarator.create(null,
                    identifier(null, x));
            }))), node.body));
    }));
})), popBindings));
addTransform("ExpressionStatement", null, modify((function(node) {
    return ecma_statement.ExpressionStatement.create(node.loc, node.expression);
})));
addTransform("IfStatement", null, modify((function(node) {
    return ecma_statement.IfStatement.create(node.loc, node.test, node.consequent, node.alternate);
})));
addTransform("WithStatement", next(bind(packageManager, (function(packageManager) {
    return modify((function(node) {
        return withStatement(packageManager, node.loc, node.bindings, node.body);
    }));
})), _transform));
addTransform("SwitchStatement", null, modify((function(node) {
    return ecma_statement.SwitchStatement.create(node.loc, node.discriminant, node.cases);
})));
addTransform("ReturnStatement", null, modify((function(node) {
    return ecma_statement.ReturnStatement.create(node.loc, node.argument);
})));
addTransform("ThrowStatement", null, modify((function(node) {
    return ecma_statement.ThrowStatement.create(node.loc, node.argument);
})));
addTransform("BreakStatement", modify((function(node) {
    return ecma_statement.BreakStatement.create(node.loc, null);
})));
addTransform("ContinueStatement", modify((function(node) {
    return ecma_statement.ContinueStatement.create(node.loc, null);
})));
addTransform("TryStatement", null, modify((function(node) {
    return ecma_statement.TryStatement.create(node.loc, node.block, node.handler, node.finalizer);
})));
addTransform("WhileStatement", null, modify((function(node) {
    return ecma_statement.WhileStatement.create(node.loc, node.test, node.body);
})));
addTransform("DoWhileStatement", null, modify((function(node) {
    return ecma_statement.DoWhileStatement.create(node.loc, node.body, node.test);
})));
addTransform("ForStatement", null, modify((function(node) {
    return ecma_statement.ForStatement.create(node.loc, node.init, node.test, node.update, node.body);
})));
addTransform("AssignmentExpression", null, modify((function(node) {
    return ecma_expression.AssignmentExpression.create(node.loc, node.operator, node.left, node.right);
})));
addTransform("UnaryExpression", null, modify((function(node) {
    var op = node.operator;
    switch (op) {
        case "++":
            (op = "+");
            break;
        case "--":
            (op = "-");
            break;
    }
    return ecma_expression.UnaryExpression.create(node.loc, op, node.argument);
})));
addTransform("BinaryExpression", modify((function(node) {
    switch (node.operator) {
        case "\\>":
            return singleCompose(node.loc, node.right, node.left);
        case "\\>>":
            return multiCompose(node.loc, node.right, node.left);
        case "<\\":
            return singleCompose(node.loc, node.left, node.right);
        case "<<\\":
            return multiCompose(node.loc, node.left, node.right);
        case "|>":
            return pipe(node.loc, node.left, node.right);
        case "<|":
            return pipe(node.loc, node.right, node.left);
        default:
            return node;
    }
})), modify((function(node) {
    return ecma_expression.BinaryExpression.create(node.loc, node.operator, node.left, node.right);
})));
addTransform("LogicalExpression", null, modify((function(node) {
    return ecma_expression.LogicalExpression.create(node.loc, node.operator, node.left, node.right);
})));
addTransform("ConditionalExpression", null, modify((function(node) {
    return ecma_expression.ConditionalExpression.create(node.loc, node.test, node.consequent, node.alternate);
})));
addTransform("NewExpression", null, modify((function(node) {
    return ecma_expression.NewExpression.create(node.loc, node.callee, node.args);
})));
addTransform("CallExpression", null, modify((function(node) {
    return ecma_expression.CallExpression.create(node.loc, node.callee, node.args);
})));
addTransform("MemberExpression", null, modify((function(node) {
    return ecma_expression.MemberExpression.create(node.loc, node.object, node.property, node.computed);
})));
addTransform("LetExpression", seq(bind(node, (function(node) {
    var bindings = fun.flatten(fun.map((function(x) {
        return (x ? innerPattern(null, x.pattern) : []);
    }), node.bindings)),
        identifiers = fun.map((function(x) {
            return [x.pattern.id.name, x.pattern.id.ud.uid];
        }), bindings);
    return addBindings(identifiers);
})), modify((function(node) {
    return letExpression(node.loc, node.bindings, node.body);
}))));
addTransform("CurryExpression", modify((function(node) {
    return curryExpression(node.loc, node.base, node.args);
})));
addTransform("TernaryOperatorExpression", next(modify((function(node) {
    return ternaryOperatorExpression(node.loc);
})), _transform));
addTransform("FunctionExpression", seq(enterBlock, modify((function(node) {
    return functionExpression(node.loc, node.id, node.params, node.body, (node.ud && node.ud.prefix));
}))), seq(modify((function(node) {
    return ecma_expression.FunctionExpression.create(null, node.id, node.params, node.body);
})), exitBlock));
addTransform("ArrayExpression", null, modify((function(node) {
    return ecma_expression.ArrayExpression.create(node.loc, node.elements);
})));
addTransform("ObjectExpression", null, modify((function(node) {
    return ecma_expression.ObjectExpression.create(node.loc, node.properties);
})));
addTransform("ObjectValue", null, modify((function(node) {
    return ecma_value.ObjectValue.create(node.loc, node.key, node.value);
})));
addTransform("ArgumentsPattern", null, modify((function(node) {
    return node.id;
})));
addTransform("IdentifierPattern", bind(node, (function(node) {
    return ((node.id.ud && (node.id.ud.uid !== undefined)) ? addVar(node.id.name, node.id.ud.uid) : pass);
})), modify((function(node) {
    return node.id;
})));
addTransform("AsPattern", null, modify((function(node) {
    return node.id;
})));
addTransform("ObjectPattern", null, modify((function(node) {
    return node.ud.id;
})));
addTransform("EllipsisPattern", null, modify((function(node) {
    return (node.ud && node.ud.id);
})));
addTransform("SinkPattern", null, modify((function(node) {
    return (node.ud && node.ud.id);
})));
addTransform("Program", seq(pushBindings, modify((function(node) {
    return ((node.body.type === "Package") ? node : setData(node, "prefix", khepri_statement.ExpressionStatement
        .create(null, khepri_value.Literal.create(null, "string", "use strict"))));
}))), getBindings((function(bindings) {
    return modify((function(node) {
        return ecma_program.Program.create(node.loc, fun.concat(((node.ud && node.ud.prefix) ? node
            .ud.prefix : []), ecma_declaration.VariableDeclaration.create(null, bindings.map(
            (function(x) {
                return ecma_declaration.VariableDeclarator.create(null, identifier(
                    null, x));
            }))), node.body));
    }));
})));
addTransform("Package", bind(packageManager, (function(packageManager) {
    return modify((function(node) {
        return packageBlock(packageManager, node.loc, node.exports, node.body);
    }));
})));
addTransform("Identifier", bind(node, (function(node) {
    return ((node.ud && node.ud.uid) ? next(addVar(node.name, node.ud.uid), getMapping(node.ud.uid, (
        function(name) {
            return set(identifier(node.loc, name));
        }))) : set(identifier(node.loc, node.name)));
})));
(_trans = (function(node) {
    if ((node && (node instanceof khepri_node.Node))) {
        var t = transformers[node.type];
        if ((t && t[0].pre)) return t[0].pre;
    }
    return pass;
}));
var _transp = (function(node) {
    if ((node && (node instanceof khepri_node.Node))) {
        var t = transformers[node.type];
        if ((t && t[0].post)) return t[0].post;
    }
    return pass;
}),
    _transformPost = bind(node, _transp);
(transform = (function(ast, manager, data) {
    var amd_manager = require("./package_manager/amd"),
        node_manager = require("./package_manager/node"),
        packageManager = amd_manager;
    if ((manager === "node"))(packageManager = node_manager);
    var s = State.empty.setScope(scope.Scope.empty)
        .setPackageManager(packageManager);
    return run(seq(addVar("require", builtins.require.ud.uid), addVar("exports", builtins.exports.ud.uid), walk(
        M, _transform, _transformPost), node), s, khepriZipper(ast));
}));
(exports["transform"] = transform);
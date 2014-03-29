/*
 * THIS FILE IS AUTO GENERATED from 'lib/transform/transform.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/record", "ecma-ast/clause", "ecma-ast/declaration", "ecma-ast/expression",
    "ecma-ast/node", "ecma-ast/program", "ecma-ast/statement", "ecma-ast/value", "khepri-ast/declaration",
    "khepri-ast/expression", "khepri-ast/node", "khepri-ast/pattern", "khepri-ast/program", "khepri-ast/statement",
    "khepri-ast/value", "khepri-ast-zipper", "akh/unique", "akh/trans/state", "akh/base", "zipper-m/trans/zipper",
    "zipper-m/walk", "../ast", "../scope", "../fun", "../builtin", "../unpack", "./package_manager/amd",
    "./package_manager/node"
], (function(require, exports, record, ecma_clause, ecma_declaration, ecma_expression, ecma_node, ecma_program,
    ecma_statement, ecma_value, khepri_declaration, khepri_expression, khepri_node, khepri_pattern,
    khepri_program, khepri_statement, khepri_value, __o, Unique, StateT, __o0, ZipperT, walk, __o1, scope, fun,
    __o2, __o3, _, _0) {
    "use strict";
    var setData = khepri_node["setData"],
        khepriZipper = __o["khepriZipper"],
        next = __o0["next"],
        seq = __o0["sequence"],
        seqa = __o0["sequencea"],
        getUid = __o1["getUid"],
        flip = fun["flip"],
        builtins = __o2["builtins"],
        definitions = __o2["definitions"],
        innerPattern = __o3["innerPattern"],
        unpackParameters = __o3["unpackParameters"],
        transform, M = ZipperT(StateT(Unique)),
        run = (function(m, s, ctx, seed) {
            return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(m, ctx), s), seed);
        }),
        ok = M.of,
        pass = ok(null),
        cons = (function(a, b) {
            return a.chain((function(x) {
                return b.map((function(y) {
                    return [x].concat(y);
                }));
            }));
        }),
        enumeration = fun.foldr.bind(null, flip(cons), ok([])),
        State = record.declare(null, ["scope", "packageManager", "bindings", "globals"]);
    (State.empty = State.create(scope.Scope.empty, null, [
        [], null
    ], []));
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
        globals = extract.map((function(s) {
            return s.globals;
        })),
        node = M.node,
        modify = M.modifyNode,
        set = M.setNode,
        withNode = node.chain.bind(node),
        inspectScope = (function(f) {
            return extract.map((function(s) {
                return f(s.scope);
            }));
        }),
        inspectScopeWith = (function(f) {
            return extract.chain((function(s) {
                return f(s.scope);
            }));
        }),
        packageManager = extract.map((function(s) {
            return s.packageManager;
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
        enterBlock = inspectScopeWith((function(s) {
            return setScope(scope.Scope.empty.setOuter(s));
        })),
        exitBlock = inspectScopeWith((function(s) {
            return setScope(s.outer);
        })),
        getMapping = (function(uid) {
            return inspectScope((function(s) {
                return s.getMapping(uid);
            }));
        }),
        addVar = (function(id, uid) {
            return inspectScopeWith((function(s) {
                var name;
                return (s.hasMapping(uid) ? setScope(scope.Scope.addMutableBinding(s, id)) : ((name =
                    s.getUnusedId(id)), setScope(scope.Scope.addMapping(scope.Scope.addMutableBinding(
                    s, name), uid, name))));
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
        getBindings = M.chain.bind(null, inspectStateWith((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(enumeration, fun.map.bind(null, (function(__o) {
            var name = __o[0],
                uid = __o[1];
            return getMapping(uid);
        }))), (function(s) {
            return s.bindings[0];
        })))),
        _trans, _transform = withNode((function(node) {
            return _trans(node);
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
        unpack = (function(f, g) {
            return (function() {
                return f(g.apply(null, arguments));
            });
        })((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(fun.map.bind(null, (function(x) {
            return variableDeclarator(null, x.pattern, x.value);
        })), fun.flatten), innerPattern),
        unpackAssign = (function(f, g) {
            return (function() {
                return f(g.apply(null, arguments));
            });
        })((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(fun.map.bind(null, (function(x) {
            return ecma_expression.AssignmentExpression.create(null, "=", x.pattern, x.value);
        })), fun.flatten), innerPattern),
        unpackArgumentsPattern = (function(parameters) {
            var elementsPrefix = unpackParameters(parameters.elements),
                selfPrefix = (parameters.self ? innerPattern(ecma_expression.ThisExpression.create(null),
                    parameters.self) : []),
                argumentsPrefix = (parameters.id ? innerPattern(identifier(null, "arguments"), parameters.id) : []);
            return fun.flatten(fun.concat(elementsPrefix, selfPrefix, argumentsPrefix));
        }),
        withStatementNoImport = (function(loc, bindings, body) {
            var vars = fun.map((function(imp) {
                return unpack(imp.value, imp.pattern);
            }), bindings),
                prefix = variableDeclaration(null, vars);
            return khepri_statement.BlockStatement.create(loc, fun.concat(prefix, body.body));
        }),
        withStatement = (function(packageManager, loc, bindings, body) {
            var flattenImport = (function(imp) {
                return ((imp && (imp.type === "ImportPattern")) ? khepri_declaration.Binding.create(
                    null, imp.pattern, packageManager.importPackage(imp.from.value)) : imp);
            });
            return withStatementNoImport(loc, fun.map(flattenImport, bindings), body);
        }),
        functionExpression = (function(loc, id, parameters, functionBody, prefix) {
            var params = fun.filter((function(x) {
                return (x.type !== "EllipsisPattern");
            }), parameters.elements),
                bindings = fun.map((function(x) {
                    return variableDeclarator(null, x.pattern, x.value);
                }), unpackArgumentsPattern(parameters)),
                body = ((functionBody.type === "BlockStatement") ? functionBody : khepri_statement.BlockStatement
                    .create(null, khepri_statement.ReturnStatement.create(null, functionBody)));
            return khepri_expression.FunctionExpression.create(loc, id, params, khepri_statement.BlockStatement
                .create(body.loc, fun.concat((prefix || []), (bindings.length ? variableDeclaration(null,
                    bindings) : []), body.body)));
        }),
        letExpression = (function(loc, bindings, body) {
            return ecma_expression.SequenceExpression.create(null, fun.flatten(fun.concat(fun.map((function(
                x) {
                return (x ? unpackAssign(x.value, x.pattern) : []);
            }), bindings), body)));
        }),
        curryExpression = (function(loc, base, args) {
            return khepri_expression.CallExpression.create(null, khepri_expression.MemberExpression.create(
                null, base, identifier(null, "bind")), fun.concat(nullLiteral(null), args));
        }),
        packageBlock = (function(packageManager, loc, exports, globals, body) {
            var imports = ((body.type === "WithStatement") ? fun.filter((function(x) {
                return (x && (x.type === "ImportPattern"));
            }), body.bindings) : []),
                targets = fun.reduce(imports, (function(p, c) {
                    (p[c.from.value] = c.pattern);
                    return p;
                }), ({})),
                fBody = ((body.type === "WithStatement") ? khepri_statement.WithStatement.create(null, fun.filter(
                    (function(x) {
                        return (x && (x.type !== "ImportPattern"));
                    }), body.bindings), body.body) : body);
            return packageManager.definePackage(loc, exports, imports, targets, globals, fBody);
        }),
        transformers = ({}),
        addTransform = (function(type, pre, post) {
            var entry = ({
                "pre": pre,
                "post": post
            });
            (transformers[type] = (transformers[type] ? transformers[type].concat(entry) : [entry]));
        });
    addTransform("VariableDeclaration", null, modify((function(__o) {
        var loc = __o["loc"],
            declarations = __o["declarations"];
        return (declarations.length ? ecma_declaration.VariableDeclaration.create(loc, declarations) :
            null);
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
            return ecma_statement.BlockStatement.create(node.loc, fun.concat(
                ecma_declaration.VariableDeclaration.create(null, bindings.map((
                    function(x) {
                        return ecma_declaration.VariableDeclarator.create(
                            null, identifier(null, x));
                    }))), node.body));
        }));
    })), popBindings));
    addTransform("ExpressionStatement", null, modify((function(node) {
        return ecma_statement.ExpressionStatement.create(node.loc, node.expression);
    })));
    addTransform("IfStatement", null, modify((function(node) {
        return ecma_statement.IfStatement.create(node.loc, node.test, node.consequent, node.alternate);
    })));
    addTransform("WithStatement", next(packageManager.chain((function(packageManager) {
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
        return ecma_statement.ForStatement.create(node.loc, node.init, node.test, node.update, node
            .body);
    })));
    addTransform("AssignmentExpression", null, modify((function(node) {
        return ecma_expression.AssignmentExpression.create(node.loc, node.operator, node.left, node
            .right);
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
    addTransform("BinaryExpression", null, modify((function(node) {
        return ecma_expression.BinaryExpression.create(node.loc, node.operator, node.left, node.right);
    })));
    addTransform("LogicalExpression", null, modify((function(node) {
        return ecma_expression.LogicalExpression.create(node.loc, node.operator, node.left, node.right);
    })));
    addTransform("ConditionalExpression", null, modify((function(node) {
        return ecma_expression.ConditionalExpression.create(node.loc, node.test, node.consequent,
            node.alternate);
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
    addTransform("LetExpression", seq(withNode((function(node) {
        var bindings = fun.flatten(fun.map((function(x) {
            return (x ? innerPattern(null, x.pattern) : []);
        }), node.bindings)),
            identifiers = fun.map((function(x) {
                return [x.pattern.id.name, getUid(x.pattern.id)];
            }), bindings);
        return addBindings(identifiers);
    })), modify((function(node) {
        return letExpression(node.loc, node.bindings, node.body);
    }))));
    addTransform("CurryExpression", modify((function(node) {
        return curryExpression(node.loc, node.base, node.args);
    })));
    addTransform("FunctionExpression", seq(enterBlock, modify((function(node) {
        return functionExpression(node.loc, node.id, node.params, node.body, (node.ud && node.ud
            .prefix));
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
    addTransform("IdentifierPattern", null, modify((function(node) {
        return node.id;
    })));
    addTransform("ArgumentsPattern", null, modify((function(node) {
        return node.id;
    })));
    addTransform("AsPattern", null, modify((function(node) {
        return node.id;
    })));
    addTransform("ObjectPattern", null, modify((function(node) {
        return node.ud.id;
    })));
    addTransform("EllipsisPattern", modify((function(node) {
        return (node.ud && node.ud.id);
    })));
    addTransform("SinkPattern", modify((function(node) {
        return (node.ud && node.ud.id);
    })));
    addTransform("Program", seq(pushBindings, globals.chain((function(globals) {
        return modify((function(node) {
            return ((node.body.type === "Package") ? node : setData(khepri_program.Program
                .create(null, fun.concat(globals, node.body)), "prefix",
                khepri_statement.ExpressionStatement.create(null, khepri_value.Literal
                    .create(null, "string", "use strict"))));
        }));
    }))), getBindings((function(bindings) {
        return modify((function(node) {
            return ecma_program.Program.create(node.loc, fun.concat(((node.ud && node.ud.prefix) ?
                node.ud.prefix : []), ecma_declaration.VariableDeclaration.create(
                null, bindings.map((function(x) {
                    return ecma_declaration.VariableDeclarator.create(null,
                        identifier(null, x));
                }))), node.body));
        }));
    })));
    addTransform("Package", packageManager.chain((function(packageManager) {
        return globals.chain((function(globals) {
            return modify((function(node) {
                return packageBlock(packageManager, node.loc, node.exports, globals,
                    node.body);
            }));
        }));
    })));
    addTransform("Identifier", null, withNode((function(node) {
        return (getUid(node) ? next(addVar(node.name, getUid(node)), getMapping(getUid(node))
            .chain((function(name) {
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
        _transformPost = withNode(_transp);
    (transform = (function(ast, manager, data) {
        var amd_manager = require("./package_manager/amd"),
            node_manager = require("./package_manager/node"),
            packageManager = amd_manager;
        if ((manager === "node"))(packageManager = node_manager);
        var globals = data.globals,
            s = State.empty.setScope(scope.Scope.empty)
                .setPackageManager(packageManager)
                .setGlobals((data.globals ? khepri_declaration.VariableDeclaration.create(null, data.globals
                    .map((function(x) {
                        return khepri_declaration.VariableDeclarator.create(null,
                            builtins[x], definitions[x]);
                    }))) : []));
        return run(seq(addVar("require", getUid(builtins.require)), addVar("exports", getUid(builtins.exports)),
            walk(M, _transform, _transformPost), node), s, khepriZipper(ast));
    }));
    (exports["transform"] = transform);
}));
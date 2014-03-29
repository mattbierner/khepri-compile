/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/transform/transform.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bes/record", "ecma-ast/clause", "ecma-ast/declaration", "ecma-ast/expression",
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
        transform, x, y, x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, M = ZipperT(StateT(Unique)),
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
        setState = ((x = M.lift), (y = M.inner.put), (function(x0) {
            return x(y(x0));
        })),
        modifyState = ((x0 = M.lift), (y0 = M.inner.modify), (function(x1) {
            return x0(y0(x1));
        })),
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
        getBindings = M.chain.bind(null, inspectStateWith(((x1 = enumeration), (y1 = fun.map.bind(null, (
            function(__o4) {
                var name = __o4[0],
                    uid = __o4[1];
                return getMapping(uid);
            }))), (x2 = (function(x3) {
            return x1(y1(x3));
        })), (y2 = (function(s) {
            return s.bindings[0];
        })), (function(x3) {
            var s;
            return x2(((s = x3), s.bindings[0]));
        })))),
        _trans, _transform = withNode((function(node0) {
            return _trans(node0);
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
        unpack = ((x3 = (function(binding) {
            return innerPattern(binding.value, binding.pattern);
        })), (y3 = fun.map.bind(null, (function(x4) {
            return variableDeclarator(null, x4.pattern, x4.value);
        }))), (function(x4) {
            var binding;
            return y3(((binding = x4), innerPattern(binding.value, binding.pattern)));
        })),
        unpackAssign = ((x4 = (function(binding) {
            return innerPattern(binding.value, binding.pattern);
        })), (y4 = fun.map.bind(null, (function(x5) {
            return ecma_expression.AssignmentExpression.create(null, "=", x5.pattern, x5.value);
        }))), (function(x5) {
            var binding;
            return y4(((binding = x5), innerPattern(binding.value, binding.pattern)));
        })),
        unpackArgumentsPattern = (function(parameters) {
            var elementsPrefix = unpackParameters(parameters.elements),
                selfPrefix = (parameters.self ? innerPattern(ecma_expression.ThisExpression.create(null),
                    parameters.self) : []),
                argumentsPrefix = (parameters.id ? innerPattern(identifier(null, "arguments"), parameters.id) : []);
            return fun.flatten(fun.concat(elementsPrefix, selfPrefix, argumentsPrefix));
        }),
        withStatementNoImport = (function(loc, bindings, body) {
            var vars = fun.flatten(fun.map(unpack, bindings)),
                prefix = variableDeclaration(null, vars);
            return khepri_statement.BlockStatement.create(loc, fun.concat(prefix, body.body));
        }),
        withStatement = (function(packageManager0, loc, bindings, body) {
            var flattenImport = (function(imp) {
                return ((imp && (imp.type === "ImportPattern")) ? khepri_declaration.Binding.create(
                    null, imp.pattern, packageManager0.importPackage(imp.from.value)) : imp);
            });
            return withStatementNoImport(loc, fun.map(flattenImport, bindings), body);
        }),
        functionExpression = (function(loc, id, parameters, functionBody, prefix) {
            var params = fun.filter((function(x5) {
                return (x5.type !== "EllipsisPattern");
            }), parameters.elements),
                bindings = fun.map((function(x5) {
                    return variableDeclarator(null, x5.pattern, x5.value);
                }), unpackArgumentsPattern(parameters)),
                body = ((functionBody.type === "BlockStatement") ? functionBody : khepri_statement.BlockStatement
                    .create(null, khepri_statement.ReturnStatement.create(null, functionBody)));
            return khepri_expression.FunctionExpression.create(loc, id, params, khepri_statement.BlockStatement
                .create(body.loc, fun.concat((prefix || []), (bindings.length ? variableDeclaration(null,
                    bindings) : []), body.body)));
        }),
        letExpression = (function(loc, bindings, body) {
            return ecma_expression.SequenceExpression.create(null, fun.flatten(fun.concat(fun.map(
                unpackAssign, bindings), body)));
        }),
        curryExpression = (function(loc, base, args) {
            return khepri_expression.CallExpression.create(null, khepri_expression.MemberExpression.create(
                null, base, identifier(null, "bind")), fun.concat(nullLiteral(null), args));
        }),
        packageBlock = (function(packageManager0, loc, exports0, globals0, body) {
            var imports = ((body.type === "WithStatement") ? fun.filter((function(x5) {
                return (x5 && (x5.type === "ImportPattern"));
            }), body.bindings) : []),
                targets = fun.reduce(imports, (function(p, c) {
                    (p[c.from.value] = c.pattern);
                    return p;
                }), ({})),
                fBody = ((body.type === "WithStatement") ? khepri_statement.WithStatement.create(null, fun.filter(
                    (function(x5) {
                        return (x5 && (x5.type !== "ImportPattern"));
                    }), body.bindings), body.body) : body);
            return packageManager0.definePackage(loc, exports0, imports, targets, globals0, fBody);
        }),
        transformers = ({}),
        addTransform = (function(type, pre, post) {
            var entry = ({
                "pre": pre,
                "post": post
            });
            (transformers[type] = (transformers[type] ? transformers[type].concat(entry) : [entry]));
        });
    addTransform("VariableDeclaration", null, modify((function(__o4) {
        var loc = __o4["loc"],
            declarations = __o4["declarations"];
        return (declarations.length ? ecma_declaration.VariableDeclaration.create(loc, declarations) :
            null);
    })));
    addTransform("VariableDeclarator", null, modify((function(node0) {
        return ecma_declaration.VariableDeclarator.create(node0.loc, node0.id, node0.init);
    })));
    addTransform("StaticDeclaration", modify((function(node0) {
        return ecma_statement.EmptyStatement.create(node0.loc);
    })));
    addTransform("CatchClause", null, modify((function(node0) {
        return ecma_clause.CatchClause.create(node0.loc, node0.param, node0.body);
    })));
    addTransform("SwitchCase", null, modify((function(node0) {
        return ecma_clause.SwitchCase.create(node0.loc, node0.test, node0.consequent);
    })));
    addTransform("BlockStatement", pushBindings, seq(getBindings((function(bindings) {
        return modify((function(node0) {
            return ecma_statement.BlockStatement.create(node0.loc, fun.concat(
                ecma_declaration.VariableDeclaration.create(null, bindings.map((
                    function(x5) {
                        return ecma_declaration.VariableDeclarator.create(
                            null, identifier(null, x5));
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
        return ecma_statement.ForStatement.create(node0.loc, node0.init, node0.test, node0.update,
            node0.body);
    })));
    addTransform("AssignmentExpression", null, modify((function(node0) {
        return ecma_expression.AssignmentExpression.create(node0.loc, node0.operator, node0.left,
            node0.right);
    })));
    addTransform("UnaryExpression", null, modify((function(node0) {
        var op = node0.operator;
        switch (op) {
            case "++":
                (op = "+");
                break;
            case "--":
                (op = "-");
                break;
        }
        return ecma_expression.UnaryExpression.create(node0.loc, op, node0.argument);
    })));
    addTransform("BinaryExpression", null, modify((function(node0) {
        return ecma_expression.BinaryExpression.create(node0.loc, node0.operator, node0.left, node0
            .right);
    })));
    addTransform("LogicalExpression", null, modify((function(node0) {
        return ecma_expression.LogicalExpression.create(node0.loc, node0.operator, node0.left,
            node0.right);
    })));
    addTransform("ConditionalExpression", null, modify((function(node0) {
        return ecma_expression.ConditionalExpression.create(node0.loc, node0.test, node0.consequent,
            node0.alternate);
    })));
    addTransform("NewExpression", null, modify((function(node0) {
        return ecma_expression.NewExpression.create(node0.loc, node0.callee, node0.args);
    })));
    addTransform("CallExpression", null, modify((function(node0) {
        return ecma_expression.CallExpression.create(node0.loc, node0.callee, node0.args);
    })));
    addTransform("MemberExpression", null, modify((function(node0) {
        return ecma_expression.MemberExpression.create(node0.loc, node0.object, node0.property,
            node0.computed);
    })));
    addTransform("LetExpression", seq(withNode((function(node0) {
        var bindings = fun.flatten(fun.map((function(x5) {
            return (x5 ? innerPattern(null, x5.pattern) : []);
        }), node0.bindings)),
            identifiers = fun.map((function(x5) {
                return [x5.pattern.id.name, getUid(x5.pattern.id)];
            }), bindings);
        return addBindings(identifiers);
    })), modify((function(node0) {
        return letExpression(node0.loc, node0.bindings, node0.body);
    }))));
    addTransform("CurryExpression", modify((function(node0) {
        return curryExpression(node0.loc, node0.base, node0.args);
    })));
    addTransform("FunctionExpression", seq(enterBlock, modify((function(node0) {
        return functionExpression(node0.loc, node0.id, node0.params, node0.body, (node0.ud &&
            node0.ud.prefix));
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
    addTransform("IdentifierPattern", null, modify((function(node0) {
        return node0.id;
    })));
    addTransform("ArgumentsPattern", null, modify((function(node0) {
        return node0.id;
    })));
    addTransform("AsPattern", null, modify((function(node0) {
        return node0.id;
    })));
    addTransform("ObjectPattern", null, modify((function(node0) {
        return node0.ud.id;
    })));
    addTransform("EllipsisPattern", modify((function(node0) {
        return (node0.ud && node0.ud.id);
    })));
    addTransform("SinkPattern", modify((function(node0) {
        return (node0.ud && node0.ud.id);
    })));
    addTransform("Program", seq(pushBindings, globals.chain((function(globals0) {
        return modify((function(node0) {
            return ((node0.body.type === "Package") ? node0 : setData(khepri_program.Program
                .create(null, fun.concat(globals0, node0.body)), "prefix",
                khepri_statement.ExpressionStatement.create(null, khepri_value.Literal
                    .create(null, "string", "use strict"))));
        }));
    }))), getBindings((function(bindings) {
        return modify((function(node0) {
            return ecma_program.Program.create(node0.loc, fun.concat(((node0.ud && node0.ud
                    .prefix) ? node0.ud.prefix : []), ecma_declaration.VariableDeclaration
                .create(null, bindings.map((function(x5) {
                    return ecma_declaration.VariableDeclarator.create(null,
                        identifier(null, x5));
                }))), node0.body));
        }));
    })));
    addTransform("Package", packageManager.chain((function(packageManager0) {
        return globals.chain((function(globals0) {
            return modify((function(node0) {
                return packageBlock(packageManager0, node0.loc, node0.exports,
                    globals0, node0.body);
            }));
        }));
    })));
    addTransform("Identifier", null, withNode((function(node0) {
        return (getUid(node0) ? next(addVar(node0.name, getUid(node0)), getMapping(getUid(node0))
            .chain((function(name) {
                return set(identifier(node0.loc, name));
            }))) : set(identifier(node0.loc, node0.name)));
    })));
    (_trans = (function(node0) {
        if ((node0 && (node0 instanceof khepri_node.Node))) {
            var t = transformers[node0.type];
            if ((t && t[0].pre)) return t[0].pre;
        }
        return pass;
    }));
    var _transp = (function(node0) {
        if ((node0 && (node0 instanceof khepri_node.Node))) {
            var t = transformers[node0.type];
            if ((t && t[0].post)) return t[0].post;
        }
        return pass;
    }),
        _transformPost = withNode(_transp);
    (transform = (function(ast, manager, data) {
        var amd_manager = require("./package_manager/amd"),
            node_manager = require("./package_manager/node"),
            packageManager0 = amd_manager;
        if ((manager === "node"))(packageManager0 = node_manager);
        var globals0 = data.globals,
            s = State.empty.setScope(scope.Scope.empty)
                .setPackageManager(packageManager0)
                .setGlobals((data.globals ? khepri_declaration.VariableDeclaration.create(null, data.globals
                    .map((function(x5) {
                        return khepri_declaration.VariableDeclarator.create(null,
                            builtins[x5], definitions[x5]);
                    }))) : []));
        return run(seq(addVar("require", getUid(builtins.require)), addVar("exports", getUid(builtins.exports)),
            walk(M, _transform, _transformPost), node), s, khepriZipper(ast));
    }));
    (exports["transform"] = transform);
}));
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
        liftM2 = __o0["liftM2"],
        next = __o0["next"],
        seq = __o0["sequence"],
        type = __o1["type"],
        getUid = __o1["getUid"],
        Scope = scope["Scope"],
        concat = fun["concat"],
        flatten = fun["flatten"],
        flip = fun["flip"],
        filter = fun["filter"],
        builtins = __o2["builtins"],
        definitions = __o2["definitions"],
        innerPattern = __o3["innerPattern"],
        unpackParameters = __o3["unpackParameters"],
        transform, x, y, x0, y0, y1, y2, useStrict, State = record.declare(null, ["scope", "packageManager",
            "bindings"
        ]);
    (State.empty = State.create(Scope.empty, null, [
        [], null
    ]));
    var M = ZipperT(StateT(Unique)),
        run = (function(m, s, ctx, seed) {
            return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(m, ctx), s), seed);
        }),
        pass = M.of(null),
        cons = liftM2.bind(null, concat),
        enumeration = fun.foldr.bind(null, flip(cons), M.of([])),
        extract = M.lift(M.inner.get),
        modifyState = ((x = M.lift), (y = M.inner.modify), (function(x0) {
            return x(y(x0));
        })),
        inspectStateWith = M.chain.bind(null, extract),
        node = M.node,
        withNode = M.chain.bind(null, node),
        modify = M.modifyNode,
        set = M.setNode,
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
        enterBlock = extract.chain((function(s) {
            var s0 = s.scope;
            return setScope(Scope.empty.setOuter(s0));
        })),
        exitBlock = extract.chain((function(s) {
            var s0 = s.scope;
            return setScope(s0.outer);
        })),
        getMapping = (function(uid) {
            return inspectScope((function(s) {
                return s.getMapping(uid);
            }));
        }),
        addVar = (function(id, uid) {
            return inspectScopeWith((function(s) {
                var name;
                return (s.hasMapping(uid) ? setScope(scope.addMutableBinding(s, id)) : ((name = s.getUnusedId(
                    id)), setScope(scope.addMapping(scope.addMutableBinding(s, name), uid,
                    name))));
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
        getBindings = M.chain.bind(null, inspectStateWith(((x0 = enumeration), (y0 = fun.map.bind(null, (
            function(__o4) {
                var uid = __o4[1];
                return getMapping(uid);
            }))), (function(x1) {
            var x2 = x1.bindings[0];
            return x0(y0(x2));
        })))),
        _trans, _transform = withNode((function(node0) {
            return _trans(node0);
        })),
        identifier = (function(loc, name) {
            return ecma_value.Identifier.create(loc, name);
        }),
        nullLiteral = (function(loc) {
            return ecma_value.Literal.create(loc, "null", null);
        }),
        variableDeclaration = khepri_declaration.VariableDeclaration.create,
        variableDeclarator = ecma_declaration.VariableDeclarator.create,
        unpack = ((y1 = fun.map.bind(null, (function(x1) {
            return variableDeclarator(null, x1.pattern, x1.value);
        }))), (function(x1) {
            return y1(innerPattern(x1.value, x1.pattern));
        })),
        unpackAssign = ((y2 = fun.map.bind(null, (function(x1) {
            return ecma_expression.AssignmentExpression.create(null, "=", x1.pattern, x1.value);
        }))), (function(x1) {
            return y2(innerPattern(x1.value, x1.pattern));
        })),
        unpackArgumentsPattern = (function(parameters) {
            var elementsPrefix = unpackParameters(parameters.id, parameters.elements),
                selfPrefix = (parameters.self ? innerPattern(ecma_expression.ThisExpression.create(null),
                    parameters.self) : []),
                argumentsPrefix = (parameters.id ? innerPattern(identifier(null, "arguments"), parameters.id) : []);
            return flatten(concat(argumentsPrefix, elementsPrefix, selfPrefix));
        }),
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
                bindings = fun.map((function(x1) {
                    return variableDeclarator(null, x1.pattern, x1.value);
                }), unpackArgumentsPattern(parameters)),
                body = ((type(functionBody) === "BlockStatement") ? functionBody : khepri_statement.BlockStatement
                    .create(null, khepri_statement.ReturnStatement.create(null, functionBody)));
            return khepri_expression.FunctionExpression.create(loc, id, params, khepri_statement.BlockStatement
                .create(body.loc, concat((prefix || []), (bindings.length ? variableDeclaration(null,
                    bindings) : []), body.body)));
        }),
        letExpression = (function(loc, bindings, body) {
            return ecma_expression.SequenceExpression.create(null, flatten(concat(fun.map(unpackAssign,
                bindings), body)));
        }),
        curryExpression = (function(loc, base, args) {
            return khepri_expression.CallExpression.create(loc, khepri_expression.MemberExpression.create(
                null, base, identifier(null, "bind")), concat(nullLiteral(null), args));
        }),
        packageBlock = (function(packageManager0, loc, exports0, body) {
            var x1, imports = ((type(body) === "WithStatement") ? filter(((x1 = type), (function(x2) {
                    var y3 = x1(x2);
                    return ("ImportPattern" === y3);
                })), body.bindings) : []),
                targets = fun.reduce(imports, (function(p, c) {
                    (p[c.from.value] = c.pattern);
                    return p;
                }), ({})),
                x2, fBody = ((type(body) === "WithStatement") ? khepri_statement.WithStatement.create(null,
                    filter(((x2 = type), (function(x3) {
                        var y3 = x2(x3);
                        return ("ImportPattern" !== y3);
                    })), body.bindings), body.body) : body);
            return packageManager0.definePackage(loc, exports0, imports, targets, fBody);
        }),
        transformers = ({}),
        addTransform = (function(type0, pre, post) {
            if (Array.isArray(type0)) return type0.map((function(x1) {
                return addTransform(x1, pre, post);
            }));
            (transformers[type0] = [({
                "pre": pre,
                "post": post
            })]);
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
            return ecma_statement.BlockStatement.create(node0.loc, concat(
                ecma_declaration.VariableDeclaration.create(null, bindings.map((
                    function(x1) {
                        return ecma_declaration.VariableDeclarator.create(
                            null, identifier(null, x1));
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
        return ecma_expression.AssignmentExpression.create(node0.loc, "=", node0.left, node0.right);
    })));
    addTransform("UnaryExpression", null, modify((function(node0) {
        return ecma_expression.UnaryExpression.create(node0.loc, ((node0.operator === "++") ? "+" :
            ((node0.operator === "--") ? "-" : node0.operator)), node0.argument);
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
        var bindings = flatten(fun.map((function(x1) {
            return (x1 ? innerPattern(null, x1.pattern) : []);
        }), node0.bindings)),
            identifiers = fun.map((function(x1) {
                return [x1.pattern.id.name, getUid(x1.pattern.id)];
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
    addTransform(["IdentifierPattern", "AsPattern", "ArgumentsPattern"], null, modify((function(node0) {
        return node0.id;
    })));
    addTransform(["ObjectPattern", "EllipsisPattern", "SinkPattern"], null, modify((function(node0) {
        return (node0.ud && node0.ud.id);
    })));
    addTransform("Program", ((useStrict = khepri_statement.ExpressionStatement.create(null, khepri_value.Literal
        .create(null, "string", "use strict"))), seq(pushBindings, modify((function(node0) {
        return ((type(node0.body) === "Package") ? node0 : setData(node0, "prefix",
            useStrict));
    })))), getBindings((function(bindings) {
        return modify((function(node0) {
            return ecma_program.Program.create(node0.loc, concat(((node0.ud && node0.ud.prefix) ?
                node0.ud.prefix : []), ecma_declaration.VariableDeclaration.create(
                null, bindings.map((function(x1) {
                    return ecma_declaration.VariableDeclarator.create(null,
                        identifier(null, x1));
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
        if ((manager === "node")) {
            (packageManager0 = node_manager);
        }
        var s = State.empty.setPackageManager(packageManager0);
        return run(seq(addVar("require", getUid(builtins.require)), addVar("exports", getUid(builtins.exports)),
            walk(M, _transform, _transformPost), node), s, khepriZipper(ast));
    }));
    (exports["transform"] = transform);
}));
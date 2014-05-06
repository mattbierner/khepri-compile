/*
 * THIS FILE IS AUTO GENERATED from 'lib/normalize/post_normalize.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast/node", "khepri-ast/expression", "khepri-ast/statement", "khepri-ast/value",
    "../pseudo/pattern", "../ast", "../fun", "../rewriter", "./unpack", "./user_operator"
], (function(require, exports, __o, ast_expression, ast_statement, ast_value, __o0, __o1, __o2, __o3, __o4,
    opToName) {
    "use strict";
    var normalize, modify = __o["modify"],
        setUserData = __o["setUserData"],
        Import = __o0["Import"],
        type = __o1["type"],
        isBlockFunction = __o1["isBlockFunction"],
        setUd = __o1["setUd"],
        getUid = __o1["getUid"],
        concat = __o2["concat"],
        flattenr = __o2["flattenr"],
        map = __o2["map"],
        UP = __o3["UP"],
        DOWN = __o3["DOWN"],
        Rewriter = __o3["Rewriter"],
        rewrite = __o3["rewrite"],
        innerPattern = __o4["innerPattern"],
        unpackParameters = __o4["unpackParameters"],
        getParameterNames = __o4["getParameterNames"],
        x, y, markReserved = setUd.bind(null, "reserved", true),
        peepholes = new(Rewriter)(),
        always = (function(_) {
            return true;
        });
    peepholes.add("ImportPattern", UP, always, (function(__o5) {
        var pattern = __o5["pattern"],
            from = __o5["from"],
            __o6 = innerPattern(Import.create(null, from.value), pattern),
            imp = __o6[0],
            rest = [].slice.call(__o6, 1);
        return concat(markReserved(imp), rest);
    }));
    peepholes.add("Binding", UP, always, (function(binding) {
        return innerPattern(binding.value, binding.pattern);
    }));
    peepholes.add(["LetExpression", "WithStatement"], UP, always, (function(node) {
        return modify(node, ({
            bindings: flattenr(node.bindings)
        }));
    }));
    peepholes.add("FunctionExpression", UP, always, (function(node) {
        var params = getParameterNames(node.params.elements),
            bindings = unpackParameters(node.params.id, node.params.elements),
            body = (isBlockFunction(node) ? ast_statement.BlockStatement.create(null, [ast_statement.WithStatement
                .create(null, bindings, node.body)
            ]) : ast_expression.LetExpression.create(null, bindings, node.body));
        return modify(node, ({
            params: modify(node.params, ({
                elements: params
            })),
            body: body
        }));
    }));
    var opToIdentifier = (function(node) {
        return setUserData(ast_value.Identifier.create(node.loc, opToName(node.name)), node.ud);
    });
    peepholes.add(["UnaryOperator", "BinaryOperator"], DOWN, getUid, opToIdentifier);
    peepholes.add("BinaryExpression", DOWN, always, (function(node) {
        var loc = node["loc"],
            operator = node["operator"],
            left = node["left"],
            right = node["right"];
        return (getUid(operator) ? ast_expression.CallExpression.create(loc, setUserData(ast_value.Identifier
            .create(operator.loc, opToName(operator.name)), operator.ud), [left, right]) : modify(
            node, ({
                operator: operator.name
            })));
    }));
    var expandAssignment = (function(node) {
        var right;
        return ((type(node.right) === "AssignmentExpression") ? ((right = expandAssignment(node.right)),
            concat(right, ast_expression.AssignmentExpression.create(null, "=", node.left, right[(right
                .length - 1)].left))) : [node]);
    });
    peepholes.add("ExpressionStatement", UP, (function(z) {
        var z0 = z.expression,
            y = type(z0);
        return ("AssignmentExpression" === y);
    }), ((x = map.bind(null, ast_statement.ExpressionStatement.create.bind(null, null))), (y =
        ast_statement.BlockStatement.create.bind(null, null)), (function(z) {
        var right, z0 = z.expression,
            z1 = ((type(z0.right) === "AssignmentExpression") ? ((right = expandAssignment(z0.right)),
                concat(right, ast_expression.AssignmentExpression.create(null, "=", z0.left,
                    right[(right.length - 1)].left))) : [z0]),
            z2 = flattenr(z1);
        return y(x(z2));
    })));
    peepholes.add("BinaryExpression", UP, (function(z) {
        var y0 = z.operator;
        return ("|>" === y0);
    }), (function(__o5) {
        var left = __o5["left"],
            right = __o5["right"];
        return ast_expression.CallExpression.create(null, right, [left]);
    }));
    peepholes.add("BinaryExpression", UP, (function(z) {
        var y0 = z.operator;
        return ("<|" === y0);
    }), (function(__o5) {
        var left = __o5["left"],
            right = __o5["right"];
        return ast_expression.CallExpression.create(null, left, [right]);
    }));
    (normalize = rewrite.bind(null, peepholes));
    (exports["normalize"] = normalize);
}));
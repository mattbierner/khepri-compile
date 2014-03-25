/*
 * THIS FILE IS AUTO GENERATED from 'lib/builtin.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast/node", "khepri-ast/pattern", "khepri-ast/value"], (function(require, exports,
    ast_node, ast_pattern, ast_value) {
    "use strict";
    var setData = ast_node["setData"],
        setUserData = ast_node["setUserData"],
        builtins;
    (builtins = ({
        "require": setData(new(ast_value.Identifier)(null, "require"), "uid", 1),
        "exports": setData(new(ast_value.Identifier)(null, "exports"), "uid", 2),
        "module": setData(new(ast_value.Identifier)(null, "module"), "uid", 2)
    }));
    return builtins;
}));
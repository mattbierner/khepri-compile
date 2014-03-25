/*
 * THIS FILE IS AUTO GENERATED from 'lib/builtin.kep'
 * DO NOT EDIT
*/"use strict";
var ast_node = require("khepri-ast")["node"],
    setData = ast_node["setData"],
    setUserData = ast_node["setUserData"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    builtins;
(builtins = ({
    "require": setData(new(ast_value.Identifier)(null, "require"), "uid", 1),
    "exports": setData(new(ast_value.Identifier)(null, "exports"), "uid", 2),
    "module": setData(new(ast_value.Identifier)(null, "module"), "uid", 2)
}));
(module.exports = builtins);
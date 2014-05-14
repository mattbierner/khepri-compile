/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lexical/scopet.kep'
 * DO NOT EDIT
*/
"use strict";
var StateT = require("akh")["trans"]["statei"],
    scope = require("./scope"),
    ScopeT, ScopeMonad = (function(Instance) {
        (Instance.extractScope = Instance.get);
        (Instance.modifyScope = Instance.modify);
        (Instance.push = Instance.modifyScope(scope.push));
        (Instance.pop = Instance.modifyScope(scope.pop));
        (Instance.getClosure = Instance.extractScope.map(scope.getClosure));
        return Instance;
    });
(ScopeT = (function(z) {
    return ScopeMonad(StateT(z));
}));
(module.exports = ScopeT);
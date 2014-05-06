/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lexical/scopet.kep'
 * DO NOT EDIT
*/
"use strict";
var StateT = require("akh")["trans"]["statei"],
    scope = require("./scope"),
    Scope = scope["Scope"],
    ScopeT, ScopeMonad = (function(Instance) {
        (Instance.extractScope = Instance.get);
        (Instance.examineScope = Instance.chain.bind(null, Instance.extractScope));
        (Instance.modifyScope = Instance.modify);
        (Instance.push = Instance.modifyScope(scope.push));
        (Instance.pop = Instance.modifyScope(scope.pop));
        (Instance.getClosure = Instance.chain.bind(null, Instance.extractScope.map(scope.getClosure)));
        return Instance;
    }),
    x = StateT;
(ScopeT = (function(z) {
    return ScopeMonad(x(z));
}));
(module.exports = ScopeT);
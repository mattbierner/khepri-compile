/*
 * THIS FILE IS AUTO GENERATED from 'lib/lexical/scopet.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/trans/statei", "./scope"], (function(require, exports, StateT, scope) {
    "use strict";
    var Scope = scope["Scope"],
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
    return ScopeT;
}));
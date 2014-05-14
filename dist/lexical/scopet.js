/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lexical/scopet.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/trans/statei", "./scope"], (function(require, exports, StateT, scope) {
    "use strict";
    var ScopeT, ScopeMonad = (function(Instance) {
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
    return ScopeT;
}));
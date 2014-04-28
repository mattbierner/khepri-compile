/*
 * THIS FILE IS AUTO GENERATED from 'lib/transform/state.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/record", "../fun", "../lexical/scope"], (function(require, exports, record, __o,
    scope) {
    "use strict";
    var concat = __o["concat"],
        Scope = scope["Scope"],
        State, getBindings, addBindings, pushBindings, popBindings;
    (State = record.declare(null, ["scope", "packageManager", "bindings"]));
    (State.empty = State.create(Scope.empty, null, [
        [], null
    ]));
    (getBindings = (function(s) {
        return s.bindings[0];
    }));
    (addBindings = (function(bindings, s) {
        return s.setBindings([concat(s.bindings[0], bindings), s.bindings[1]]);
    }));
    (pushBindings = (function(s) {
        return s.setBindings([
            [], s.bindings
        ]);
    }));
    (popBindings = (function(s) {
        return s.setBindings(s.bindings[1]);
    }));
    (exports["State"] = State);
    (exports["getBindings"] = getBindings);
    (exports["addBindings"] = addBindings);
    (exports["pushBindings"] = pushBindings);
    (exports["popBindings"] = popBindings);
}));
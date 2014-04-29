/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/transform/state.kep'
 * DO NOT EDIT
*/
"use strict";
var record = require("bes")["record"],
    __o = require("../fun"),
    concat = __o["concat"],
    scope = require("../lexical/scope"),
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
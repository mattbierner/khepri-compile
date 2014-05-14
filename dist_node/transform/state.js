/*
 * THIS FILE IS AUTO GENERATED from 'lib/transform/state.kep'
 * DO NOT EDIT
*/"use strict";
var record = require("bes")["record"],
    stream = require("nu-stream")["stream"],
    scope = require("../lexical/scope"),
    State, getBindings, addBindings, pushBindings, popBindings, append = stream["append"],
    first = stream["first"],
    rest = stream["rest"],
    cons = stream["cons"],
    NIL = stream["NIL"],
    toArray = stream["toArray"],
    Scope = scope["Scope"];
(State = record.declare(null, ["scope", "packageManager", "bindings"]));
(State.empty = State.create(Scope.empty, null, cons(NIL, NIL)));
(getBindings = (function(z) {
    var z0 = z.bindings;
    return toArray(first(z0));
}));
(addBindings = (function(bindings, s) {
    return s.setBindings(cons(append(first(s.bindings), stream.from(bindings)), rest(s.bindings)));
}));
(pushBindings = (function(s) {
    return s.setBindings(cons(NIL, s.bindings));
}));
(popBindings = (function(s) {
    return s.setBindings(rest(s.bindings));
}));
(exports["State"] = State);
(exports["getBindings"] = getBindings);
(exports["addBindings"] = addBindings);
(exports["pushBindings"] = pushBindings);
(exports["popBindings"] = popBindings);
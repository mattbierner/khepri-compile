/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lexical/scope.kep'
 * DO NOT EDIT
*/
"use strict";
var record = require("bes")["record"],
    hamt = require("hamt"),
    Scope, hasBinding, hasMutableBinding, addBinding, addMutableBinding, addImmutableBinding, setBindingMutability,
        getUid, addUid, hasMapping, hasOwnMapping, getMapping, addMapping, getClosure, addOperator, getOperators, push,
        pop, addVar;
(Scope = record.declare(null, ["record", "outer", "mapping", "definitions", "locals", "prefixOps"]));
(Scope.empty = Scope.create(hamt.empty, null, hamt.empty, hamt.empty, hamt.empty, hamt.empty));
(Scope.prototype.hasOwnBinding = (function(id) {
    var self = this;
    return hamt.has(id, self.record);
}));
(hasBinding = (function(id, s) {
    return (s.hasOwnBinding(id) || (s.outer && hasBinding(id, s.outer)));
}));
(hasMutableBinding = (function(id, s) {
    var binding = s.getBinding(id);
    return (binding && binding.mutable);
}));
(Scope.prototype.getBinding = (function(id) {
    var self = this;
    return (hamt.get(id, self.record) || (self.outer ? self.outer.getBinding(id) : null));
}));
(Scope.prototype.getUnusedId = (function(id) {
    var self = this,
        id0;
    if ((!(self.hasOwnBinding(id) || (self.outer && hasBinding(id, self.outer))))) return id;
    for (var i = 0;;
        (i = (i + 1)))
        if ((!((id0 = (id + i)), (self.hasOwnBinding(id0) || (self.outer && hasBinding(id0, self.outer))))))
            return (id + i);
}));
(addBinding = (function(s, id, info) {
    return s.setRecord(hamt.set(id, info, s.record));
}));
(addMutableBinding = (function(id, loc, s) {
    return addBinding(s, id, ({
        mutable: 1,
        loc: loc
    }));
}));
(addImmutableBinding = (function(id, loc, s) {
    return addBinding(s, id, ({
        mutable: 0,
        loc: loc
    }));
}));
(setBindingMutability = (function(id, mutable, s) {
    return (s.hasOwnBinding(id) ? addBinding(s, id, ({
        loc: s.getBinding(id)
            .loc,
        mutable: (mutable ? 1 : 0)
    })) : (s.outer && s.setOuter(setBindingMutability(id, mutable, s.outer))));
}));
(getUid = (function(id, s) {
    return (s.hasOwnBinding(id) ? hamt.get(id, s.definitions) : (s.outer && getUid(id, s.outer)));
}));
(addUid = (function(id, uid, s) {
    return s.setDefinitions(hamt.set(id, uid, s.definitions))
        .setLocals(hamt.set(uid, id, s.locals));
}));
(Scope.prototype.hasOwnMapping = (function(id) {
    var self = this;
    return hamt.has(id, self.mapping);
}));
(Scope.prototype.hasMapping = (function(id) {
    var x, self = this;
    return (self.hasOwnMapping(id) || ((x = self.outer), (x && x.hasMapping(id))));
}));
(getMapping = (function(id, s) {
    return (s.hasOwnMapping(id) ? hamt.get(id, s.mapping) : (s.outer && getMapping(id, s.outer)));
}));
(addMapping = (function(from, to, s) {
    return s.setMapping(hamt.set(from, to, s.mapping));
}));
(addVar = (function(id, uid, s) {
    var name;
    return (s.hasMapping(uid) ? addBinding(s, id, ({
        mutable: 1,
        loc: null
    })) : ((name = s.getUnusedId(id)), addMapping(uid, name, addBinding(s, name, ({
        mutable: 1,
        loc: null
    })))));
}));
var y = hamt.keys;
(getClosure = (function(z) {
    return y(z.locals);
}));
(push = (function(s) {
    return Scope.empty.setOuter(s)
        .setDefinitions(s.definitions)
        .setPrefixOps(s.prefixOps);
}));
var mergeLocals = hamt.fold.bind(null, (function(p, __o) {
    var key = __o["key"],
        value = __o["value"];
    return hamt.set(key, value, p);
}));
(pop = (function(s) {
    return s.outer.setLocals(mergeLocals(s.outer.locals, s.locals));
}));
(addOperator = (function(name, uid, s) {
    return s.setPrefixOps(hamt.set(name, uid, s.prefixOps));
}));
var y0 = hamt.pairs;
(getOperators = (function(z) {
    return y0(z.prefixOps);
}));
(exports["Scope"] = Scope);
(exports["hasBinding"] = hasBinding);
(exports["hasMutableBinding"] = hasMutableBinding);
(exports["addBinding"] = addBinding);
(exports["addMutableBinding"] = addMutableBinding);
(exports["addImmutableBinding"] = addImmutableBinding);
(exports["setBindingMutability"] = setBindingMutability);
(exports["getUid"] = getUid);
(exports["addUid"] = addUid);
(exports["hasMapping"] = hasMapping);
(exports["hasOwnMapping"] = hasOwnMapping);
(exports["getMapping"] = getMapping);
(exports["addMapping"] = addMapping);
(exports["getClosure"] = getClosure);
(exports["addOperator"] = addOperator);
(exports["getOperators"] = getOperators);
(exports["push"] = push);
(exports["pop"] = pop);
(exports["addVar"] = addVar);
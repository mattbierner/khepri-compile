/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lexical/scope.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bes/record", "hamt"], (function(require, exports, record, hamt) {
    "use strict";
    var Scope, hasBinding, hasMutableBinding, hasTransMutableBinding, addTransMutableBinding, addMutableBinding,
            addImmutableBinding, markBindingImmutable, markBindingMutable, getUid, addUid, hasMapping,
            hasOwnMapping, getMapping, addMapping, getLocals, getClosure, addRef, addOperator, getOperators,
            push, pop, addVar;
    (Scope = record.declare(null, ["record", "outer", "mapping", "definitions", "locals", "closure",
        "prefixOps"
    ]));
    (Scope.empty = Scope.create(hamt.empty, null, hamt.empty, hamt.empty, hamt.empty, hamt.empty));
    (Scope.prototype.hasOwnBinding = (function(id) {
        var __o = this,
            record0 = __o["record"];
        return hamt.has(id, record0);
    }));
    (hasBinding = (function(id, s) {
        return (s.hasOwnBinding(id) || (s.outer && hasBinding(id, s.outer)));
    }));
    (hasMutableBinding = (function(id, s) {
        var binding = s.getBinding(id);
        return (binding && binding.mutable);
    }));
    (hasTransMutableBinding = (function(id, s) {
        var binding = s.getBinding(id);
        return ((binding && binding.mutable) === 1);
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
    (addMutableBinding = (function(id, loc, s) {
        var info = ({
            mutable: 2,
            loc: loc
        });
        return s.setRecord(hamt.set(id, info, s.record));
    }));
    (addImmutableBinding = (function(id, loc, s) {
        var info = ({
            mutable: 0,
            loc: loc
        });
        return s.setRecord(hamt.set(id, info, s.record));
    }));
    (addTransMutableBinding = (function(id, loc, s) {
        var info = ({
            mutable: 1,
            loc: loc
        });
        return s.setRecord(hamt.set(id, info, s.record));
    }));
    (markBindingImmutable = (function(id, s) {
        var f;
        return (s.hasOwnBinding(id) ? ((f = (function(binding) {
            return ({
                loc: binding.loc,
                mutable: 0
            });
        })), s.setRecord(hamt.modify(id, f, s.record))) : (s.outer && s.setOuter(
            markBindingImmutable(id, s.outer))));
    }));
    (markBindingMutable = (function(id, s) {
        var f;
        return (s.hasOwnBinding(id) ? ((f = (function(binding) {
            return ({
                loc: binding.loc,
                mutable: 2
            });
        })), s.setRecord(hamt.modify(id, f, s.record))) : (s.outer && s.setOuter(markBindingMutable(
            id, s.outer))));
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
        var info, name, info0, s0;
        return (s.hasMapping(uid) ? ((info = ({
            mutable: 2,
            loc: null
        })), s.setRecord(hamt.set(id, info, s.record))) : ((name = s.getUnusedId(id)), (info0 = ({
            mutable: 2,
            loc: null
        })), (s0 = s.setRecord(hamt.set(name, info0, s.record))), s0.setMapping(hamt.set(uid,
            name, s0.mapping))));
    }));
    var y = hamt.keys;
    (getLocals = (function(z) {
        return y(z.locals);
    }));
    var y0 = hamt.keys;
    (getClosure = (function(z) {
        return y0(z.closure);
    }));
    (addRef = (function(uid, s) {
        return (uid ? s.setClosure(hamt.set(uid, null, s.closure)) : s);
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
        return s.outer.setLocals(mergeLocals(s.outer.locals, s.locals))
            .setClosure(mergeLocals(s.outer.closure, s.closure));
    }));
    (addOperator = (function(name, uid, s) {
        return s.setPrefixOps(hamt.set(name, uid, s.prefixOps));
    }));
    var y1 = hamt.pairs;
    (getOperators = (function(z) {
        return y1(z.prefixOps);
    }));
    (exports["Scope"] = Scope);
    (exports["hasBinding"] = hasBinding);
    (exports["hasMutableBinding"] = hasMutableBinding);
    (exports["hasTransMutableBinding"] = hasTransMutableBinding);
    (exports["addTransMutableBinding"] = addTransMutableBinding);
    (exports["addMutableBinding"] = addMutableBinding);
    (exports["addImmutableBinding"] = addImmutableBinding);
    (exports["markBindingImmutable"] = markBindingImmutable);
    (exports["markBindingMutable"] = markBindingMutable);
    (exports["getUid"] = getUid);
    (exports["addUid"] = addUid);
    (exports["hasMapping"] = hasMapping);
    (exports["hasOwnMapping"] = hasOwnMapping);
    (exports["getMapping"] = getMapping);
    (exports["addMapping"] = addMapping);
    (exports["getLocals"] = getLocals);
    (exports["getClosure"] = getClosure);
    (exports["addRef"] = addRef);
    (exports["addOperator"] = addOperator);
    (exports["getOperators"] = getOperators);
    (exports["push"] = push);
    (exports["pop"] = pop);
    (exports["addVar"] = addVar);
}));
/*
 * THIS FILE IS AUTO GENERATED from 'lib/fun.kep'
 * DO NOT EDIT
*/define(["require", "exports"], (function(require, exports) {
    "use strict";
    var id, constant, flip, isArray, reduce, reduceRight, foldl, foldr, concat, filter, map, flatten, flattenr,
            contains;
    (id = (function(x) {
        return x;
    }));
    (constant = (function(x) {
        return (function() {
            return x;
        });
    }));
    (flip = (function(f) {
        return (function(x, y) {
            return f(y, x);
        });
    }));
    (isArray = Array.isArray);
    (concat = Array.prototype.concat.bind([]));
    (reduce = Function.prototype.call.bind(Array.prototype.reduce));
    (reduceRight = Function.prototype.call.bind(Array.prototype.reduceRight));
    (foldl = (function(f, z, a) {
        return reduce(a, f, z);
    }));
    (foldr = (function(f, z, a) {
        return reduceRight(a, f, z);
    }));
    (filter = (function(f, a) {
        return Array.prototype.filter.call(a, f);
    }));
    (map = (function(f, a) {
        return Array.prototype.map.call(a, f);
    }));
    (flatten = (function(x) {
        return (isArray(x) ? Array.prototype.concat.apply([], x.filter(id)) : x);
    }));
    (flattenr = (function(x) {
        return (isArray(x) ? flatten(x.map(flattenr)) : x);
    }));
    (contains = (function(a, x) {
        return (a.indexOf(x) >= 0);
    }));
    (exports["id"] = id);
    (exports["constant"] = constant);
    (exports["flip"] = flip);
    (exports["isArray"] = isArray);
    (exports["reduce"] = reduce);
    (exports["reduceRight"] = reduceRight);
    (exports["foldl"] = foldl);
    (exports["foldr"] = foldr);
    (exports["concat"] = concat);
    (exports["filter"] = filter);
    (exports["map"] = map);
    (exports["flatten"] = flatten);
    (exports["flattenr"] = flattenr);
    (exports["contains"] = contains);
}));
/*
 * THIS FILE IS AUTO GENERATED from 'lib/control/zipper.kep'
 * DO NOT EDIT
*/"use strict";
var Identity = require("akh")["identity"],
    ZipperT = require("./zippert"),
    Zipper;
(Zipper = ZipperT(Identity));
(Zipper.run = (function(m, ctx) {
    return Identity.runIdentity(ZipperT.run(m, ctx));
}));
(module.exports = Zipper);
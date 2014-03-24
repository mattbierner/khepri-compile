/*
 * THIS FILE IS AUTO GENERATED from 'lib/control/zipper.kep'
 * DO NOT EDIT
*/"use strict";
var Trampoline = require("akh")["trampoline"],
    ZipperT = require("./zippert"),
    Zipper;
(Zipper = ZipperT(Trampoline));
(Zipper.run = (function(m, ctx) {
    return Trampoline.run(ZipperT.run(m, ctx));
}));
(module.exports = Zipper);
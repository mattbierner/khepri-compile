var parser = require('khepri-parse').parse.parser;
var lexer = require('khepri-parse').lex.lexer;

var unparse = require('ecma-unparse').unparse;
var unparse_print = require('ecma-unparse').print;

var compile = require('../index').compile;


var testParser = function(input) {
    return unparse_print.print(unparse.unparse(compile(parser.parseStream(lexer.lex(input)))));
};

var evalParser = function(input) {
    return eval(testParser(input));
};



exports.recursive_fn = function(test) {
    test.equal(
        evalParser("let mod10 := \\x -> ? x < 10 : x : mod10 (x -10) in mod10 101;"),
        1);
    test.done();
};

exports.recursive_curry = function(test) {
    testParser("let f := \\x y -> f @ (x + 1, y + 1) in f(0, 0);");
    test.ok(true);
    test.done();
    
};

/// Ensure that `x` binding captures reference to current `a` not later one.
exports.capture_mutable = function(test) {
    // Mutable `a` binding
    test.equal(
        evalParser("var a = [1, 2, 3]; var f = let x = a in \\-> x.(0); a = [4, 5, 6]; f();"),
        1);
    
    // Immutable `a` binding
    test.equal(
        evalParser("var a := [1, 2, 3]; var f = let x = a in \\-> x.(0); f();"),
        1);
    
    test.done();
};

/// Ensure that we don't inline the working value in a loop test.
exports.no_for_working_inline = function(test) {
    test.equal(
        evalParser("for (var i = 0; i < 10; i = i + 1) i;"),
        9);
    
    test.done();
};


exports.inline_with_args = function(test) {
    test.equal(
        evalParser("var f := \\-args(...) -> args.(1); f(1,2, 3);"),
        2);
    
    test.done();
};

exports.inline_with_slice = function(test) {
    test.deepEqual(
        evalParser("var f := \\x ...xs -> xs; f(1,2, 3);"),
        [2, 3]);
    
    test.done();
};


exports.inline_does_not_mess_up_local_closure = function(test) {
    test.deepEqual(
        evalParser("var f = (+, 10), g = (_ /, 2), h = (*, 3);" +
                   "var w := \\t ->  t 2;" +
                   "" +
                   "var z = \\c k -> \\x -> c(k(x));" +
                   "var zz = \\ce ke -> \\xx -> ce(ke(xx));" +
                   "" +
                   "w ( z(h, zz(f, g)));"),
        33);
    
    test.done();
};

// ensure that the inner `y` is correctly duplicated after inlining.
exports.inline_with_local_bindings = function(test) {
    test.deepEqual(
        evalParser("var f = \\x -> let y = [x * 2] in x * y.(0);" +
                   "f(1) + f(10);"),
        202);
    
    test.done();
};



exports.const_prop_closure = function(test) {
    test.equal(
        evalParser("var a = 0;" +
                   "var f = \\ -> { a = a + 10; };"+
                   "f();"+
                   "a = 2;" +
                   "f();"+
                   "a;"),
        12);
    
    test.done();
};


var parser = require('khepri-parse').parse.parser;
var lexer = require('khepri-parse').lex.lexer;

var unparse = require('ecma-unparse').unparse;
var unparse_print = require('ecma-unparse').print;

var compile = require('../index').compile;


var testParser = function(input) {
    return eval(unparse_print.print(unparse.unparse(compile(parser.parseStream(lexer.lex(input))))));
};


exports.simple_binary = function(test) {
    test.equal(
        testParser("var (**) := Math.pow; 2 ** 3;"),
        8);
    
    test.done();
};

exports.chained_binary = function(test) {
    test.deepEqual(
        testParser("var (+|+) := Array.prototype.concat.bind[]; [1, 2] +|+ [3] +|+ [4, 5];"),
        [1, 2, 3, 4, 5]);
    
    test.done();
};


exports.hide_standard = function(test) {
    test.equal(
        testParser("var (+) := (-); 1 + 3;"),
        -2);
    
    test.done();
};

exports.local_hide = function(test) {
    test.equal(
        testParser("100 + (let (+) = (-) in 4 + 10 + 3) + 8;"),
        99);
    
    test.done();
};

exports.op_to_function = function(test) {
    test.equal(
        testParser("var (**) := Math.pow; (**)(2, 3);"),
        8);
    
    test.done();
};

exports.flipped_op_to_function = function(test) {
    test.equal(
        testParser("var (**) := Math.pow; (_**)(2, 3);"),
        9);
    
    test.done();
};
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
        testParser("var f = (/); f(10, 5);"),
        2);
    
    test.done();
};

exports.flipped_binary = function(test) {
    test.equal(
        testParser("var f = (_/); f(10, 5);"),
        0.5);
    
    test.done();
};

exports.non_ecma_op = function(test) {
    test.equal(
        testParser("var f = (<|); f((!), false);"),
        true);
    
    test.done();
};

exports.computed_member = function(test) {
    test.equal(
        testParser("var f = (.); f ([1, 2, 3], 2);"),
        3);
    
    test.done();
};

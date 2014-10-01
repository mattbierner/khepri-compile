var parser = require('khepri-parse').parse.parser;
var lexer = require('khepri-parse').lex.lexer;

var unparse = require('ecma-unparse').unparse;
var unparse_print = require('ecma-unparse').print;

var compile = require('../index').compile;


var testParser = function(input) {
    return eval(unparse_print.print(unparse.unparse(compile(parser.parseStream(lexer.lex(input))))));
};



exports.simple_delete = function(test) {
    test.equal(
        testParser("var x = {y: 1}; delete x.y; x.y;"),
        undefined);
    
    test.done();
};

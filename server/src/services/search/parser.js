const peg = require( 'pegjs' );

const grammar = require( './grammar' );


module.exports = function createParser()
{
    const parser = peg.generate( grammar );
    return ( query => parser.parse( query ) );
};

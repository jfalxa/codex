const parser   = require( './parser' )();
const sqlifier = require( './sqlifier' );


module.exports = function buildSearchQuery( humanQuery )
{
    const query = parser( humanQuery );
    return sqlifier( query );
};

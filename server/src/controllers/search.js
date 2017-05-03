const pgp = require( 'pg-promise' )();

const db     = require( '../services/db' );
const parser = require( '../services/parser' );


const parseQuery = parser();


function toSQL( operation )
{
    if ( !Array.isArray( operation ) )
    {
        const query = 'SELECT document_id FROM doc_tags'
            + ' WHERE tag_id IN ( SELECT id FROM tags WHERE name = $1 )';

        return pgp.as.format( query, operation );
    }
    else if ( operation[0] === 'not' )
    {
        return 'SELECT id FROM documents'
            + ' WHERE id NOT IN ( ' + toSQL( operation[1] ) + ' )';
    }

    const [operator, firstMember, ...otherMembers] = operation;

    const sqlOperator = ( operator === 'and' ) ? 'INTERSECT' : 'UNION';

    return '('
        + ' ' + toSQL( firstMember )
        + ' ' + otherMembers.map( member => sqlOperator + ' ' + toSQL( member ) ).join( ' ' )
        + ' )';
}



exports.search = function search( req, res, next )
{
    const { query } = req.query;

    const parsedQuery = parseQuery( query );

    const sqlQuery = 'SELECT * FROM documents WHERE id IN (' + toSQL( parsedQuery ) + ' )';

    db.any( sqlQuery )
        .then( data => res.status( 200 ).json( data ) )
        .catch( error => res.status( 500 ).end() );
}

const db  = require( '../services/db' );
const pgp = require( 'pg-promise' )( { capSQL : true } );


exports.createLabel = function createLabel( label )
{
    if ( !label )
    {
        return Promise.resolve();
    }

    const query = 'INSERT INTO labels ( name )'
        + ' VALUES ( $1 )'
        + ' ON CONFLICT( name ) DO NOTHING';

    return db.oneOrNone( query, label );
};


exports.createManyLabels = function createManyLabels( manyLabels )
{
    if ( manyLabels.length === 0 )
    {
        return Promise.resolve();
    }

    // batch all the label insertion in one query
    const query = pgp.helpers.insert( manyLabels, ['name'], 'labels' )
        + ' ON CONFLICT( name ) DO NOTHING';

    return db.none( query );
};


exports.getLabel = function getLabel( labelID )
{
    const query = 'SELECT * FROM labels'
        + ' WHERE id = $1';

    return db.one( query, labelID );
};


exports.updateLabel = function updateLabel( labelID, update )
{
    const query = 'UPDATE labels'
        + ' SET name = $1'
        + ' WHERE id = $2';

    return db.none( query, [update.name, labelID] );
};


exports.deleteLabel = function deleteLabel( labelID )
{
    const query = 'DELETE FROM labels'
        + ' WHERE id = $1';

    return db.none( query, labelID );
};


exports.findLabel = function findLabel( fragment )
{
    const query = 'SELECT * FROM labels'
        + ' WHERE length( name ) < 50'
        + ' AND word_similarity( $1, name ) >= 0.5'
        + ' ORDER BY similarity( $1, name ) DESC'
        + ' LIMIT 5';

    return db.any( query, fragment );
};


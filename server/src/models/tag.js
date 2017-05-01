const _filter = require( 'lodash/filter' );
const _reject = require( 'lodash/reject' );

const db  = require( '../services/db' );
const pgp = require( 'pg-promise' )( { capSQL : true } );


exports.createTag = function createTag( tag )
{
    const query = 'INSERT INTO tags ( name )'
        + ' VALUES ( $1 )'
        + ' RETURNING id';

    return db.one( query, tag.name );
};


exports.createManyTags = function createManyTags( manyTags )
{
    if ( manyTags.length === 0 )
    {
        return Promise.resolve( [] );
    }

    // batch all the tag insertion in one query
    const query = pgp.helpers.insert( manyTags, ['name'], 'tags' )
        + ' RETURNING id';

    return db.any( query );
};


exports.createMissingTag = function createMissingTag( tag )
{
    if ( tag.id )
    {
        return Promise.resolve( tag );
    }

    return exports.createTag( tag );
};


exports.createManyMissingTags = function createManyMissingTags( tags )
{
    const existingTags = _filter( tags, 'id' );
    const missingTags  = _reject( tags, 'id' );

    return exports.createManyTags( missingTags )
        .then( newTags => existingTags.concat( newTags ) );
};


exports.getTag = function getTag( tagID )
{
    const query = 'SELECT * FROM tags'
        + ' WHERE id = $1';

    return db.one( query, tagID );
};


exports.updateTag = function updateTag( tagID, update )
{
    const query = 'UPDATE tags'
        + ' SET name = $1'
        + ' WHERE id = $2';

    return db.none( query, [update.name, tagID] );
};


exports.deleteTag = function deleteTag( tagID )
{
    const query = 'DELETE FROM tags'
        + ' WHERE id = $1';

    return db.none( query, tagID );
};


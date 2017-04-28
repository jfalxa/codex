const config = require( 'config' );
const pgp    = require( 'pg-promise' )();


const db = pgp( config.get( 'pgsql' ) );


module.exports = db;

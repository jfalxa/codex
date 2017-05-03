const express    = require( 'express' );
const searchCtrl = require( '../controllers/search' );


const search = express.Router();

search.get( '/', searchCtrl.search );


module.exports = search;

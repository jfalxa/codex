const express          = require( 'express' );
const autocompleteCtrl = require( '../controllers/autocomplete' );


const autocomplete = express.Router();

autocomplete.get( '/:fragment', autocompleteCtrl.autocomplete );


module.exports = autocomplete;

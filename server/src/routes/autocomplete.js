const express          = require( 'express' );
const autocompleteCtrl = require( '../controllers/autocomplete' );


const autocomplete = express.Router();

autocomplete.get( '/label', autocompleteCtrl.autocompleteLabel );
autocomplete.get( '/tag', autocompleteCtrl.autocompleteTag );


module.exports = autocomplete;

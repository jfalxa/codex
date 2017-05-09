const express          = require( 'express' );
const autocompleteCtrl = require( '../controllers/autocomplete' );


const autocomplete = express.Router();

autocomplete.get( '/', autocompleteCtrl.autocomplete );


module.exports = autocomplete;

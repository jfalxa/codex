const express      = require( 'express' );
const documents    = require( './documents' );
const autocomplete = require( './autocomplete' );
const search       = require( './search' );


const router = express.Router();

router.use( '/docs', documents );
router.use( '/autocomplete', autocomplete );
router.use( '/search', search );


module.exports = router;

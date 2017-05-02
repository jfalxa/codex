const express      = require( 'express' );
const documents    = require( './documents' );
const autocomplete = require( './autocomplete' );


const router = express.Router();

router.use( '/docs', documents );
router.use( '/autocomplete', autocomplete );


module.exports = router;

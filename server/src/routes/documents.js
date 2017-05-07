const express       = require( 'express' );
const documentsCtrl = require( '../controllers/documents' );


const documents = express.Router();

documents.post( '/', documentsCtrl.createDocument );
documents.get( '/', documentsCtrl.getAllDocuments );
documents.get( '/:docID', documentsCtrl.getDocument );
documents.put( '/:docID', documentsCtrl.updateDocument );
documents.delete( '/:docID', documentsCtrl.deleteDocument );

documents.post( '/:docID/tags', documentsCtrl.addDocTag );
documents.put( '/:docID/tags/:tagID', documentsCtrl.updateDocTag );
documents.delete( '/:docID/tags/:tagID', documentsCtrl.removeDocTag );


module.exports = documents;

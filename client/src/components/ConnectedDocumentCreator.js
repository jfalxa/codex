import { connect } from 'react-redux';

import DocumentCreator from './DocumentCreator';
import { createDoc, resetDoc, autocomplete, changeName, addTag, deleteTag } from '../reducers/document';


export function selectDocumentCreator( state )
{
    return state.document;
}


const actionCreators =
{
    createDoc,
    resetDoc,
    autocomplete,
    changeName,
    addTag,
    deleteTag
};


export default connect( selectDocumentCreator, actionCreators )( DocumentCreator );

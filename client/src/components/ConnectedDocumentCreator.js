import { connect } from 'react-redux';

import DocumentCreator from './DocumentCreator';
import { apiCreateDoc, resetDoc, autocomplete, changeName, addTag, removeTag } from '../reducers/document';


export function selectDocumentCreator( state )
{
    return state.document;
}


const actionCreators =
{
    apiCreateDoc,
    resetDoc,
    autocomplete,
    changeName,
    addTag,
    removeTag
};


export default connect( selectDocumentCreator, actionCreators )( DocumentCreator );

import { connect } from 'react-redux';

import DocumentCreator from '../document/DocumentCreator';
import { apiCreateDoc, resetDoc, apiAutocomplete, setFragment, changeName, addTag, removeTag } from '../../reducers/document';


export function selectDocumentCreator( state )
{
    return state.document;
}


const actionCreators =
{
    apiCreateDoc,
    resetDoc,
    apiAutocomplete,
    setFragment,
    changeName,
    addTag,
    removeTag
};


export default connect( selectDocumentCreator, actionCreators )( DocumentCreator );

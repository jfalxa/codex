import { connect } from 'react-redux';

import DocumentEditor from './DocumentEditor';
import { loadDoc, updateDoc, autocomplete, changeName, addTag } from '../reducers/document';


export function selectDocumentEditor( state )
{
    return state.document;
}


const actionCreators =
{
    loadDoc,
    updateDoc,
    autocomplete,
    changeName,
    addTag
};


export default connect( selectDocumentEditor, actionCreators )( DocumentEditor );

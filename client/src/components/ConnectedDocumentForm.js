import { connect } from 'react-redux';

import DocumentForm from './DocumentForm';
import { loadDoc, updateDoc, createDoc, autocomplete, changeName, addTag } from '../reducers/document';


export function selectDocumentForm( state )
{
    return state.document;
}


const actionCreators =
{
    loadDoc,
    updateDoc,
    createDoc,
    autocomplete,
    changeName,
    addTag
};


export default connect( selectDocumentForm, actionCreators )( DocumentForm );

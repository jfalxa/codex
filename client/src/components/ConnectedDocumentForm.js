import { connect } from 'react-redux';

import DocumentForm             from './DocumentForm';
import { autocomplete, addTag } from '../reducers/document';


export function selectDocumentForm( state )
{
    return state.document;
}


const actionCreators = {

    autocomplete,
    addTag

};


export default connect( selectDocumentForm, actionCreators )( DocumentForm );

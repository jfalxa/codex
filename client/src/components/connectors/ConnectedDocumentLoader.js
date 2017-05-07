import { connect } from 'react-redux';

import DocumentLoader               from '../document/DocumentLoader';
import { apiLoadDoc, apiRemoveTag } from '../../reducers/document';


export function selectDocumentLoader( state )
{
    return state.document;
}


const actionCreators =
{
    apiLoadDoc,
    apiRemoveTag
};


export default connect( selectDocumentLoader, actionCreators )( DocumentLoader );

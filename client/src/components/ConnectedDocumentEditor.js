import { connect } from 'react-redux';

import DocumentEditor from './DocumentEditor';
import { apiLoadDoc, apiUpdateDoc, autocomplete, changeName, apiAddTag, apiRemoveTag } from '../reducers/document';


export function selectDocumentEditor( state )
{
    return state.document;
}


const actionCreators =
{
    apiLoadDoc,
    apiUpdateDoc,
    autocomplete,
    changeName,
    apiAddTag,
    apiRemoveTag
};


export default connect( selectDocumentEditor, actionCreators )( DocumentEditor );

import { connect } from 'react-redux';

import DocumentEditor from './DocumentEditor';
import { apiLoadDoc, apiUpdateDoc, apiAutocomplete, setFragment, changeName, apiAddTag, apiRemoveTag } from '../reducers/document';


export function selectDocumentEditor( state )
{
    return state.document;
}


const actionCreators =
{
    apiLoadDoc,
    apiUpdateDoc,
    apiAutocomplete,
    setFragment,
    changeName,
    apiAddTag,
    apiRemoveTag
};


export default connect( selectDocumentEditor, actionCreators )( DocumentEditor );

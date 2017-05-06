import { connect } from 'react-redux';

import DocumentEditor from './DocumentEditor';
import { apiAutocomplete, setFragment, apiAddTag, apiRemoveTag } from '../reducers/document';


export function selectDocumentEditor( state )
{
    return state.document;
}


const actionCreators =
{
    apiAutocomplete,
    setFragment,
    apiAddTag,
    apiRemoveTag
};


export default connect( selectDocumentEditor, actionCreators )( DocumentEditor );

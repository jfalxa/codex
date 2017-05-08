import { connect } from 'react-redux';

import DocumentEditor from '../document/DocumentEditor';
import { apiLoadDoc, apiUpdateDoc, apiAutocomplete, resetDoc, changeName, setFragment, apiAddTag, apiRemoveTag } from '../../reducers/document';


export function selectDocumentEditor( state, props )
{
    const { match }                  = props;
    const { documents, highlighted } = state.codex;

    const urlID         = match && match.params.docID;
    const highlightedID = documents[highlighted] && documents[highlighted].id;

    // either use the id provided by the URL or the one highlighted in preview
    const id = urlID || highlightedID;

    return { ...state.document, id };
}


const actionCreators =
{
    apiLoadDoc,
    apiUpdateDoc,
    apiAutocomplete,
    apiAddTag,
    apiRemoveTag,
    resetDoc,
    changeName,
    setFragment
};


export default connect( selectDocumentEditor, actionCreators )( DocumentEditor );

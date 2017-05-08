import { connect } from 'react-redux';

import DocumentEditor from '../document/DocumentEditor';
import { apiLoadDoc, apiUpdateDoc, apiAutocomplete, changeName, setFragment, apiAddTag, apiRemoveTag } from '../../reducers/document';


export function selectDocumentEditor( state, props )
{
    // either use the id provided by the URL or the one from props
    const id = props.match
        ? props.match.params.docID
        : props.id;

    return { ...state.document, id };
}


const actionCreators =
{
    apiLoadDoc,
    apiUpdateDoc,
    apiAutocomplete,
    apiAddTag,
    apiRemoveTag,
    changeName,
    setFragment
};


export default connect( selectDocumentEditor, actionCreators )( DocumentEditor );

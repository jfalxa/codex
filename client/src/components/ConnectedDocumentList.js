import { connect } from 'react-redux';

import DocumentList from './DocumentList';
import { loadAllDocs } from '../reducers/codex';


export function selectDocumentList( state )
{
    return state.codex;
}


const actionCreators =
{
    loadAllDocs
};


export default connect( selectDocumentList, actionCreators )( DocumentList );

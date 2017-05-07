import { connect } from 'react-redux';

import DocumentList     from '../document/DocumentList';
import { setHighlight } from '../../reducers/codex';


export function selectDocumentList( state )
{
    return state.codex;
}


const actionCreators =
{
    setHighlight
};


export default connect( selectDocumentList, actionCreators )( DocumentList );

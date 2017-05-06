import { connect } from 'react-redux';

import Search from './Search';
import { setSearch, setFragment, setHighlight, apiAutocomplete, apiSearchDocs } from '../reducers/codex';


export function selectSearch( state )
{
    return state.codex;
}


const actionCreators =
{
    setSearch,
    setFragment,
    apiAutocomplete,
    apiSearchDocs,
    setHighlight
};


export default connect( selectSearch, actionCreators )( Search );

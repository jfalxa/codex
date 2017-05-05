import { connect } from 'react-redux';

import Search from './Search';
import { setSearch, setFragment, apiAutocomplete, apiSearchDocs } from '../reducers/codex';


export function selectSearch( state )
{
    return state.codex;
}


const actionCreators =
{
    setSearch,
    setFragment,
    apiAutocomplete,
    apiSearchDocs
};


export default connect( selectSearch, actionCreators )( Search );

import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';

import Search from './Search';
import { setSearch, setFragment, apiAutocomplete, apiSearchDocs } from '../reducers/codex';


export function selectSearch( state, props )
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


export default withRouter( connect( selectSearch, actionCreators )( Search ) );

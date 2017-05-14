import styled from 'styled-components';

import Autocomplete from '../utilities/Autocomplete';
import * as theme   from '../../style/theme';


const SearchAutocomplete = styled( Autocomplete )`

    display: flex;
    flex-direction: column;
    flex: 1;

    *
    {
        font-family: ${ theme.titleFont };
    }

`;


export default SearchAutocomplete;

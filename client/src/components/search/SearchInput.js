import styled from 'styled-components';

import { lightBackground } from '../../style/theme';


const SearchInput = styled.input`

    flex: 1;

    border: 0;
    padding: 5px 10px;

    background-color: ${ lightBackground };

    font-size: 1.5em;
    font-weight: bold;

    outline: 0;

`;


export default SearchInput;

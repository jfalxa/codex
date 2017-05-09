import React  from 'react';
import styled from 'styled-components';

import * as theme from '../../style/theme';


const StyledInput = styled.input`

    flex: 1;

    padding: 5px 10px;

    border: 0;

    background-color: transparent;

    font-size: 1.3em;
    font-weight: bold;

    box-shadow: 0 0 2px ${ theme.darkBackground }
    outline: 0;

`;


export default function SearchInput( props )
{
    return (

        <StyledInput { ...props }
            placeholder="Search..." />

    );
}

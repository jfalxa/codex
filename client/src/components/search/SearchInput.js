import React  from 'react';
import styled from 'styled-components';

import { lightBackground } from '../../style/theme';


const StyledInput = styled.input`

    flex: 1;

    border: 0;
    padding: 5px 10px;

    font-size: 1.3em;
    font-weight: bold;

    box-shadow: 0 0 2px 0px #DDD;
    outline: 0;

`;


export default function SearchInput( props )
{
    return (

        <StyledInput { ...props }
            placeholder="Search..." />

    );
}

import React  from 'react';
import styled from 'styled-components';

import { lightBackground } from '../../style/theme';


const StyledInput = styled.input`

    padding: 5px 15px;

    border: 0;
    border-bottom: 1px solid #CCCCCC;

    font-size: 0.9em;

    outline: 0;

`;


export default function TagInput( props )
{
    return (

        <StyledInput { ...props }
            placeholder="Enter a tag..." />

    );
}

import styled from 'styled-components';

import * as theme from '../../style/theme';


export const Suggestion = styled.li`

    padding: 10px;

    background-color: ${ p => p.highlighted ? theme.background : 'initial' };

    font-weight: ${ p => p.highlighted ? 'bold' : 'initial' };

    list-style: none;

`;


export const Suggestions = styled.ul`

    position: absolute;
    z-index: 2;
    top: 100%;

    width: 100%;

    background-color: ${ theme.lightBackground };

    box-shadow: 0 0 2px ${ theme.darkBackground };
`;

import styled from 'styled-components';

import { lightBackground } from '../../style/theme';


export const Suggestion = styled.li`

    padding: 10px;

    background-color: ${ p => p.highlighted ? lightBackground : '#FFF' };

    font-weight: ${ p => p.highlighted ? 'bold' : 'normal' };

    list-style: none;

`;


export const Suggestions = styled.ul`

    position: absolute;
    top: 100%;

    width: 100%;

    border: 1px solid ${ lightBackground };

    background-color: #FFFFFF;
`;

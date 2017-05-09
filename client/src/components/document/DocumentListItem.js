import styled from 'styled-components';

import { lightBackground } from '../../style/theme';


const DocumentListItem = styled.li`

    flex-shrink: 0;

    padding: 10px 25px;

    border-bottom: 1px solid ${ lightBackground };

    font-weight: ${ p => p.highlighted ? 'bold' : 'initial' };

    background-color: ${ p => p.highlighted ? lightBackground : 'initial' };

    cursor: pointer;
    list-style: none;

`;


export default DocumentListItem;

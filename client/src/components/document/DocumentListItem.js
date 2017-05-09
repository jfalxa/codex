import styled from 'styled-components';

import * as theme from '../../style/theme';


const DocumentListItem = styled.li`

    flex-shrink: 0;

    padding: 10px 25px;

    border-bottom: 1px solid ${ theme.background };

    font-weight: ${ p => p.highlighted ? 'bold' : 'initial' };

    background-color: ${ p => p.highlighted ? theme.background : 'initial' };

    cursor: pointer;
    list-style: none;

`;


export default DocumentListItem;

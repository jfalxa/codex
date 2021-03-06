import styled from 'styled-components';

import container  from '../../style/container';
import * as theme from '../../style/theme';


const TagContainer = styled.li`

    ${ container };

    flex-shrink: 0;

    padding: 10px 15px;

    word-break: break-word;
    list-style: none;

    &:hover
    {
        background-color: ${ theme.background };
    }

`;


export default TagContainer;

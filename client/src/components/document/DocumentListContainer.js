import styled from 'styled-components';

import container  from '../../style/container';
import * as theme from '../../style/theme';


const DocumentListContainer = styled.section`

    ${ container }

    margin-right: 25px;

    background-color: ${ theme.lightBackground };
    box-shadow: 0 0 2px ${ theme.darkBackground };

`;


export default DocumentListContainer;

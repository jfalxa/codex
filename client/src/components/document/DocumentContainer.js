import styled from 'styled-components';

import container  from '../../style/container';
import * as theme from '../../style/theme';


const DocumentContainer = styled.section`

    ${ container }

    padding: 25px;

    background-color: ${ theme.lightBackground };
    box-shadow: 0 0 2px ${ theme.darkBackground };

`;


export default DocumentContainer;

import styled from 'styled-components';

import container  from '../../style/container';
import * as theme from '../../style/theme';


const TopbarContainer = styled.div`

    ${ container }

    width: 100%;

    padding: 5px 10px;

    background-color: ${ theme.lightBackground };

    box-shadow: 0px 0px 2px ${ theme.darkBackground };

`;


export default TopbarContainer;

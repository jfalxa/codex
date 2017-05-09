import styled from 'styled-components';

import container           from '../../style/container';
import { lightBackground } from '../../style/theme';


const TopbarContainer = styled.div`

    ${ container }

    width: 100%;

    padding: 5px 10px;

    background-color: ${ lightBackground };

    box-shadow: 0px 1px 2px #CCCCCC;

`;


export default TopbarContainer;

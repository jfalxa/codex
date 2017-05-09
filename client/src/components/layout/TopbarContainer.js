import styled from 'styled-components';

import container           from '../../style/container';
import { lightBackground } from '../../style/theme';


const TopbarContainer = styled.div`

    ${ container }

    position: fixed;

    width: 100%;
    height: 50px;

    padding: 5px 10px;

    background-color: ${ lightBackground };

    box-shadow: 0px 1px 2px #CCCCCC;

`;


export default TopbarContainer;

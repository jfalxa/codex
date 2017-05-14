import styled from 'styled-components';

import container from '../../style/container';

const DocumentTitleContainer = styled.div`

    ${ container }

    flex-shrink: 0;

    height: 3.4em;
    margin-bottom: 25px;

    svg
    {
        flex-shrink: 0;
        margin: 0 15px;
        cursor: pointer;
    }

`;


export default DocumentTitleContainer;

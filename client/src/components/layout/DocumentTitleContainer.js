import styled from 'styled-components';

import container from '../../style/container';


const DocumentTitleContainer = styled.div`

    ${ container }

    height: 1.3em;

    font-family: Roboto, sans-serif;

    margin-bottom: 20px;

    font-size: 1.3em;
    font-weight: bold;

    input
    {
        width: 100%;

        border: 0;
        border-bottom: 1px solid #CCCCCC;

        font-size: 1em;
        font-weight: bold;

        background-color: transparent;

        outline: 0;
    }

    svg
    {
        cursor: pointer;
    }

`;


export default DocumentTitleContainer;

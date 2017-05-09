import { injectGlobal } from 'styled-components';

import { bodyFont } from './theme';


injectGlobal`

    html, body, #main
    {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }


    *
    {
        font-family: ${ bodyFont };
        box-sizing: border-box;
    }


    #main
    {
        display: flex;
        background-color: #FAFAFA;
    }


    div[tabindex="-1"]:focus
    {
        outline: 0;
    }


    ul
    {
        margin: 0;
        padding: 0;
    }

`;

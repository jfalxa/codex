import { injectGlobal } from 'styled-components';

import * as theme from './theme';


injectGlobal`

    html, body
    {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }


    *
    {
        box-sizing: border-box;

        color: ${ theme.primaryText };
        font-family: ${ theme.bodyFont };
    }


    #main
    {
        display: flex;
        min-height: 100%;
        background-color: ${ theme.background };
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

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

    #main
    {
        display: flex;
    }

    #main *
    {
        font-family: ${ bodyFont };
    }

    div[tabindex="-1"]:focus
    {
        outline: 0;
    }

`;

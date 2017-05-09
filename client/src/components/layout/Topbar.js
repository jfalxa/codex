import React from 'react';

import TopbarContainer from './TopbarContainer';
import NewDocument     from '../document/NewDocument';
import ConnectedSearch from '../connectors/ConnectedSearch';


export default function Topbar()
{
    return (

        <TopbarContainer columns crossCenter>
            <NewDocument />
            <ConnectedSearch />
        </TopbarContainer>

    );
}

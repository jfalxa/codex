import React from 'react';

import NewDocument     from './NewDocument';
import TopbarContainer from './layout/TopbarContainer';
import ConnectedSearch from './connectors/ConnectedSearch';



export default function Topbar()
{
    return (

        <TopbarContainer columns crossCenter>
            <NewDocument />
            <ConnectedSearch />
        </TopbarContainer>

    );
}

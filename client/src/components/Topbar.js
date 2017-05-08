import React    from 'react';
import { Link } from 'react-router-dom';

import Container       from './layout/Container';
import ConnectedSearch from './connectors/ConnectedSearch';


export default function Topbar()
{
    return (

        <Container columns crossCenter>

            <Link to="/add">New</Link>

            <ConnectedSearch />

        </Container>

    );
}

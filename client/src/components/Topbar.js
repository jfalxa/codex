import React    from 'react';
import { Link } from 'react-router-dom';

import Container       from './Container';
import ConnectedSearch from './ConnectedSearch';


export default function Topbar()
{
    return (

        <Container columns>

            <Link to="/add">New</Link>

            <ConnectedSearch />

        </Container>

    );
}

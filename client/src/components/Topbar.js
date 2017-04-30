import React from 'react';
import { Link } from 'react-router-dom';

import Container from './Container';


export default function Topbar( props )
{
    return (

        <Container columns>

            <Link to="/">Home</Link>
            -
            <Link to="/add">New document</Link>

        </Container>

    );
}

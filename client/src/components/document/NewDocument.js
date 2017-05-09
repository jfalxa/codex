import React    from 'react';
import styled   from 'styled-components';
import NoteAdd  from 'react-icons/lib/md/note-add';
import { Link } from 'react-router-dom';

import * as theme from '../../style/theme';


const NewIcon = styled( NoteAdd )`

    margin-right: 10px;

    color: ${ theme.primaryText };

`;


export default function NewDocument( props )
{
    return (

        <Link to="/add" title="Add a new document">
            <NewIcon size="25" />
        </Link>

    );
}

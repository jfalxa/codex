import React    from 'react';
import styled   from 'styled-components';
import { Link } from 'react-router-dom';
import LinkIcon from 'react-icons/lib/md/link';
import EditIcon from 'react-icons/lib/md/edit';
import DoneIcon from 'react-icons/lib/md/done';

import DocumentTitleContainer from './DocumentTitleContainer';
import Container              from '../utilities/Container';
import EditableText           from '../utilities/EditableText';
import * as theme             from '../../style/theme';


const TitleInput = styled.input`

    width: 100%;

    margin-top: 1px;
    padding: 5px 15px;

    border: 0;
    border-bottom: 1px solid ${ theme.darkBackground };

    font-size: 1.5em;
    font-weight: bold;
    font-family: ${ theme.titleFont };

    background-color: transparent;

    outline: 0;

`;


const Title = styled.h1`

    margin: 0;
    padding: 0 15px;

    font-size: 1.5em;
    font-family: ${ theme.titleFont };

`;


function DocumentTitleEditing( { value, onChange, onStopEdit } )
{
    return (

        <Container fill columns mainSpaceBetween crossCenter>

            <TitleInput
                value={ value }
                placeholder="Enter a title..."
                onChange={ onChange } />

            <DoneIcon onClick={ onStopEdit } size="20" />

        </Container>

    );
}


function DocumentTitleShowing( { value, onStartEdit } )
{
    return (

        <Container fill columns mainSpaceBetween crossCenter>
            <Title>{ value }</Title>
            <EditIcon onClick={ onStartEdit } size="20" />
        </Container>

    );
}


export default function DocumentTitle( props )
{
    return (

        <DocumentTitleContainer columns crossCenter>

            <EditableText { ...props }
                renderEditing={ DocumentTitleEditing }
                renderShowing={ DocumentTitleShowing } />

            <Link to={ `/docs/${ props.id }` } title="Link to document">
                <LinkIcon size="20" />
            </Link>

        </DocumentTitleContainer>

    );
}

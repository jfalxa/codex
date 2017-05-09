import React    from 'react';
import styled   from 'styled-components';
import EditIcon from 'react-icons/lib/md/edit';
import DoneIcon from 'react-icons/lib/md/done';

import EditableText           from '../utilities/EditableText';
import DocumentTitleContainer from '../layout/DocumentTitleContainer';
import { titleFont } from '../../style/theme';


const TitleInput = styled.input`

    width: 100%;

    margin-top: 1px;
    padding: 5px 15px;

    border: 0;
    border-bottom: 1px solid #CCCCCC;

    font-size: 1.5em;
    font-weight: bold;
    font-family: ${ titleFont };

    background-color: transparent;

    outline: 0;

`;



function DocumentTitleEditing( { value, onChange, onStopEdit } )
{
    return (

        <DocumentTitleContainer columns mainSpaceBetween crossCenter>

            <TitleInput
                value={ value }
                placeholder="Enter a title..."
                onChange={ onChange } />

            <DoneIcon onClick={ onStopEdit } size="20" />

        </DocumentTitleContainer>

    );
}


const Title = styled.h1`

    margin: 0;
    padding: 0 15px;

    font-size: 1.5em;
    font-family: ${ titleFont };

`;


function DocumentTitleShowing( { value, onStartEdit } )
{
    return (

        <DocumentTitleContainer columns mainSpaceBetween crossCenter>
            <Title>{ value }</Title>
            <EditIcon onClick={ onStartEdit } size="20" />
        </DocumentTitleContainer>

    );
}


export default function DocumentTitle( props )
{
    return (

        <EditableText { ...props }
            renderEditing={ DocumentTitleEditing }
            renderShowing={ DocumentTitleShowing } />

    );
}

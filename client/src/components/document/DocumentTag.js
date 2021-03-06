import React     from 'react';
import styled    from 'styled-components';
import ClearIcon from 'react-icons/lib/md/clear';

import TagContainer from './TagContainer';
import Container    from '../utilities/Container';
import * as theme   from '../../style/theme';


const Label = styled.span`

    flex: 1;

    color: ${ theme.secondaryText };
    font-size: 0.8em;
    font-style: italic;

    text-align: right;

`;


const Tag = styled.span`

    flex: 4;

`;


const Separator = styled.span`

    margin: 0 20px;

    color: ${ theme.secondaryText };
    font-weight: bold;

`;


const RemoveIcon = styled( ClearIcon )`

    flex-shrink: 0;
    height: 1.2em;
    cursor: pointer;

`;


export default function DocumentTag( { name, label, onRemove } )
{
    return (

        <TagContainer columns mainSpaceBetween>

            <Container fill columns mainCenter crossCenter>
                <Label>{ label }</Label>
                <Separator>·</Separator>
                <Tag>{ name }</Tag>
            </Container>

            <RemoveIcon size="15" onClick={ onRemove } />

        </TagContainer>

    );
}

import React     from 'react';
import styled    from 'styled-components';
import ClearIcon from 'react-icons/lib/md/clear';

import TagContainer from '../layout/TagContainer';


const Tag = styled.span`

    line-height: 1.2em;

`;


const RemoveIcon = styled( ClearIcon )`

    flex-shrink: 0;
    height: 1.2em;
    margin-left: 15px;
    cursor: pointer;

`


export default function DocumentTag( { name, onRemove } )
{
    return (

        <TagContainer columns mainSpaceBetween>
            <Tag>{ name }</Tag>
            <RemoveIcon size="15" onClick={ onRemove } />
        </TagContainer>

    );
}

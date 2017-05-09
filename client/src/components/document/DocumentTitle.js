import React    from 'react';
import styled   from 'styled-components';
import EditIcon from 'react-icons/lib/md/edit';
import DoneIcon from 'react-icons/lib/md/done';

import EditableText           from '../EditableText';
import DocumentTitleContainer from '../layout/DocumentTitleContainer';


function DocumentTitleEditing( { value, onChange, onStopEdit } )
{
    return (

        <DocumentTitleContainer columns mainSpaceBetween crossCenter>

            <input
                value={ value }
                placeholder="Enter a title..."
                onChange={ onChange } />

            <DoneIcon onClick={ onStopEdit } size="20" />

        </DocumentTitleContainer>

    );
}


function DocumentTitleShowing( { value, onStartEdit } )
{
    return (

        <DocumentTitleContainer columns mainSpaceBetween crossCenter>
            <span>{ value }</span>
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

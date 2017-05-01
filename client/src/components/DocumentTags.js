import React from 'react';

import Container from './Container';



function Tag( { name, onEdit, onDelete } )
{
    return (

        <li>
            <button onClick={ onEdit }>E</button>
            <button onClick={ onDelete }>X</button>
            <span>{ name }</span>
        </li>

    );
}


export default class DocumentTags extends React.Component
{
    renderTags()
    {
        const { tags, onEditTag, onDeleteTag } = this.props;

        return tags.map( ( tag, i ) =>
        (
            <Tag
                key={ i }
                name={ tag.name }
                onEdit={ () => onEditTag( tag ) }
                onDelete={ () => onDeleteTag( tag ) } />
        ) );
    }


    render()
    {
        const { name, tags } = this.props;

        return (

            <Container rows>

                <ul>
                    { this.renderTags() }
                </ul>

            </Container>

        );
    }
}

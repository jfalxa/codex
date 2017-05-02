import React from 'react';

import Container from './Container';



function Tag( { name, onEdit, onDelete } )
{
    return (

        <li>
            <button onClick={ onDelete }>X</button>
            <span>{ name }</span>
        </li>

    );
}


export default class DocumentTags extends React.Component
{
    renderTags()
    {
        const { tags, onDeleteTag } = this.props;

        return tags.map( ( tag, i ) =>
        (
            <Tag
                key={ i }
                name={ tag.name }
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

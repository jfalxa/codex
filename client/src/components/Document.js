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


export default class Document extends React.Component
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
        const { name } = this.props;

        return (

            <Container rows>

                <b>{ name }</b>

                <ul>
                    { this.renderTags() }
                </ul>

            </Container>

        );
    }
}


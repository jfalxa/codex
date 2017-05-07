import React from 'react';

import Container from '../layout/Container';


function Tag( { name, onEdit, onRemove } )
{
    return (

        <li>
            <button onClick={ onRemove }>X</button>
            <span>{ name }</span>
        </li>

    );
}


export default class Document extends React.Component
{
    renderTags()
    {
        const { tags, onRemoveTag } = this.props;

        return tags.map( ( tag, i ) =>
        (
            <Tag
                key={ i }
                name={ tag.name }
                onRemove={ () => onRemoveTag( tag ) } />
        ) );
    }


    render()
    {
        const { name, layout } = this.props;

        return (

            <Container { ...layout } rows>

                <b>{ name }</b>

                <ul>
                    { this.renderTags() }
                </ul>

            </Container>

        );
    }
}


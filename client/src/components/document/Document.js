import React from 'react';

import Container    from '../layout/Container';
import Autocomplete from '../autocomplete/Autocomplete';


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
        const { doc, onRemoveTag } = this.props;

        return doc.tags.map( ( tag, i ) =>
        (
            <Tag
                key={ i }
                name={ tag.name }
                onRemove={ () => onRemoveTag( tag ) } />
        ) );
    }


    render()
    {
        const { doc, fragment, suggestions, onAddTag, onSetFragment, getSuggestions } = this.props;


        return (

            <Container rows>

                <b>{ doc.name }</b>

                <Autocomplete
                    value={ fragment }
                    suggestions={ suggestions }
                    onChange={ onSetFragment }
                    onSubmit={ onAddTag }
                    getSuggestions={ getSuggestions } />

                <ul>
                    { this.renderTags() }
                </ul>

            </Container>

        );
    }
}


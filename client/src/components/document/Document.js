import React from 'react';

import DocumentTitle     from './DocumentTitle';
import DocumentContainer from '../layout/DocumentContainer';
import Autocomplete      from '../utilities/Autocomplete';


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
    handleChangeName = ( e ) =>
    {
        this.props.onChangeName( e.target.value );
    }


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
        const { doc, fragment, suggestions, edit } = this.props
        const { onSaveDoc, onAddTag, onSetFragment, getSuggestions } = this.props;

        return (

            <DocumentContainer rows>

                <DocumentTitle
                    edit={ edit }
                    value={ doc.name }
                    onChange={ this.handleChangeName }
                    onEdit={ onSaveDoc } />

                <Autocomplete
                    value={ fragment }
                    suggestions={ suggestions }
                    onChange={ onSetFragment }
                    onSubmit={ onAddTag }
                    getSuggestions={ getSuggestions } />

                <ul>
                    { this.renderTags() }
                </ul>

            </DocumentContainer>

        );
    }
}


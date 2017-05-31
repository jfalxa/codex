import React from 'react';

import DocumentTitle           from './DocumentTitle';
import DocumentTag             from './DocumentTag';
import DocumentContainer       from './DocumentContainer';
import TagAutocomplete         from './TagAutocomplete';
import TagInput                from './TagInput';
import ScrollableListContainer from '../utilities/ScrollableListContainer';


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
            <DocumentTag
                key={ i }
                name={ tag.value }
                label={ tag.type }
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

                <TagAutocomplete
                    value={ fragment }
                    suggestions={ suggestions }
                    onAutocomplete={ onSetFragment }
                    onChange={ onSetFragment }
                    onSubmit={ onAddTag }
                    getSuggestions={ getSuggestions }
                    renderInput={ TagInput } />

                <ScrollableListContainer>
                    { this.renderTags() }
                </ScrollableListContainer>

            </DocumentContainer>

        );
    }
}


import React from 'react';

import DocumentTitle           from './DocumentTitle';
import DocumentTag             from './DocumentTag';
import DocumentContainer       from './DocumentContainer';
import TagAutocomplete         from './TagAutocomplete';
import TagInput                from './TagInput';
import ScrollableListContainer from '../utilities/ScrollableListContainer';


const LABEL_TAG_RX = /^(?:~([^~\s]*))?\s*([^~]*)$/;


export default class Document extends React.Component
{
    handleChangeName = ( e ) =>
    {
        this.props.onChangeName( e.target.value );
    }


    getSuggestions = ( fragment ) =>
    {
        const { getSuggestions } = this.props;

        const [_, type, value] = fragment.match( LABEL_TAG_RX );

        if ( type && !value )
        {
            getSuggestions( 'label', type );
        }
        else if ( value )
        {
            getSuggestions( 'tag', value );
        }
    }


    // @TODO find a cleaner solution for that if mess
    handleAutocomplete = ( suggestion ) =>
    {
        const { fragment, onSetFragment } = this.props;

        const [_, type, value] = fragment.match( LABEL_TAG_RX );

        if ( type && !value )
        {
            onSetFragment( `~${ suggestion }` );
        }
        else if ( !type && value )
        {
            onSetFragment( suggestion );
        }
        else
        {
            onSetFragment( `~${ type } ${ suggestion }` );
        }
    }


    handleSubmit = () =>
    {
        const { fragment, onAddTag } = this.props;

        const [_, type, value] = fragment.match( LABEL_TAG_RX );

        onAddTag( { type, value } );
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
                    id={ doc.id }
                    value={ doc.name }
                    onChange={ this.handleChangeName }
                    onEdit={ onSaveDoc } />

                <TagAutocomplete
                    value={ fragment }
                    suggestions={ suggestions }
                    onAutocomplete={ this.handleAutocomplete }
                    onChange={ onSetFragment }
                    onSubmit={ this.handleSubmit }
                    getSuggestions={ this.getSuggestions }
                    renderInput={ TagInput } />

                <ScrollableListContainer>
                    { this.renderTags() }
                </ScrollableListContainer>

            </DocumentContainer>

        );
    }
}


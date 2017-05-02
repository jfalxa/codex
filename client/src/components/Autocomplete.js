import React       from 'react';
import { HotKeys } from 'react-hotkeys';

import Container from './Container';


export default class Autocomplete extends React.Component
{
    state =
    {
        highlighted : -1
    }


    handlers =
    {
        up    : e => this.handleHighlight( -1 ),
        down  : e => this.handleHighlight( +1 ),
        esc   : e => this.handleHighlight( null ),
        tab   : e => this.handleCompleteHighlight( e ),
        enter : e => this.handleSubmitAutocomplete()
    }


    handleChangeAutocomplete = ( e ) =>
    {
        const { onChange } = this.props;
        const value = e.target.value;
        onChange( value );

        this.setState( { highlighted : -1 } );
    }


    handleSubmitAutocomplete = ( e ) =>
    {
        if ( !this.props.value )
        {
            return;
        }

        const { value, suggestions, onSubmit } = this.props;
        const { highlighted } = this.state;

        if ( highlighted > -1 )
        {
            onSubmit( suggestions[highlighted] );
        }
        else
        {
            onSubmit( { name : value } );
        }
    }


    handleHighlight = ( movement ) =>
    {
        if ( movement === null )
        {
            return this.setState( { highlighted : -1 } );
        }

        const { suggestions } = this.props;
        const highlighted     = ( this.state.highlighted + movement + suggestions.length ) % suggestions.length;

        this.setState( { highlighted } );
    }


    handleCompleteHighlight = ( e ) =>
    {
        e.preventDefault();

        const { suggestions, onChange } = this.props;
        const { highlighted } = this.state;

        this.setState( { highlighted : 0 } );

        onChange( suggestions[highlighted].name );
    }


    renderSuggestions()
    {
        const { suggestions } = this.props;
        const { highlighted } = this.state;

        return suggestions.map( ( suggestion, i ) =>
        (
            <li
                key={ i }
                style={ { fontWeight : ( i === highlighted ) ? 'bold' : 'normal' } }>
                { suggestion.name }
            </li>
        ) );
    }


    render()
    {
        const { value, suggestions } = this.props;

        return (

            <HotKeys handlers={ this.handlers }>

                <Container rows>

                    <input
                        autoComplete="off"
                        name="tag"
                        placeholder="Enter a tag..."
                        value={ value }
                        onChange={ this.handleChangeAutocomplete } />

                    { this.renderSuggestions() }

                </Container>

            </HotKeys>

        );
    }
}

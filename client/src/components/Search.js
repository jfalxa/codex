import React from 'react';

import Container    from './Container';
import Autocomplete from './Autocomplete';

const LAST_WORD_RX = / *([^" ]+|"[^"]+") *$/;
const NEW_TERM_RX  = /^ *( |\(|("[\w ]+"|[\w]+) *( |,|\)) *)/;


export default class Search extends React.Component
{
    getFragment( value )
    {
        return value.replace( this.props.search, '' );
    }


    handleChange = ( value, isSuggestion ) =>
    {
        const { search, setFragment, setSearch, apiSearchDocs } = this.props;

        // Change is coming from suggestions : append it to the current search
        if ( isSuggestion )
        {
            const suggestion = value.includes( ' ' )
                ? `"${ value }"`
                : value;

            setFragment( suggestion );
            apiSearchDocs( search + suggestion );
        }
        else
        {
            const fragment = this.getFragment( value );

            // Search is empty
            if ( value.length === 0 )
            {
                setSearch( '' );
            }
            // User is removing words from search
            else if ( value.length < search.length )
            {
                setSearch( search.replace( LAST_WORD_RX, '' ) );
            }
            // A new search term was added so we update the search
            else if ( NEW_TERM_RX.test( fragment ) )
            {
                setSearch( value );
            }
            // User is editing last search term
            else
            {
                setFragment( fragment );
            }

            apiSearchDocs( value );
        }
    }


    handleSubmit = () =>
    {
        const { search, fragment, history, setSearch, apiSearchDocs } = this.props;

        const newSearch = ( search + fragment );

        setSearch( newSearch );
        apiSearchDocs( newSearch );

        history.push( '/' );
    }


    getSuggestions = ( value ) =>
    {
        const fragment = this.getFragment( value ).trim();

        this.props.apiAutocomplete( fragment );
    }


    render()
    {
        const { search, fragment, suggestions } = this.props;

        return (

            <Autocomplete
                value={ search + fragment }
                suggestions={ suggestions }
                onChange={ this.handleChange }
                onSubmit={ this.handleSubmit }
                getSuggestions={ this.getSuggestions } />

        );
    }

}


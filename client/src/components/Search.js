import React from 'react';

import Container    from './Container';
import Autocomplete from './Autocomplete';
import DocumentList from './DocumentList';

const LAST_WORD_RX = / *([^" ]+|"[^"]+") *$/;
const NEW_TERM_RX  = /^ *( |\(|("[\w ]+"|[\w]+) *( |,|\)) *)/;


export default class Search extends React.Component
{
    componentDidMount()
    {
        const { location, setSearch, apiSearchDocs } = this.props;

        const hashSearch = location.hash.substring( 1 );

        setSearch( hashSearch );
        apiSearchDocs( hashSearch );
    }


    componentDidUpdate( prevProps )
    {
        const { search, location, setSearch, apiSearchDocs } = this.props;

        const hashSearch     = location.hash.substring( 1 );
        const prevHashSearch = prevProps.location.hash.substring( 1 );

        if ( hashSearch !== prevHashSearch )
        {
            setSearch( hashSearch );
            apiSearchDocs( hashSearch );
        }
    }


    getFragment( value )
    {
        return value.replace( this.props.search, '' );
    }


    handleChange = ( value, isSuggestion ) =>
    {
        const { search, setFragment, setSearch, apiSearchDocs } = this.props;

        // 1. Change is coming from suggestions : append it to the current search
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

            if ( value.length === 0 )
            {
                setSearch( '' );
            }
            else if ( value.length < search.length )
            {
                setSearch( search.replace( LAST_WORD_RX, '' ) );
            }
            else if ( NEW_TERM_RX.test( fragment ) )
            {
                setSearch( value );
            }
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

        history.push( `/#${ newSearch }` );
    }


    getSuggestions = ( value ) =>
    {
        const fragment = this.getFragment( value );

        if ( fragment.length > 0 )
        {
            this.props.apiAutocomplete( fragment );
        }
    }


    render()
    {
        const { highlighted, documents, search, fragment, suggestions } = this.props;
        const { setFragment, setHighlight, apiSearchDocs } = this.props;

        return (

            <Container>

                <Autocomplete
                    value={ search + fragment }
                    suggestions={ suggestions }
                    onChange={ this.handleChange }
                    onSubmit={ this.handleSubmit }
                    getSuggestions={ this.getSuggestions } />

                <DocumentList
                    highlighted={ highlighted }
                    documents={ documents }
                    onHighlight={ setHighlight } />

            </Container>

        );
    }

}


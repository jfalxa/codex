import React  from 'react';
import styled from 'styled-components';

import Container from './Container';


function callAPI( url, options )
{
    const finalOptions = 
    {
        ...options,

        headers :
        {
            'Accept'       : 'application/json',
            'Content-Type' : 'application/json'
        }
    };

    return fetch( `/api/${ url }`, finalOptions )
        .then( response => response.json() );
}


function saveDoc( name )
{
    const options =
    {
        method : 'POST',
        body   : JSON.stringify( { name } )
    };

    return callAPI( '/docs', options );
}
 

const Label = styled.label`

`;

const Input = styled.input`

`;

const Button = styled.button`

`;


function FormField( props )
{
    return (

        <Label>
            { props.label  }
            <Input name={ props.name  } /> 
        </Label>

    );
}


class DocList extends React.Component
{
    state =
    {
        docs : []
    }
    
    
    componentDidMount()
    {
        callAPI( '/docs' ).then( docs => this.setState( { docs } ) );
    }
    

    render()
    {
        return (

            <ul>
                { this.state.docs.map( doc => <li>{ doc.name }</li> ) }
            </ul>

        );
    }
}


export default class App extends React.Component
{
    saveDocument = ( e ) =>
    {
        e.preventDefault();

        const title = e.target.title.value;

        saveDoc( title );
    }


    render()
    {
        return (
            
            <Container>

                <form onSubmit={ this.saveDocument }>

                    <FormField name="title" label="Title" />
                    
                    <Button type="submit">Save</Button>

                </form>

                <DocList />

            </Container>

        );
    }
}


import React from 'react';

import Container from './Container';


export default class DocumentForm extends React.Component
{
    handleChangeAutocomplete = ( e ) =>
    {
        const { autocomplete } = this.props;
        const input = e.target.value;
        autocomplete( input );
    }


    handleSubmitAutocomplete = ( e ) =>
    {
        e.preventDefault();
        const { input, addTag } = this.props;
        addTag( input );
    }


    handleChangeName = ( e ) =>
    {
        const { changeName } = this.props;
        const name = e.target.value;
        changeName( name );
    }


    render()
    {
        const { doc, tags, input, suggestions, onSave } = this.props;

        return (

            <Container columns>

                <Container rows>

                    <form
                        id="document-form"
                        onChange={ this.handleChangeAutocomplete }
                        onSubmit={ this.handleSubmitAutocomplete }>

                        <input
                            name="tag"
                            placeholder="Enter a tag..."
                            value={ input  } />

                    </form>

                    <ul>
                        { suggestions.map( ( suggestion, i ) => <li key={ i }>{ suggestion }</li> ) }
                    </ul>

                </Container>

                <Container rows>

                    <button onClick={ onSave }>Save</button>

                    <input
                        name="doc"
                        placeholder="Enter a title..."
                        value={ doc.name || '' }
                        onChange={ this.handleChangeName } />

                    <ul>
                        { tags.map( ( tag, i ) => <li key={ i }>{ tag }</li> ) }
                    </ul>

                </Container>

            </Container>

        );
    }
}

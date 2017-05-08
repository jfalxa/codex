import React from 'react';


export default class EditableText extends React.Component
{
    state =
    {
        isEditing : false
    }


    startEditing = () =>
    {
        this.setState( { isEditing : true } );
    }


    stopEditing = () =>
    {
        const { value, onEdit } = this.props;

        onEdit( value );
        this.setState( { isEditing : false } );
    }


    renderEditing()
    {
        const { value, onChange } = this.props;

        return (

            <div>

                <input
                    value={ value }
                    onChange={ onChange } />

                <button onClick={ this.stopEditing }>Save</button>

            </div>

        );
    }


    renderShowing()
    {
        const { value } = this.props;

        return (

            <div>
                <span>{ value }</span>
                <button onClick={ this.startEditing }>Edit</button>
            </div>

        );
    }


    render()
    {
        return ( this.props.edit || this.state.isEditing )
            ? this.renderEditing()
            : this.renderShowing();
    }

}

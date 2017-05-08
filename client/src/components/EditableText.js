import React from 'react';


function Editing( { value, onChange, onStopEdit } )
{
    return (

        <div>

            <input
                value={ value }
                onChange={ onChange } />

            <button onClick={ onStopEdit }>Save</button>

        </div>

    );
}


function Showing( { value, onStartEdit } )
{
    return (

        <div>
            <span>{ value }</span>
            <button onClick={ onStartEdit }>Edit</button>
        </div>

    );
}


export default class EditableText extends React.Component
{
    static defaultProps =
    {
        renderEditing : Editing,
        renderShowing : Showing
    }


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


    render()
    {
        const { edit, value, onChange } = this.props;
        const { renderEditing:Editing, renderShowing:Showing } = this.props;

        return ( edit || this.state.isEditing )
            ? <Editing value={ value } onChange={ onChange } onStopEdit={ this.stopEditing } />
            : <Showing value={ value } onStartEdit={ this.startEditing } />;
    }
}

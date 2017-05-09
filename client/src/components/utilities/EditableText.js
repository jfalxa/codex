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


    render()
    {
        const { edit, value, onChange } = this.props;
        const { renderEditing:Editing, renderShowing:Showing } = this.props;

        return ( edit || this.state.isEditing )
            ? <Editing value={ value } onChange={ onChange } onStopEdit={ this.stopEditing } />
            : <Showing value={ value } onStartEdit={ this.startEditing } />;
    }
}

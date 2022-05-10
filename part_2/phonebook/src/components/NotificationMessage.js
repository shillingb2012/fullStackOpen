import React from 'react'

const NotificationMessage = ({ message }) => {
    
    const messageStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null)
    {
        return null
    }

    else {
        return (
            <div style={messageStyle}>
                {message}
            </div>
        )
    } 
        
}
export default NotificationMessage
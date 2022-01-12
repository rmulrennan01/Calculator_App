import React from 'react'

function Display(props) {
    return (
        <div>
            {props.previous} {props.operation}
            <br/> 
            {props.result}
        </div>
    )
}

export default Display

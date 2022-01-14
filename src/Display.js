import React from 'react'
import "./Display.css"

function Display(props) {
    return (
        <div className="display">
            {props.previous} {props.operation}
            <br/> 
            {props.result}
        </div>
    )
}

export default Display

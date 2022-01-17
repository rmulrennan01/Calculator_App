import React from 'react'
import "./Display.css"

function Display(props) {


    return (
        <div className="display">
            <div className="display__previous">
                {props.previous} {props.operation}
            </div> 
            <br/> 
            <div className = "display__current">
                {props.result}
            </div> 
       
            
        </div>
    )
}

export default Display

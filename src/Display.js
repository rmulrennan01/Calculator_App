import React from 'react'
import "./Display.css"

function Display(props) {
    /*const previousBlank = () => {
        if(props.operation != null){
            return props.previous; 
        }
        else{
            return ( <> _</>);
        }
    }
    */

    return (
        <div className="display">
            {props.previous} {props.operation}
            <br/> 
            {props.result}
            
        </div>
    )
}

export default Display

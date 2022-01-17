import React, {useEffect, useState} from 'react'
import "./Button.css"

function Button(props) {
   
    return (
        <div>
         <button className= "button" onClick={props.clickFunc}>{props.display}</button> 
        </div>
    )
}

export default Button

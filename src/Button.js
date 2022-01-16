import React, {useEffect, useState} from 'react'

function Button(props) {
   
    return (
        <>
        <button onClick={props.clickFunc}>{props.display}</button> 
        </>
    )
}

export default Button

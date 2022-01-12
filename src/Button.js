import React, {useEffect, useState} from 'react'

function Button(props) {
    const [click, setClick] = useState(true); 
    return (
        <>
        <button onClick={props.clickFunc}>{props.display}</button> 
        </>
    )
}

export default Button

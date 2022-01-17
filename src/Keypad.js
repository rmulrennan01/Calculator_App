import React, {useState} from 'react'
import Button from "./Button.js"; 
import "./Keypad.css"; 

function Keypad(props) {
    const [operator, setOperator] = useState(false); //false indicates user is still inputing digits (i.e. no math operation yet)
    const [answer, setAnswer] = useState(0); 


    return (
        <div className="keypad"> 
            <div className = "keypad__row">
                <Button display="clear" clickFunc={()=>props.clearFunc()}/> 
                <Button display="sqrt" clickFunc={()=>props.clearFunc()}/> 
                <Button display="^" clickFunc={()=>props.mathFunc('^')}/> 
                <Button display="÷" clickFunc={()=>props.mathFunc('÷')}/>
            </div>
            <div className = "keypad__row">
                <Button display="7" clickFunc={()=>props.digitFunc(7)}/> 
                <Button display="8" clickFunc={()=>props.digitFunc(8)}/> 
                <Button display="9" clickFunc={()=>props.digitFunc(9)}/>
                <Button display="X" clickFunc={()=>props.mathFunc('x')}/> 
            </div>
            <div className = "keypad__row">
                <Button display="4" clickFunc={()=>props.digitFunc(4)}/> 
                <Button display="5" clickFunc={()=>props.digitFunc(5)}/> 
                <Button display="6" clickFunc={()=>props.digitFunc(6)}/> 
                <Button display="-" clickFunc={()=>props.mathFunc('-')}/>  

            </div>
            <div className = "keypad__row">
                <Button display="1" clickFunc={()=>props.digitFunc(1)}/> 
                <Button display="2" clickFunc={()=>props.digitFunc(2)}/> 
                <Button display="3" clickFunc={()=>props.digitFunc(3)}/> 
                <Button display="+" clickFunc={()=>props.mathFunc('+')}/> 
            </div>

            <div className = "keypad__row"> 
                <Button display="0" clickFunc={()=>props.digitFunc(0)}/> 
                <Button display="." clickFunc={()=>props.decimalFunc()}/> 
                <Button display="neg" clickFunc={()=>props.negFunc()} /> 
                <Button display="=" clickFunc={()=>props.equalFunc()}/>
            </div> 

        </div>
    )
}

export default Keypad

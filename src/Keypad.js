import React, {useState} from 'react'
import Button from "./Button.js"; 
import "./Keypad.css"; 

function Keypad(props) {
    const [operator, setOperator] = useState(false); //false indicates user is still inputing digits (i.e. no math operation yet)
    const [answer, setAnswer] = useState(0); 


    return (
        <div className="keypad"> 
            <div className="keypad__topRow">
                <Button display="clear" clickFunc={()=>props.clearFunc()}/> 
                <Button display="neg" clickFunc={()=>props.negFunc()} /> 

                
            </div>

            <div className="keypad__topRow">
                <Button display="^" clickFunc={()=>props.mathFunc('^')}/> 
                

            </div>

            <div className="keypad__topRow">
                <Button display="+" clickFunc={()=>props.mathFunc('+')}/> 
                <Button display="÷" clickFunc={()=>props.mathFunc('÷')}/>
                <Button display="X" clickFunc={()=>props.mathFunc('x')}/> 
                <Button display="-" clickFunc={()=>props.mathFunc('-')}/>  

            </div>
            <div className="keypad__body"> 
                <div className="keypad__bodyLeft"> 
                    <div className="keypad__bodyLeft__top"> 
                        <div>
                            <Button display="7" clickFunc={()=>props.digitFunc(7)}/> 
                            <Button display="8" clickFunc={()=>props.digitFunc(8)}/> 
                            <Button display="9" clickFunc={()=>props.digitFunc(9)}/> 
                        </div>
                        <div>
                            <Button display="4" clickFunc={()=>props.digitFunc(4)}/> 
                            <Button display="5" clickFunc={()=>props.digitFunc(5)}/> 
                            <Button display="6" clickFunc={()=>props.digitFunc(6)}/> 
                        </div>
                        <div>
                            <Button display="1" clickFunc={()=>props.digitFunc(1)}/> 
                            <Button display="2" clickFunc={()=>props.digitFunc(2)}/> 
                            <Button display="3" clickFunc={()=>props.digitFunc(3)}/> 
                        </div>
                    </div> 
                    <div className="keypad__bodyLeft__bottom">
                        <Button display="0" clickFunc={()=>props.digitFunc(0)}/> 
                        <Button display="." clickFunc={()=>props.decimalFunc()}/> 
                    </div>

                </div> 
                <div className="keypad__bodyRight"> 
                    <div> 
                        
                        <Button display="=" clickFunc={()=>props.equalFunc()}/>
                     
                        
                    </div> 
                </div> 
            </div> 
        </div>
    )
}

export default Keypad

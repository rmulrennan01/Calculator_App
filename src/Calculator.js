import React, {useEffect, useState} from 'react'
import Display from "./Display.js"; 
import Keypad from "./Keypad.js"; 


function Calculator() {
    const [displayVal, setDisplayVal] = useState(0); 
    const [previousVal, setPreviousVal] = useState(0); 
    const [operator, setOperator] = useState(null); 
    const [decimalMult, setDecimalMult] = useState(10); 
    
    const concatDisplay = (a) => {
        if(decimalMult==10){
            setDisplayVal((displayVal*decimalMult)+a); 
        }
        else if(decimalMult>0.000000001){
            setDisplayVal(displayVal+(a*decimalMult)); 
            setDecimalMult(decimalMult/10); 
        } 
        console.log(decimalMult); 
    }; 

    const clear = () => {
        setDisplayVal(0); 
        setPreviousVal(0); 
        setOperator(null); 
        setDecimalMult(10); 
    }

    const add = () =>{
        //setPreviousVal(previousVal+displayVal); 
        //setDisplayVal(0); 
        //setOperator("+"); 
        handleCalc('+'); 
    }

    const subtract = () =>{
        //setPreviousVal(previousVal-displayVal); 
        //setDisplayVal(0); 
        //setOperator("-"); 
        handleCalc('-'); 
    }
    const divide = () =>{
        handleCalc('÷');
    }

    const decimal = () => {
        if(decimalMult == 10){
            setDecimalMult(0.1);
        }
    }

    const multiply = () => {
        handleCalc('x'); 

    }


    const handleCalc = (input) => {
        switch (input) {
            case '+': 
                if(operator == '+'){
                    setPreviousVal(previousVal+displayVal); 
                    setDisplayVal(0);
                }
                else{
                    setOperator('+'); 
                    setPreviousVal(displayVal); 
                    setDisplayVal(0);                    
                }
                break; 
            case '-':
                if(operator == '-'){
                    setPreviousVal(previousVal-displayVal); 
                    setDisplayVal(0);
                }
                else{
                    setOperator('-');
                    setPreviousVal(displayVal); 
                    setDisplayVal(0);               
                }
                break; 
            case '÷':
                if(operator == '÷'){
                    if(displayVal == 0){
                        alert("Can't Divide By Zero"); 
                    }
                    else{
                        setPreviousVal(previousVal/displayVal); 
                        setDisplayVal(0);
                    }
                }
                else{
                    setOperator('÷');
                    setPreviousVal(displayVal); 
                    setDisplayVal(0);               
                }
                break; 
            case '=':
                setOperator('='); 
                break; 
            case 'x': 
                if(operator == 'x'){
                    setPreviousVal(previousVal*displayVal); 
                    setDisplayVal(0);
                }
                else{
                    setOperator('x');
                    setPreviousVal(displayVal); 
                    setDisplayVal(0);               
                }
                break; 

        }

    }


   


    return (
        <div>
            <Display 
                result={displayVal} 
                previous={previousVal}
                operation={operator}
            /> 
            <br/> 
            <Keypad 
                digitFunc = {concatDisplay}
                clearFunc = {clear}
                addFunc = {add}
                subtractFunc = {subtract}
                divideFunc = {divide}
                decimalFunc = {decimal}
                multFunc = {multiply}
            /> 
        </div>
    )
}

export default Calculator

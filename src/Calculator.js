    import React, {useEffect, useState} from 'react'
import Display from "./Display.js"; 
import Keypad from "./Keypad.js"; 


function Calculator() {
 
    const [display, setDisplay] = useState({previous:0,current:0 });
    const [operator, setOperator] = useState(null); 
    const [digitInputMode, setDigitInputMode] = useState(false); //true: last key press was a math operator
    const [decimalPlaces, setDecimalPlaces] = useState(0);
    
    const updateDisplay = (prev,cur) => {
        setDisplay({previous:prev, current:cur});
    }
    
    const concatDisplay = (a) => {
        let wholeNum = 0; 
        let newNum = 0; 
        if(digitInputMode == false){ //digit entry after cleared display
            if(decimalPlaces==0){               
                updateDisplay(display.previous,a); 
                console.log("Number of decimal places: " + decimalPlaces); 
                console.log("digitInputMode: "+digitInputMode); 
            }
            else {
                /*
                newNum = (display.current*10+a)*(10**(-decimalPlaces));
                newNum = newNum.toFixed(decimalPlaces); 
                */
                updateDisplay(display.previous,(a*0.1).toFixed(1));
                setDecimalPlaces(1);   
                console.log("Number of decimal places: " + decimalPlaces); 
                console.log("digitInputMode: "+digitInputMode); 
            } 
        }
        else{
            if(decimalPlaces==0){
                
                updateDisplay(display.previous,(display.current*10)+a); 
                console.log("Number of decimal places: " + decimalPlaces); 
                console.log("digitInputMode: "+digitInputMode); 
                
            }
            else {
                wholeNum = display.current * (10**decimalPlaces); //convert, so no decimal
                wholeNum = wholeNum + a; //shift one power of 10 and add new digit
                newNum = wholeNum * (10**(-decimalPlaces)); //convert value from wholeNum to shift decimal
                newNum = newNum.toFixed(decimalPlaces); //toFixed must be used to correct floating point precision error with jsx
                updateDisplay(display.previous,newNum);
                setDecimalPlaces(decimalPlaces+1);  
                console.log("Number of decimal places: " + decimalPlaces); 
                console.log("digitInputMode: "+digitInputMode); 
                
            } 

        }
           

        setDigitInputMode(true); 
    }; 

    const decimal = () => {
        if(decimalPlaces == 0){
           setDecimalPlaces(1); 
       }
    }

    const clear = () => { //clear display and operator
        updateDisplay(0,0); 
        setOperator(null); 
        setDecimalPlaces(0); 
    }


    /*
    Bugs:
    -inputting numbers after equals button just concats to the existing answer --fixed
    -decimalPlaces doesn't reset to 0 after completing a math function

    */
    const equate = () => {
        handleMath(); 
        setDecimalPlaces(0); 
        setOperator(null); 
    }

    const handleMath = () => {
        let tempVal = 0; 
        setDecimalPlaces(0);
        switch (operator) {
            case '+': 
                console.log("adding: " + display.previous + "and" + display.current); 
                console.log(display.previous+display.current); 
                tempVal = display.previous.valueOf()+display.current.valueOf(); 
                updateDisplay(tempVal, tempVal);  
                break; 
            case '-':
            
                tempVal = display.previous-display.current; 
                updateDisplay(tempVal, tempVal);  
                break; 
            case '÷':
                if(display.current==0){
                    alert("Can't Divid By Zero");
                    clear(); 
                }
                else{ 
                  
                    tempVal = display.previous/display.current; 
                    updateDisplay(tempVal, tempVal);  
                }
                break;  
            case 'x':
               
                tempVal = display.previous*display.current; 
                updateDisplay(tempVal, tempVal);  
                break; 
        }
         
    }



/*

    Calculate only if -> Operator is not null, another operator is pressed
    1. Calc only if previous press was a digit
    2. Overwrite operator if previous press was an operator. No Calculation. 
*/


    const handleOperator = (input) => {
     
        if(operator == null){ 
            setOperator(input); 
            
            updateDisplay(display.current,display.current); 
            setDigitInputMode(false);         
            setDecimalPlaces(0); 
        }
        else{
            if(digitInputMode == true){ 
                handleMath();  
                setOperator(input); 
                setDigitInputMode(false); 
            }
            else{
                setOperator(input); 
                setDecimalPlaces(0); 
            }
        }
    }

    return (
        <div>
            <Display 
                result={display.current} 
                previous={display.previous}
                operation={operator}
            /> 
            <br/> 
            <Keypad 
                digitFunc = {concatDisplay}
                clearFunc = {clear}
                mathFunc = {handleOperator}
                equalFunc = {equate}
                decimalFunc = {decimal}
            /> 
        </div>
    )
}

export default Calculator

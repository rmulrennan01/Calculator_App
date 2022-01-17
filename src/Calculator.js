    import React, {useEffect, useState} from 'react'
import Display from "./Display.js"; 
import Keypad from "./Keypad.js"; 
import HistoryDisplay from "./HistoryDisplay.js"; 
import "./Calculator.css"; 


 /*
    Bugs:
    -if equals sign is clicked immediately after operator is clicked, the following digit inputs will just
     concat to the existing answer --fixed
    -decimalPlaces doesn't reset to 0 after completing a math function --fixed
    -if first press is a decimal mark, the next two digits are added together under the .1 position
    -needs negative value button --fixed
    -the digit concating doens't work as expected after pressing the "neg" button

    */


    /*
    Features to add:
    Exponents - done
    Squareroot 
    Independent C & CE options
    Click history to apply answer to the screen
    CSS work...

    */


function Calculator() {
 
    const [display, setDisplay] = useState({previous:0.0,current:0.0 });
    const [operator, setOperator] = useState(null); 
    const [digitInputMode, setDigitInputMode] = useState(false); //true: last key press was a math operator
    const [decimalPlaces, setDecimalPlaces] = useState(0);
    const [history, setHistory] = useState([{prev:null,operator:null, current:null, answer:null }]); 
    
    const updateDisplay = (prev,cur) => {
        setDisplay({previous:prev, current:cur});
    }

    const updateHistory = (v1,op,v2,ans) => {
        setHistory(history.concat([{prev:v1,operator:op, current:v2, answer:ans }])); 
        console.log("updated"); 

    }
    
    const concatDisplay = (a) => {
        let wholeNum = 0; 
        let newNum = 0; 
        if(digitInputMode == false){ //digit entry after cleared display
            if(decimalPlaces==0){               
                updateDisplay(display.previous,a); 
            }
            else {
                updateDisplay(display.previous,(a*0.1).toFixed(1));
                setDecimalPlaces(decimalPlaces+1);                   
            } 
        }
        else{
            if(decimalPlaces==0){
                updateDisplay(display.previous,(display.current*10)+a);                 
            }
            else {
                wholeNum = display.current * (10**decimalPlaces); //convert, so no decimal
                wholeNum = wholeNum + a; //shift one power of 10 and add new digit
                newNum = wholeNum * (10**(-decimalPlaces)); //convert value from wholeNum to shift decimal
                newNum = newNum.toFixed(decimalPlaces); //toFixed must be used to correct floating point precision error with jsx
                updateDisplay(display.previous,newNum);
                setDecimalPlaces(decimalPlaces+1);                  
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

    const clearHistory = () => {
        setHistory([{prev:null,operator:null, current:null, answer:null }]); 
    }


   
    const equate = () => {
        handleMath(); 
        setDecimalPlaces(0); 
        setOperator(null); 
        setDigitInputMode(false); 
    }

    

    const handleMath = () => {
        let tempVal = 0; 
        let prevVal = display.previous; 
        let curVal = display.current; 
        
        switch (operator) {
            case '+': 
                tempVal = Number(display.previous) + Number(display.current); 
                //Had to use Number() since adding float values was just concatting the values as strings
                updateDisplay(tempVal, tempVal);  
                
                break; 
            case '-':
            
                tempVal = Number(display.previous)-Number(display.current); 
                updateDisplay(tempVal, tempVal);  
                break; 
            case '÷':
                if(display.current==0){
                    alert("Can't Divid By Zero");
                    clear(); 
                }
                else{ 
                  
                    tempVal = Number(display.previous)/Number(display.current); 
                    updateDisplay(tempVal, tempVal);  
                }
                break;  
            case 'x':
               
                tempVal = Number(display.previous)*Number(display.current); 
                updateDisplay(tempVal, tempVal);  
                break; 
            case '^':
            
                tempVal = Number(display.previous)**Number(display.current); 
                updateDisplay(tempVal, tempVal);  
                break; 
            case '√':
                tempVal = Number(display.current)**(0.5); 
                prevVal= null; 
                updateDisplay(tempVal, tempVal); 
        }
        updateHistory(prevVal,operator,curVal,tempVal); 
        setDecimalPlaces(0);
         
    }



/*

    Calculate only if -> Operator is not null, another operator is pressed
    1. Calc only if previous press was a digit
    2. Overwrite operator if previous press was an operator. No Calculation. 
*/


    const handleOperator = (input) => {
     
        if (input == '√'){
            setOperator(input); 
            handleMath(); 
            setDigitInputMode(false); 
            
        }
        
        else if(operator == null){ 
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
        <div className="calculator">
            <div>
                <div>
                    <Display 
                        result={display.current} 
                        previous={display.previous}
                        operation={operator}
                    /> 

                </div>
                <br/>

                <div> 
                    <Keypad 
                        digitFunc = {concatDisplay}
                        clearFunc = {clear}
                        mathFunc = {handleOperator}
                        equalFunc = {equate}
                        decimalFunc = {decimal}
                        negFunc = {()=>updateDisplay(display.previous,display.current*(-1))}
                    /> 
                </div> 
            </div>

            <div className="calculator__rightside">
                <HistoryDisplay 
                    historyData ={history}
                    historyDelete={clearHistory}
                    useAnswer = {(n)=>updateDisplay(0,n)}
                />
            </div>
        </div>
    )
}

export default Calculator

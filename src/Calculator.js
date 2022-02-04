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
    -the digit concating doens't work as expected after pressing the "neg" button -- fixed
    -handle overflow of calculation value -- Fixed. Added horizontal scroll. 
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
        //console.log("updated history"); 

    }
    

    /*
    -So we don't have to parse strings with decimals, we'll just use arithmatic to concat digits
    -Adding digits works as follows -> Multiply the existing value by 10 and then add the new digit
    -If the existing dispaly value is a negative, we have to convert the negative value to a positive first,
    otherwise the multiplication of 10 will make it lesser in value
    -We'll keep track of the number of decimal places with a state. If a value has a decimal point, we'll use the state to determine
     what power of 10 to multiply by to shift the decimal, so the value is a whole number. Then we'll use the same
     process used described above for whole numbers for adding the additional digit. Then we shift back a negavtive power of 10
     to appropriately place the decimal

    */
    const concatDisplay = (a) => {
        let wholeNum = 0; 
        let newNum = 0; 
        let negFactor = 1; 
        if(display.current<0){ 
            /*Due to the way we'll be multiplying current displayed values by 10, we'll need a factor to
                change negative display values to a positive value first */ 
            negFactor = -1; 
        }
        if(digitInputMode == false){ //digit entry after cleared display
            if(decimalPlaces==0){               
                updateDisplay(display.previous,a); 
            }
            else {
                updateDisplay(display.previous,(a*0.1).toFixed(1)); //toFixed must be used to correct floating point precision error
                setDecimalPlaces(decimalPlaces+1);                   
            } 
        }
        else{
            if(decimalPlaces==0){
                newNum = negFactor * display.current * 10 + a; 
                updateDisplay(display.previous,newNum * negFactor); 
            }


            else {
                wholeNum = negFactor * display.current * (10**decimalPlaces); //convert, so no decimal
                wholeNum = wholeNum + a; //shift one power of 10 and add new digit
                newNum = wholeNum * (10**(-decimalPlaces)); //convert value from wholeNum to shift decimal
                newNum = newNum.toFixed(decimalPlaces); //toFixed must be used to correct floating point precision error
                updateDisplay(display.previous,newNum * negFactor);
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

    const makeNegative = () => {
        updateDisplay(display.previous, display.current*(-1))
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
            //case for sqrt is covered within handleoperator, as this is a more unique case. 
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
            let tempCurrent= display.current
            let tempAns = Number(display.current)**(0.5);
            updateDisplay(0, tempAns); 
            setDigitInputMode(false); 
            updateHistory(null, '√', tempCurrent, tempAns); 
            setDecimalPlaces(0); 

            
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
                        negFunc = {()=> makeNegative()}
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

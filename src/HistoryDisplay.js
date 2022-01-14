import React from 'react';
import "./HistoryDisplay.css"; 


function HistoryDisplay(props) {

    

    const printCalcs = (n) =>{
        if(n.prev != null){
        return(
            <div className="historyDisplay__row" onClick={()=>alert(n.answer)}>
            {n.prev} {n.operator} {n.current} = {n.answer}
            <br/> 
            </div> 
        ) ; 
        }

    }


    return (
        //listName.map(funcName)
        <div className="historyDisplay">
            
            History:
            <br/> 
            {props.historyData.map(printCalcs)}
        </div>
    )
}

export default HistoryDisplay

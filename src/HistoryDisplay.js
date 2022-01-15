import React from 'react';
import "./HistoryDisplay.css"; 


function HistoryDisplay(props) {

    

    const printCalcs = (n) =>{
        if(n.operator != null){
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
            <button onClick={()=>props.historyDelete()}>Clear</button> 
            <br/> 
            {props.historyData.map(printCalcs)}
        </div>
    )
}

export default HistoryDisplay

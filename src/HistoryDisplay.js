import React from 'react';
import "./HistoryDisplay.css"; 


function HistoryDisplay(props) {

    

    const printCalcs = (n) =>{
        if(n.operator != null){
        return(

            <>
                <div className="historyDisplay__body__equation">
                    {n.prev} {n.operator} {n.current} =
                </div>
                <div className="historyDisplay__body__answer" onClick={()=>props.useAnswer(n.answer)}>
                     {n.answer}
                </div>
            </>
        ) ; 
        }

    }


    return (
        //listName.map(funcName)
        <div className="historyDisplay">
            <div className="historyDisplay__header">
                history
            </div>
            <div className="historyDisplay__body">
                {props.historyData.map(printCalcs)}
            </div>
            <div className="historyDisplay__footer" onClick={()=>props.historyDelete()}>
                clear
            </div>
           
            
        </div>
    )
}

export default HistoryDisplay

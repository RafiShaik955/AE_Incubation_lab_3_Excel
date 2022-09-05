// import React, { useEffect, useState } from 'react'
import "../styles/PageHeader.css"
import { TbFileSpreadsheet } from 'react-icons/tb';
import { AiOutlineDownload } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { useCallback,useRef,useReducer, useMemo, useState, useEffect } from "react";

const PageHeader = ({onBtnExport,locateCellSearch,editTime,saveTitle,sheetTitle,setSheetTitle,checkSavedData}) => {
    var showTiming = "";
    var sum = Number(editTime[0]) + Number(editTime[1]) +Number(editTime[2]);
    if( sum===0 || sum===undefined ){
        showTiming = 0;
        
    }
    else{
        showTiming = ((editTime[0]===0 || editTime[0]===undefined )?"" : `${editTime[1]} Hrs`) + ((editTime[1]===0 || editTime[1] === undefined) ?"":`${editTime[1]} Min` )+ (editTime[1]!==0?"":(editTime[2] + " Sec"));
    }

    useEffect(()=>{
    window.history.replaceState(null, `${sheetTitle}`, `${sheetTitle}`)
    },[sheetTitle])

    return (
        <>
            <div className='mainHeader'>
                {saveTitle?
                <Link  to="/">
                    <div onClick={checkSavedData} className='sheetIcon'>
                        <TbFileSpreadsheet className='sheet' />
                    </div>
                </Link>
                :

                    <div onClick={checkSavedData} className='sheetIcon'>
                        <TbFileSpreadsheet className='sheet' />
                    </div>
                }
                
                <div className="containerPart">
                    <div className='upperPart'>
                        <span>
                            <input  
                            onChange={(e)=>
                                {
                                    setSheetTitle(e.target.value)
                                }} className='fileNameText' value={`${sheetTitle==="newSheet"?"":sheetTitle}`}  type="text" placeholder="Untitled spreadsheet"/>
                        </span>
                        <div className='downloadPart'>
                            <AiOutlineDownload className='download'/>
                            <button onClick={onBtnExport}> Csv export</button>
                        </div>
                    </div>

                    <div className="lowerPart">
                        <span>File</span>
                        <span>Edit</span>
                        <span>View</span>
                        <span>Insert</span>
                        <span>Format</span>
                        <span>Tools</span>
                        <span>Extensions</span>
                        <span>Help</span>
                        {/* {console.log(showTiming)} */}
                        <small>{`Last edit was ${
                            showTiming
                            } ago`}</small>
                    </div>
                </div>

                
            </div>

            <div className='lowerHeader'>
                <input maxLength="3" onChange={locateCellSearch} className="firstInput" type="text"></input>
                <input className="secondInput" type="text"></input>
            </div>
        </>
    )
}

export default PageHeader
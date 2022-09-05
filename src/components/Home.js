import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbFileSpreadsheet } from 'react-icons/tb';
import { AiOutlineSearch } from 'react-icons/ai';
import useSearchSheets from './useSearchSheets'
import "../styles/Home.css";


const Home = () => {
    const [focusOnInput,setFocusOnInput] = useState(true);
    const [searchSheet,setSearchSheet] = useState("");
    const sheets = useSearchSheets();

    return( 
        <>
            <div className="homeHeader">
                <div className="menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <div className="homeSheetBlock">
                    <div className="homeSheet">
                        <TbFileSpreadsheet />
                    </div>
                    <span>Sheets</span>
                </div>

                <div className="homeSearchBlock" style={focusOnInput?{backgroundColor:"rgba(247, 235, 245)"}:{backgroundColor:"white"}}>
                    <span><AiOutlineSearch/></span>
                    <input 
                    onChange={(e)=>setSearchSheet(e.target.value)}
                    style={focusOnInput?{backgroundColor:"rgba(247, 235, 245)"}:{backgroundColor:"white"}}
                    onClick={()=>{
                        setFocusOnInput(!focusOnInput);
                    }} type="text" placeholder="Search" className="homeSearch"/>
                </div>
            </div>
            <div className="homeBody">
                    <div className="gridBlock">
                    <button className="reloadButton" onClick={() => window.location.reload(false)}>
                        <Link to="/newSheet">
                            <div className="one1 one addSheet">
                                <span className="firstBar plusBar"></span>
                                <div className="horBarBlock">
                                    <span className="secondBar plusBar "></span>
                                    <span className="thirdBar plusBar"></span>
                                </div>
                                <span className="fourthBar plusBar"></span>
                            </div>
                        </Link></button>

                        {sheets.map((each_sheet,index)=>{
                            
                            return <button className="reloadButton" onClick={() => window.location.reload(false)}>
                                        <Link key={index} className="linkingSheets" to={`/${each_sheet}`}>
                                                <div className="sheetName one" key={index}>{each_sheet}</div>
                                        </Link>
                                </button>
                        })}
                    </div>
            </div>
        </>
    )
};

export default Home;





























// import React, { useEffect, useLayoutEffect, useState } from 'react'
// import getData from './GetRowData'

// export default function useFetchForRowData (noOfRows) {
//     const [rowData,setRowData] = useState([]);
//     // const data = getData;
//     let ROW_DATA = [];
//     let intialValue = 1;
//         const emptyCell = Array.from(Array(27)).map((e, i) =>  "");
//         const alpha = Array.from(Array(26)).map((e, i) => i + 65);
//         const alphabet = alpha.map((x) => String.fromCharCode(x));

//         alphabet.unshift("S.NO");

//         for(intialValue;intialValue<noOfRows+1;intialValue++){
//             emptyCell[0] = String(intialValue);
//             let eachObj = {};
//             emptyCell.map((cell,index)=>{
//                 eachObj[alphabet[index]] = cell;
//             })
//             ROW_DATA.push(eachObj);
//         }

//     return ROW_DATA;
// }



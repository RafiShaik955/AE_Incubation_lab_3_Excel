import React, {useRef, useState, useCallback, useEffect } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import RowData from "./Data/GetRowData";
import ColumnData from "./Data/GetColumnData"
import SearchBar from './SearchBar.js';
import PageHeader from "./PageHeader"
import { CsvExportModule } from 'ag-grid-community';
import { useNavigate } from "react-router-dom";
var moment = require("moment");

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    RichSelectModule,
    MenuModule,
    ColumnsToolPanelModule,
    CsvExportModule
]);



const Excel = () => {
    const gridRef = useRef();
    const [searchValue, setSearchValue] = useState(null);
    const [columnDefs, setColumnsDefs] = useState(ColumnData);
    const [rowData, setRowData] = useState(RowData);
    const [gridApi, setGridApi] = useState(null);
    const [rowsSelected, setRowsSelected] = useState(null);
    const [lengthOfRows, setLengthOfRows] = useState("");
    const [sheetTitle, setSheetTitle] = useState("");
    const [saveTitle, setSaveTitle] = useState(false);
    const [locateCell, setLocateCell] = useState("");
    const [editTime, setEditTime] = useState([]);

    let navigate = useNavigate();
    
    
    
    const onBtnExport = useCallback(() => {        
        const alpha = Array.from(Array(26)).map((e, i) => i + 65);
        const alphabet = alpha.map((x) => String.fromCharCode(x));
        gridRef.current.api.exportDataAsCsv({
            skipColumnHeaders: true,
            exporterSuppressColumns : ["SNO"],
            columnKeys :alphabet,
            fileName:`${window.location.href.split("/").splice(-1)[0]===""?"Excel":window.location.href.split("/").splice(-1)[0]}`
        });
    }, []);

    
    function onGridReady(params) {
        setGridApi(params.api);
        // setGridColumnApi(params.columnApi);
    }

    const locateCellSearch = (e) => {
        setLocateCell(e.target.value);
    }

    const onFilterTextChange = (e) => {
        setSearchValue(e.target.value);
        // gridApi.setQuickFilter(e.target.value);
    }
    

    const addRowToGrid = () => {
        if (rowsSelected === null) {
            return;
        }
        else {
            let newRows = [];
            for (let i = lengthOfRows; i < (Number(lengthOfRows) + Number(rowsSelected)); i++) {
                console.log(i);
                newRows.push({ SNO: String(i) });
            }
            setLengthOfRows((Number(lengthOfRows) + Number(rowsSelected)));
            gridApi.applyTransaction({ add: newRows });
        }
    }


    const defaultColDef = {
        rowStyle: { background: 'black' },
        flex: 1,
        minWidth: 70,
        suppressMenu: true,
        suppressMovable: true,
        editable: true,
        resizable: true,
        cellStyle: (params) => {

            if ((params.value === searchValue && searchValue !== "")) {
                console.log(typeof (params.column.colDef.field));
                console.log(typeof (params.data["SNO"]));
                return { border: "2px solid green" };
            }
            if (locateCell !== "" && locateCell.length >= 1) {
                const [col, row] = [locateCell.slice(0, 1), locateCell.slice(1)]
                if (params.column.colDef.field === col && params.data["SNO"] === row) {
                    return { border: "2px solid green" };
                }
            }

        },
    }



    const checkSavedData = () => {
        if (sheetTitle === "" || sheetTitle==="newSheet") {
            alert("Save Your Sheet Else You lost your data");
        }
        else {
            
            setTimeout(()=>{
                alert(`Your Data will be saved as ${sheetTitle}`)
                navigate("../", { replace: true })
            },1000);
        }
    };


    useEffect(() => {
        setSheetTitle(window.location.href.split("/").splice(-1)[0]);
        const items =  JSON.parse(localStorage.getItem(`${window.location.href.split("/").splice(-1)[0]} Data`)) || [];
        setRowData(items[0] === undefined ? RowData : items[0]);
        setColumnsDefs(items[1] === undefined ? ColumnData : items[1]);
        setLengthOfRows(items[0]===undefined? rowData.length+1 :items[0].length+1);
    }, []);

    useEffect(()=>{
        const prevTime = (localStorage.getItem(`${sheetTitle} editTIme`)) || [];
        if (prevTime.length === 0) {
            var creatTimeInterval = setTimeout(()=>{
                setEditTime([0, 0, 0]);
            },1000);
        }
        else {
            var totalTime = getTime();
            var ms = moment(totalTime, "DD/MM/YYYY HH:mm:ss").diff(moment(prevTime, "DD/MM/YYYY HH:mm:ss"));
            var d = moment.duration(ms);
            var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
            var ntg = [];
            s.split(":").map((i) => ntg.push(Number(i)));
            var creatTimeInterval = setTimeout(() => {
                setEditTime(ntg);
            },1000);
        }

        return ()=>clearTimeout(creatTimeInterval);
    });
    

    const getTime= ()=>{
        let presentTime = new Date();
            var month = presentTime.getUTCMonth() + 1; //months from 1-12
            var day = presentTime.getUTCDate();
            var year = presentTime.getUTCFullYear();
            var newdate = day + "/" + (month < 10 ? ("0" + month) : month) + "/" + year;
            let hrs = presentTime.getHours();
            let min = presentTime.getMinutes();
            let sec = presentTime.getSeconds();
            var totalTime = newdate + " " + `${hrs}:${min}:${sec}`;
            return totalTime;
    }

    

    const onCellValueChanged = useCallback((params) => {
        var changedRows = [];
        params.api.getModel().rowsToDisplay.map((eachValue) => {
            changedRows.push(eachValue["data"]);
            return null;
        });
        var totalTime = getTime();
        if(sheetTitle==="" || sheetTitle==="newSheet")
        {
            // console.log(sheetTitle,"local sto")
        }
        else{
            // console.log(sheetTitle,"local stsdfsdfo");
            localStorage.setItem(`${sheetTitle} Data`, JSON.stringify([changedRows, params.columnApi.columnModel.columnDefs]));
            localStorage.setItem(`${sheetTitle} editTIme`, totalTime);
        }
        
    },[sheetTitle]);

    return (
            <div>
                
                <PageHeader onBtnExport={onBtnExport} locateCellSearch={locateCellSearch} editTime={editTime} saveTitle={saveTitle} sheetTitle={sheetTitle} setSheetTitle={setSheetTitle} checkSavedData={checkSavedData}  />
                <SearchBar onFilterTextChange={onFilterTextChange} />
                <div style={{ width: '100vw', height: '78vh' }}>

                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                        className="ag-theme-alpine "
                    >
                        
                        <AgGridReact
                            ref={gridRef}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            rowData={rowData}
                            onGridReady={onGridReady}
                            onCellValueChanged={onCellValueChanged}
                        />
                    </div>

                    <div style={{ margin: "10px", width: "200px", display: "flex", justifyContent: "space-around" }}>
                        <button onClick={() => {
                            addRowToGrid();
                        }
                        } style={{ cursor: "pointer" }}>Add Rows</button>
                        <input onChange={(e) => setRowsSelected(e.target.value)} style={{
                            textAlign: "center",
                            width: "80px",
                            border: "1px solid green"
                        }} type="number" placeholder="20" />
                    </div>
                </div>
            </div>
    );
}



export default Excel;

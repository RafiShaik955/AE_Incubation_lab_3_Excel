import './App.css';
import Excel from "./components/Excel"
// import DataRows from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import useSearchSheets from './components/useSearchSheets'

function App() {
  const noOfRows = 20;
  const sheets = useSearchSheets();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            {sheets.map((each_sheet,index)=>{
              return <Route key={index} path= {`${each_sheet}`} element ={<Excel />} />
            })}
            <Route path="/" element ={<Home />} />
            <Route path="/newSheet" element={<Excel />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
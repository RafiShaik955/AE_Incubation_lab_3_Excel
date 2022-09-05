import { useEffect, useState } from "react";


const useSearchSheets = () => {
    const [searchedSheets,setSearchedSheets] = useState([]);
    useEffect(()=>{
        var keys = Object.keys(localStorage).map((each_key)=>{
            return each_key.split(" ")[0]
        }),
        i = keys.length;
        keys = keys.filter((val,ind,self)=>{
            return self.indexOf(val) === ind;
        });
        setSearchedSheets(keys);
    },[])
    return searchedSheets;
}
export default useSearchSheets;
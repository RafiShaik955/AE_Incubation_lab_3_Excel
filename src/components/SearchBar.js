import React from 'react'

const SearchBar = ({onFilterTextChange}) => {
    
    return (
        <div className='searchHeader'>
            <div style={{ display: "flex", justifyContent: "center", marginTop:"0px" ,marginBottom:"10px" }}>
                <input type="text" placeholder='type to search..'  onChange={onFilterTextChange} />
                {/* <select onSelect={()=>selectOption(value)}>
                    <option value={1}>Search Cell</option>
                    <option value={2}>Search Row</option>
                </select> */}
            </div>
        </div>
    )
}

export default SearchBar
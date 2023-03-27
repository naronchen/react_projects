import { useState, useEffect } from "react";
import AlcoholInfo from "./alcoholInfo"


const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState({});

    
    const searchItems = searchValue => {
        setSearchInput(searchValue);
    }

    useEffect(() => {
        const fetchData = async () => {
        try{
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
            const json = await response.json();
            console.log(json)
            setSearchResults(json);
        }
        catch(error){
            console.log(error)
        }
    }
    if (searchInput !== "") {
        fetchData();
      }
    },[searchInput]);

    return (
        <div>
            <input
            type="text"
            placeholder="Search..."
            onChange={(inputString) => searchItems(inputString.target.value)}
        />
            <AlcoholInfo Info = {searchResults}/>
        </div>
    )
}

export default SearchBar;
import { useState, useEffect } from "react";
import AlcoholInfo from "./alcoholInfo"


const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    console.log('searchInput: ', searchInput)
    const [searchResults, setSearchResults] = useState({});
    console.log('searchResults: ', searchResults);

    
    const searchItems = searchValue => {
        setSearchInput(searchValue);
    }

    useEffect(() => {
        let isCancelled = false;
        const fetchData = async () => {
        try{
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
            const json = await response.json();
            console.log(json)
            if (!isCancelled){
                setSearchResults(json);
            }
        }
        catch(error){
            console.log(error)
        }
    }

    if (searchInput !== "") {
        fetchData();
    }
    else{
        setSearchResults({})
    }
    return () => {
        isCancelled = true;
    }
    
    },[searchInput]);

    return (
        <div>
            <input
            type="text"
            placeholder="Search..."
            onChange={(inputString) => searchItems(inputString.target.value)}
        />
            { <AlcoholInfo Info = {searchResults}/>}
        </div>
    )
}

export default SearchBar;
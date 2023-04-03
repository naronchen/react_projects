import { useState, useEffect } from "react";
import AlcoholInfo from "./alcoholInfo"
import "../styles/searchbar.css"

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    // console.log('searchInput: ', searchInput)
    const [searchResults, setSearchResults] = useState({});
    // console.log('searchResults: ', searchResults);

    const [filterIngredient, setFilterIngredient] = useState('');
    const [filterType, setFilterType] = useState('Alcoholic');


    
    const searchItems = searchValue => {
        setSearchInput(searchValue);
    }
    const filterItems = searchValue => {
        setFilterIngredient(searchValue);
        // console.log('searchValue: ', searchValue);
    }
    const toggleFilterType = () => {
        setFilterType(filterType === 'Alcoholic' ? 'Non alcoholic' : 'Alcoholic');
    }

    useEffect(() => {
        let isCancelled = false;
        const fetchData = async () => {
        try{
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`)
            const json = await response.json();
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
            <div className="search-input">
                <label htmlFor="search">Search:</label>
                <input
                    type="text"
                    id="search"
                    placeholder="Search..."
                    onChange={(inputString) => searchItems(inputString.target.value)}
                />
            </div>

            <div className="filter-input">
                <label htmlFor="filter">Filter Ingredients:</label>
                <input
                    type="text"
                    id="filter"
                    placeholder="Ingredients I got..."
                    onChange={(inputString) => filterItems(inputString.target.value)}
                />
            </div>

            <button onClick={toggleFilterType}>{filterType === 'Alcoholic' ? 'Show Non alcoholic' : 'Show Alcoholic'}</button>

            < AlcoholInfo 
                Info={searchResults} 
                filter = {filterIngredient} 
                alcoholic={filterType}
                input = {searchInput}
                />
        </div>

    )
}

export default SearchBar;
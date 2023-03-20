import axios from 'axios';
import MovieInfo from './movieInfo';
import './MovieGenerator.css';
import { useState } from 'react';
import { genres } from '../assets/genres';
import { keywords } from '../assets/keywords';

const APP_ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const MovieGenerator = () => {
    
    const [posterUrl, setPosterUrl] = useState("");
    const [overView, setOverView] = useState("")
    const [title, setTitle] = useState("")
    const [isLoading, setIsLoading] = useState(false);


    const [genreId, setGenreId] = useState("")
    const [keyword, setKeyword] = useState("")


    const [banList, setBanList] = useState([]);

    const fetchInfo = async () => {
      // console.log("hello", VITE_APP_ACCESS_KEY)
      const genreIds = Object.keys(genres);
      const random_genre = Math.floor(Math.random() * genreIds.length);
      setGenreId(genreIds[random_genre])
    
      const random_keyword = Math.floor(Math.random() * keywords.length)
      setKeyword(keywords[random_keyword])

      setIsLoading(true);


      try {
        const response = await axios.get('https://streaming-availability.p.rapidapi.com/v2/search/basic', {
          headers: {
            'X-RapidAPI-Key': APP_ACCESS_KEY,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
          },
          params: {
            country: 'us',
            services: 'netflix,prime.buy,hulu.addon.hbo,peacock.free',
            output_language: 'en',
            show_type: '',
            genre: {genreId},
            show_original_language: 'en',
            keyword: {keyword}
          },
        });
        
        


        console.log(response)
        const results = response.data.result

        const randomIndex = Math.floor(Math.random() * results.length)
        const result = results[randomIndex]

        const posterUrl = result.posterURLs.original
        const overview = result.overview
        const title = result.originalTitle
        // console.log(posterUrl)
        // console.log(overview)
        // console.log(title)

        setPosterUrl(posterUrl)
        setOverView(overview)
        setTitle(title)
        setIsLoading(false);

      } catch (error) {
        setIsLoading(false);

        console.error(error);
      }

      
    };

    const addToBanList = (gotclicked) => {
        if (gotclicked === 'genre') {
          console.log("genreId got clicked")
          setBanList([...banList, genres[genreId]]);
          setGenreId('');
        }
        if (gotclicked === 'keyword') {
          console.log("keyword got clicked")
          setBanList([...banList, keyword]);
          setKeyword('');
        }
    }
    const removeFromBanList = (event) => {
        const itemToRemove = event.target.innerText;
        setBanList((prevList) => prevList.filter((item) => item !== itemToRemove));
      };

  
    return (
      <div>
        <h2>Let's get started </h2>
        <button onClick={fetchInfo}>Discover 🚀 </button>
        {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <MovieInfo 
                    imageUrl={posterUrl}
                    overView = {overView}
                    title = {title}
                />
            )}

        {genreId && <button onClick={() => addToBanList('genre')}>{genres[genreId]}</button>}
        {keyword && <button onClick={() => addToBanList('keyword')}>{keyword}</button>}
        {banList.length > 0 && (
        <div className="banlist-container">
         <h3>Banned Genres and Keywords:</h3>
            <ul>
                {banList.map((item, index) => (
                <li onClick={removeFromBanList} key={index}>{item}</li>
                ))}
            </ul>
        </div>

      )}
      </div>
    );
  };
  
  export default MovieGenerator;
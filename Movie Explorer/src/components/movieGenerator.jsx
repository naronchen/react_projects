import axios from 'axios';
import MovieInfo from './movieInfo';
import { useState } from 'react';
import { genres } from '../assets/genres';
import { keywords } from '../assets/keywords';


const MovieGenerator = () => {
    
    const [posterUrl, setPosterUrl] = useState("");
    const [overView, setOverView] = useState("")
    const [title, setTitle] = useState("")

    const [genreId, setGenreId] = useState("")
    const [keyword, setKeyword] = useState("")

    const fetchInfo = async () => {
      // console.log("hello", VITE_APP_ACCESS_KEY)
      const genreIds = Object.keys(genres);
      const random_genre = Math.floor(Math.random() * genreIds.length);
      setGenreId(genreIds[random_genre])
    
      const random_keyword = Math.floor(Math.random() * keywords.length)
      setKeyword(keywords[random_keyword])


      try {
        const response = await axios.get('https://streaming-availability.p.rapidapi.com/v2/search/basic', {
          headers: {
            'X-RapidAPI-Key': '15792749e1msh2bc35992a1cababp1868efjsne74009958817',
            // 'X-RapidAPI-Key': VITE_APP_ACCESS_KEY,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
          },
          params: {
            country: 'us',
            services: 'netflix,prime.buy,hulu.addon.hbo,peacock.free',
            output_language: 'en',
            show_type: 'movie',
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

      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <h2>Let's get started </h2>
        <button onClick={fetchInfo}>Discover 🚀 </button>
        <MovieInfo 
            imageUrl={posterUrl}
            overView = {overView}
            title = {title}
        />

        {genreId && <button>{genres[genreId]}</button>}
        {keyword && <button>{keyword}</button>}
      </div>
    );
  };
  
  export default MovieGenerator;
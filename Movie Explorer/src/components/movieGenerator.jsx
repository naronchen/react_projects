import axios from 'axios';


const MovieGenerator = () => {
  
    const fetchInfo = async () => {
      // console.log("hello", VITE_APP_ACCESS_KEY)
      try {
        const response = await axios.get('https://streaming-availability.p.rapidapi.com/v2/genres', {
          headers: {
            'X-RapidAPI-Key': '15792749e1msh2bc35992a1cababp1868efjsne74009958817',
            // 'X-RapidAPI-Key': VITE_APP_ACCESS_KEY,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
          },
        });
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <h2>Let's get started </h2>
        <button onClick={fetchInfo}>Discover 🚀 </button>
        <ul>
        </ul>
      </div>
    );
  };
  
  export default MovieGenerator;
import { useState } from 'react'
import './App.css'
// import GenresList from './components/GenresList';
import MovieGenerator from './components/movieGenerator'
function App() {
  return (
    <div className="App">
      <h1>Explore Movie of the Night! 🍿 </h1>
      <MovieGenerator />
    </div>
  )
}

export default App

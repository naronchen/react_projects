import { useState } from 'react'
import './App.css'
// import GenresList from './components/GenresList';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  console.log(ACCESS_KEY)
  return (
    <div className="App">
      <h1>Explore Movie of the Night! 🍿 </h1>
      
    </div>
  )
}

export default App

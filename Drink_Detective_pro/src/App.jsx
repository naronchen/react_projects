import { BrowserRouter } from 'react-router-dom'

import SearchBar from './components/searchbar'
import './App.css'

function App() {

  return (
    <div className="App">
      <h2>Drink Detective 🍹  </h2>
      <SearchBar />
    </div>
  )
}

export default App

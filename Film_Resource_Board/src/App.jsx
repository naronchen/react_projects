import './App.css'
import Card from './components/Card'
import films from './assets/filmdata.json'

function App() {

  return (
    <div className="App">
      <h1>Film Resource Board 🥑</h1>
        <div className="card-container">
          {films.map(film => (
            <Card
              key = {film.name}
              name = {film.name}
              rating = {film.rating}
              // tags = {film.tags}
              imgUrl = {film.imgUrl}
              link = {film.link}
            />
          ))}
        </div>
    </div>

  )
}

export default App

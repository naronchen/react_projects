import { useState } from 'react'
import './App.css'
import data from './assets/data.json'

function App() {

  //flipping logic
  const [front, setfront] = useState(true)
  const [idx, setidx] = useState(0)
  const flip = () => {
    let card_text = document.getElementById('card-text')
    if (front){
      card_text.innerHTML = data.answer[idx]
    }
    else{
      card_text.innerHTML = data.question[idx]
    }
    setfront(!front)
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  //prev & next 
  const to_prev = () => {
    if (idx > 0){ setidx(idx-1)}
    else{ setidx(data.answer.length - 1)}
  }
  const to_next = () => {
    if (idx < data.answer.length - 1){setidx(idx+1)}
    else{ setidx(0)}
  }

  const get_random = () => {
    const next = getRandomInt(data.answer.length-1)
    console.log(next)
    setidx(next)
  }

  //proceed logic
  return (
    <div className="App" >
      <div className="description">
        <h1> 🧪 COMMON CATIONS AND ANIONS 🧪 </h1>
        <h2> Number of cards: {data.answer.length}</h2>
      </div>
      <div className="flashcard" onClick={flip}>
        <h2 id="card-text">{data.question[idx]}</h2>
      </div>
      <div className="button">
        <h1 className="idx-button" onClick={to_prev}>prev</h1>
        <h1 className="idx-button" onClick={get_random }>random</h1>
        <h1 className="idx-button" onClick={to_next}>next</h1>
      </div>
    </div>
  )
}

export default App

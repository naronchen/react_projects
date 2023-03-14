import { useState } from 'react'
import './App.css'
import data from './assets/data.json'
import UserAnswer from './components/userAnswer'

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

  //reset input text and border style
  const reset = () => {
    setIsCorrect(null)
    setInputs('')
  }

  //prev & next 
  const to_prev = () => {
    if (idx > 0){ setidx(idx-1)}
    else{ setidx(data.answer.length - 1)}
    reset()
  }
  const to_next = () => {
    if (idx < data.answer.length - 1){setidx(idx+1)}
    else{ setidx(0)}
    reset()
  }

  const get_random = () => {
    const next = getRandomInt(data.answer.length-1)
    setidx(next)
    reset()
  }

  //handle input text
  const [inputs, setInputs] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const inputClassName = isCorrect === null ? '' : isCorrect ? 'correct-answer' : 'wrong-answer'
  // console.log(inputClassName)

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
        <h1 className="idx-button" onClick={get_random}>random</h1>
        <h1 className="idx-button" onClick={to_next}>next</h1>
      </div>

      <UserAnswer 
        label = {data.answer[idx]}
        currentVal = {inputs}
        handleChange = {(e) => {
          setInputs(e.target.value) //Asynchronous
        }}
        handleClick = {() => {
          setIsCorrect(data.answer[idx].trim() === inputs.trim()) //Asynchronous
          // const inputBox = document.getElementById("userinput");
          // if (check){ inputBox.style.border = "5px solid green";}
          // else{ inputBox.style.border = "5px solid red";}
        }}
        inputClassName = {inputClassName}
      />



    </div>
  )
}

export default App

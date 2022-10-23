import React from "react";
import { useReducer, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandRock, faHandPaper, faHandScissors } from "@fortawesome/free-solid-svg-icons";
import './App.css';


const weapons = ['Rock', 'Paper', 'Scissors'];

const random_selection = () => weapons[Math.floor(Math.random() * weapons.length)];

const Actions = {
  oneAndDone: 'one-and-done',
  twoOutOfThree: 'two-out-of-three',
  reset: 'reset'
}

function reducer(state, {type, payload}) {
  switch(type) {
    case Actions.oneAndDone:
      let winner = play(payload.player, payload.computer);
      if (winner === 'user') {
        return {
          ...state,
          player: payload.player,
          computer: payload.computer,
          playerPoints: state.playerPoints + 1,
          roundWinner: 'Player!',
          winner: 'Player reigns!'
        }
      }
      else if (winner === 'computer') {
        return {
          ...state,
          player: payload.player,
          computer: payload.computer,
          computerPoints: state.computerPoints + 1,
          roundWinner: 'Computer!',
          winner: 'Computer reigns!'
        }
      }
      return {
        ...state,
        player: payload.player,
        computer: payload.computer,
        numberOfDraws: state.numberOfDraws + 1,
        roundWinner: 'Draw!',
        winner: 'Nobody Wins!'
      }
  }
}

function play(user, computer) {
  if (user === computer) {
    return 'draw'
  }
  if (winner(weapons.indexOf(user) - weapons.indexOf(computer), weapons.length) < weapons.length / 2) {
    return 'user'
  } else {
    return 'computer'
  }
}

function winner(subtrahend, weapons_length) {
  const mod = subtrahend % weapons_length;
  return mod < 0 ? mod + weapons_length : mod
}

const initialState = {
  player: '',
  computer: '',
  playerPoints: 0,
  computerPoints: 0,
  numberOfDraws: 0,
  roundWinner: 'No winner determined',
  winner: 'Who will reign as the champion?',
  resetGame: false,
}
function App() {
  const [{player, computer, playerPoints, computerPoints, numberOfDraws, roundWinner, winner, resetGame}, dispatch]
      = useReducer(reducer, initialState);

  const [playerSelect, setPlayerSelect] = useState('Rock')
  const [computerSelect, setComputerSelect] = useState('Rock')

  const [fadeProp, setFadeProp] = useState({fade: 'fade-in'})
  const [wordOrder, setWordOrder] = useState(0)
  const [showCountdown, setShowCountdown] = useState(false)

  const FADE_INTERVAL_MS = 500;
  const CHANGE_WORD_INTERVAL_MS = FADE_INTERVAL_MS * 2;
  const countdownWords = ['ROCK', 'PAPER', 'SCISSORS', 'SHOOT!'];



  function setup(action) {
    setTimeout(() => {
      dispatch({
      type: action,
      payload : { 
        player: playerSelect,
        computer: setComputerSelect(random_selection()),
      }
    })
      setShowCountdown(false)
    }, 4000)

  }

  useEffect(() => {
    const fadeTimeout = setInterval(() => {
      fadeProp.fade === 'fade-in' ? setFadeProp({ fade: 'fade-out' }) : setFadeProp({ fade: 'fade-in' })
    }, FADE_INTERVAL_MS)

    return () => clearInterval(fadeTimeout)
  }, [fadeProp])

  useEffect(() => {
    const wordTimeout = setInterval(() => {
      setWordOrder((prevWordOrder) => (prevWordOrder + 1) % countdownWords.length)
    }, CHANGE_WORD_INTERVAL_MS)

    return () => clearInterval(wordTimeout)
  }, [])


  return (
    <div className="App">
      <div className="game-container">
      <h1>Rochambeau</h1>
      <p>Rock, Paper, Scissors</p>
      <div className="game-style">
        <button onClick={() => {
          setShowCountdown(true)
          setup(Actions.oneAndDone)
        }}>One & Done</button>
        <button>Two out of Three</button>
        <button>Reset</button>
      </div>
        <h1 className="countdown">
          <span className={fadeProp.fade} style={{display: showCountdown ? 'block' : 'none'}}>{countdownWords[wordOrder]}</span>
        </h1>

      <div className="grid">

        <div className="weaponry">
          <h2>Pick your weapon:</h2>
          <FontAwesomeIcon className="weapon" icon={faHandRock}
                           onClick={() => {
                             setPlayerSelect(weapons[0])
                             console.log(playerSelect)}}/>
          <FontAwesomeIcon className="weapon" icon={faHandPaper}
                           onClick={() => setPlayerSelect(weapons[1])}/>
          <FontAwesomeIcon className="weapon" icon={faHandScissors}
                           onClick={() => setPlayerSelect(weapons[2])}/>
        </div>
        <div className="middle">
          <div className="battlefield">
            <div className="player-choice">
              <img className="player-img" src={`../images/${playerSelect}.png`} alt=''></img>
            </div>
            <div className="computer-choice">
              <img className="computer-img" src={`../images/${computerSelect}.png`} alt=''></img>
            </div>
          </div>

          <h1>{winner}</h1>
        </div>


        <div className="scoreboard">
          <h2>Scoreboard</h2>
          <p>Player: {playerPoints}</p>
          <p>Computer: {computerPoints}</p>
          <p>Draws: {numberOfDraws}</p>
        </div>

      </div>


      <div className="directions">
        <p>Choose your game style, you then have 3 seconds to choose your weapon. If you do not choose a weapon a weapon will be chosen for you.</p>
      </div>

    </div>
    </div>
  );
}

export default App;

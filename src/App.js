import React from "react";
import { useReducer, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandRock, faHandPaper, faHandScissors } from "@fortawesome/free-solid-svg-icons";
import {Countdown} from "./Countdown";
import './App.css';


const weapons = ['Rock', 'Paper', 'Scissors'];

const random_selection = () => weapons[Math.floor(Math.random() * weapons.length)];

const Actions = {
  // oneAndDone: 'one-and-done',
  // twoOutOfThree: 'two-out-of-three',
  shoot: 'shoot',
  select: 'select',
  reset: 'reset'
}

function reducer(state, {type, payload}) {
  switch(type) {
    case Actions.shoot:
      console.log(`Player: ${payload.player}, computer: ${payload.computer}`)
      if (payload.winner === 'user') {
        return {
          ...state,
          player: payload.player,
          computer: payload.computer,
          playerPoints: state.playerPoints + 1,
          roundWinner: 'Player!',
          winner: 'Player reigns!'
        }
      }
      else if (payload.winner === 'computer') {
        return {
          ...state,
          player: payload.player,
          computer: payload.computer,
          computerPoints: state.computerPoints + 1,
          roundWinner: 'Computer!',
          winner: 'Computer reigns!'
        }
      }
      else return {
        ...state,
        player: payload.player,
        computer: payload.computer,
        numberOfDraws: state.numberOfDraws + 1,
        roundWinner: 'Draw!',
        winner: 'Nobody Wins!'
      }
    case Actions.reset:
      return {
        ...state,
        ...payload
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
  player: 'Rock',
  computer: 'Rock',
  playerPoints: 0,
  computerPoints: 0,
  numberOfDraws: 0,
  roundWinner: 'No winner determined',
  winner: 'Who will reign as the champion?',
}
function App() {
  const [{player, computer, playerPoints, computerPoints, numberOfDraws, roundWinner, winner}, dispatch]
      = useReducer(reducer, initialState);

  const [playerSelect, setPlayerSelect] = useState('Rock')
  const [computerSelect, setComputerSelect] = useState('Rock')

  const [showCountdown, setShowCountdown] = useState(false)
// set the images to a different vaariable to show only once the game has finished -- figure out how to play the game inline and displ

  return (
    <div className="App">
      <div className="game-container">
      <h1>Rochambeau</h1>
      <p>Rock, Paper, Scissors</p>
      <div className="game-style">
        <button onClick={() => {
          setShowCountdown(true)
          setTimeout(() => {
            setComputerSelect(random_selection)
            let winner = play(playerSelect, computerSelect)
            dispatch({
              type: Actions.shoot,
              payload: {
                player: playerSelect,
                computer: computerSelect,
                winner: winner
              }
            })
            setShowCountdown(false)
          }, 4000)
        }}>One & Done</button>
        <button>Two out of Three</button>
        <button onClick={() => {
          dispatch({
            type: Actions.reset,
            payload: {
              ...initialState
            }
          })
        }}>Reset</button>
      </div>

      <div className="countdown">{showCountdown && <Countdown/>}</div>

      <div className="grid">

        <div className="weaponry">
          <h2>Pick your weapon:</h2>
          <FontAwesomeIcon className="weapon" disabled={showCountdown} icon={faHandRock}
                           style={playerSelect === weapons[0] ? {color: 'rgba(255, 255, 255, 0.51)'} : {color: 'white'}}
                           onClick={() => {
                             setPlayerSelect(weapons[0])
                             console.log(playerSelect)}}/>
          <FontAwesomeIcon className="weapon" disabled={showCountdown} icon={faHandPaper}
                           style={playerSelect === weapons[1] ? {color: 'rgba(255, 255, 255, 0.51)'} : {color: 'white'}}
                           onClick={() => setPlayerSelect(weapons[1])}/>
          <FontAwesomeIcon className="weapon" disabled={showCountdown} icon={faHandScissors}
                           style={playerSelect === weapons[2] ? {color: 'rgba(255, 255, 255, 0.51)'} : {color: 'white'}}
                           onClick={() => setPlayerSelect(weapons[2])}/>
        </div>
        <div className="middle">
          <div className="battlefield">
            <div className="player-choice">
              <img className="player-img" src={`../images/${player}.png`} alt=''></img>
            </div>
            <div className="computer-choice">
              <img className="computer-img" src={`../images/${computer}.png`} alt=''></img>
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

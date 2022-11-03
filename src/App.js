import React from "react";
import { useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandRock, faHandPaper, faHandScissors } from "@fortawesome/free-solid-svg-icons";
import {Countdown} from "./Countdown";
import './App.css';


const weapons = ['Rock', 'Paper', 'Scissors'];

// Actions for useReducer hook
const Actions = {
  shoot:  'shoot',      // Play the game
  select: 'select',     // Player selects their weapon
  reset:  'reset',      // reset the scores.
}

// Reducer function for useReducer hook
function reducer(state, {type, payload}) {
  switch(type) {
    case Actions.select:
      return {
        ...state,
        playerSelection: payload.player,
        computerSelection: payload.computer
      }
    case Actions.shoot:
      if (state.playerSelection === '') { // make a selection for the player if they do not make one.
        state.playerSelection = weapons[Math.floor(Math.random() * weapons.length)];
        state.computerSelection = weapons[Math.floor(Math.random() * weapons.length)];
      }
      let winner = play(state.playerSelection, state.computerSelection)
      if (winner === 'user') {
        return {
          ...state,
          player: state.playerSelection,
          computer: state.computerSelection,
          playerPoints: state.playerPoints + 1,
          roundWinner: 'Player!',
          winner: 'Player reigns!'
        }
      }
      else if (winner === 'computer') {
        return {
          ...state,
          player: state.playerSelection,
          computer: state.computerSelection,
          computerPoints: state.computerPoints + 1,
          roundWinner: 'Computer!',
          winner: 'Computer reigns!'
        }
      }
      else return {
        ...state,
        player: state.playerSelection,
        computer: state.computerSelection,
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

/**   Play
 * @param {string} user
 * @param {string} computer
 * @return {string} winner - draw, user, or computer
 * **/
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

/**   winner - determines the winner of RPS
 * @param {number} subtrahend (index of user choice - index of computer choice)
 * @param {number} weapons_length (3)
 * @return {number} if the result is less than zero, add weapons_length, otherwise return
 * **/
function winner(subtrahend, weapons_length) {
  const mod = subtrahend % weapons_length;
  return mod < 0 ? mod + weapons_length : mod
}

/** InitialState
 * player and computer are used to reveal the winner once the game has been played.
 * playerSelection and computerSelection keep track of the choices before the game is plyed nd the winner is revealed.
 * player points, computer points, and number of draws are tracked.
 * winner is stored as a string.
 *
 * All of this is a param in the useReducer function, as well as the updated values being returned.
 * **/
const initialState = {
  player: 'Rock',
  computer: 'Rock',
  playerSelection: '',
  computerSelection: '',
  playerPoints: 0,
  computerPoints: 0,
  numberOfDraws: 0,
  winner: 'Who will reign as the champion?',
}

/** App()
 * useReducer and useState are used to track state
 * **/
function App() {
  const [{player, computer, playerSelection, computerSelection, playerPoints, computerPoints, numberOfDraws, winner}, dispatch]
      = useReducer(reducer, initialState);

  // boolean to show countdown and allow selection of weapon by player
  const [playing, setPlaying] = useState(false)

  // Set player selection based off of click event
  const setSelection = selection => {
    dispatch({
      type: Actions.select,
      payload: {
        player: selection,
        computer: weapons[Math.floor(Math.random() * weapons.length)]
      },
    });
  }
/** jsx to set up the application **/
  return (
    <div className="App">
      <div className="game-container">
      <h1>Rochambeau</h1>
      <p>Rock, Paper, Scissors</p>
      <div className="game-style">
        <button onClick={() => {
          setPlaying(true)
          setTimeout(() => {
            dispatch({
              type: Actions.shoot,
              payload: {
                player: playerSelection,
                computer: computerSelection,
              }
            })
            setPlaying(false)
            setSelection('')
          }, 4000)
        }}>Play Round</button>
        <button onClick={() => {
          dispatch({
            type: Actions.reset,
            payload: {
              ...initialState
            }
          })
        }}>Reset</button>
      </div>
      <div className="countdown">{ playing && <Countdown/>}</div>
      <div className="grid">
        <div className="weaponry">
          <h2>Pick your weapon:</h2>
          <FontAwesomeIcon className="weapon" icon={faHandRock}
                           style={ playerSelection === weapons[0] ? {color: 'rgba(255, 255, 255, 0.51)'} : {color: 'white'}}
                           onClick={ () => playing ? setSelection(weapons[0]) : null }/>
          <FontAwesomeIcon className="weapon" icon={faHandPaper}
                           style={ playerSelection === weapons[1] ? {color: 'rgba(255, 255, 255, 0.51)'} : {color: 'white'}}
                           onClick={ () => playing ? setSelection(weapons[1]) : null }/>
          <FontAwesomeIcon className="weapon" icon={faHandScissors}
                           style={ playerSelection === weapons[2] ? {color: 'rgba(255, 255, 255, 0.51)'} : {color: 'white'}}
                           onClick={ () => playing ? setSelection(weapons[2]) : null }/>
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
        <p>Select play round, you then have 3 seconds to choose your weapon. If you do not choose a weapon a weapon will be chosen for you.</p>
      </div>
    </div>
    </div>
  );
}

export default App;

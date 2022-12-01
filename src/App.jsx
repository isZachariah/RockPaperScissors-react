import React from "react";
import { useReducer, useState } from "react";
import {Countdown} from "./components/Countdown.jsx";
import './App.css';
import {Scoreboard} from "./components/Scoreboard.jsx";
import {GameStyle} from "./components/GameStyle.jsx";
import {Weaponry} from "./components/Weaponry.jsx";
import {Battlefield} from "./components/Battlefield.jsx";
import {reducer} from "./reducer";

export const weapons = ['Rock', 'Paper', 'Scissors'];

// Actions for useReducer hook
export const Actions = {
  shoot:  'shoot',      // Play the game
  select: 'select',     // Player selects their weapon
  reset:  'reset',      // reset the scores.
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

  return (
    <div className="App flex flex-col w-fit m-auto">
      <h1 className={'text-8xl font-bold text-white whitespace-nowrap mx-auto'}>Rock, Paper, Scissors</h1>
      <div className="flex flex-row align-middle justify-center">
        <GameStyle Actions={Actions} dispatch={dispatch} setPlaying={setPlaying}
                   computerSelection={computerSelection} playerSelection={playerSelection}
                   initialState={initialState} setSelection={setSelection} />
      </div>
      <div className={'flex flex-col m-auto'}>


        <div className="countdown">{ playing && <Countdown/>}</div>
        <div className="flex flex-row gap-x-36 pt-12">
          <Weaponry setSelection={setSelection} playerSelection={playerSelection} playing={playing} />
          <div className="middle">
            <Battlefield computer={computer} player={player} winner={winner} />
          </div>
          <Scoreboard computerPoints={computerPoints} playerPoints={playerPoints} numberOfDraws={numberOfDraws} />
        </div>
        <div className=" w-1/4 m-auto relative text-xl bottom-14 justify-center left-12">
          <p>Select play round, you then have 3 seconds to choose your weapon. If you do not choose a weapon a weapon will be chosen for you.</p>
        </div>
      </div>

    </div>
  );
}

export default App;

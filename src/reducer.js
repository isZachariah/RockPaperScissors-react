import {weapons} from "./App.jsx";
import {Actions} from "./App.jsx";

// Reducer function for useReducer hook
export function reducer(state, {type, payload}) {
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
        default: return state
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

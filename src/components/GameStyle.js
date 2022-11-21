import React from "react";


export const GameStyle = ({setPlaying, dispatch, setSelection, playerSelection, computerSelection, initialState, Actions}) => {
    return (
        <div className={'flex flex-row whitespace-nowrap gap-x-96 mt-2 absolute'}>
            <button

                className={'w-28 bg-sky-400 hover:bg-violet-400 p-2 rounded-xl border border-black border-2 shadow-2xl shadow-black shadow'}
                onClick={() => {
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
            <button
                className={'w-28 bg-white hover:bg-violet-400 p-2 rounded-xl rounded border border-black border-2 shadow-2xl shadow-black shadow'}
                onClick={() => {
                dispatch({
                    type: Actions.reset,
                    payload: {
                        ...initialState
                    }
                })
            }}>Reset</button>
        </div>
    )
}
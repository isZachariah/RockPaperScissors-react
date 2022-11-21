import React from "react";


export const Scoreboard = ({playerPoints, computerPoints, numberOfDraws}) => {
    return (
        <div>
            <div className="flex flex-col gap-y-14">
                <h2 className={'underline text-3xl'}>Scoreboard</h2>
                <p className={' text-3xl'}>Player: {playerPoints}</p>
                <p className={' text-3xl'}>Computer: {computerPoints}</p>
                <p className={' text-3xl'}>Draws: {numberOfDraws}</p>
            </div>
        </div>
    )
}
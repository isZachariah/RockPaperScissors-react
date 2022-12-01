import React from "react";

export const Battlefield = ({player, computer, winner}) => {

    return (
        <div>
            <div className={'battlefield flex flex-row'}>
                <div className="player-choice">
                    <img className="player-img tr" src={`../images/${player}.png`} alt=''></img>
                </div>
                <div className="computer-choice">
                    <img className="computer-img" src={`../images/${computer}.png`} alt=''></img>
                </div>
            </div>
            <p className={'mt-12 text-3xl'}>{winner}</p>
        </div>
    )
}
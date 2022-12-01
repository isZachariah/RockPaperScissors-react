import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPaper, faHandRock, faHandScissors} from "@fortawesome/free-solid-svg-icons";
import {weapons} from "../App.jsx";
import React from "react";


export const Weaponry = ({playerSelection, setSelection, playing}) => {
  return (
      <div className={'flex flex-col gap-3'}>
          <h2
              className={'whitespace-nowrap text-3xl underline'}

          >Pick your weapon:</h2>
          <FontAwesomeIcon className="weapon hover:shadow-black hover:shadow hover:shadow-2xl hover:bg-fuchsia-400 hover:rounded-full " icon={faHandRock}
                           style={ playerSelection === weapons[0] ? {color: 'rgba(61,61,144,0.5)'} : {color: 'white'}}
                           onClick={ () => playing ? setSelection(weapons[0]) : null }/>
          <FontAwesomeIcon className="weapon hover:shadow-black hover:shadow hover:shadow-2xl hover:bg-cyan-400 hover:rounded-full" icon={faHandPaper}
                           style={ playerSelection === weapons[1] ? {color: 'rgba(61,61,144,0.5)'} : {color: 'white'}}
                           onClick={ () => playing ? setSelection(weapons[1]) : null }/>
          <FontAwesomeIcon className="weapon hover:shadow-black hover:shadow hover:shadow-2xl hover:bg-green-600 hover:rounded-full" icon={faHandScissors}
                           style={ playerSelection === weapons[2] ? {color: 'rgba(61,61,144,0.5)'} : {color: 'white'}}
                           onClick={ () => playing ? setSelection(weapons[2]) : null }/>
      </div>
  )
}
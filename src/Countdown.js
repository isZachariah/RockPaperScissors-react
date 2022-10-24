import React from "react";
import {useState, useEffect} from "react";
import {showCountdown, setShowCountdown} from "./App"
import "./App.css"

const FADE_INTERVAL_MS = 500;
const CHANGE_WORD_INTERVAL_MS = FADE_INTERVAL_MS * 2;
const countdownWords = ['ROCK', 'PAPER', 'SCISSORS', 'SHOOT!'];

export const Countdown = () => {
    const [fadeProp, setFadeProp] = useState({fade: 'fade-in'})
    const [wordOrder, setWordOrder] = useState(0)

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
        <h1 className="countdown">
            <span className={fadeProp.fade}>{countdownWords[wordOrder]}</span>
        </h1>
    )
}
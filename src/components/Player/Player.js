import { useState, useEffect } from 'react'

const Player = ({ player, streak }) => {
    return (
        <div>
            {streak > 0 && 
            <div>
                <a href={`https://www.nhl.com/player/${player.id}`} target="_blank" rel="noreferrer" >{player.name}</a>
                <p>{streak}</p>
            </div> }
        </div>

    )
}

export default Player
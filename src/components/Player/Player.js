import { useState, useEffect } from 'react'

const Player = ({ player, streak }) => {
    return (
        <div>
            {streak > 0 && 
            <div>
                <p>{player.name}</p>
                <p>{streak}</p>
            </div> }
        </div>

    )
}

export default Player
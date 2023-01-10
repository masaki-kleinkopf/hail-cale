import { useState, useEffect } from 'react'

const Player = ({ player, streak }) => {
    return (
        <div>
            {streak > 0 && 
            <div>
                <p>{player.person.fullName}</p>
                <p>{streak}</p>
            </div> }
        </div>

    )
}

export default Player
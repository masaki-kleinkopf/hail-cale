import Player from '../Player/Player'

const Stat = ({ stat }) => {
  let playerComponents = stat.roster.roster.map(player => {
    return <Player player={player} key={player.person.id} />
  })

  return (
  <div>
    {console.log(playerComponents)}
    {playerComponents}
  </div>

  )
}

export default Stat
const playerForm = document.querySelector('form');
const playerInput = document.getElementById('playerInput');
const addButton = document.getElementById('addPlayer');
const clearButton = document.getElementById('clearTurn');
const playerList = document.getElementById('playerList');

let allPlayers = getPlayers();
updatePlayers();

playerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  addPlayer();
})

function addPlayer() {
  const nameText = playerInput.value.trim();
  if(nameText.value !== '') {
    const playerObject = {
      name: nameText,
      roll: 0,
      completed: false,
    }
    allPlayers.push(playerObject);
    updatePlayers();
    savePlayers();
    playerInput.value = '';
  }
}

function updatePlayers() {
  playerList.innerHTML = '';

  allPlayers.forEach((player, playerIndex)=> {
    let playerItem = createPlayerItem(player, playerIndex);
    playerList.append(playerItem);
  })
}

function createPlayerItem(player, playerIndex) {
  const playerID = 'player-'+playerIndex;
  const Player = document.createElement('li');
  const playerName = player.name;
  const playerRoll = player.roll;

  Player.innerHTML = `
    <input type='checkbox' tabIndex='-1' class='doneTurn' id='${playerID}'>
    <input type='text' onFocus='this.select()' class='roll' id='${playerID}' value=${playerRoll}></input>
    <label for'${playerID}' class='playerName'>${playerName}</label>
    <button class='delete' tabIndex='-1'>Delete</button>
  `
  const deletePlayer = Player.querySelector('.delete');
  deletePlayer.addEventListener('click', () => {
  deletePlayerItem(playerIndex);
  })  

  const checkbox = Player.querySelector('.doneTurn');
  checkbox.addEventListener('change', () => {
    allPlayers[playerIndex].completed = checkbox.checked;
    savePlayers();
  })

  const roll = Player.querySelector('.roll');
  roll.addEventListener('change', () => {
    allPlayers[playerIndex].roll = roll.value;
    allPlayers.sort(function(a, b) {
      return b.roll - a.roll;
    })
    savePlayers();
    updatePlayers();
  })

  checkbox.checked = player.completed;
  return Player;
}

clearButton.addEventListener('click', () => {
  allPlayers.forEach((player) => {
    player.completed = false;
  })
  savePlayers();
  updatePlayers();
})

// function clearTurns() {
//   allPlayers.forEach((player)=> {
//     player.
//   }
// }

function deletePlayerItem(playerIndex) {
  allPlayers = allPlayers.filter((_, i) => i !== playerIndex);
  savePlayers();
  updatePlayers();
}

function savePlayers() {
  const playersJson = JSON.stringify(allPlayers);
  localStorage.setItem('players', playersJson);
}

function getPlayers() {
  const players = localStorage.getItem('players') || '[]';
  return JSON.parse(players);
}

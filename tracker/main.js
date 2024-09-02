const playerForm = document.querySelector('form');
const playerInput = document.getElementById('playerInput');
const addButton = document.getElementById('addPlayer');
const clearButton = document.getElementById('clearTurn');
const clearRolls = document.getElementById('clearRolls');
const playerList = document.getElementById('playerList');

let allPlayers = getPlayers();
updatePlayers();

playerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  addPlayer();
})

function addPlayer() {
  const nameText = playerInput.value.trim();
  if(nameText) {
    const playerObject = {
      name: nameText,
      roll: '',
      hp: '',
      completed: false,
      note: '',
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
  const playerHp = player.hp;
  const playerNote = player.note;

  Player.innerHTML = `
    <div class='top'>
      <input type='checkbox' tabIndex='-1' class='doneTurn' id='${playerID}'>
      <div class='labels'>
        <label class='title-init'>Init</label>
        <input type='text' onFocus='this.select()' inputmode='numeric' maxlength='2' class='roll' id='${playerID}' value='${playerRoll}'></input>
      </div>
      <div class='labels'>
        <label class='title-hp'>Hp</label>
        <input type='text' onFocus='this.select()' inputmode='numeric' maxlength='3' tabIndex='-1' class='hp' id='${playerID}' value='${playerHp}'></input>
      </div>
      <label for'${playerID}' class='playerName'>${playerName}</label>
      <button class='delete' tabIndex='-1'>Delete</button>
    </div>
    <div class='bottom'>
      <input type='text' placeholder='Notes:' maxlength='46' tabIndex='-1' class='note' id='${playerID}' value='${playerNote}'>
    </div>
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

  const hp = Player.querySelector('.hp');
  hp.addEventListener('change', () => {
    allPlayers[playerIndex].hp = hp.value;
    savePlayers();
    updatePlayers();
  })

  const note = Player.querySelector('.note');
  note.addEventListener('change', () => {
    allPlayers[playerIndex].note = note.value;
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

clearRolls.addEventListener('click', () => {
  if(window.confirm('Clear Initiative Rolls?')) {
    allPlayers.forEach((player) => {
      player.roll = '';
    })
    savePlayers();
    updatePlayers();
  }
})

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

const playerForm = document.getElementById('init_form');
const playerInput = document.getElementById('player_input');
const addButton = document.getElementById('add_player');
const clearButton = document.getElementById('clear_turn');
const clearRolls = document.getElementById('clear_rolls');
const clearNotes = document.getElementById('clear_notes');
const playerList = document.getElementById('player_list');
const round = document.getElementById('round');
const elapMinutes = document.getElementById('min')
const elapSeconds = document.getElementById('sec')
const minLabel = document.getElementById('min_label');
const roundMin = document.getElementsByClassName('round_min');

let roundNum = 1;
let roundSeconds = 0;
let roundMinutes = 0;

round.innerText = roundNum;

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
	Player.classList.add('player_li')
  const playerName = player.name;
  const playerRoll = player.roll;
  const playerHp = player.hp;
  const playerNote = player.note;

  if (roundSeconds >= 60) {
    roundMinutes++;
    roundSeconds -= 60;
  }

  round.innerText = roundNum;
  elapSeconds.innerText = roundSeconds;
  elapMinutes.innerText = roundMinutes;

  Player.innerHTML = `
    <div class='top'>
      <input type='checkbox' tabIndex='-1' class='done_turn' id='${playerID}'>
      <div class='labels'>
        <label class='title_init'>Init</label>
        <input type='text' onFocus='this.select()' inputmode='numeric' maxlength='2' class='roll' id='${playerID}' value='${playerRoll}'></input>
      </div>
      <div class='labels'>
        <label class='title_hp'>Hp</label>
        <input type='text' onFocus='this.select()' inputmode='numeric' maxlength='3' tabIndex='-1' class='hp' id='${playerID}' value='${playerHp}'></input>
      </div>
      <label for'${playerID}' class='player_name'>${playerName}</label>
      <button class='delete_player' tabIndex='-1'>Delete</button>
    </div>
    <div class='bottom'>
      <input type='text' placeholder='Notes:' maxlength='46' tabIndex='-1' class='note' id='${playerID}' value='${playerNote}'>
    </div>
  `
  const deletePlayer = Player.querySelector('.delete_player');
  deletePlayer.addEventListener('click', () => {
  deletePlayerItem(playerIndex);
  })  

  const checkbox = Player.querySelector('.done_turn');
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
  roundNum++;
  roundSeconds += 6;
  savePlayers();
  updatePlayers();
})

clearRolls.addEventListener('click', () => {
  if(window.confirm('Clear Initiative Rolls?')) {
    allPlayers.forEach((player) => {
      player.roll = '';
    })
    roundNum = 1;
    roundSeconds = 0;
    roundMinutes = 0;
    savePlayers();
    updatePlayers();
  }
})

clearNotes.addEventListener('click', () => {
  if(window.confirm('Clear Player Notes?')) {
    allPlayers.forEach((player) => {
      player.note = '';
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

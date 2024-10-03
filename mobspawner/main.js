const formEntry = document.querySelector('form');
const combatRating = document.getElementById('crSelect');
const nameInput = document.getElementById('nameInput');
const mobList = document.getElementById('mobList');
const jsonUrl = 'https://jmjr97.github.io/mobspawner/cr.json';
let crList = {
  "zero":{ "CR": "0", "AC": "10", "HP": "3", "Prof": "+2", "Attacks": "1", "Damage": "2" },
  "eighth":{ "CR": "1/8", "AC": "11", "HP": "9" , "Prof": "+3", "Attacks": "1", "Damage": "4"},
  "quarter":{ "CR": "1/4", "AC": "11", "HP": "13", "Prof": "+3", "Attacks": "1", "Damage": "5" },
  "half":{ "CR": "1/2", "AC": "12", "HP": "22", "Prof": "+4", "Attacks": "2", "Damage": "4" },
  "one":{ "CR": "1", "AC": "12", "HP": "33", "Prof": "+5", "Attacks": "2", "Damage": "6" },
  "two":{ "CR": "2", "AC": "13", "HP": "45", "Prof": "+5", "Attacks": "2", "Damage": "9" },
  "three":{ "CR": "3", "AC": "13", "HP": "65", "Prof": "+5", "Attacks": "2", "Damage": "12" },
  "four":{ "CR": "4", "AC": "14", "HP": "84", "Prof": "+6", "Attacks": "2", "Damage": "14" },
  "five":{ "CR": "5", "AC": "15", "HP": "95", "Prof": "+7", "Attacks": "3", "Damage": "12" },
  "six":{ "CR": "6", "AC": "15", "HP": "112", "Prof": "+7", "Attacks": "3", "Damage": "14" },
  "seven":{ "CR": "7", "AC": "15", "HP": "130", "Prof": "+7", "Attacks": "3", "Damage": "16" },
  "eight":{ "CR": "8", "AC": "15", "HP": "136", "Prof": "+7", "Attacks": "3", "Damage": "18" },
  "nine":{ "CR": "9", "AC": "16", "HP": "145", "Prof": "+8", "Attacks": "3", "Damage": "22" },
  "ten":{ "CR": "10", "AC": "17", "HP": "155", "Prof": "+9", "Attacks": "4", "Damage": "16" },
  "eleven":{ "CR": "11", "AC": "17", "HP": "165", "Prof": "+9", "Attacks": "4", "Damage": "18" },
  "twelve":{ "CR": "12", "AC": "17", "HP": "175", "Prof": "+9", "Attacks": "4", "Damage": "19" },
  "thirteen":{ "CR": "13", "AC": "18", "HP": "184", "Prof": "+10", "Attacks": "4", "Damage": "21" }
};

let allMobs = getMobs();
updateMobs();
 
function addMob(crInput) {
  const nameText = nameInput.value.trim();
  if(nameText) {
    const mobObject = {
      name: nameText,
      cr: crList[crInput].CR,
      ac: crList[crInput].AC,
      hp: crList[crInput].HP,
      prof: crList[crInput].Prof,
      attacks: crList[crInput].Attacks,
      damage: crList[crInput].Damage,
      notes: '',
    }
    allMobs.push(mobObject);
    updateMobs();
    saveMobs();
    nameInput.value = '';
  }
}

function updateMobs() {
  mobList.innerHTML = '';

  allMobs.forEach((mob, mobIndex)=> {
    let mobItem = createMob(mob, mobIndex);
    mobList.append(mobItem);
  })
}


formEntry.addEventListener('submit', function(e) {
  e.preventDefault();
  addMob(combatRating.value);
})

function createMob(mob, mobIndex) {
  const Mob = document.createElement('li');
  const mobName = mob.name;
  const mobCR = mob.cr;
  const mobAC = mob.ac;
  const mobHP = mob.hp;
  const mobProf = mob.prof;
  const mobAttacks = mob.attacks;
  const mobDamage = mob.damage;
  const mobNotes = mob.notes;

  Mob.innerHTML = `
    <div class='row'>
      <div class='label'>
        <label class='textLabel'>Name</label>
        <input type='text' class='nameBox' id='name' maxlength='50' spellcheck='false' value='${mobName}'>
      </div>
      <button class='delete'>Delete</button>
    </div>
    <div class='row'>
      <div class='label'>
        <label class='textLabel'>Armor</label>
        <input type='text' class='statBox' id='ac' inputmode='numeric' maxlength='3' value='${mobAC}'>
      </div>
      <div class='label'>
        <label class='textLabel'>Hp</label>
        <input type='text' class='statBox' id='hp' inputmode='numeric' maxlength='3' value='${mobHP}'>
      </div>
      <div class='label'>
        <label class='textLabel'>Cr</label>
        <input type='text' class='statBox' id='cr' inputmode='numeric' maxlength='3' value='${mobCR}'>
      </div>
      <div class='label'>
        <label class='textLabel'>Prof</label>
        <input type='text' class='statBox' id='prof' inputmode='numeric' maxlength='3' value='${mobProf}'>
      </div>
      <div class='label'>
        <label class='textLabel'>Attacks</label>
        <input type='text' class='statBox' id='attacks' inputmode='numeric' maxlength='3' value='${mobAttacks}'>
      </div>
      <div class='label'>
        <label class='textLabel'>Damage</label>
        <input type='text' class='statBox' id='damage' inputmode='numeric' maxlength='3' value='${mobDamage}'>
      </div>
    </div>
    <div class='row'>
      <div class='label'>
        <label class='textLabel'>Notes</label>
        <textarea class='noteBox' id='notes' rows='3' maxlength='156' spellcheck='false'>${mobNotes}</textarea>
      </div>
    </div>
`

  const deleteMob = Mob.querySelector('.delete');
  deleteMob.addEventListener('click', () => {
    deleteMobItem(mobIndex);
  })

  const mobNameBox = Mob.querySelector('#name');
  mobNameBox.addEventListener('change', () => {
    allMobs[mobIndex].name = mobNameBox.value;
    saveMobs();
    updateMobs();
  })

  const armorBox = Mob.querySelector('#ac');
  armorBox.addEventListener('change', () => {
    allMobs[mobIndex].ac = armorBox.value;
    saveMobs();
    updateMobs();
  })

  const hpBox = Mob.querySelector('#hp');
  hpBox.addEventListener('change', () => {
    allMobs[mobIndex].hp = hpBox.value;
    saveMobs();
    updateMobs();
  })

  const crBox = Mob.querySelector('#cr');
  crBox.addEventListener('change', () => {
    allMobs[mobIndex].cr = crBox.value;
    saveMobs();
    updateMobs();
  })

  const profBox = Mob.querySelector('#prof');
  profBox.addEventListener('change', () => {
    allMobs[mobIndex].prof = profBox.value;
    saveMobs();
    updateMobs();
  })

  const attacksBox = Mob.querySelector('#attacks');
  attacksBox.addEventListener('change', () => {
    allMobs[mobIndex].attacks = attacksBox.value;
    saveMobs();
    updateMobs();
  })

  const damageBox = Mob.querySelector('#damage');
  damageBox.addEventListener('change', () => {
    allMobs[mobIndex].damage = damageBox.value;
    saveMobs();
    updateMobs();
  })

  const noteBox = Mob.querySelector('.noteBox');
  noteBox.addEventListener('change', () => {
    allMobs[mobIndex].notes = noteBox.value;
    saveMobs();
    updateMobs();
  })

  return Mob;
}

function deleteMobItem(mobIndex) {
  allMobs = allMobs.filter((_, i) => i !== mobIndex);
  saveMobs();
  updateMobs();
}

function saveMobs() {
  const mobsJson = JSON.stringify(allMobs);
  localStorage.setItem('mobs', mobsJson);
}

function getMobs() {
  const mobs = localStorage.getItem('mobs') || '[]';
  return JSON.parse(mobs);
}

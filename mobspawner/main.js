const formEntry = document.querySelector('form');
const combatRating = document.getElementsByClassName('inputSection');
const nameInput = document.getElementById('nameInput');

async function getMobList() {
  const response = await fetch('https://jmjr97.github.io/mobspawner/cr.json');
  json = await response.json();
  return json;
}

const crList = getMobList();

formEntry.addEventListener('submit', function(e) {
  e.preventDefault();
  addMob(combatRating);
})

// function addMob(combatRating) {
//   const nameText = nameInput.value.trim();
//   if(nameText) {
//     const mobObject = {
//       name: nameText,
//       armorClass: crList.[combatRating].AC,
//     }
//     updateMobs();
//   }
// }



console.log(crList.one.AC)

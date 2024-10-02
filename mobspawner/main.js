<<<<<<< HEAD
const formEntry = document.querySelector('form');
const combatRating = document.getElementsByClassName('inputSection');
const nameInput = document.getElementById('nameInput');

async function getMobList() {
  const response = await fetch('https://jmjr97.github.io/mobspawner/cr.json');
  json = await response.json();
  return json;
=======
async function getCR() {
  const response = await fetch('cr.json');
  // const response = await fetch('https://jmjr97.github.io/mobspawner/cr.json');
  const cr =  await response.json();
  console.log(cr.zero);
>>>>>>> refs/remotes/origin/main
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

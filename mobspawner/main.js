async function getCR() {
  const response = await fetch('cr.json');
  // const response = await fetch('https://jmjr97.github.io/mobspawner/cr.json');
  const cr =  await response.json();
  console.log(cr.zero);
}

getCR();


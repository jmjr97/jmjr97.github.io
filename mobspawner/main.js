async function getCR() {
  const response = await fetch('http://10.0.0.170:8080/cr.json');
  return await response.json();
}

const cr = getCR();

console.log(cr);

const d20Input = document.getElementById('d_d20_input');
const d12Input = document.getElementById('d_d12_input');
const d10Input = document.getElementById('d_d10_input');
const d8Input = document.getElementById('d_d8_input');
const d6Input = document.getElementById('d_d6_input');
const d4Input = document.getElementById('d_d4_input');
const diceSelected = document.getElementById('d_dice_selected');
const diceRolls = document.getElementById('d_dice_rolls');
const diceTotal = document.getElementById('d_dice_total');
const clearDice = document.getElementById('d_clear_dice');
const calcDice = document.getElementById('d_calculate_dice');

clearDice.addEventListener('click', () => {
	d20Input.value = 0;
	d12Input.value = 0;
	d10Input.value = 0;
	d8Input.value = 0;
	d6Input.value = 0;
	d4Input.value = 0;
	diceSelected.value = '';
	diceRolls.value = '';
	diceTotal.value = '';
})

calcDice.addEventListener('click', () => {
	totalDice();
})

function totalDice() {
	let total = 0;
	let limit = 0;
	let diceRollsValue = [];
	let diceSelectedValue = [];

	// d20
	if (Number(d20Input.value) !== 0) {
		limit = Number(d20Input.value);
		diceSelectedValue.push(limit + 'D20')
		for (let i = 0; i < limit; i++) {
			let roll = Math.floor(Math.random() * 20) + 1;
			diceRollsValue.push(roll);
			total += roll;
		}
	}

	// d12
	if (Number(d12Input.value) !== 0) {
		limit = Number(d12Input.value);
		diceSelectedValue.push(limit + 'D12')
		for (let i = 0; i < limit; i++) {
			let roll = Math.floor(Math.random() * 12) + 1;
			diceRollsValue.push(roll);
			total += roll;
		}
	}

	// d10
	if (Number(d10Input.value) !== 0) {
		limit = Number(d10Input.value);
		diceSelectedValue.push(limit + 'D10')
		for (let i = 0; i < limit; i++) {
			let roll = Math.floor(Math.random() * 10) + 1;
			diceRollsValue.push(roll);
			total += roll;
		}
	}

	// d8
	if (Number(d8Input.value) !== 0) {
		limit = Number(d8Input.value);
		diceSelectedValue.push(limit + 'D8')
		for (let i = 0; i < limit; i++) {
			let roll = Math.floor(Math.random() * 8) + 1;
			diceRollsValue.push(roll);
			total += roll;
		}
	}

	// d6
	if (Number(d6Input.value) !== 0) {
		limit = Number(d6Input.value);
		diceSelectedValue.push(limit + 'D6')
		for (let i = 0; i < limit; i++) {
			let roll = Math.floor(Math.random() * 6) + 1;
			diceRollsValue.push(roll);
			total += roll;
		}
	}

	// d4
	if (Number(d4Input.value) !== 0) {
		limit = Number(d4Input.value);
		diceSelectedValue.push(limit + 'D4')
		for (let i = 0; i < limit; i++) {
			let roll = Math.floor(Math.random() * 4) + 1;
			diceRollsValue.push(roll);
			total += roll;
		}
	}

	diceSelected.value = diceSelectedValue.join(' - ');
	diceRolls.value = diceRollsValue.join(' - ');
	diceTotal.value = total;
}

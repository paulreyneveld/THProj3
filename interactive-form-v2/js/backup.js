// Obtains necessary constants for DOM manipulation and validation. 

const name_input = document.querySelector('#name');
const job_title = document.querySelector('#title');
const colorOpts = document.querySelectorAll('#color option')
const designMenu = document.querySelector('#design');
const checkboxes = document.querySelectorAll('.activities input');
const payMethod = document.querySelector('#payment');
const credit = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const form = document.querySelector('form');
const name = document.querySelector('#name');
const email = document.querySelector('#mail');
const ccNum = document.querySelector('#cc-num');
const zipNum = document.querySelector('#zip');
const cvvNum = document.querySelector('#cvv');

// All declared functions follow: 

// Selects all T-Shirt color options and hides them until a design choice has been made. 
// ********** I hard coded the HTML for the first case. **********
function defaultMenu() {
	for (let i = 0; i < colorOpts.length; i += 1) {
		colorOpts[i].hidden = true;
	}
	colorOpts[0].selected = true;
}

// Keeps a running tally for the conference cost based on user choices. 
function confCost() {
	let cost = 0;
	for (let i = 0; i < checkboxes.length; i+= 1) {
		if (checkboxes[i].checked == true) {
			cost += +checkboxes[i].getAttribute('data-cost');
		}
	}
	return cost;
}

// Validates the name field.
function nameValid() {
	if (name.value.length > 0) {
		return true;
	}
	else {
		name.style.backgroundColor = '#d0d0e1';
		return false;
	}
}

// Validates the email field.
function emailValid () {
	// I obtained this regex string from RegExLib.com for e-mail validation.
	const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
	if (regex.test(email.value)) {
		return true;
	}
	else {
		email.style.backgroundColor = '#d0d0e1';
		return false;
	}
}

// Ensures at least one checkbox has been selected for validation. 
function regValid() {
let boxesChecked = 0;
	for (let i = 0; i < checkboxes.length; i += 1) {
		if (checkboxes[i].checked) {
			boxesChecked += 1;
		}
	}
	if (boxesChecked == 0) {
		return false;
	}
	else {
		return true;
	}
}

// Validates the credit card number. 
function ccNumValid() {
	console.log(payMethod.value);
	let ccRegEx = /^\d{13,16}$/
	if (ccRegEx.test(ccNum.value)) {	 
		return true;
	}
	else {
		ccNum.style.backgroundColor = '#d0d0e1';
		return false;
	}
}

// Validates the zipcode. 
function zipNumValid() {
	let zipRegEx = /^\d{5}$/;
	if (zipRegEx.test(zipNum.value)) {
		return true;
	}
	else {
		zipNum.style.backgroundColor = '#d0d0e1';
		return false;
	}
}

// Validates the CVV.	
function cvvNumValid() {
	let cvvRegEx = /^\d{3}$/;
	if (cvvRegEx.test(cvvNum.value)) {
		return true;
	}
	else {
		cvvNum.style.backgroundColor = '#d0d0e1';
		console.log('cvv failed');
		return false;
	}
}

// Displays the relevant error of validation to the page. 
function subError(error) {
	const errorDiv = document.createElement('div');
	document.querySelector('form').appendChild(errorDiv);
	errorDiv.innerHTML = `<p>Error: ${error}</p><br>`;
}

// Initializes textarea for 'other' job_title to hidden. 
document.querySelector('#otherText').hidden = true;

// Places default focus on name text field.
name_input.focus();

// Initializes the t-shirt option menu to a default state. 
defaultMenu();


// Creates an element to display running total for the conference cost. 
const runningCostDiv = document.createElement('div');
document.querySelector('.activities').appendChild(runningCostDiv);
runningCostDiv.hidden = 'true';

// Prevents the user from being able to make a 'non-choice'. 
document.querySelector('option[value="select method"').disabled = true;

// Hides paypal and bitcoin options initially. 
paypal.hidden = true;
bitcoin.hidden = true;

// This handler invokes a condition based on the user's selection of other.
job_title.addEventListener('change', (e) => {
	let selected = job_title.value;
	if (selected == 'other') {
		console.log("You selected other");
		document.querySelector('#otherText').hidden = false;
	}
	else {
		document.querySelector('#otherText').hidden = true;	
	}
});

// This handler dynamcally manages the t-shirt choices. 
designMenu.addEventListener('change', (e) => {
	console.log(e.target.value);
	let selected = e.target.value;
	if (selected == 'js puns') {
		defaultMenu();
		colorOpts[1].hidden = false;
		colorOpts[2].hidden = false;
		colorOpts[3].hidden = false;
	}
	else if (selected == 'heart js') {
		defaultMenu();
		colorOpts[4].hidden = false;
		colorOpts[5].hidden = false;
		colorOpts[6].hidden = false;
	}
	else {
		defaultMenu();
	}
});

// This handler makes sure there are no conference conflicts and outputs the conference cost dynamically.
// The following code is heavily cribbed fromt the checkbox warm-up exercise.
document.querySelector('.activities').addEventListener('change', (e) => {
	runningCostDiv.hidden = false; 
	let clicked = e.target;
	let clickedType = clicked.getAttribute('data-day-and-time');
	for (let i = 0; i < checkboxes.length; i += 1) {
		
		let checkboxType = checkboxes[i].getAttribute('data-day-and-time');
		if (clickedType === checkboxType && clicked !== checkboxes[i] ) {
			if (clicked.checked) {
				checkboxes[i].disabled = true;
			}
			else {
				checkboxes[i].disabled = false;
			}
				
		}
	}
	runningCostDiv.innerHTML = `Total: $${confCost()}`;
});

// This handler displays appropriate payment information. 
payMethod.addEventListener('change', (e) => {

	console.log(payMethod.value);
	if (payMethod.value == 'credit card') {
		credit.hidden = false;
		paypal.hidden = true;
		bitcoin.hidden = true;
	}
	else if (payMethod.value == 'paypal') {
		credit.hidden = true;
		paypal.hidden = false;
		bitcoin.hidden = true;
	}

	else if (payMethod.value == 'bitcoin') {
		credit.hidden = true;
		paypal.hidden = true;
		bitcoin.hidden = false;
	}
	else {
		credit.hidden = false;
		paypal.hidden = true;
		bitcoin.hidden = true;
	}
});

// This handler validates the form. 
form.addEventListener('submit', (e) => {
	if (!nameValid()) {
		e.preventDefault();
		subError('Invalid name input.');
	}
	if (!emailValid()) {
		e.preventDefault();
		subError('Invalid e-mail input.');
	}
	if (!regValid()) {
		e.preventDefault();
		subError('Please select at least one event to attend.');
	}
	if (payMethod.value == 'credit card' || payMethod.value == 'select method') {
		if (!ccNumValid()) {
			e.preventDefault();
			subError('Credit Card number invalid.');
		}
		if (!zipNumValid()) {
			e.preventDefault();
			subError('Zipcode invalid. ');
		}
		if (!cvvNumValid()) {
			e.preventDefault();
			subError('CVV number invalid');
		}
	}	
});



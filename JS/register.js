const inputFields = document.querySelectorAll("input:not(.btn-pink)"),
	labels = document.querySelectorAll("labels"),
	registerForm = document.querySelector(".register-form"),
	submitBtn = document.querySelector("#submit-btn");

/***start form validation methods***/
//Before Submit => if empty
const handleEmpty = (input, label, errorSpan, msg) => {
	label.classList.remove("active");
	label.style.color = "#f95959";
	errorSpan.innerHTML = msg;
	errorSpan.style.display = "block";
	input.style.borderColor = "#f95959";
	credentialScore[input.id] = false;
	checkAllTrue();
};
//Before Submit => if not suitable
const handleError = (input, label, errorSpan, msg) => {
	label.style.color = "#f95959";
	errorSpan.innerHTML = msg;
	errorSpan.style.display = "block";
	input.style.borderColor = "#f95959";
	credentialScore[input.id] = false;
	checkAllTrue();
};
//Before Submit => if true
const handleTrue = (input, label, errorSpan) => {
	label.style.color = "#333";
	errorSpan.style.display = "none";
	input.style.borderColor = "#333";
	credentialScore[input.id] = true;
	checkAllTrue();
};
//Before Submit => enable submit btn or not
function checkAllTrue() {
	let allTrue = Object.values(credentialScore).every(
		(value) => value == true
	);
	if (allTrue) {
		submitBtn.classList.remove("disabled");
		return true;
	} else {
		submitBtn.classList.add("disabled");
		return false;
	}
}

//After Submit => Already A Member
const havingAccount = () => location.replace("./html/login.html");
/***End form validation methods***/

/***start form validation listeners***/
inputFields.forEach((input) => {
	input.addEventListener("focus", () => {
		input.previousElementSibling.classList.add("active");
	});
	input.addEventListener("focusout", () => {
		let label = input.previousElementSibling,
			errorSpan = input.nextElementSibling;
		switch (input.id) {
			//firstName & lastName
			case "firstName":
			case "lastName":
				if (input.value.length <= 0) {
					handleEmpty(
						input,
						label,
						errorSpan,
						`${label.innerText.toLowerCase()} is Required`
					);
				} else if (!input.value.match(input.pattern)) {
					handleError(
						input,
						label,
						errorSpan,
						"Letters only are allowed"
					);
				} else {
					handleTrue(input, label, errorSpan);
				}
				break;

			// Email
			case "email":
				if (input.value.length <= 0) {
					handleEmpty(input, label, errorSpan, "Email is Required");
				} else if (!input.value.match(input.pattern)) {
					handleError(
						input,
						label,
						errorSpan,
						"Please Enter Valid Email Format"
					);
				} else {
					handleTrue(input, label, errorSpan);
				}
				break;

			// Password
			case "passwordRegister":
				if (input.value.length <= 0) {
					handleEmpty(
						input,
						label,
						errorSpan,
						"Password is Required"
					);
				} else if (input.value.length <= 7) {
					handleError(
						input,
						label,
						errorSpan,
						"Please enter an 8-letters password or more"
					);
				} else {
					handleTrue(input, label, errorSpan);
					password = input.value;
				}
				break;

			// Confirm Password
			case "passwordConfirm":
				if (input.value.length <= 0) {
					handleEmpty(
						input,
						label,
						errorSpan,
						"Please Confirm your Password"
					);
				} else if (input.value != password) {
					handleError(
						input,
						label,
						errorSpan,
						"Passwords doesn't match"
					);
				} else {
					handleTrue(input, label, errorSpan);
				}
				break;
		}
	});
});
/***End form validation Listeners***/

//Handle form Submit
registerForm.addEventListener("submit", function (e) {
	e.preventDefault();
	if (checkAllTrue()) {
		const data = new FormData(registerForm);
		//Saving Data to LocalStorage
		localStorage.setItem("fname", data.get("firstName"));
		localStorage.setItem("lname", data.get("lastName"));
		localStorage.setItem("email", data.get("email"));
		localStorage.setItem("password", data.get("password-check"));
		localStorage.removeItem("score");
		//Navigate to the login Page
		location.replace("./html/login.html");
	} else {
		alert("You have to submit by submit button!");
	}
});
/***End form validation Listeners***/

//Start Playing
(function init() {
	credentialScore = {
		firstName: false,
		lastName: false,
		email: false,
		passwordRegister: false,
		passwordConfirm: false,
	};
	submitBtn.classList.add("disabled");
})();

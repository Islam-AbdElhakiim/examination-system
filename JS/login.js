const inputFields = document.querySelectorAll("input:not(.form-check-input)"),
	labels = document.querySelectorAll("labels"),
	loginForm = document.querySelector(".login-form"),
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
	} else {
		submitBtn.classList.add("disabled");
	}
}
//After Submit => Invalid Credentials
const handleLoginError = (hassError) => {
	if (hassError) {
		loginForm.querySelector("h2").style.color = "#f95959";
		loginForm.querySelector("small").style.display = "block";
	} else {
		loginForm.querySelector("h2").style.color = "#212529";
		loginForm.querySelector("small").style.display = "none";
	}
};
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
			// Email
			case "emailLogin":
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
			case "passwordLogin":
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
		}
	});
});
/***End form validation Listeners***/

//Handle form Submit
loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const data = new FormData(loginForm);
	if (
		localStorage.getItem("email") == data.get("email-login") &&
		localStorage.getItem("password") == data.get("password-login")
	) {
		handleLoginError();
		location.replace("tasks.html");
	} else {
		handleLoginError(true);
	}
});

//Start playing
(function init() {
	credentialScore = {emailLogin: false, passwordLogin: false};
	submitBtn.classList.add("disabled");
})();

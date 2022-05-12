/* Declaring All Required elements */
const mainQuestion = document.querySelector("#main-question");
const mainOptions = document.querySelector("#main-options");
const questionPagination = document.querySelector("#current-question");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const saveLaterBox = document.querySelector(".questions-wrapper");
const saveLaterBtn = document.querySelector("#save-later");
const timePassed = document.querySelector(".time-passed");
const submitBtn = document.querySelector("#final-submit");
/* Declaring User Data */
let rightAnswers = {}; // user's right answers
let wrongAnswers = {}; // user's wrong answers
let userAnswers = {}; // all user's answers
let savedQuestions = []; // user's saved Questions

/**** Start Declaring Structs ****/
function Question(_id, _question, _grade, _modelAnswer, _options) {
	this.id = _id;
	this.question = _question;
	this.grade = _grade;
	this.modelAnswer = _modelAnswer;
	this.options = _options;
}

function Answer(_id, _option) {
	this.id = _id;
	this.option = _option;
}
/**** End Declaring Structs ****/

/**** Start Constructing Answers & Questions Objects ****/
// generating some answers
let an1 = new Answer(1, "put on");
let an2 = new Answer(2, "put of");
let an3 = new Answer(3, "put away");
let an4 = new Answer(4, "put off");
let an5 = new Answer(5, "common");
let an6 = new Answer(6, "mutual");
let an7 = new Answer(7, "similar");
let an8 = new Answer(8, "same");
let an9 = new Answer(9, "is finished");
let an10 = new Answer(10, "was finished");
let an11 = new Answer(11, "had finished");
let an12 = new Answer(12, "not finished");
let an13 = new Answer(13, "in");
let an14 = new Answer(14, "about");
let an15 = new Answer(15, "at");
let an16 = new Answer(16, "for");
let an17 = new Answer(17, "so");
let an18 = new Answer(18, "very");
let an19 = new Answer(19, "too");
let an20 = new Answer(20, "more");
let an21 = new Answer(21, "Band");
let an22 = new Answer(22, "Bun");
let an23 = new Answer(23, "Bane");
let an24 = new Answer(24, "Ban");
let an25 = new Answer(25, "87");
let an26 = new Answer(26, "Mine");
let an27 = new Answer(27, "82");
let an28 = new Answer(28, "88");
let an29 = new Answer(29, "81");
let an30 = new Answer(30, "Fast");
let an31 = new Answer(31, "Post");
let an32 = new Answer(32, "Past");
let an33 = new Answer(33, "Slow");
let an34 = new Answer(34, "69");
let an35 = new Answer(35, "68");
let an36 = new Answer(36, "66");
let an37 = new Answer(37, "61");
let an38 = new Answer(38, "Meen");
let an39 = new Answer(39, "Mess");
let an40 = new Answer(40, "Man");

//Generating Some Questions
//English MCQs
let q1 = new Question(
	1,
	"The Chairman is ill and we’ll have to ___. the meeting for a few days.",
	10,
	"put off",
	[an1, an2, an3, an4]
);
let q2 = new Question(
	2,
	"The cat and the dog have a ___. enemy, it is the rat.",
	10,
	"common",
	[an5, an6, an7, an8]
);
let q3 = new Question(
	3,
	"He told me that he ___. watching the movie.",
	10,
	"had finished",
	[an9, an10, an11, an12]
);
let q4 = new Question(4, " He is very good ___. making stories.", 10, "at", [
	an13,
	an14,
	an15,
	an16,
]);
let q5 = new Question(
	5,
	"I do my work ___. carefully to make mistakes",
	10,
	"too",
	[an17, an18, an19, an20]
);

//IQ MSQs
let q6 = new Question(
	6,
	"Insert the word that completes the first word and begins the second. Ur ( ___. ) Al",
	10,
	"Ban",
	[an21, an22, an23, an24]
);
let q7 = new Question(
	7,
	"Insert the missing number. Rewarded = 80 Coordinate = 75 Opinionated = ?",
	10,
	"87",
	[an25, an27, an28, an29]
);
let q8 = new Question(
	8,
	"Insert the word that means the same as the words outside the brackets. Stake ( ___. ) Mail",
	10,
	"Fast",
	[an30, an31, an32, an33]
);
let q9 = new Question(9, "Insert the missing number. 6 10 18 34 ?", 10, "66", [
	an34,
	an35,
	an36,
	an37,
]);
let q10 = new Question(
	10,
	"Insert the word that means the same as the words outside the brackets. Excavation ( ___. ) Possession",
	10,
	"Mine",
	[an38, an39, an40, an26]
);

//Random Questions Array
let questionsArray = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10].sort(
	() => Math.random() - 0.5
);
/**** End Constructing Answers & Questions Objects ****/

/**** Start Handle Questions Section ****/
// Generating Questions UI
function displayQuestion(index) {
	questionIndex = index;
	//Display main question
	mainQuestion.innerHTML = questionsArray[index].question;

	//Display Radio Options
	mainOptions.innerHTML = "";
	questionsArray[index].options.map((option) => {
		//{id : 0, option: "sdjh"}
		mainOptions.innerHTML += `<div class="form-check ">
                        <input ${
							userAnswers[index] == option.id ? "checked" : ""
						} class="form-check-input" type="radio" name="${`question ${questionsArray[index].id}`}" id="${
			option.id
		}" value="${option.option}"
                        onchange="submitAnswer( ${index}, ${JSON.stringify(
			option
		)
			.split('"')
			.join("&quot;")} )">
                        <label class="form-check-label" for="${option.id}">${
			option.option
		}</label>
                      </div>`;
	});
	// adjust Pagination number
	questionPagination.innerHTML = index + 1;
}

//Handle Next Question Btn
function nextQuestion() {
	if (questionIndex < questionsArray.length - 1) {
		//Display Next Question
		displayQuestion(++questionIndex);

		// enable prev button after first question
		prevBtn.classList.remove("disabled");

		//Disable next button at the final questions
		if (questionIndex == questionsArray.length - 1) {
			nextBtn.classList.add("disabled");
		}
	}

	//check if question has answer to open nextBtn
	if (userAnswers.hasOwnProperty(questionIndex)) {
		nextBtn.classList.remove("disabled");
	} else {
		nextBtn.classList.add("disabled");
	}
}

//Handle Next Previous Btn
function previousQuestion() {
	if (questionIndex > 0) {
		displayQuestion(--questionIndex);
		if (questionIndex == 0) {
			prevBtn.classList.add("disabled");
		}
	}

	//check if question has answer to open nextBtn
	if (
		userAnswers.hasOwnProperty(questionIndex) ||
		savedQuestions.includes(questionIndex)
	) {
		nextBtn.classList.remove("disabled");
	}
}

//Handle inputs change
function submitAnswer(questionIndex, {id, option}) {
	//Enable next btn except for the last question
	if (questionIndex < 9) nextBtn.classList.remove("disabled");
	userAnswers[questionIndex] = id;
	if (questionsArray[questionIndex].modelAnswer == option) {
		rightAnswers[questionIndex + 1] = option;
		delete wrongAnswers[questionIndex + 1];
	} else {
		wrongAnswers[questionIndex + 1] = option;
		delete rightAnswers[questionIndex + 1];
	}

	//check if question is in saveLater box to remove it
	if (savedQuestions.includes(questionIndex)) {
		console.log("should remove");
		savedQuestions = savedQuestions.filter((question) => {
			console.log(question, questionIndex);
			return question != questionIndex;
		});

		displayLaterBox();
	}
}
/**** End Handle Questions Section ****/

/**** Start Handle Saved Questions Section *****/
// Generating Saved Questions UI
function displayLaterBox() {
	saveLaterBox.innerHTML = "";
	if (savedQuestions.length > 0) {
		savedQuestions.map((questionIndex) => {
			saveLaterBox.innerHTML += `<div onclick="displayQuestion(${questionIndex})" class="question-later">question ${
				questionIndex + 1
			}</div>`;
		});
	} else {
		saveLaterBox.innerHTML = "Clear!";
	}
}

//Handle question Click on saved Box
function moveToQuestion(i) {
	questionIndex = i - 1;
	displayQuestion(questionIndex);
}

//Handle save Later Btn
saveLaterBtn.addEventListener("click", () => {
	if (!savedQuestions.includes(questionIndex)) {
		savedQuestions.push(questionIndex);
	}
	displayLaterBox();
	if (questionIndex < 9) nextBtn.classList.remove("disabled");
});
/**** End Handle Saved Questions Section *****/

/**** Final Submit ****/
submitBtn.addEventListener("click", function () {
	localStorage.setItem("score", Object.keys(rightAnswers).length);
	location.replace("score.html");
});

/**** Start Playing ****/
(function init() {
	questionIndex = -1;
	nextQuestion();
	prevBtn.classList.add("disabled");
	nextBtn.classList.add("disabled");
	timePassed.style.animation = "progress-bar 100s linear";
	setTimeout(() => location.replace("../html/timout.html"), 100000);
})();

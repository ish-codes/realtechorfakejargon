const choices = {
	realTech: [
		'Turing',
		'Swift',
		'Objective-C',
		'PHP',
		'SQL',
		'Python',
		'C#',
		'Ruby',
		'C',
		'C++',
		'Visual Basic',
		'.NET',
		'MATLAB',
		'Go',
		'Groovy',
		'Perl',
		'Assembly',
		'Rust',
		'Dart',
		'Unity',
		'TypeScript',
		'JavaScript',
		'Scala',
		'Java',
		'LISP',
		'Lua',
		'Pascal',
		'Elixir',
		'ECMAScript',
		'Flask',
		'Fortran',
		'Haskell',
		'COBOL',
		'AMPL',
		'Scratch',
		'JSON',
		'UML',
		'Jenkins',
		'Confluence',
		'Hadoop',
		'Pandas',
		'Keras',
		'PyTorch',
		'JIRA',
		'npm',
		'R',
		'Linux',
		'UNIX',
		'Jupyter',
		'Yarn',
		'Beautiful Soup',
		'Selenium'
	],
	fakeTech: [
		'C+',
		'Asteroid',
		'Javanese',
		'D++',
		'Sindarin',
		'Vulpix',
		'Klingon',
		'Velocity',
		'Linus',
		'Onyx',
		'Modular',
		'Graphite',
		'Alps',
		'Objective-K',
		'Uranium',
		'Espresso',
		'Porygon-Z',
		'Sapphire',
		'Cobalt',
		'Flare',
		'Groove',
		'Scoop',
		'Strike',
		'Mirage'
	],
	embedGIF: [
		'<div class="tenor-gif-embed"><img class="tenor-gif" src="https://c.tenor.com/FYkxdH7xtRgAAAAd/angry-computer.gif" alt="animated gif of angry cat throwing keyboard at monitor"></div></br>',
		'<div class="tenor-gif-embed"><img class="tenor-gif" src="https://c.tenor.com/tOoW-TVnlhUAAAAC/cat-typing.gif" alt="gif of cat typing angrily at laptop"></div></br>',
		'<div class="tenor-gif-embed"><img class="tenor-gif" src="https://c.tenor.com/N-fJ0Azh_ykAAAAC/cat-computer.gif" alt="gif of cat using laptop calmly"></div></br>',
		'<div class="tenor-gif-embed"><img class="tenor-gif" src="https://c.tenor.com/NVps9jJZj9UAAAAC/parks-and-rec-rage.gif" alt="gif of ron swanson from parks and rec tossing out his computer"></div></br>',
		'<div class="tenor-gif-embed"><img class="tenor-gif" src="https://c.tenor.com/86y2ez9ZZcgAAAAC/typing-gir.gif" alt="animated gif of gir typing furiously"></div></br>',
		'<div class="tenor-gif-embed"><img class="tenor-gif" src="https://c.tenor.com/gSfixE9nP7EAAAAC/cat-type.gif" alt="animated gif of a cat typing furiously"></div></br>',
		'<div class="tenor-gif-embed"><img class="tenor-gif" src="https://c.tenor.com/ogsH7Ailje8AAAAd/cat-funny-cat.gif" alt="gif of a cat screaming at a computer"></div></br>',
		'<div class="tenor-gif-embed"><img class="tenor-gif" src="https://c.tenor.com/sCYvaokKEcwAAAAC/cat-typing.gif" alt="gif of a cat typing at a laptop"></div></br>',
		'<div class="tenor-gif-embed"><img class="tenor-gif" src="https://c.tenor.com/d7_52xh_2dQAAAAC/dog-work.gif" alt="gif of a dog typing at a laptop"></div></br>',
		'<div class="tenor-gif-embed"><img class="tenor-gif" src="https://c.tenor.com/MnbT9wDiJP0AAAAd/dog-sit.gif" alt="gif of a dog typing at a laptop"></div></br>'
	]
};

// Wait until the HTML is ready to execute any JQuery on it!
$(document).ready(function() {
	// Animate the landing page in by changing the opacity and reset all metrics
	$('body').delay(300).animate({ opacity: 1 }, 700);
	const lengthOfGame = 5; // This is totally changeable now so you can play a longer game if you want!
	let userScore = 0;
	let questionNumber = 0;

	// Randomizer Function - return a random number from 0 to maximumItems - 1
	function randomizerFunction(maximumItems) {
		return Math.floor(Math.random() * maximumItems);
	}

	// Check if the user is ready to start the quiz by clicking the start button on the landing page.
	function startQuiz() {
		$('#start-btn').on('click', function() {
			$('.landing').fadeOut(1000);
			userScore = 0;
			questionNumber = 0;
			// Short delay to allow fadeout to complete, then fade in
			$('#main').delay(1000).fadeIn(1000);
			// Generate and show the question
			showQuestion();
		});
	}

	// Compute and show a question, then also evaluate it
	function showQuestion() {
		// If question limit has not been reached yet
		if (questionNumber < lengthOfGame) {
			questionNumber++;
			// Make a new set of choices with 3 real tech and 1 fake tech
			let correctAnswer = choices.fakeTech[randomizerFunction(choices.fakeTech.length)];
			let presentedChoices = makeQuestion(correctAnswer);
			// Now map over the presented choices and return a string template literal with the HTML to be added to the page for each of the options
			let answers = presentedChoices.map(function(presentedChoiceValue, presentedChoiceIndex) {
				return `<label for="${presentedChoiceValue}"><input type="radio" id="${presentedChoiceValue}" name="answer" tabindex="${presentedChoiceIndex}" value="${presentedChoiceValue}" aria-checked="false" required>${presentedChoiceValue}</label>`;
			});
			let submitButton = $(`<button type="submit" id ="submit-btn">submit!</button>`);
			// Choose a random gif for fun :D
			let randomGIF = choices.embedGIF[randomizerFunction(choices.embedGIF.length)];
			// Add all the above to the page
			$('#main').append(randomGIF, '<form class="quiz-form">', answers, submitButton, '</form>');
			// If submit button is clicked, check if the answer is correct or incorrect and display a message accordingly
			$('#submit-btn').on('click', function(event) {
				// Might need to add logic to check if a user has selected anything at all
				let chosenAnswer = $('input[type=radio]:checked').val();
				console.log(`user has selected ${chosenAnswer}`);
				if (chosenAnswer == correctAnswer) {
					userScore++;
					Swal.fire({
						icon: 'success',
						title: "That's right!",
						text: 'You got it.',
						showConfirmButton: false,
						timer: 2000
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Oops!',
						text: "That's real tech!",
						showConfirmButton: false,
						timer: 2000
					});
				}
				nextQuestion();
			});
		} else {
			displayResults();
		}
	}

	// Generate an array of options, with 3 real tech and 1 fake tech
	function makeQuestion(correctAnswer) {
		let presentedChoices = [];
		// Add 3 real tech, then 1 fake tech
		for (let i = 0; i < 3; i++) {
			presentedChoices.push(choices.realTech[randomizerFunction(choices.realTech.length)]);
		}
		presentedChoices.push(correctAnswer);
		// This block of code will randomize the array order - https://stackoverflow.com/questions/53066720/how-can-i-shuffle-a-javascript-array/53066842#53066842
		// This may not be the most uniform way to shuffle an array but since we're only generating 5 questions with 4 elements each, I think it's fine
		presentedChoices.sort(function() {
			return 0.5 - Math.random();
		});
		return presentedChoices;
	}

	// Clear out previous question, update the scoreboard, and call the next question
	function nextQuestion() {
		$('#main').empty();
		$('#main').append(`<h2>score: ${userScore}/${lengthOfGame}</h2>`);
		$('#main').append("<h3>where's the fake jargon?</h3>");
		showQuestion();
		$('#main').fadeIn();
	}

	// Display the final score and final message to the user depending on their score
	function displayResults() {
		// Calculate the user's final score
		const finalScore = userScore / lengthOfGame * 100;
		// Clear the playing space to prepare for results, depending on the user's score
		$('#main').empty();
		if (finalScore >= 75) {
			$('#main').append(
				`<h2 class="finalMessage">Congratulations!</h2> <h3>you got ${finalScore}%</h3> <p>you got <span class="correct-answers">${userScore}</span> out of <span class="game-length">${lengthOfGame}</span> questions right.</p>`
			);
			$('#main').append(
				`<img src="https://c.tenor.com/ET7xLBoXJMwAAAAC/celebration-confetti.gif" alt="animation of a cat celebrating with confetti"></img>`
			);
		} else if (finalScore >= 50 && finalScore < 75) {
			$('#main').append(
				`<h2 class="finalMessage">Nice work!</h2> <h3>you got ${finalScore}%</h3> <p>you got <span class="correct-answers">${userScore}</span> out of <span class="game-length">${lengthOfGame}</span> questions right.</p><p>you did well! and there's always room for growth, so i hope that you will play again.</p>`
			);
			$('#main').append(
				`<img src="https://c.tenor.com/8PYZl3Xb_J8AAAAC/growth-mindset-youtube.gif" alt="animation of a cartoon brain with the words growth mindset"></img>`
			);
		} else if (finalScore >= 0 && finalScore < 50) {
			$('#main').append(
				`<h2 class="finalMessage">You did your best!</h2> <h3>you got ${finalScore}%</h3> <p>you got <span class="correct-answers">${userScore}</span> out of <span class="game-length">${lengthOfGame}</span> questions right.</p> <p>that's totally okay -- please don't feel too bad! give it another shot.</p>`
			);
			$('#main').append(
				`<img src="https://c.tenor.com/vZJT0GmTezIAAAAC/cheer-you-got-this.gif" alt="animation of a cat comforting a crying rabbit"></img>`
			);
		}
	}

	// Start the quiz!
	startQuiz();
});

var correct;
var result = document.getElementById("result");

function showTime(hour, minute) {
	document.getElementById("hhand").style.transform = 'rotateZ(' + ((((hour % 12) * 30) % 360) + (minute / 2)) + 'deg)';
	document.getElementById("mhand").style.transform = 'rotateZ(' + (minute * 6) + 'deg)';

	var answers = [];
	answers.push(timeToText(hour, minute));
	while(answers.length < 4) {
		var newAnswer = fakeText(hour, minute);
		var used = false;
		for(var i = 0; i < answers.length; i++) {
			if(newAnswer == answers[i]) {
				used = true;
			}
		}
		if(!used) {
			answers.push(newAnswer);
		}
	}

	correct = answers[0];
	shuffle(answers);
	var answerFields = document.getElementsByClassName("answerText");
	var radioButtons = document.getElementsByClassName("answer");
	for(var i = 0; i < answers.length && i < answerFields.length; i++) {
		radioButtons[i].value = answers[i];
		answerFields[i].innerHTML = answers[i];
	}
}

function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}

function fakeText(hour, minute) {
	if(Math.random() < 0.25) {
		hour = Math.round(Math.abs((hour + (Math.random() * 48 - 24)) % 24));
		minute = Math.round(Math.abs((minute + (Math.random() * 120 - 60)) % 60));
		return timeToText(hour, minute);
	} else if(Math.random() < 0.7) {
		return timeToText(hour, Math.round(Math.abs(minute - (Math.random()*60-30))) % 12);
	} else {
		return timeToText(Math.round(Math.abs(hour - (Math.random()*24-12))) % 60, minute);
	}
}

function timeToText(hour, minute) {
	console.log("Hour: " + hour + " Minute: " + minute);
	var numbers = ["twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty one", "twenty two", "twenty three", "twenty four", "twenty five", "twenty six", "twenty seven", "twenty eight", "twenty nine"];
	if(minute == 0) {
		return numbers[hour] + " o'clock";
	}
	if(minute < 30) {
		if(minute == 15) {
			return "quarter past " + numbers[hour % 12];
		} else {
			return numbers[minute] + " past " + numbers[hour % 12];
		}
	}
	if(minute > 30) {
		if(minute == 45) {
			return "quarter to " + numbers[(hour + 1) % 12];
		} else {
			return numbers[60 - minute] + " to " + numbers[(hour + 1) % 12];
		}
	}
	if(minute == 30) {
		return "half past " + numbers[hour];
	}
}

function generateNewTime() {
	var hour = Math.round(Math.random()*24);
	var minute = Math.round(Math.random()*60);
	showTime(hour, minute);
}

document.getElementById("submitForm").addEventListener("click", function(e) {
	e.preventDefault();
	var selected = document.querySelector('input[name = "answer"]:checked');
	var answer = selected.value;
	if(correct == answer) {
		generateNewTime();
		selected.checked = false;
		result.innerHTML = "Correct";
	} else {
		result.innerHTML = "So close! Try it one more time.";
	}
});

generateNewTime();
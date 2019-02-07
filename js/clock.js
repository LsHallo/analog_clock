let correct;
let resultPositive = $("#correct");
let resultNegative = $("#wrong");

function showTime(hour, minute) {
	$("#hhand").css('transform', 'rotateZ(' + ((((hour % 12) * 30) % 360) + (minute / 2)) + 'deg)');
	$("#mhand").css('transform', 'rotateZ(' + (minute * 6) + 'deg)');

	let answers = [];
	answers.push(timeToText(hour, minute));
	while(answers.length < 4) {
		let newAnswer = fakeText(hour, minute);
		let used = false;
		for(let i = 0; i < answers.length; i++) {
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
	let radioButtons = $('.answer');
	for(let i = 0; i < answers.length; i++) {
		radioButtons.eq(i).val(answers[i]).css('opacity', 1);
	}
}

function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}

function fakeText(hour, minute) {
	if(Math.random() < 0.5) {
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
	let numbers = ["twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty one", "twenty two", "twenty three", "twenty four", "twenty five", "twenty six", "twenty seven", "twenty eight", "twenty nine"];
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
	let hour = Math.round(Math.random()*12);
	let minute = Math.round(Math.random()*60);
	showTime(hour, minute);
}

$('.answer').click(function(e) {
	let selected = e.currentTarget;
	let answer = selected.value;
	if(correct == answer) {
		generateNewTime();
		resultPositive.animate({'opacity': 1}, 400);
		resultNegative.animate({'opacity': 0}, 400);
	} else {
		$(selected).animate({'opacity': .3}, 200);
		resultNegative.animate({'opacity': 1}, 400);
		resultPositive.animate({'opacity': 0}, 400);
	}
});

generateNewTime();
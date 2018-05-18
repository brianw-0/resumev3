
function createLetter(childIndex) {
	$(".dropLetter:nth-child(" + (childIndex + 1) + ")").addClass("dropped");
}

//Drops a word in a selected HTML element
function dropLetters(word, selectedElement) {

	for(var i = 0; i < word.length; ++i) {
		//console.log("Letter: " + word[i]);
		
		var HTML_Letter = "<div class = \"dropLetter\">" + word[i] + "</div>";
		$(selectedElement).append(HTML_Letter);
		//createLetter(i);
		
		
	}
	for(var i = 0; i < word.length; ++i) {
		setTimeout(createLetter.bind(null, i), (word.length-i)*100);
	}
}


function selectGreeting() {
	
	var date = new Date();
	var hour = date.getHours();
	var greeting = "";
	
	if(hour < 6) {
		greeting = "Hello, I'm";
	}
	else if(hour < 12) {
		greeting = "Good Morning, I'm";
	}
	else if(hour < 17) {
		greeting = "Good Afternoon, I'm";
	}
	else if(hour < 22) {
		greeting = "Good Evening, I'm";
	}
	else {
		greeting = "Hello, I'm";
	}
	
	return greeting;
	//console.log("Current hour: " + hour);
}


function getTopPosition(elementSelector) {
	var position = $(elementSelector).position().top;
	return position;
}

//This will check which sections should drop letters
function scrollChecker() {
	
	var dropIntroPosition = 200;
	var introDropped = false;
	var dropExpPosition = Math.round(getTopPosition(".introduction"));
	var expDropped = false;
	var dropProjectPosition = Math.round(getTopPosition(".experience"));
	var projectDropped = false;
	var dropContactPosition = Math.round(getTopPosition(".projects")-500);
	var contactDropped = false;
	
	
	$(window).scroll(function() {
		
		if($(window).scrollTop() >= dropIntroPosition && !introDropped) {
			dropLetters("INTRODUCTION", ".titledrop-container:eq(0)");
			introDropped = true;
		}
		if($(window).scrollTop() >= dropExpPosition && !expDropped) {
			dropLetters("EXPERIENCE", ".titledrop-container:eq(1)");
			expDropped = true;
		}
		if($(window).scrollTop() >= dropProjectPosition && !projectDropped) {
			dropLetters("PROJECTS", ".titledrop-container:eq(2)");
			projectDropped = true;
		}
		if($(window).scrollTop() >= dropContactPosition && !contactDropped) {
			dropLetters("CONTACT", ".titledrop-container:eq(3)");
			contactDropped = true;
		}
	});
	
}


//Listens for when the user selects a contact icon (i.e. linkedin)
function contactListener() {
	
	$(".contact-info i").hover(function() {
		
		//Current index of hovered icon
		var index = $(this).parent().index(".contact-info") + 1;
		
		//We only show the corresponding text for this icon
		$(".contact-link").removeClass("show");
		$(".contact-link:nth-child(" + index + ")").addClass("show");
	});
	
}

//Listens for when the user selects a project box to look at.
function projectAccordionListener() {
	
	$(".project-tab").click(function() {
		
		$(".project-tab").removeClass("grow");
		$(this).addClass("grow");
		
		
		$(".project-description").removeClass("show");
		var index = $(this).index(".project-tab") + 1;
		console.log("Index: " + index);
		$(".project-tab:nth-child( " + index + ") .project-description").addClass("show");
		
		
	});
}

/*
//Function for Blinking greeting (Legacy, copied from my old website)
Function overview:
There are 4 steps: adding letters, pausing the phrase, removing letters, and changing the phrase
These are named accordingly to their functions.  They also determine when the $(.blinking-box) is blinking
First, the letters are added using a setInterval (var add_phrase).  If the last letter is reached,
	remove the setInterval, and use a setTimeout as a delay for the next function, pause_phrase
After pausing for some time, pause_phrase runs and uses setInterval to call remove_letters continuously.
When all letters are removed, the next function, change_phrase, is called using another setTimeout.
This changes the phrase to the next one, or circles round and comes back to the first phrase.
Then add_letters is called again using a setInterval, and we have a loop.
*/	
var greeting_phrases = ["hope you enjoy your visit.","make websites for fun.", "like watching Game of Thrones.", "want to take up surfing.",
 "can play piano kinda well."];
var phrase_index = 0;  //Current index in the phrase list
var current_phrase = greeting_phrases[phrase_index]; //Current phrase in the index
var letter_index = 0; //Current index of a letter in the current phrase
var new_greeting = "";
var remove_phrase;  //setInterval variable for removing letters
var add_phrase;
function blinkManager() {
	add_phrase = setInterval(add_letters, 80);
}


function add_letters() {
	if(letter_index >= current_phrase.length) { //If the last letter is in place, end the setInterval
		clearInterval(add_phrase);
		$(".blinking-box").addClass("blinking"); //Makes the div "blink"
		setTimeout(pause_phrase, 5000);  //Pauses to allow people to read the phrase
	}
	else {
		$(".changing-greeting").text(new_greeting + current_phrase[letter_index]);
		new_greeting = new_greeting + current_phrase[letter_index];
		letter_index++;
	}
	
}
function pause_phrase() {  //Moves onto the next function, remove_phrase
	remove_phrase = setInterval(remove_letters, 50);
	$(".blinking-box").removeClass("blinking");
	
}
function remove_letters() { //This is called by the setInterval for remove_phrase to remove all letters.
	if(letter_index < 0) {  //Once all letters are removed, the current setInterval is removed, and there is a timeout for the phrase to change.
		clearInterval(remove_phrase);
		$(".blinking-box").addClass("blinking");
		setTimeout(change_phrase,1000);
	}
	else {
		new_greeting = new_greeting.substring(0,letter_index);
		$(".changing-greeting").text(new_greeting);
		letter_index--;
	}
}
function change_phrase() {  //Changes the current phrase and restarts the relevant variables of the current phrase. Loops the cycle again
	phrase_index++;  //Changes the phrase index in the list of phrases.
	if(phrase_index >= greeting_phrases.length) { //Circles round if the last phrase in the list was displayed
		phrase_index = 0;
	}
	current_phrase = greeting_phrases[phrase_index]; //resets current phrase
	letter_index = 0; //resets the index of the current letter
	new_greeting = ""; //resets the greeting
	add_phrase = setInterval(add_letters, 80);
	$(".blinking-box").removeClass("blinking");
}
//END BLINKING GREETING Functions


$(document).ready(function(){
	
	scrollChecker();
	$(".greeting-container").text(selectGreeting());
	contactListener();
	
	projectAccordionListener();

	blinkManager();
});


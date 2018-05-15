
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


$(document).ready(function(){
	
	scrollChecker();
	$(".greeting-container").text(selectGreeting());
	contactListener();
	
	projectAccordionListener();

});


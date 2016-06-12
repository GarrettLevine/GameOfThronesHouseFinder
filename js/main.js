$(function(){
		// Create a scorekeeping answer array and store it
		var houses = [
			{
				name: 'lannister',
				score: 0,
				img:"images/lannister.PNG",
				words: '"A Lannister always pays his debts"',
			},
			{
				name: 'stark',
				score: 0,
				img:"images/stark.PNG",
				words: '"Winter is coming"',
			},
			{
				name: 'targaryen',
				score: 0,
				img:"images/targaryen.PNG",
				words:'"Fire and blood"',
			},
			{
				name: 'martell',
				score: 0,
				img:"images/martell.PNG",
				words: '"Unbowed, unbent, unbroken"',
			},
			{
				name: 'greyjoy',
				score: 0,
				img:"images/greyjoy.PNG",
				words: '"We do not sow"',
			},
			{
				name: 'wildling',
				score: 0,
				img:"images/wildlings.png",
				words:'"Hard to lead when you\'re in chains"',
			},
		];
	$('form').on('submit',function(event) {

		//when the user hits submit, preventDefault to stop the page reload
		event.preventDefault();


		//then we gather user choices for each fieldset variable each (i.e. ans1, ans2, ans3, ans4)
		var powerChoice = $('input[name=power]:checked').data('value');
		var climateChoice = $('input[name=climate]:checked').data('value');
		var actionChoice = $('input[name=action]:checked').data('value');
		var familyChoice = $('input[name=family]:checked').data('value');
		// Create a re-usable function to gather update the score based on the user choices
		function scoreChoice(userChoice, value) {
			// houses
			for (var i = 0; i < houses.length; i++) {
				if (userChoice === houses[i].name) {
					// console.log(houses[i].name, userChoice);
					houses[i].score = houses[i].score + value;
					// console.log(houses[i]);
				};
				// else {
				// 	console.log('else works')
				// };
			};
		};

		// Run our re-usable function to update the score for each user choice
		scoreChoice(powerChoice, 2);
		scoreChoice(climateChoice, 1);
		scoreChoice(actionChoice, 1);
		scoreChoice(familyChoice, 1);
		// console.log(houses);

		// Group the objects in the houses array by the property=score by going through the houses array and return an object
		var groupedHouses = _.groupBy(houses, function(i){
			return i.score;
		});

		// Take the returned object from above and convert it into an array (so that we can pluck out the last i.e. highest index)
		groupedHouses = _.toArray(groupedHouses);

		// Take the last i.e. highest index and store it in a variable
		var yourHouse = groupedHouses[groupedHouses.length - 1]

		// Create a random number and store it in a variable
		var randomNumber = Math.floor(Math.random() * yourHouse.length);

		// Present the final house choice using the random number
		var finalHouse = yourHouse[randomNumber];
		// console.log(yourHouse);

		//fadeIn the results
		// $('.results').fadeIn( "slow" );

		// Inject the final house choice into the html
		$('.results').html("<h1>House: " + finalHouse.name + "</h1>" + '<img src="' +finalHouse.img + '">' + "<h2>" + finalHouse.words + "</h2>" + "<button class='reset link'>Reset</button>");
		
		$('#results').addClass('show');

		$('html, body').animate({
			scrollTop:$("#results").offset().top
		}, 500);


	}); // form submit ends 

	// when a user clicks one of the labels,
	$('label').on('click',function(){

		var parent = $(this).parent('.answers');

		parent.find('label').removeClass('clicked');

		$(this).addClass('clicked');

	// 	// when you click an answer, the 'next' button becomes visible
		// parentsUntil($('fieldset'), '.next').addClass('next-show');
		var nextParent = $(this).parentsUntil('.card').find('.flow'); 
		nextParent.find('.next').addClass('next-show');
	});

	$('#card4 label').on('click', function(){
		$('#card4').addClass('card-last');
		$('input[type=submit').fadeIn();
	});
	//reset button resets all the clicked classes, resets the scores and scrolls to the top

	$('#results').on('click', '.reset', function(){
		$('html, body').animate({
			scrollTop:$('body').offset().top	
	}, 1000);
		setTimeout(function(){
			console.log('reset clicked');
			$('label').removeClass('clicked');	
			for (var i = 0; i < houses.length; i++){
				houses[i].score = 0;
			};
			$('#results').removeClass('show');
			$('input[type=submit').fadeOut();
			$('#card4').removeClass('card-last');		
		},1100);
	});	

});

























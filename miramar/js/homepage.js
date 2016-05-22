$(function() {
	// CLICK ON PRIMARY NAVIGATION
	$('#nav a').on('click', function(e) {
		var url = this.href;
		if(url.indexOf("homepage.html") === -1) {
			e.preventDefault();	
		}
		// var url = this.href;
		$('#nav a.active').removeClass('active');
		$(this).addClass('active');

		$('#container').remove();
		$('#content').load(url + ' #container').hide().fadeIn('slow');

	});

	// TOGGLE THE THREE COLUMNS ON MAIN PAGE
	$(document).on('click', '#article_group .article button[data-toggle]',function(e) {
		e.preventDefault();
		var selector = $(this).data("toggle"); // get corresponding div element
		// $('.hidden').slideUp('slow');
		if($(selector).hasClass('active')) //if it was active before, it should be collapsed
		{
			$(selector).removeClass('active');
			$(selector).slideUp('slow');
		}
		else //if it was not active before, it should be active now
		{
			var hiddens = ["article1_hidden", "article2_hidden", "article3_hidden"];
			$.each(hiddens, function(i, val) {
				var item = "#" + val;
				if($(item).hasClass('active'))
				{
					$(item).removeClass('active');
					$(item).slideUp('slow');
				}
			});
			
			$(selector).addClass('active');
			$(selector).slideDown('slow');
		}
	});

	// PHOTO VIEWER ON HOMEPAGE
	// $(document).on('change', '.slider', function(){

	// });
	$('.slider').each(function(){ 					//for every slider
		var $this = $(this);			 			//get the current slider
		var $group = $this.find('.slide_group'); 	//get the slide_group 
		var $slides = $this.find('.slide'); 		//jquery object to hold all slides
		var buttonArray = []; 						//array to hold nav buttons
		var currentIndex = 0; 						//index number of current slide
		var timeout; 								//used to store the timer.

		function move(newIndex) {					//creates the slide from old to new one
			var animateLeft, slideLeft;				//declare variables

			advance();								//when slide moves, call advance() again

			//if current slide is showing or a slide is animating, then do nothing
			if($group.is(':animated') || currentIndex === newIndex) {
				return;
			}

			buttonArray[currentIndex].removeClass('active');	//remove class from item
			buttonArray[newIndex].addClass('active'); 			//add class to new item

			if(newIndex > currentIndex) { 			//if new item > current
				slideLeft = '100%';					//set the new slide to the right
				animateLeft = '-100%'; 				//animate the current slide to the left
			} else {
				slideLeft = '-100%';				//set the new slide to the left
				animateLeft = '100%';				//animate the current group to the right
			}
			//position new slide to left (if less) or right (if more) of current
			$slides.eq(newIndex).css( {left: slideLeft, display: 'block'});
			$group.animate( {left: animateLeft}, function() { 		//animate slides
					$slides.eq(currentIndex).css({display:'none'}); //hide previous slide
					$slides.eq(newIndex).css({left:0}); 			//set position of the new item
					$group.css({left:0}); 							//set position of group of slides
					currentIndex = newIndex;						//set currentIndex to new image
			});
		}

		function advance() { 						//sets a timer between slides
			clearTimeout(timeout);					//clear timer stored in timeout
			//start timer to run an anonymous function every 4 seconds
			timeout = setTimeout(function() {
				if(currentIndex < ($slides.length - 1)) //if not the last slide
				{
					move(currentIndex+1);
				} else {								//move to the first slide
					move(0);
				}
			}, 4000);
		}

		$.each($slides, function(index){
			//create a button element for the button
			var $button = $('<button type="button" class="slide_btn">&bull;</button>');
			if(index === currentIndex) {				//if index is the current item
				$button.addClass('active');				//add the active class
			}
			$button.on('click', function(){				//create event handler for the button
				move(index);							//it calls the move() function
			}).appendTo($this.find('.slide_buttons'));	//add to the buttons holder
			buttonArray.push($button);					//add it to the button array
		});	
		advance();
	});

	// //
	// var folder = "../img/";
	// $.ajax({
	//     url : folder,
	//     success: function (data) {
	//         $(data).find("a").attr("href", function (i, val) {
	//             if( val.match(/\.(jpe?g|png|gif)$/) ) { 
	//                 $("#product_list").append( "<img src='"+ folder + val +"'>" );
	//             } 
	//         });
	//     }
	// });
});
$(function () {
//Let's set up some variables
	//main app areas where moving snippets between
	var snippets = $('#snippets');
	var output = $('#html');
	var preview = $('#preview');
	//and now some other bits
	var viewoptions = $('#viewoptions');
	var message = $('#message');
	var whattodo = $('#whattodo');
	var sniptype = $('#htmlelementtype');

//Now we know jQuery has loaded lets hide all our snippets and preview area
	$(snippets).hide();
	$(preview).hide();
	$(whattodo).hide();
//Our click handler to add elements	
	$(sniptype).find('a').click(function(){
		//first grab the correct snippet as a variable using the hash of the clicked link
		var code = $(snippets).find(this.hash).html();
		//then append this variable to our preview area
		$(code).prependTo(preview);
		//and set it as the value of the text area
		$(output).val(code+$(output).val());
		//finally stop the default link action causing page jump
		return false;
	});
//Click handler for adding all code
	$('#all').click(function(){
		//simply fake clicking on all the element types
		$(sniptype).find('a').trigger('click');
		return false;
	});
//Click handler for clearing everything
	$('#clear').click(function(){ 
 		//set textarea value to nothing
 		$(output).val("");
 		//and empty our preview section
 		$(preview).empty();
 		return false;
	});
//our tabbed view modes
	$(viewoptions).find('a').click(function(){
		$('.tabpanel').hide();
		$(this.hash).show();
		$(viewoptions).find('.selected').removeClass('selected');
		$(this).addClass('selected');
		return false;
	});
//Tooltips for our menu icons
	$(sniptype).find('a').hover(function() {
		//grab the title as a variable
		var tip = (this.title);
		//create our tool tip and put it next to our link
		$(this).append('<span id="tooltip">'+ tip +'</span>');
		//get rid of title attribute to stop that little yellow box
		$(this).removeAttr("title")
		//then fade our tip in while moving it up, keep it there for a second and fade out
		$('#tooltip')
			.show()
			.animate({top: '-50px',opacity:'0.9'},150)
			.delay(1000)
			.fadeOut('slow');
	}, 
	function () {
		//grab the tooltip text as a variable
		var tip = $('#tooltip').text();
		//reset the title attribute
		$(this).attr('title', tip);
		//remove from the dom, ready to loop again
		$('#tooltip').remove();
	});
//when you click on the code it will select everything
	$(output).click(function(){ 
 		$(this).focus().select();
	});
//when you try select the text in the preview it gives a warning, but only once
	$(preview).one('copy', function(){
      	$(message).find('h1').text('Easy tiger!');
      	$(message).find('p').text('Just to make sure your code is read properly you should copy it from the HTML view here and paste it into the HTML view of the WordPress Editor. It would be a shame to get this far and have something go wrong!');
 		$(message).fadeIn(500)
    });
//first time the user copies thier selection thank them for using the service!
	$(output).one('copy', function(){
        $(message).find('h1').text('Thanks for useing WP Fill Me');
        $(message).find('p').text('To make sure your code is read properly you should paste it into the HTML view of the WordPress Editor.');
 		$(message).fadeIn(500)
	});
//remove the message layer is the user clicks anywhere
	$(message).click(function(){
		$(this).fadeOut(200);
		return false;
	});
//add the syntax highlighting for our help snippets
	var help = $('#help');
	$(help).find('.details').hide();
	$(help).find('pre.css').snippet("css",{style:"vampire",showNum:false,menu:false});
	$(help).find('pre.js').snippet("javascript",{style:"vampire",showNum:false,menu:false});
	$(help).find('pre.php').snippet("php",{style:"vampire",showNum:false,menu:false});
	$(help).find('article .toggler').click(function(){
		//if you click on a box that is already showing
		if($(this).siblings('.details').hasClass('open')){
			//close box annd remove class
			$(help).find('.details.open')
				.slideToggle('fast')
				.removeClass('open')
				.addClass('closed')
				.parent().removeClass('active');
				return false;
		}
		//else you're click on a box that isn't open
		else{
			//close any open boxes and remove class
			$(help).find('.details.open')
				.slideToggle('fast')
				.removeClass('open')
				.addClass('closed')
				.parent().removeClass('active');
			//open this box and add class
			$(this).siblings('.details.hide')
				.slideToggle('fast')
				.addClass('open')
				.removeClass('closed')
				.parent().addClass('active');
				return false;
		}
	});
//safe email address's
    $('span.safeemail').each(function(i) {
		var e = $(this).html();
		e = e.replace(" [at] ", "@");
		e = e.replace(" [dot] ", ".");
		$(this).html(e).replaceWith("<a href=\"mailto:" + $(this).text() + "\">" + $(this).text() + "</a>");
    });
});
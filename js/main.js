jQuery(function() {
	jQuery('section#content article header').after('<a href="#content" class="close"><span class="hide">Cerrar</span></a>');
	
	jQuery('#wrapper > header h1').append('<span class="switch">Interruptor</span>')
		.find('span.switch')
		.bind('click', function() {
			jQuery(this).closest('html').toggleClass('lights-off');
		})
		.attr('unselectable', 'on')
		.css('-moz-user-select', 'none')
		.each(function() { 
			this.onselectstart = function() { return false; };
		});
		
	jQuery('section#content article > div').wrap('<div class="attach-scrollbar" />"').wrap('<div class="viewport" />"').wrap('<div class="overview" />"')
		.parents('div.attach-scrollbar').prepend('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>');
		
	jQuery('div.attach-scrollbar').tinyscrollbar();
});
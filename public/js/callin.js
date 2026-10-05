$(function(){ 
    $('iframe').attr('src', $('iframe').attr('src'));
    $('.callin-team-section .team-member .team-member-photo, .callin-team-section .team-member h3').on('click', function(e){
        // e.preventDefault();

		$('html, body').animate({
			scrollTop: $(this).offset().top - 120
		}, 1200);

		if ($(window).width() > 480) {
			$('.team-member').removeClass('top');
			$('.team-member').removeAttr('style');

			var teamMemberDetails = $(this).parent().find('.team-member-details');
			var previousCss  = teamMemberDetails.attr("style");

			// will not get some properties in display none element
			teamMemberDetails.css({
				visibility: 'hidden',
				display:    'block'
			});

			var detailsOuterHeight = teamMemberDetails.outerHeight(true);
			var detailsHeight = teamMemberDetails.outerHeight(true);
			var teamMemberOffset = $(this).offset();
			var photoHeight = $(this).parent().find('.team-member-photo').outerHeight(true);
			var nameHeight = $(this).parent().find('h3').outerHeight(true);

			// switch to previous css
			teamMemberDetails.attr("style", previousCss ? previousCss : "");

			var docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
			var spaceDown = docHeight - (teamMemberOffset.top + $('footer').outerHeight(true) + nameHeight + photoHeight + detailsOuterHeight + 20);

			if (spaceDown < 0) {
				$(this).parent().addClass("top");
				$(this).parent().css({
					height: nameHeight + detailsHeight + photoHeight + 25 + 'px',
					marginBottom: 0
				});
			}
		}

        var _this = $(this);
        $('.team-member').removeClass('team-member-hover');
        $(_this).parent().addClass('team-member-hover');
    });

	if (window.location.hash) { 
		var hash = window.location.hash.substring(1);		
		$('[data-id='+hash+']').find('.team-member-photo').trigger('click');
	}

	if($('.callin-testimonial-slider').length > 0){
		$('.callin-testimonial-slider').bxSlider({
			pager: false,
			controls: true,
			auto: true,
			adaptiveHeight: true,
		});
	}
	
	$(window).resize(function(){
		setTimeout(function(){
			$('.team-member .close').trigger('click');
		}, 500);
	});
	
    $('.team-member .close').on('click', function(e){
        e.preventDefault();
		$('.team-member').removeClass('top');
		$('.team-member').removeAttr('style');
        $('.team-member').removeClass('team-member-hover');
    });
    $('.hamburger').click(function(){
        $(this).toggleClass('is-active');
        $('nav').toggleClass('visible');
    });
});
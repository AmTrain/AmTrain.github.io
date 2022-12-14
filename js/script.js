$(function() {
	"use strict";
	var sect = $(window.location.hash),
		portfolio = $('.portfolio-items');
	if (sect.length == 1) {
		$('.section.active')
			.removeClass('active');
		sect.addClass('active');
		if (sect.hasClass('border-d')) {
			$('body')
				.addClass('border-dark');
		}
	}
	$('.view-project')
		.magnificPopup({
			type: 'inline',
			fixedContentPos: false,
			fixedBgPos: true,
			overflowY: 'auto',
			closeBtnInside: true,
			preloader: false,
			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in'
		});
	$(window)
		.on('load', function() {
			$('body')
				.addClass('loaded');
			portfolio.shuffle();
			$('.portfolio-filters > li > a')
				.on('click', function(e) {
					e.preventDefault();
					var groupName = $(this)
						.attr('data-group');
					$('.portfolio-filters > li > a')
						.removeClass('active');
					$(this)
						.addClass('active');
					portfolio.shuffle('shuffle', groupName);
				});
		});
	$('.section-toggle')
		.on('click', function() {
			var $this = $(this),
				sect = $('#' + $this.data('section')),
				current_sect = $('.section.active');
			if (sect.length == 1) {
				if (sect.hasClass('active') == false && $('body')
					.hasClass('section-switching') == false) {
					$('body')
						.addClass('section-switching');
					if (sect.index() < current_sect.index()) {
						$('body')
							.addClass('up');
					} else {
						$('body')
							.addClass('down');
					}
					setTimeout(function() {
						$('body')
							.removeClass('section-switching up down');
					}, 2500);
					setTimeout(function() {
						current_sect.removeClass('active');
						sect.addClass('active');
					}, 1250);
					if (sect.hasClass('border-d')) {
						$('body')
							.addClass('border-dark');
					} else {
						$('body')
							.removeClass('border-dark');
					}
				}
			}
		});
	$('.testimonials-slider')
		.owlCarousel({
			items: 2,
			responsive: {
				992: {
					items: 2
				},
				0: {
					items: 1
				}
			}
		});
	$('#contact-form')
		.validator()
		.on('submit', function(e) {
			if (!e.isDefaultPrevented()) {
				e.preventDefault();
				var $this = $(this),
					alerts = {
						success: "<div class='form-group' >\
						<div class='alert alert-success' role='alert'> \
							<strong>Message Sent!</strong> We'll be in touch as soon as possible\
						</div>\
					</div>",
						error: "<div class='form-group' >\
						<div class='alert alert-danger' role='alert'> \
							<strong>Oops!</strong> Sorry, an error occurred. Try again.\
						</div>\
					</div>"
					};
				$('#contact-form-result')
					.html(alerts.success);
				$('#contact-form')
					.trigger('reset');
			}
		});
});
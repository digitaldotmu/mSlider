/**
 * jQuery mSlider Plugin 0.0.1
 * @homepage https://github.com/MatilisDigital/mSlider
 * (c) 2015, Valéry Ambroise
 */

(function($) {

	"use strict";
	
	var default_options = {
		width: '',
		height: '',
		slideDuration: 3000,
		slideSpeed: 300,
		orientation: 'h', //h = horizontal, v = vertical
		auto: false,
		controls: true,
		pagination: true,
		startSlide: 0,
		//Events
		onSliderStart: function(){},
		onSliderEnd: function(){},
		onSlideChange: function(){}
	}
	
	var init = {
		setDimensions: function(slider, options){
			slider.css({'width': options.width+'px', 'height': options.height+'px'});
		},
		setupSlides: function(slider, options){
			var slides = $('li', slider),
				numSlides = slides.length,
				indexPositions = {},	
				indexPositionsTop = {};	
			
			if(options.orientation == 'h'){
				var leftPos = 0;
				
				slides.each(function(index){
					var slide = $(this);
					
					slide.css({
						'left': leftPos+'px',
						'width': options.width+'px',
						'height': options.height+'px'
					});
					
					
					slide.addClass('mSliderContent');
					
					indexPositions[index] = leftPos;
					
					leftPos += options.width;
				});
				
			}else{
				var topPos = 0;
				
				slides.each(function(index){
					var slide = $(this);
					
					slide.css({
						'top': topPos+'px',
						'width': options.width+'px',
						'height': options.height+'px'
					});
					
					slide.addClass('mSliderContent');
					
					indexPositionsTop[index] = topPos;
					
					topPos += options.height;
				});
			}
			
			return {
				slideObjs: slides,
				numSlides: numSlides,
				positions: indexPositions,
				positionsTop: indexPositionsTop
			};
		},
		buildSlider: function(slider, slides, options){
			var sliderMask = $('<div class="mSliderMask">'),
				nextBut = $('<span class="mSliderNext">'),
				prevBut = $('<span class="mSliderPrev">'),
				totalWidth,
				totalHeight;
				
			if(options.orientation == 'h'){
				totalWidth = slides.numSlides*options.width;
				totalHeight = options.height;
				
			}else{
				totalWidth = options.width;
				totalHeight = slides.numSlides*options.height;
			}				
				
			sliderMask.css({'width': totalWidth+'px', 'height': totalHeight+'px'});
			
			sliderMask.append(slides.slideObjs);
			//console.log(slides);
			slider.html('').append(sliderMask);
			
			prevBut.on('click.mslider', function(e){
				slider.trigger('prev.mslider');
			}).text('Prev');
			
			nextBut.on('click.mslider', function(e){
				slider.trigger('next.mslider');
			}).text('Next');			
			
			if(options.controls){
				slider.append(prevBut);
				slider.append(nextBut);				
			}else if(!options.controls && !options.auto){
				console.error('Either one the following options should be set to true: auto, controls');
			}
			
			slider.trigger('start.mslider');
		},
		goToSlideIndex: function(slider, slides, index, options){
			var sliderMask = $('.mSliderMask', slider),
				nextSlide = 0;
			
			if(options.orientation == 'h'){
				sliderMask.animate({
					left: '-'+slides.positions[index],
				}, 
				options.slideSpeed,
				function(){
					$('.mSliderActive', slider).removeClass('mSliderActive');
					$(slides.slideObjs[index]).addClass('mSliderActive');
					
					options.onSlideChange(slides.slideObjs[index], index);
					if(index == slides.numSlides - 1){
						options.onSliderEnd();
					}
				});
			}else{
				sliderMask.animate({
					top: '-'+slides.positionsTop[index],
				}, 
				options.slideSpeed,
				function(){
					$('.mSliderActive', slider).removeClass('mSliderActive');
					$(slides.slideObjs[index]).addClass('mSliderActive');
					
					options.onSlideChange(slides.slideObjs[index], index);
					if(index == slides.numSlides - 1){
						options.onSliderEnd();
					}
				});				
			}
			
			nextSlide = index + 1;
			
			return nextSlide;
		}
	}
	
	$.fn.mSlider = function (opt) {
		var ARROWRIGHT = 39,
			ARROWLEFT = 37,
			options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, default_options, opt) : $.extend(true, {}, default_options);
			
		var slider = $(this);
		init.setDimensions(slider, options);
		
		slider.on('start.mslider', function(e){
			//console.log(e.target);
	
			var currentSlide = 0;
			
			if(options.startSlide !== '' && parseInt(options.startSlide) <= slides.numSlides){
				currentSlide = parseInt(options.startSlide);
			}
			
			var nextSlide = init.goToSlideIndex(slider, slides, currentSlide, options);		
			
			//console.log(slides);
			slider.on('next.mslider', function(e){
				currentSlide = nextSlide;
				nextSlide = init.goToSlideIndex(slider, slides, nextSlide, options);
				if(nextSlide >= slides.numSlides){
					nextSlide = 0;
				}	
				e.stopPropagation();	
			});
			
			$('body').on('keydown', function (event) {
				var key = event.which;
				
				if ([ARROWRIGHT].indexOf(key) !== -1 ) {
					currentSlide = nextSlide;
					nextSlide = init.goToSlideIndex(slider, slides, nextSlide, options);
					if(nextSlide >= slides.numSlides){
						nextSlide = 0;
					}
					
					e.stopPropagation();
				}
				
			});
			
			slider.on('prev.mslider', function(e){
				if(currentSlide <= 0){
					currentSlide = slides.numSlides-1;
				}else{
					currentSlide = currentSlide - 1;
				}
							
				nextSlide = init.goToSlideIndex(slider, slides, currentSlide, options);	
				
				e.stopPropagation();		
			});		
			
			$('body').on('keydown', function (event) {
				var key = event.which;
				
				if ([ARROWLEFT].indexOf(key) !== -1 ) {
					if(currentSlide <= 0){
						currentSlide = slides.numSlides-1;
					}else{
						currentSlide = currentSlide - 1;
					}
								
					nextSlide = init.goToSlideIndex(slider, slides, currentSlide, options);
					
					e.stopPropagation();
				}
				
			});	
		
			
			if(options.auto){
						
				var interval = setInterval(function(){						
						
					currentSlide = nextSlide;
					nextSlide = init.goToSlideIndex(slider, slides, currentSlide, options);
					
					if(nextSlide >= slides.numSlides){
						nextSlide = 0;
					}				
					
				}, options.slideDuration);

			}			
			
			options.onSliderStart();
			
			e.stopPropagation();
		});
		
		var slides = init.setupSlides(slider, options);
		init.buildSlider(slider, slides, options);				

	}
	
})(jQuery);
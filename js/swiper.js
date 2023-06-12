$(function() {

	"use strict";

	/*================*/
	/*VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	/*============================*/
	/*function on page load */
	/*============================*/
	$(window).load(function(){
		initSwiper();
		$('body').addClass('loaded');
		$('#loader-wrapper').fadeOut();
		setTimeout(function(){
			pageCalculations();
			scrollCall();
		},0);
	});

	/*=====================*/
	/*swiper sliders */
	/*=====================*/

	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.find('.swiper-button-next').addClass('swiper-button-next-'+index);
			if($t.find('.swiper-slide').length<=1) $('.slider-click[data-pagination-rel="'+$t.data('pagination-rel')+'"]').addClass('disabled');

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1,
				loopVar = ($t.data('loop'))?parseInt($t.data('loop'), 10):0;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight: ($t.data('auto-height'))?parseInt($t.data('auto-height'), 10):0,
		        loop: loopVar,
		        spaceBetween: 30,
				autoplay: ($t.data('autoplay'))?parseInt($t.data('autoplay'), 10):0,
				centeredSlides: ($t.data('center'))?parseInt($t.data('center'), 10):0,
		        breakpoints: ($t.data('breakpoints'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) } } : {},
		        initialSlide: ($t.data('ini'))?parseInt($t.data('ini'), 10):0,
		        watchSlidesProgress: true,
		        speed: ($t.data('speed'))?parseInt($t.data('speed'), 10):500,
		        parallax: ($t.data('parallax'))?parseInt($t.data('parallax'), 10):0,
		        slideToClickedSlide: true,
		        keyboardControl: true,
		        mousewheelControl: ($t.data('mousewheel'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        direction: ($t.data('direction'))?$t.data('direction'):'horizontal',
		        onProgress: function(swiper, progress){
			        watchSwiperProgress($t,swiper,swiper.activeIndex);
		        },
		        onSlideChangeStart: function(swiper){
		        	var activeIndex = (loopVar==1)?swiper.activeLoopIndex:swiper.activeIndex;
			        watchSwiperProgress($t,swiper,activeIndex);
		        },
		        onTransitionEnd: function(swiper){
		        	var activeIndex = (loopVar==1)?swiper.activeLoopIndex:swiper.activeIndex;
		        	if($('.slider-click[data-pagination-rel="'+$t.data('pagination-rel')+'"]').length){
		        		var updateLeftNum = $('.slider-click.left[data-pagination-rel="'+$t.data('pagination-rel')+'"]'),
			        		updateRightNum = $('.slider-click.right[data-pagination-rel="'+$t.data('pagination-rel')+'"]');
		        		if(loopVar!=1){
		        			if(activeIndex<1) updateLeftNum.addClass('disabled');
			        		else updateLeftNum.removeClass('disabled').find('.left').text(activeIndex);
			        		if(activeIndex+2>swiper.slides.length) updateRightNum.addClass('disabled');
			        		else updateRightNum.removeClass('disabled').find('.left').text(activeIndex+2);
			        		updateLeftNum.find('.preview-entry.active').removeClass('active');
			        		updateLeftNum.find('.preview-entry[data-rel="'+(activeIndex-1)+'"]').addClass('active');
			        		updateRightNum.find('.preview-entry.active').removeClass('active');
			        		updateRightNum.find('.preview-entry[data-rel="'+(activeIndex+1)+'"]').addClass('active');
		        		}
			        }
		        }
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});

	}

	function watchSwiperProgress(container, swiper, index){
        if($('.pagination-slider-wrapper[data-pagination-rel="'+container.data('pagination-rel')+'"]').length){
        	var foo = $('.pagination-slider-wrapper[data-pagination-rel="'+container.data('pagination-rel')+'"]');
        	foo.css({'top':(-1)*parseInt(foo.find('.active').attr('data-slide-to'), 10)*foo.parent().height()});
        }        
	}

	$('.slider-click.left').on('click', function(){
		if($(this)[0].hasAttribute('data-pagination-rel')){
			swipers['swiper-'+$('.swiper-container[data-pagination-rel="'+$(this).data('pagination-rel')+'"]').attr('id')].slidePrev();
			$(this).find('.preview-entry').removeClass('active');
		}
	});

	$('.slider-click.right').on('click', function(){
		if($(this)[0].hasAttribute('data-pagination-rel')){
			swipers['swiper-'+$('.swiper-container[data-pagination-rel="'+$(this).data('pagination-rel')+'"]').attr('id')].slideNext();
			$(this).find('.preview-entry').removeClass('active');
		}
	});




});
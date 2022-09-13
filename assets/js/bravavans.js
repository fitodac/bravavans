$.noConflict();



(function($){
// 'use strict';


// Animate on scroll
AOS.init({
	once: true,
	disable: 'mobile'
});



// Navbar
if( $('.hero')[0] )
	var _headerHeight = parseInt( $('.hero').outerHeight() ),
			_win = $(window),
			_navHeight = parseInt( $('.navbar').outerHeight() ),
			_scrolllimit = _headerHeight - _navHeight;

	_win.scroll(function(){
		navbarMask();
	});


function navbarMask(){
	if( _win.scrollTop() > _scrolllimit )
		$('.navbar').addClass('alt-nav');
	else
		$('.navbar').removeClass('alt-nav');
}

navbarMask();




var scrollorama = $.scrollorama({ 
	blocks: '.scrollorama' 
});


if( $('.hero h1')[0] )

	scrollorama
	.animate('h1',{ 
		duration: 100, 
		property: 'letter-spacing', 
		start: 1, 
		end: 30
	})
	.animate('h1',{ 
		duration: 100, 
		property: 'opacity', 
		start: 1, 
		end: 0
	});



if( $('.hero .page-description')[0] )

	scrollorama
	.animate('.page-description',{ 
		duration: 100, 
		property: 'opacity', 
		start: 1, 
		end: 0
	});




if( $('.hero .iso')[0] )

	scrollorama
	.animate('.iso',{ 
		duration: 300, 
		property: 'zoom', 
		start: 1, 
		end: .5
	})
	.animate('.iso',{ 
		duration: 200, 
		property: 'opacity', 
		start: 1, 
		end: 0
	});




if( $('.hero .hero-bg')[0] )
	scrollorama
	.animate('.hero-bg',{ 
		duration: 800, 
		property: 'top', 
		start: 0, 
		end: -300 
	});





if( $('.map')[0] )

	$('.map')
	.gmap3({
		center:[40.7307712,-74.0029208],
		zoom: 15,
		scrollwheel: false
	})
	.marker({
		position:[40.7307712,-74.0029208],
		icon: window.location.origin + '/assets/images/_nitro/marker.png'
	});




// PORTFOLIO GRID
if( $('.portfolio-grid').length > 0 )
	portfolioGrid();

$(window).resize(function(){
	portfolioGrid();
});







// DATEPICKER
var fixDate = function (date){
			return date < 10 ? "0"+date : date;
		},
		
		dateStr = new Date();




if( $('.date-day')[0] )
	
	$('.date-day').val() === '' ? $('.date-day').val( fixDate(dateStr.getDate()) ) : '';
	
	$('.date-day').datetimepicker({
		format: 'DD',
		viewMode: 'days',
		// debug: true
	});




if( $('.date-month')[0] )
	
	$('.date-month').val() === '' ? $('.date-month').val( fixDate(dateStr.getMonth()+1) ) : '';

	$('.date-month').datetimepicker({
		format: 'MM',
		viewMode: 'months',
		// debug: true
	})
	.on('dp.show', function(e){ 
		$(e.target).data('DateTimePicker').viewMode('months'); 
	});




if( $('.date-year')[0] )
	
	$('.date-year').val() === '' ? $('.date-year').val( dateStr.getFullYear() ) : '';

	$('.date-year').datetimepicker({
		format: 'YYYY',
		viewMode: 'years',
		// debug: true
	})
	.on('dp.show', function(e){ 
		$(e.target).data('DateTimePicker').viewMode('years'); 
	});










})(jQuery)





function portfolioGrid(){	

	var $ = jQuery,
			_winWidth = $(window).width();


	// LG
	if( _winWidth > 1200){
		doMasonry('14%');
	}


	// MD
	if( _winWidth > 991 && _winWidth < 1199 ){
		doMasonry('19%');
	} 


	// SM
	if( _winWidth > 768 && _winWidth < 990 ){
		doMasonry('27%');
	}

	// XS
	if( _winWidth > 480 && _winWidth < 767)
		doMasonry('44%');

	// MAsonry destroy
	if( _winWidth < 479 )
		if( jQuery('.portfolio-grid').data('masonry') )
			jQuery('.portfolio-grid img').attr('style','');
			jQuery('.portfolio-grid').masonry('destroy');

	function doMasonry(_w){
		// console.log('doMasonry');

		jQuery('.portfolio-grid img').width(_w);
		jQuery('.portfolio-grid').masonry().masonry('destroy').masonry();
	}

}//portfolioGrid()




/*---------------------------------------------------------*/
/*  NITRO v.0.0.9
/*  Author: BorealisHQ
/*---------------------------------------------------------*/
(function($){
'use strict';




/*---------------------------------------------------------*/
/*  SCROLL TO TOP
/*---------------------------------------------------------*/
$('.scroll-to-top').addClass('opacity-0 invisible');

$(window).scroll(function(){
	var $winHeight = $(window).height();

	if( $(window).scrollTop() >= $winHeight/2 ){
		$('.scroll-to-top').removeClass('opacity-0 invisible');
	}else{
		$('.scroll-to-top').addClass('opacity-0 invisible');
	}
});





/*---------------------------------------------------------*/
/*	OPEN EXTERNAL LINKS IN NEW WINDOW
/*---------------------------------------------------------*/
$('a[href^="http"]').attr('target', '_blank');
$('a[href^="//"]').attr('target', '_blank');
$('a[href^="' + window.location.origin + '"]').attr('target', '_self');






/*---------------------------------------------------------*/
/*	IMG to SVG
/*---------------------------------------------------------*/
if( $('img.svg')[0] ){

	$('img.svg').each(function(){
		var _img = $(this),
				_imgID = _img.attr('id'),
				_imgClass = _img.attr('class'),
				_imgURL = _img.attr('src'),
				_imgStyle = _img.attr('style');

		$.get(_imgURL, function(data){
			// Get the SVG tag, ignore the rest
			var _svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if(typeof _imgID !== 'undefined') {
				_svg = _svg.attr('id', _imgID);
			}
			// Add replaced image's classes to the new SVG
			if(typeof _imgClass !== 'undefined') {
				_svg = _svg.attr('class', _imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			_svg = _svg.removeAttr('xmlns:a').attr('style', _imgStyle);

			// Replace image with new SVG
			_img.replaceWith(_svg);
		}, 'xml');

	});

}//$('img.svg')





/*---------------------------------------------------------*/
/*	SOCIAL SHARE BUTTONS
/*---------------------------------------------------------*/
if( $('[data-share]')[0] ){
	$('[data-share]').each(function(){
		var _social_net = $(this).data('share');
		$(this).socialShare(_social_net);
	});
}





/*---------------------------------------------------------*/
/*  MODALS (Bootstrap modals)
/*---------------------------------------------------------*/
if( $('.modal')[0] ){
	$('.modal').each(function(){
		var _this = $(this);

		_this.on('show.bs.modal',function(e){
			_this.addClass('modal-showing');
		});

		_this.on('shown.bs.modal',function(e){
			_this.removeClass('modal-showing');
		});
	});
}




/*---------------------------------------------------------*/
/*  INITIALIZE TOOLTIPS (Bootstrap tooltips)
/*---------------------------------------------------------*/
if( $('[data-toggle="tooltip"]')[0] ){
	$('[data-toggle="tooltip"]').tooltip();	
}



/*---------------------------------------------------------*/
/*  INITIALIZE POPOVERS (Bootstrap popovers)
/*---------------------------------------------------------*/
if( $('[data-toggle="popover"]')[0] ){
	
	var _popoverLink = $('[data-toggle="popover"]');

	_popoverLink.on('click', function(){
		_popoverLink.popover('destroy').popover({container: 'body'});
		$(this).popover('show');
	});
	
}




})(jQuery);







































/*---------------------------------------------------------*/
/*  RESPONSIFY
/*  http://responsifyjs.space/
/*  http://responsifyjs.space/app/ (Allow create areas for images)
/*---------------------------------------------------------*/
!function(t){t.fn.responsify=function(){return this.each(function(){var e,r,a,i,o,h,n,s,f,u,c,d,p=t(this);if(e=p.width(),r=p.height(),a=p.parent().width(),i=p.parent().height(),o=Number(p.attr("data-focus-left")),h=Number(p.attr("data-focus-top")),n=Number(p.attr("data-focus-right")),s=Number(p.attr("data-focus-bottom")),e/r>a/i){var b=(n-o)*e;b/r>a/i?(u=r*a/b,f=e*a/b,d=-o*f,c=(i-u)/2):(u=i,f=i*e/r,d=a/2-(o+n)*f/2,d=d>0?0:d,d=a-d-f>0?a-f:d,c=0)}else{var l=(s-h)*r;l/e>i/a?(f=e*i/l,u=r*i/l,c=-h*u,d=(a-f)/2):(f=a,u=a*r/e,c=i/2-(h+s)*u/2,c=c>0?0:c,c=i-c-u>0?i-u:c,d=0)}p.parent().css({overflow:"hidden"}),p.css({position:"relative",height:u,width:f,left:d,top:c})})}}(jQuery);

/*---------------------------------------------------------*/
/*  ADAPTIVE BACKGROUNDS
/*  https://briangonzalez.github.io/jquery.adaptive-backgrounds.js/
/*  A jQuery plugin for extracting dominant colors from images 
/*  and applying it to its parent.
/*---------------------------------------------------------*/
!function(n){var t="data-ab-color",a="data-ab-parent",e="data-ab-css-background",r="ab-color-found",o={selector:"[data-adaptive-background]",parent:null,exclude:["rgb(0,0,0)","rgb(255,255,255)"],normalizeTextColor:!1,normalizedTextColors:{light:"#fff",dark:"#000"},lumaClasses:{light:"ab-light",dark:"ab-dark"}};!function(n){"use strict";var t=function(){return document.createElement("canvas").getContext("2d")},a=function(n,a){var e=new Image,r=n.src||n;"data:"!==r.substring(0,5)&&(e.crossOrigin="Anonymous"),e.onload=function(){var n=t("2d");n.drawImage(e,0,0);var r=n.getImageData(0,0,e.width,e.height);a&&a(r.data)},e.src=r},e=function(n){return["rgb(",n,")"].join("")},r=function(n){return n.map(function(n){return e(n.name)})},o=5,c=10,u={};u.colors=function(n,t){t=t||{};var u=t.exclude||[],i=t.paletteSize||c;a(n,function(a){for(var c=n.width*n.height||a.length,s={},l="",d=[],m={dominant:{name:"",count:0},palette:Array.apply(null,new Array(i)).map(Boolean).map(function(){return{name:"0,0,0",count:0}})},f=0;c>f;){if(d[0]=a[f],d[1]=a[f+1],d[2]=a[f+2],l=d.join(","),s[l]=l in s?s[l]+1:1,-1===u.indexOf(e(l))){var g=s[l];g>m.dominant.count?(m.dominant.name=l,m.dominant.count=g):m.palette.some(function(n){return g>n.count?(n.name=l,n.count=g,!0):void 0})}f+=4*o}if(t.success){var p=r(m.palette);t.success({dominant:e(m.dominant.name),secondary:p[0],palette:p})}})},n.RGBaster=n.RGBaster||u}(window),n.adaptiveBackground={run:function(c){var u=n.extend({},o,c);n(u.selector).each(function(o,c){var i=n(this),s=function(){var n=l()?d():i[0];RGBaster.colors(n,{paletteSize:20,exclude:u.exclude,success:function(n){i.attr(t,n.dominant),i.trigger(r,{color:n.dominant,palette:n.palette})}})},l=function(){var n=i.attr(e);return"undefined"!=typeof n&&n!==!1},d=function(){var n=i.css("background-image"),t=/\(([^)]+)\)/,a=t.exec(n)[1].replace(/"/g,"");return a};i.on(r,function(n,t){var e;e=u.parent&&i.parents(u.parent).length?i.parents(u.parent):i.attr(a)&&i.parents(i.attr(a)).length?i.parents(i.attr(a)):l()?i:u.parent?i.parents(u.parent):i.parent(),e.css({backgroundColor:t.color});var r=function(n){var a=t.color.match(/\d+/g);return(299*a[0]+587*a[1]+114*a[2])/1e3},o=function(n){return r(n)>=128?u.normalizedTextColors.dark:u.normalizedTextColors.light},c=function(n){return r(n)<=128?u.lumaClasses.dark:u.lumaClasses.light};u.normalizeTextColor&&e.css({color:o(t.color)}),e.addClass(c(t.color)).attr("data-ab-yaq",r(t.color)),u.success&&u.success(i,t)}),s()})}}}(jQuery);





/*---------------------------------------------------------*/
/*  HOVER 3D
/*  Inspired on http://ariona.github.io/hover3d
/*---------------------------------------------------------*/
!function(e){e.fn.hover3d=function(s){var t=e.extend({selector:null,perspective:1e3,sensitivity:20,invert:!1,shine:!1,hoverInClass:"hover-in",hoverOutClass:"hover-out",hoverClass:"hover-3d",keepOnLeave:!1},s);return this.each(function(){function s(){o.addClass(t.hoverInClass+" "+t.hoverClass),setTimeout(function(){o.removeClass(t.hoverInClass)},1e3)}function r(e){var s=i.innerWidth(),r=i.innerHeight(),n=t.invert?(s/2-e.offsetX)/t.sensitivity:-(s/2-e.offsetX)/t.sensitivity,v=t.invert?-(r/2-e.offsetY)/t.sensitivity:(r/2-e.offsetY)/t.sensitivity;dy=e.offsetY-r/2,dx=e.offsetX-s/2,theta=Math.atan2(dy,dx),angle=180*theta/Math.PI-90,angle<0&&(angle+=360),o.css({perspective:t.perspective+"px",transformStyle:"preserve-3d",transform:"rotateY("+n+"deg) rotateX("+v+"deg)"}),a.css("background","linear-gradient("+angle+"deg, rgba(255,255,255,"+e.offsetY/r*.5+") 0%,rgba(255,255,255,0) 80%)")}function n(){o.addClass(t.hoverOutClass+" "+t.hoverClass),0==t.keepOnLeave?o.css({perspective:t.perspective+"px",transformStyle:"preserve-3d",transform:"rotateX(0) rotateY(0)"}):o.css({perspective:t.perspective+"px",transformStyle:"preserve-3d"}),setTimeout(function(){o.removeClass(t.hoverOutClass+" "+t.hoverClass)},1e3)}var i=e(this),o=i.find(t.selector);t.shine&&o.append('<div class="shine"></div>');var a=e(this).find(".shine");i.css({perspective:t.perspective+"px",transformStyle:"preserve-3d"}),o.css({perspective:t.perspective+"px",transformStyle:"preserve-3d"}),a.css({position:"absolute",top:0,left:0,bottom:0,right:0,"z-index":9}),i.on("mouseenter",function(){return s()}),i.on("mousemove",function(e){return r(e)}),i.on("mouseleave",function(){return n()})})}}(jQuery);







/*-----------------------------------------------*/
/*	BROWSER DETECT
/*-----------------------------------------------*/
var _prefix = 'browser-',
		_is_chrome = navigator.userAgent.indexOf('Chrome') > -1,
		_is_explorer = navigator.userAgent.indexOf('MSIE') > -1,
		_is_explorer_9 = navigator.userAgent.indexOf('9') > -1,
		_is_explorer_10 = navigator.userAgent.indexOf('10') > -1,
		_is_explorer_11 = navigator.userAgent.indexOf('11') > -1,
		_is_edge = navigator.userAgent.indexOf('Edge') > -1,
		_is_firefox = navigator.userAgent.indexOf('Firefox') > -1,
		_is_safari = navigator.userAgent.indexOf("Safari") > -1,
		_is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;

if((_is_chrome)&&(_is_safari)){   _is_safari = false; }
if((_is_chrome)&&(_is_opera)){    _is_chrome = false; }

if((_is_chrome)){    $('body').addClass(_prefix + 'chrome');   }
if((_is_explorer)){  $('body').addClass(_prefix + 'msie');     }
if((_is_edge)){      $('body').addClass(_prefix + 'edge');     }
if((_is_firefox)){   $('body').addClass(_prefix + 'firefox');  }
if((_is_safari)){    $('body').addClass(_prefix + 'safari');   }
if((_is_opera)){     $('body').addClass(_prefix + 'opera');    }

if((_is_explorer)&&(_is_explorer_9)){  	$('body').addClass(_prefix + 'msie-9'); 	}
if((_is_explorer)&&(_is_explorer_10)){  $('body').addClass(_prefix + 'msie-10'); 	}
if((_is_explorer)&&(_is_explorer_11)){  $('body').addClass(_prefix + 'msie-11'); 	}
/*---------------------------------------------------------*/
/*	SCROLL TO
/*---------------------------------------------------------*/
(function($){
	'use strict';

	$.fn.scrollTo = function(options){
		return this.each(function(){
			
			var _this = $(this),

					opt = $.extend({
							target 		: _this.attr('href'),
							duration 	: 800,
							offset 		: 0,
							easing 		: 'easeInOutCubic'
					}, options);

			if(!opt.target){
				opt.target = _this.data('target');
			}


			_this.on('click', function(e){
				e.preventDefault();

				if( $(opt.target).length > 0 ){
					$('html, body').animate({
						scrollTop: $(opt.target).offset().top + opt.offset,
						easing: opt.easing
					}, opt.duration);
				}//if

			});

		});
	}//scrollTo()

	// jQuery(document).ready(function(){
		jQuery('.scrollto').scrollto();
	// });

}(jQuery));
/*---------------------------------------------------------*/
/*	AJAX SUBMIT
/*---------------------------------------------------------*/
(function($){
	'use strict';

	$.fn.ajaxForm = function(options){
		return this.each(function(){

			var form = $(this);

			var settings = $.extend({
					data 				: '',
					urlBin 			: location.origin + '/assets/bin/sendmail.php',
					onSuccess 	: function(){ 
						alert('Form Submitted!')
					},
					type 				: 'POST'
			}, options);


			$.ajax({
				type: settings.type,
				url: settings.urlBin,
				data: settings.data,
				success: function(){
					settings.onSuccess;
				}
			});

		});
	}//ajaxForm()

}(jQuery));
/*---------------------------------------------------------*/
/*  OFF CANVAS
/*---------------------------------------------------------*/
(function($){
'use strict';

	var $html = $('html'),
			$body = $('body'),
			scrollpos = {x: window.pageXOffset, y: window.pageYOffset},
			arr = ['push', 'reveal'],
			offcanvas = {

				// SHOW
				show: function(element, anim){
					var element = $(element),
							inArr = $.inArray(String(window.offcanvasFx), arr),
							barWidth = element.outerWidth(),
							scrollpos = {x: window.pageXOffset, y: window.pageYOffset};

					window.offcanvasIn = true;
					window.pageYOffset = scrollpos.y;

					console.log(window.offcanvasPosition);
					if( window.offcanvasPosition != '' ){
						barWidth = -barWidth;
					}


					if( inArr > -1 ){
						$body.addClass('offcanvas-page');

						$body.css({
							'margin-left': barWidth,
							'width': window.innerWidth, 
							// 'height': window.innerHeight
						});

						$html.css('margin-top', scrollpos.y * -1);
					}

					element.addClass('in');
					$body.append('<div class="overlay offcanvas-overlay"/>');

					$('.offcanvas-overlay').on('click', function(){
						offcanvas.hide(element);
					});
				},


				// HIDE
				hide: function(element, anim){
					var element = $(element),
							scrollpos = {x: window.pageXOffset, y: window.pageYOffset};

					window.offcanvasIn = false;
					$body.addClass('offcanvas-page-close');
					element.removeClass('in');
					$('.offcanvas-overlay').detach();
					
					setTimeout(function(){
						$body.removeClass('offcanvas-page offcanvas-page-close');

						$body.css({
							'margin': '', 
							'width': '', 
							// 'height': ''
						});
						$html.css('margin-top', 0);	
						window.scrollTo(0, scrollpos.y);
					}, 500);
				},


				// INIT ELEMENT
				initElement: function(element){
					if( window.offcanvasIn == true ){
						offcanvas.hide(element);
					}else{
						offcanvas.show(element);
					}
				}

			};



	$(document).ready(function($){

		$('[data-offcanvas]').on('click', function(e){
			e.preventDefault();

			var el = $(this),
					target = el.data('target'),
					target = $(target),
					anim = el.data('anim'),
					data = el.data();

			if( data.offcanvasRight == '' ){
				window.offcanvasPosition = 'right';
				target.addClass('offcanvas-right');
			}else{
				window.offcanvasPosition = '';
				target.removeClass('offcanvas-right');
			}

			window.offcanvasFx = anim;
			

			setTimeout(offcanvas.initElement(target),300);
		});

	});


})(jQuery);



/*---------------------------------------------------------*/
/*  SOCIAL SHARE BUTTONS
/*---------------------------------------------------------*/
(function($){
	$.fn.socialShare = function(type){

		this.each(function(){

			var element = this;

			$(this).click(function(e){
				e.preventDefault();

				var winHeight = 200,
						winWidth = 450,
						winTop = (screen.height / 2) - (winHeight / 2),
						winLeft = (screen.width / 2) - (winWidth / 2),
						url = $(element).attr('href');

				if(type == 'facebook'){
					window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
				}else if(type == 'twitter'){
					window.open('https://twitter.com/share?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
				}else if(type == 'pinterest'){
					window.open('http://www.pinterest.com/pin/create/button/?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
				}else if(type == 'googleplus'){
					window.open('https://plus.google.com/share?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
				}else if(type == 'linkedin'){
					window.open('https://www.linkedin.com/cws/share?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
				}
			});

		});

	};//socialShare
}(jQuery));



/*---------------------------------------------------------*/
/*  GROWL - Alerts plugin
/*  https://github.com/ifightcrime/bootstrap-growl
/*---------------------------------------------------------*/
(function(){
	var $;

	$ = jQuery;

	$.nitroAlert = function(message, options){
		var _alert, css, offsetAmount;
		
		options = $.extend({}, $.nitroAlert.default_options, options);
		
		_alert = $('<div>');
		
		_alert.attr('class', 'nitro-alert alert fade');
		if( options.type ){
			_alert.addClass('alert-' + options.type);
		}

		if( options.allow_dismiss ){
			_alert.addClass('alert-dismissible');
			_alert.append('<button class="close" data-dismiss="alert" type="button"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
		}

		_alert.append(message);
		if( options.top_offset ){
			options.offset = {
				from: 'top',
				amount: options.top_offset
			};
		}

		offsetAmount = options.offset.amount;
		
		$('.nitro-alert').each(function(){
			return offsetAmount = Math.max(offsetAmount, parseInt($(this).css(options.offset.from)) + $(this).outerHeight() + options.stackup_spacing);
		});

		css = {
			'position': (options.container === 'body' ? 'fixed' : 'absolute'),
			'margin': 0,
			'z-index': '9999'
		};

		css[options.offset.from] = offsetAmount + 'px';

		_alert.css(css);
		if( options.width !== 'auto' ){
			_alert.css('width', options.width + 'px');
		}

		$(options.container).append(_alert);
		switch( options.align ){
			case 'center':
				_alert.css({
					'left': '50%',
					'margin-left': '-' + (_alert.outerWidth() / 2) + 'px'
				});
				break;
			case 'left':
				_alert.css('left', '20px');
				break;
			default:
				_alert.css('right', '20px');
		}

		setTimeout(function(){
			_alert.addClass('in');
		}, 200);

		if( options.delay > 0 ){
			setTimeout(function(){
				// return $(this).alert('close');
				_alert.alert('close');
			}, options.delay);
		}

		return _alert;
	};

	$.nitroAlert.default_options = {
		container: 'body',
		type: 'info', // info, success, warning, danger
		offset: {
			from: 'top',
			amount: 20
		},
		align: 'right',
		width: 250,
		autoHide: true,
		delay: 5000,
		allow_dismiss: true,
		stackup_spacing: 10
	};

}).call(this);




/*---------------------------------------------------------*/
/*  TILT
/*---------------------------------------------------------*/
(function($){
	$.fn.tilt = function(options){
		
		this.each(function(){

			var _this = $(this),

					opt = $.extend({
						wrapper: _this,
						perspective: 600,
						mouseLeave: true,
						perspective3D: true,
						scale: .97,
						transition: .3,
						item: '.tilt-item'
					}, options);



			(opt.wrapper).hover(function(_event){

				(opt.wrapper)
				.css({ 
					transformStyle: 'preserve-3d', 
					perspective: opt.perspective + 'px'
				});

				_this.find(opt.item).each(function(_index, _el){
					getParameters(_el, _event);

					$(_el).css({
						transition: opt.transition + 's',
						transformStyle: 'preserve-3d'
					});

				});

				setTimeout(function(){
					checkOver( opt.wrapper );
				}, 300);

			}, function(){

				if( opt.mouseLeave ){

					_this
					.css({'transformStyle': '', 'perspective': ''});

					_this
					.find(opt.item).each(function(_index, _el){

						$(_el).css({
							transformStyle: '',
							transform: ''
						});

					});

				}//if

			});



			function checkOver(){

				(opt.wrapper).on('mousemove', function(_event){
					
					_this.find(opt.item).each(function(_index, _el){
						getParameters(_el, _event);
					});//each

				});// mousemove

			}//checkOver()


			function getParameters(_el, _event){

				var offset = (opt.wrapper).offset();
				var w = parseInt( $(_el).width() );
				var h = parseInt( $(_el).height() );

				var relativeX = ( _event.pageX - offset.left );
				var relativeY = ( _event.pageY - offset.top );

				var xP = relativeX / w;
				var yP = relativeY / h;
				
				xP = ((xP - .5) * 10);
				yP = ((yP - .5) * 10);


				if(xP >= 0 && yP >= 0){
					setTransform(_el, 4, 4, 25, 25);
				}else if(xP < 0 && yP >= 0){
					setTransform(_el, -4, 4, 25, 5);
				}else if(xP < 0 && yP < 0){
					setTransform(_el, -4, -4, 5, 5);
				}else{
					setTransform(_el, 4, -4, 5, 25);
				}

			}//getParameters()





			function setTransform(obj, x, y, posX, posY){

				if( $(obj).data('offset') ){
					_translateZ = parseInt( $(obj).data('offset') );
				}else{
					_translateZ = 0;
				}

				if( $(obj).data('scale') ){
					_scale = $(obj).data('scale');
				}else{
					_scale = obj.scale;
				}


				if( $(obj).data('perspective') ){
					x = x * $(obj).data('perspective');
					y = y * $(obj).data('perspective');
					posY = posY + ($(obj).data('perspective') * 3);
					posX = posX + ($(obj).data('perspective') * 3);
				}

				
				if( opt.perspective3D ){
					$(obj).css({
						transform: 'scale('+ _scale +') translateZ('+ _translateZ +'px) translate('+ posX +'px, '+ posY +'px) rotateY('+ x +'deg) rotateX('+ y * -1 +'deg)'
					});
				}else{
					$(obj).css({
						transform: 'scale('+ _scale +') translateZ('+ _translateZ +'px) rotateY('+ x +'deg) rotateX('+ y * -1 +'deg)'
					});
				}//if

			}//setTransform()


			// Destroy
			// if( options === 'destroy' ){
				
			// }



		});//this

	};//tilt
}(jQuery));















(function($){
	$.fn.mouseMoveParallax = function(options){

		this.each(function(){

			var _this = $(this),

					opt = $.extend({
						wrapper: _this
					}, options)

					_window = $(window);


			_window.on('mousemove', function(_e){
				var _w = _window.width(),
						_h = _window.height(),
						_offsetX = 0.5 - _e.pageX / _w,
						_offsetY = 0.5 - _e.pageY / _h;


				_this.find('.mmp-item').each(function(i, _el){

					if( $(_el).data('offset') ){
						var _offset = parseInt( $(_el).data('offset') );
					}else{
						var _offset = 10;
					}

					if( $(_el).data('index') ){
						$(_el).css('z-index', parseInt( $(_el).data('index') ) );
					}

					var _translate = 'translate3d(' + Math.round(_offsetX * _offset) + 'px,' + Math.round(_offsetY * _offset) + 'px, 0px)';


					$(_el).css({
					'transformStyle': 'preserve-3d',
					'-webkit-transform': _translate,
					'transform': _translate,
					'moz-transform': _translate
					});
				});
			});//mousemove


			// DESTROY
			if( options === 'destroy' ){
				_window.unbind('mousemove');

				// _this.find('.mmp-item').each(function(_index, _el){
				// 	console.log($(_el));
				// 	// $(_el).css('');
				// });
			}

		});//this

	};//mouseMoveParallax
}(jQuery));






$(function(){
	//设置每个ul-slider的总宽度
	var slideWrapWidth = $('.pb-slider').width();
	$('.pb-slider .ul-slider').each(function(){
		var currentSlider = $(this);
		var totalWidth = 0;
		currentSlider.children('li').each(function(){
			totalWidth += $(this).width();
		});
		if( totalWidth > slideWrapWidth ){
			currentSlider.width(totalWidth);
		} else {
			var marginLeft = (slideWrapWidth- totalWidth)/2;
			currentSlider.css({marginLeft:marginLeft + 'px'});
		}
	});
	
	//判断是否要显示右边的箭头链接
	if($('.pb-slider .ul-slider').eq(0).width() > slideWrapWidth ){
		$('.pb-slider .button-right').show();
	}
	
	//设置初始caret的位置
	var firstRbLink = $('.roundedbottom a').eq(0);
	var firstRbLinkLeft = firstRbLink.position().left + firstRbLink.outerWidth(true)/2;
	$('.roundedbottom b.caret').css({left:firstRbLinkLeft+'px'});
	
	//设置分类链接click响应函数
	var ul_slider = $('.pb-slide .ul-slider');
	$('.roundedbottom a').click(function(){
		var currentElement = $(this);
		//忽略当前被选中的链接
		if(currentElement.hasClass('active'))
			return false;
		//为当前链接添加active类
		$('.roundedbottom a.page').removeClass('active');
		currentElement.addClass('active');
		//设置caret的left
		var left = currentElement.position().left + currentElement.outerWidth(true)/2;
		$('.roundedbottom b.caret').stop().animate({left:left+'px'},400);
		//获取当前链接的位置并设置相应的slider显示
		var pos = currentElement.prevAll('.page').length;
		ul_slider.filter(":visible").fadeOut(200,function(){
			ul_slider.eq(pos).css({left:'0px'}).fadeIn(200);
		});
		//判读是否显示两个的button
		if(ul_slider.eq(pos).width() > slideWrapWidth){
			$('.pb-slider .button-right').show();
		} else {
			$('.pb-slider .button-right').hide();
		}
		$('.pb-slider .button-left').hide();
	});
	
	//设置button单击响应函数
	$('.pb-slider .button-right').click(function(){
		var pos = $('.roundedbottom .active').prevAll('.page').length;
		currentSliderWidth = ul_slider.eq(pos).width();
		currentSliderLeft = parseInt(ul_slider.css('left'));
		if( currentSliderWidth + currentSliderLeft - slideWrapWidth > slideWrapWidth ){
			currentSliderLeft -= slideWrapWidth;
		} else {
			currentSliderLeft -= currentSliderWidth + currentSliderLeft - slideWrapWidth;
			$(this).hide();
		}
		ul_slider.eq(pos).animate({left:currentSliderLeft+"px"},400);
		$('.pb-slider .button-left').show();
	});
	$('.pb-slider .button-left').click(function(){
		var pos = $('.roundedbottom .active').prevAll('.page').length;
		currentSliderWidth = ul_slider.eq(pos).width();
		currentSliderLeft = parseInt(ul_slider.css('left'));
		if( currentSliderLeft + slideWrapWidth < 0 ){
			currentSliderLeft += slideWrapWidth;
		} else {
			currentSliderLeft = 0;
			$(this).hide();
		}
		ul_slider.eq(pos).animate({left:currentSliderLeft+"px"},400);
		$('.pb-slider .button-right').show();
	});

});
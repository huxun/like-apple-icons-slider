$(function(){
	//����ÿ��ul-slider���ܿ��
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
	
	//�ж��Ƿ�Ҫ��ʾ�ұߵļ�ͷ����
	if($('.pb-slider .ul-slider').eq(0).width() > slideWrapWidth ){
		$('.pb-slider .button-right').show();
	}
	
	//���ó�ʼcaret��λ��
	var firstRbLink = $('.roundedbottom a').eq(0);
	var firstRbLinkLeft = firstRbLink.position().left + firstRbLink.outerWidth(true)/2;
	$('.roundedbottom b.caret').css({left:firstRbLinkLeft+'px'});
	
	//���÷�������click��Ӧ����
	var ul_slider = $('.pb-slide .ul-slider');
	$('.roundedbottom a').click(function(){
		var currentElement = $(this);
		//���Ե�ǰ��ѡ�е�����
		if(currentElement.hasClass('active'))
			return false;
		//Ϊ��ǰ�������active��
		$('.roundedbottom a.page').removeClass('active');
		currentElement.addClass('active');
		//����caret��left
		var left = currentElement.position().left + currentElement.outerWidth(true)/2;
		$('.roundedbottom b.caret').stop().animate({left:left+'px'},400);
		//��ȡ��ǰ���ӵ�λ�ò�������Ӧ��slider��ʾ
		var pos = currentElement.prevAll('.page').length;
		ul_slider.filter(":visible").fadeOut(200,function(){
			ul_slider.eq(pos).css({left:'0px'}).fadeIn(200);
		});
		//�ж��Ƿ���ʾ������button
		if(ul_slider.eq(pos).width() > slideWrapWidth){
			$('.pb-slider .button-right').show();
		} else {
			$('.pb-slider .button-right').hide();
		}
		$('.pb-slider .button-left').hide();
	});
	
	//����button������Ӧ����
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
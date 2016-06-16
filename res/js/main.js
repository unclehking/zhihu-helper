
var currentTarget = {};

jQuery(function($){

	$("body").append('<div id="hkingView"></div>')

	$(document).on("dblclick",".zm-item-answer",function(){
		currentTarget.target = $(this);
		currentTarget.position = $(document).scrollTop();
		$("body").addClass('reading');
		$(this).addClass('readingOne').after($("#hkingView").show());
		$(document).scrollTop(0)
	});

	//home
	$(document).on("dblclick",".feed-item",function(){
		currentTarget.target = $(this);
		currentTarget.position = $(document).scrollTop();
		$("body").addClass('reading');
		$(this).addClass('readingOne').after($("#hkingView").show());
		$(document).scrollTop(0)
	});

	// search

	$(document).on("dblclick",".page-search .list .item",function(){
		currentTarget.target = $(this);
		currentTarget.position = $(document).scrollTop();
		$("body").addClass('reading');
		$(this).addClass('readingOne').after($("#hkingView").show());
		$(document).scrollTop(0)
	});

	$("#hkingView").click(function(){
		$("body").removeClass('reading');
		currentTarget.target.removeClass('readingOne');
		$(this).hide();
		$(document).scrollTop(currentTarget.position);
	});



});

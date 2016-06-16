//设置歌词背景图片
setLrcBg = (src,fe) =>{
	let t = fe.querySelector(".link-wrapper");
	if(!t.querySelector("img")){
		t.innerHTML = `<img src="${src}" />`;
	}else{
		t.querySelector("img").src = src;
	}
}


//双击进入“ktv”歌词模式
document.addEventListener('DOMContentLoaded', ()=>{
	let lrcTarget = document.querySelector("#lrcCol");
	if(!lrcTarget){
		return;
	}
	let tImg = lrcTarget.querySelector(".album a img");
	tImg.addEventListener('load', ()=>{
		setLrcBg(tImg.src,lrcTarget);
	});
	lrcTarget.addEventListener('dblclick', ()=>{
		if(document.webkitFullscreenElement != null){
			document.webkitCancelFullScreen();
		}else {
			lrcTarget.webkitRequestFullScreen();
		};
	});
});

var currentTarget = {};

jQuery(function($){

	$("body").append('<div id="hkingView"></div>')

	$(document).on("dblclick",".zm-item-answer",function(){
		currentTarget.target = $(this);
		currentTarget.position = $(document).scrollTop();
		$("body").addClass('reading');
		$(this).addClass('readingOne').after($("#hkingView").show());
		$(document).scrollTop(0)
	})

	$("#hkingView").click(function(){
		$("body").removeClass('reading');
		currentTarget.target.removeClass('readingOne');
		$(this).hide();
		$(document).scrollTop(currentTarget.position);
		console.log(currentTarget.target.find("button.item-collapse"));
		// $("button.item-collapse").css({
		// 	"left":"100px"
		// })
	});



});

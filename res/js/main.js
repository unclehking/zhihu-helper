
var reading = {
	// 退出阅读模式
	close(){
		$("body").removeClass('reading').append($("#hkingView").hide());
		this.target.removeClass('readingOne');
		$(document).scrollTop(this.position);
	},
	targetArr:[],  //所有需要绑定阅读事件的jQuery选择器(array)
	targetStr:"",  //当前页面需要绑定阅读事件的jQuery选择器(string)
	target:null,   //进入阅读模式的当前对象
	position:null  //进入阅读模式的当前对象的原始Y坐标
};

jQuery(function($){

	// 检查版本更新
	if(!sessionStorage.getItem("isFirst")){
		sessionStorage.setItem("isFirst", true);
		chrome.runtime.sendMessage({flag: "checkVersion"}, function(response){});
	}

	//阅读模式
	$("body").append('<div id="hkingView"></div>');
	reading.targetArr = [
		"#zh-question-answer-wrap .zm-item-answer",//所有答案
		"#js-explore-tab .feed-item",// 发现
		"#zh-profile-activity-page-list .zm-item",// 个人主页
		"#zh-list-answer-wrap .zm-item",//收藏
		"#js-home-feed-list .feed-item",//home
		"#zh-topic-feed-list .feed-item",// 话题
		".page-search .list .item",// search
		"#zh-profile-answer-list .zm-item", //xx的回答
		"#zh-question-collapsed-wrap .zm-item-answer", //被折叠的回答
		"#zh-profile-post-list > .zm-item" //xx发表的文章
	];
	reading.targetStr = reading.targetArr.filter(function(e){return $(e.split(" ")[0]).length > 0;}).join(":not(.readingOne),");
	!!reading.targetStr && $(document).on("dblclick",reading.targetStr,function(){
		reading.target = $(this);
		reading.position = $(document).scrollTop();
		$("body").addClass('reading');
		$(this).addClass('readingOne').after($("#hkingView").show());
		$(document).scrollTop(0);
		return false;
	});

	// 退出阅读模式
	$("#hkingView").click(function(){
		reading.close();
	});
	$(document).keydown(function(e){
		if(e.keyCode == 27){
			reading.close();
		}
	})

});

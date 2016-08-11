
var reading = {
	targetArr:[],  //所有需要绑定阅读事件的jQuery选择器(array)
	targetStr:"",  //当前页面需要绑定阅读事件的jQuery选择器(string)
	target:null,   //进入阅读模式的当前对象
	position:null,  //进入阅读模式的当前对象的原始Y坐标
	// 退出阅读模式
	close(){
		if(this.isReading()){
			$("body").removeClass('reading');
			this.target.removeClass('readingOne');
			$(document).scrollTop(this.position);
		};
	},
	//左箭头按键阅读上一条回答
	goLeft(){
		if(!this.isReading()){return false;}
		let t = this.target,prev = t.prev();
		if(prev.length){
			prev.addClass("readingOne");
			this.target = prev;
			t.removeClass("readingOne");
		}
	},
	//右箭头按键阅读下一条回答
	goRight(){
		if(!this.isReading()){return false;}
		let t = reading.target,next = t.next();
		if(next.length){
			next.addClass("readingOne");
			reading.target = next;
			t.removeClass("readingOne");
		}
	},
	//是否处于阅读状态
	isReading(){
		return $("body").hasClass("reading") ? true : false;
	},
	init(){
		var _this = this;
		// 检查版本更新
		if(!sessionStorage.getItem("isFirst")){
			sessionStorage.setItem("isFirst", true);
			chrome.runtime.sendMessage({flag: "checkVersion"}, function(response){});
		}
		//阅读模式
		this.targetArr = [
			"#zh-question-answer-wrap .zm-item-answer",//所有答案
			"#js-explore-tab .feed-item",// 发现
			"#zh-profile-activity-page-list .zm-item",// 个人主页
			"#zh-list-answer-wrap .zm-item",//收藏
			"#js-home-feed-list .feed-item",//home
			"#zh-topic-feed-list .feed-item",// 话题
			".page-search .list .item",// search
			"#zh-profile-answer-list .zm-item", //某人的回答
			"#zh-question-collapsed-wrap .zm-item-answer", //被折叠的回答
			"#zh-profile-post-list > .zm-item" //某人发表的文章
		];
		this.targetStr = this.targetArr.filter(function(e){return $(e.split(" ")[0]).length > 0;}).join(":not(.readingOne),");
		!!this.targetStr && $(document).on("dblclick",this.targetStr,function(){
			_this.target = $(this);
			_this.position = $(document).scrollTop();
			$("body").addClass('reading');
			$(this).addClass('readingOne');
			$(document).scrollTop(0);
			return false;
		});
		// 退出阅读模式
		$(document).click(function(){
			_this.close();
		});
		$(document).on("click",".readingOne , .zm-light-box-x1 , .zh-backtotop",function(e){
			return false;
		});
		$(document).on("click","#zm-light-box-x2 a",function(e){
			window.open(this.href);
		});

		$(document).keydown(function(e){
			switch(e.keyCode){
				case 27: //ESC退出阅读
					_this.close();
					break;
				case 37: //左箭头按键阅读上一条回答
					_this.goLeft();
					break;
				case 39: //右箭头按键阅读下一条回答
					_this.goRight();
					break;
			}
		});
	}
};

jQuery(function($){
	reading.init();
});


const url="www.zhihu.com";
var app = angular.module("App",[]);
app.controller("popup",function($scope,$http,$interval){
	$scope.goWechat = function(){
		chrome.tabs.getAllInWindow(null, fuckBat = tabs =>{
			for(var t of tabs){
				if (t.url.match(url)) {
					fuckBat.bTab = true;
					chrome.tabs.update(t.id, {selected:true});
					break;
				}
			}
			!fuckBat.bTab && chrome.tabs.create({"url":`https://${url}`, "selected":true});
		});
	}
	//打赏
	$scope.pay = {
		index:0
	}
});





/*HKing 2016-03-10*/
const version = "1.2";
const url="d3d3LnpoaWh1LmNvbQ==";
chrome.browserAction.onClicked.addListener((tab) =>{
	chrome.tabs.getAllInWindow(null, fuckBat = tabs =>{
		for(var t of tabs){
			if (t.url.match(atob(url))) {
				fuckBat.bTab = true;
				chrome.tabs.update(t.id, {selected:true});
				break;
			}
		}
		!fuckBat.bTab && chrome.tabs.create({"url":`https://${atob(url)}`, "selected":true});
	});
});


// 版本更新检查
function checkVersion(){
	var xhr = new XMLHttpRequest();
	xhr.open ('GET','https://raw.githubusercontent.com/unclehking/zhihu-material-design-theme/master/version.json');
	xhr.send();
	xhr.onreadystatechange = function (){
	    if ( xhr.readyState == 4 && xhr.status == 200 ){
			if(JSON.parse(xhr.responseText).version != version){
				notify();
			}
	    }
	};　
	function notify(){
		var opt = {
	        type: "list",
	        title: "知乎MD主题扩展有更新！",
	        message: "msg",
	        iconUrl: "res/pic/icon_128.png",
	        items: [{ title: "", message: "点击下载最新版本！"}]
		}
	  	chrome.notifications.create('',opt,function(id){
			setTimeout(function(){
				chrome.notifications.clear(id,function(){});
			},8000);
		});

	};
	chrome.notifications.onClicked.addListener(function(id){
		chrome.downloads.download(
			{
				url:"https://raw.githubusercontent.com/unclehking/zhihu-material-design-theme/master/zhihu-material-design-theme.crx",
				filename:'zhihu-material-design-theme.crx'
			},
			function(id){
				chrome.tabs.create({"url":"chrome://extensions/", "selected":true});
			}
		);
	});
}

chrome.runtime.onMessage.addListener(
	f_nancy = (request, sender, sendResponse) =>{
		if(!f_nancy.isFirst){
			checkVersion();
			f_nancy.isFirst = true;
		}
	}
);

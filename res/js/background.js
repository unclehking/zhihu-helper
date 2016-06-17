/*HKing 2016-03-10*/
const version = "1.01";
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



var xhr = new XMLHttpRequest();
xhr.open ('GET','https://raw.githubusercontent.com/unclehking/zhihu-material-design-theme/master/version.json');
xhr.send();
xhr.onreadystatechange = function (){
    if ( xhr.readyState == 4 && xhr.status == 200 ){
		if(JSON.parse(xhr.responseText).version == version){
			console.log(xhr.responseText);
		}else{
			//
		}
    }
};　

function notify(){
	var opt = {
        type: "list",
        title: "知乎MD主题扩展有更新！",
        message: "msg",
        iconUrl: "res/pic/icon_128.png",
        items: [
			{ title: "1.", message: "点击进入下载最新版本！"}
		]
	}
  	chrome.notifications.create('',opt,function(id){

	});

}

notify();

chrome.notifications.onClicked.addListener(function(id){
	window.open("https://github.com/unclehking/zhihu-material-design-theme");
});

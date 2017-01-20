const $=require('jquery');
const pf=require('./postconfig.js');


var url=encodeURIComponent(window.location.href.split('#')[0]) ;
$.post({
	url:pf.u+'SignTrueInfo/',
	data:pf.d+',"Address":"'+url+'"}',
	success:function(e){
		var v=JSON.parse(e);
		if(v.ResCode==='10000'){
			appId=v.Data.appId;
			nonceStr=v.Data.nonceStr;
			rawString=v.Data.rawString;
			signature=v.Data.signature;
			timestamp=v.Data.timestamp;

			wx.config({
				debug: false,
				appId: appId,
				timestamp: timestamp,
				nonceStr: nonceStr,
				signature: signature,
				jsApiList: [
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'onMenuShareQZone'
				]
			});


		}
	}
})




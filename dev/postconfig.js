const md5=require('md5');

var m=md5(Math.floor(Math.random()*100000)); 
var c=md5('rPC1TrupTxL2M0GvTjJvmp6t0HrDex0k'+m);
var dn='{"NonceStr":"'+m+'","Sign":"'+c+'"';
var u='https://www.moomtv.tv/shequ/?/request/';



module.exports={
	u:u,
	d:dn,
	m:m,
	c:c
}
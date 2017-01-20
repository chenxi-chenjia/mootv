const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');
const focusbtn=require('./focusbtn.jsx');
const loading=require('./loading.jsx');
import {Link} from 'react-router';

// const wxsdk=require('./wxsdk.js');





class week extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:{},
			user:{},
			loading:false,
			id:'',
			uid:''
		}
		this.showloading=this.showloading.bind(this);
	}
	componentWillMount(){
		var id=this.props.params.id.substring(1);
		var self=this;
		var Userid='';
		if(localStorage.moomtvUser){
			Userid=JSON.parse(localStorage.getItem("moomtvUser")).UserID;
		}
		var u=pf.u+'GetWorkStarts/';
		var d=pf.d+',"Userid":"'+Userid+'","ID":"'+id+'"}';
		$.post({
			url:u,
			data:d,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					var uid=v.Data[0].User.UserID;
					self.setState({
						data:v.Data[0],
						user:v.Data[0].User,
						uid:uid
					})
					var appId,nonceStr,rawString,signature,timestamp;
	

					var us=window.location.href;
					// $.post({
					// 	url:pf.u+'SignTrueInfo/',
					// 	data:pf.d+',"Address":"'+us+''+'"}',
					// 	success:function(e){
					// 		var v=JSON.parse(e);
					// 		if(v.ResCode==='10000'){
					// 			appId=v.Data.appId;
					// 			nonceStr=v.Data.nonceStr;
					// 			rawString=v.Data.rawString;
					// 			signature=v.Data.signature;
					// 			timestamp=v.Data.timestamp;

					// 			wx.config({
					// 				debug: false,
					// 				appId: appId,
					// 				timestamp: timestamp,
					// 				nonceStr: nonceStr,
					// 				signature: signature,
					// 				jsApiList: [
					// 					'onMenuShareTimeline',
					// 					'onMenuShareAppMessage',
					// 					'onMenuShareQQ',
					// 					'onMenuShareWeibo',
					// 					'onMenuShareQZone'
					// 				]
					// 			});


					// 		}
					// 	}
					// })

					
					wx.ready(function () {
						wx.onMenuShareAppMessage({
						      title: v.Data[0].Title,
						      desc: v.Data[0].TitleFu,
						      link: us,
						      imgUrl: v.Data[0].Banner,
						      trigger: function (res) {
						       
						      },
						      success: function (res) {
						        // alert('已分享');
						      },
						      cancel: function (res) {
						        //alert('已取消');
						      },
						      fail: function (res) {
						        //alert(JSON.stringify(res));
						      }
						});
						wx.onMenuShareTimeline({
						    title: v.Data[0].Title,
						      desc: v.Data[0].TitleFu,
						      link: us,
						      imgUrl: v.Data[0].Banner,
						      trigger: function (res) {
						       
						      },
						      success: function (res) {
						        // alert('已分享');
						      },
						      cancel: function (res) {
						        //alert('已取消');
						      },
						      fail: function (res) {
						        //alert(JSON.stringify(res));
						      }
						});

						wx.onMenuShareQQ({
						   title: v.Data[0].Title,
						      desc: v.Data[0].TitleFu,
						      link: us,
						      imgUrl: v.Data[0].Banner,
						      trigger: function (res) {
						       
						      },
						      success: function (res) {
						        // alert('已分享');
						      },
						      cancel: function (res) {
						        //alert('已取消');
						      },
						      fail: function (res) {
						        //alert(JSON.stringify(res));
						      }
						});
						wx.onMenuShareWeibo({
						    title: v.Data[0].Title,
						      desc: v.Data[0].TitleFu,
						      link: us,
						      imgUrl: v.Data[0].Banner,
						      trigger: function (res) {
						       
						      },
						      success: function (res) {
						        // alert('已分享');
						      },
						      cancel: function (res) {
						        //alert('已取消');
						      },
						      fail: function (res) {
						        //alert(JSON.stringify(res));
						      }
						});

						wx.onMenuShareQZone({
						    title: v.Data[0].Title,
						      desc: v.Data[0].TitleFu,
						      link: us,
						      imgUrl: v.Data[0].Banner,
						      success: function (res) {
						        // alert('已分享');
						      }
						});


					});
						

				}
			}
		})
	}
	//显示loading页面
	showloading(){
		this.setState({
			loading:true
		})
	}

	offload(){
		this.setState({
			loading:false
		})
	}
	render(){
		var bannerUrl='url('+this.state.data.Banner+')';
		var article=this.state.data.Content;
		var title=this.state.data.Title;
		var titlefu=this.state.data.TitleFu;
		var user=this.state.user;
		var height=$(window).height()/2;
		var t='others/:'+this.state.uid;
		return(
			<div id="weekly">
				<div className="topBox">
					<div className="banner"  style={{backgroundImage:bannerUrl,height:height+'px'}}></div>
					<div className="avater" style={{backgroundImage:'url('+user.UserHeader+'?imageView2/1/w/80/h/80/interlace/0/q/100)'}} >
						<Link to={t}></Link>
					</div>
				</div>
				<div className="content">
					<div className="title">
						<h2>{title}</h2>
						<h3>{titlefu}</h3>
					</div>
					<div className='inCentent' dangerouslySetInnerHTML={{__html:article}}>
					</div>
				</div>
				<div className="bottomBox">
					<div className="avaterBox">
						<div className="header" style={{backgroundImage:'url('+user.UserHeader+'?imageView2/1/w/200/h/200/interlace/0/q/100)'}}></div>
					</div>
					<div className="name">
						<h4>{user.UserNickName}</h4>
					</div> 
					<div className="information">
						<h4><span className="sex">{user.UserSex}</span><span className="age">{user.UserAge}</span><span className="city">{user.UserPro}{user.UserCity}</span></h4>
					</div>
					<div className="foucusarea">
						<focusbtn.btn data='0' hasUser={this.showloading} id={this.state.uid} />
					</div>
				</div>
				<div className="footerBox">
					<h3>关于MOOMTV之星</h3>
					<h4>我们每周一次，评选以为精英少年，推进给你。</h4>
				</div>
				<loading.loading offload={this.offload} loading={this.state.loading} />
			</div>
		)
	}
}




module.exports={
	week:week
}
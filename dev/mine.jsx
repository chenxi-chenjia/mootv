const React=require('react');
const Footer=require('./footer.jsx');
const select=require('./selectDynamic.jsx')
const $=require('jquery');
const loading=require('./loading.jsx');
const pf=require('./postconfig.js');
const selectDynamic=require('./selectDynamic.jsx');
import {Link} from 'react-router';

class Mine extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading:false,
			data:[],
			list:[],
			page:1,
			ajaxflag:true,
			Userid:'',
			choseAvater:''
		}

		this.offload=this.offload.bind(this);
		this.showloading=this.showloading.bind(this);
		this.addajax=this.addajax.bind(this);
		this.deleteMyComment=this.deleteMyComment.bind(this);
		this.changeAvater=this.changeAvater.bind(this);
	}
	

	//修改图像
	changeAvater(e){
		if(localStorage.moomtvUser){
			var self=this;
			var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
	        for (var i = 0, len = files.length; i < len; ++i) {
	        	if(i<9){
	        		 var file = files[i];
		            if (url) {
		                src =url.createObjectURL(file);
		            } else {
		                src = e.target.result;
		            }
	        	}
			}
			var avater = new FormData();
	        //为FormData对象添加数据
	        avater.append('file',$("#uploaderInput")[0].files[0]);
			var Userid=JSON.parse(localStorage.getItem('moomtvUser')).UserID;
	        $.post({
				url:pf.u+'uploadfile/UploadHeader/NonceStr-'+pf.m+'__Sign-'+pf.c+'__Userid-'+Userid,
				data:avater,
				cache: false,
	            contentType: false,       
	            processData: false,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						self.setState({
							choseAvater:src
						})
						$.post({
							url:pf.u+'GetUserIndex/',
							data:pf.d+',"Uid":"'+Userid+'","Userid":"'+Userid+'"}',
							success:function(res){
								var vs=JSON.parse(res);
								if(vs.ResCode==='10000'){
									localStorage.moomtvUser=JSON.stringify(vs.Data[0]);
								}
							}
						})
					}
				}
			})
		}
			
	}

	//删除判断加载数量信息
	deleteMyComment(e){
		if(e){
			var self=this;
			var Userid=JSON.parse(localStorage.moomtvUser).UserID;
			var u2=pf.u+'GetContentList/';
			var d2=pf.d+',"CateID":"'+Userid+'","page":"1","type":"mine","Userid":"'+Userid+'"}';
			$.post({
				url:u2,
				data:d2,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						v.Data.forEach((m)=>{
							m.UserInfo.IsFocus='1';
						})
						var flag=true;
						if(v.Data.length<5){
							flag=false;
						}
						self.setState({
							list:v.Data,
							ajaxflag:flag
						})
					}else {
						self.setState({
							list:[],
							ajaxflag:false
						})
					}
				}
			})
		}
	}

	componentWillMount(){
		var self=this;
		if(localStorage.moomtvUser){
			var Userid=JSON.parse(localStorage.moomtvUser).UserID;
			this.setState({
				Userid:Userid
			})
			// ajax
			var u=pf.u+'GetUserIndex/';
			var d=pf.d+',"Uid":"'+Userid+'","Userid":"'+Userid+'"}';
			$.post({
				url:u,
				data:d,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						self.setState({
							data:v.Data,
						})
					}
				}
			})
			//下列表信息
			var u2=pf.u+'GetContentList/';
			var d2=pf.d+',"CateID":"'+Userid+'","page":"1","type":"mine","Userid":"'+Userid+'"}';
			$.post({
				url:u2,
				data:d2,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						v.Data.forEach((m)=>{
							m.UserInfo.IsFocus='1';
						})
						var flag=true;
						if(v.Data.length<5){
							flag=false;
						}
						self.setState({
							list:v.Data,
							ajaxflag:flag
						})
					}else {
						self.setState({
							list:[],
							ajaxflag:false
						})
					}
				}
			})
		}else{
			this.setState({
				loading:true
			})
		}
	}
	

	//点击加载更多
	addajax(){
		if(this.state.ajaxflag){
			var user=JSON.parse(localStorage.moomtvUser)
				this.setState({
					Userid:user.UserID,
					hasUser:true
					
				})
			var Userid=this.state.Userid;
			var page=this.state.page+1;
			var d=pf.d+',"CateID":"'+Userid+'","page":"'+page+'","type":"mine","Userid":"'+Userid+'"}';
			var u=pf.u+'GetContentList/';
			var self=this;
			var data=this.state.list;
			$.post({
				url:u,
				data:d,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						v.Data.forEach((m)=>{
							m.UserInfo.IsFocus='1';
							data.push(m);
						})
						var flag=true;
						if(v.Data.length<5){
							flag=false;
						}
						self.setState({
							list:data,
							page:page,
							ajaxflag:flag
						})
					}else {
						self.setState({
							ajaxflag:false
						})
					}
				}
			})
		}
	}

	//loading页面显示
	showloading(e){
	}

	offload(e){
		var self=this;
		this.setState({
			loading:e
		})
		var Userid=JSON.parse(localStorage.moomtvUser).UserID;
		// ajax
		var u=pf.u+'GetUserIndex/';
		var d=pf.d+',"Uid":"'+Userid+'","Userid":"'+Userid+'"}';
		$.post({
			url:u,
			data:d,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					self.setState({
						data:v.Data
					})
				}
			}
		})
		//下列表信息
		var u2=pf.u+'GetContentList/';
		var d2=pf.d+',"CateID":"'+Userid+'","page":"1","type":"mine","Userid":"'+Userid+'"}';
		$.post({
			url:u2,
			data:d2,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					self.setState({
						list:v.Data
					})
				}
			}
		})

	}
	
	render(){
		//用户信息
		var data=this.state.data;
		var dl=data.map((v,i)=>{
			var bg=this.state.choseAvater?'url('+this.state.choseAvater+')':'url('+ v.UserHeader+'?imageView2/1/w/200/h/200/interlace/0/q/100)';
			return(
				<div className="mineTop" key={i} >
					<div className="mineFrist">
						<div className="informationBackgroued">
							<div className="myAvater" style={{backgroundImage:bg}}> <input id="uploaderInput" type="file" accept="image/*" onChange={this.changeAvater}/></div>
							<div className="myName"><Link to='seting' activeStyle={{color:'#fff'}}> {v.UserNickName}</Link></div>
						</div>
						<div className="mineData">
							<div className="mineDataLis">
								<div className="mineBox">
									<div className="praiseNum">{v.UserZans}</div>
									<span className="praise">赞</span>
								</div>
								<span className="discription">累计赞数</span>
							</div>
							<div className="mineDataLis">
								<div className="mineBox levelBox">
									<div className="levelNum">{v.UserLevel.substring(2)}</div>
									<span className="level">Lv</span>
								</div>
								<span className="discription">成长等级</span>
							</div>
						</div>
					</div>
					<ul className="mineBtn">
						
					</ul>	
				</div>
			)
		})
		

		//判断是否可以加载
		var ac=this.state.ajaxflag?'addajax':'addajax off';
		var ajaxshow=this.state.ajaxflag?'点击加载更多':'没有更多数据';

		return(
			<div id='mine'>
				{dl}
				<selectDynamic.Select  hasUser={this.showloading} data={this.state.list} isDelete='true' deleteMyComment={this.deleteMyComment} />
				<Footer.Footer/>
				<loading.loading offload={this.offload} loading={this.state.loading} />
				<div className={ac}
				onTouchEnd={this.addajax}
				>{ajaxshow}</div>
			</div>
			
		)
	}
}


module.exports={
	Mine:Mine
}
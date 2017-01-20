//详情页

const React=require('react');
const $=require('jquery');
const loading=require('./loading.jsx');
const thumbUp=require('./thumbUparea.jsx');
const commentarea=require('./commentarea.jsx');
const focusarea=require('./focusarea.jsx');
const pf=require('./postconfig.js');
const selectImg=require('./select-img.jsx');
const content=require('./contentarea.jsx');
const Input=require('./input.jsx');
const commentList=require('./commentlist.jsx');


import {Link} from 'react-router';


class foundSecond extends React.Component{
	constructor(props){
		super(props);
		this.state={
			Userid:'',
			hasUser:true,
			data:[],
			num:'',
			loading:false,
			cdata:[],
			id:'',
			ajax:'点击加载更多',
			ajaxflag:true,
			page:1
		}
		this.showloading=this.showloading.bind(this);
		this.offload=this.offload.bind(this);
		this.add=this.add.bind(this);
		this.addajax=this.addajax.bind(this);
		this.refreshDiclis=this.refreshDiclis.bind(this);
	}


	refreshDiclis(e){
		var self=this;
		var id=this.props.params.id.substring(1);
		if(localStorage.moomtvUser){
			var user=JSON.parse(localStorage.moomtvUser)
			var Userid=user.UserID;
		}else{
			var Userid=this.state.Userid;
		}
		$.post({
			url:pf.u+'GetDisList/',
			data:pf.d+',"ID":"'+id+'","Userid":"'+Userid+'","page":"1"}',
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					self.setState({
						cdata:v.Data
					})
				}else{
					self.setState({
						cdata:[]
					})
				}
			}
		})
	}
	

	//点击加载更多
	addajax(){
		if(this.state.ajaxflag){
			var self=this;
			var id=this.props.params.id.substring(1);
			var u=pf.u+'GetContentDetail/';
			if(localStorage.moomtvUser){
				var user=JSON.parse(localStorage.moomtvUser)
				var Userid=user.UserID;
			}else{
				var Userid=this.state.Userid;
			}
			
			var page=this.state.page+1;
			$.post({
				url:pf.u+'GetDisList/',
				data:pf.d+',"ID":"'+id+'","Userid":"'+Userid+'","page":"'+page+'"}',
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						var flag=true;
						if(v.Data.length<10){
							flag=false;
						}
						var arr=self.state.cdata;
						v.Data.forEach((m)=>{
							arr.push(m);
						})
						self.setState({
							cdata:arr,
							page:page,
							ajaxflag:flag
						})
					} else{
						self.setState({
							ajaxflag:false
						})
					}
				}
			})
		}
	}


	//评论
	add(e){
		if(e.flag===1){
			var data=this.state.cdata;
			var user=JSON.parse(localStorage.moomtvUser);
			var obj={
				Content:e.data,
				Dateline:'刚刚',
				userinfo:user
			}
			data.unshift(obj);
			this.setState({
				num:this.state.num+1,
				cdata:data
			})
		}
	}
	//loading
	showloading(e){
		this.setState({
			loading:e
		})
	}
	offload(e){
		this.setState({
			loading:false
		})
	}

	componentWillMount(){
		var self=this;
		var id=this.props.params.id.substring(1);
		var u=pf.u+'GetContentDetail/';
		if(localStorage.moomtvUser){
			var user=JSON.parse(localStorage.moomtvUser)
			var Userid=user.UserID;
		}else{
			var Userid=this.state.Userid;
		}
		var d=pf.d+',"ID":"'+id+'","Userid":"'+Userid+'"}';
		$.post({	
			url:u,
			data:d,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					var arr=[];
					var num=v.Data.CommentsCount;
					arr.push(v.Data);
					self.setState({
						data:arr,
						num:num,
						id:id
					})
				}else{
					self.setState({
						data:[]
					})
				}
			}
		})
		$.post({
			url:pf.u+'GetDisList/',
			data:pf.d+',"ID":"'+id+'","Userid":"'+Userid+'","page":"1"}',
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					self.setState({
						cdata:v.Data
					})
				}else{
					self.setState({
						cdata:[]
					})
				}
			}
		})
	}
	render(){
		var data=this.state.data;
		var lis=data.map((v)=>{
			//id
			var id = v.ID;
			
			//点赞区域传参
			var thumbUpData={
				ZanList:v.ZanList,
				Is_Zan:v.Is_Zan,
				ZanCount:v.ZanCount,
				Topics:v.Topics
			}

			//关注区域传参
			var focusData={
				UserHeader:v.UserInfo.UserHeader,
				IsFocus:v.UserInfo.IsFocus,
				Topics:v.Topics,
				UserVerify:v.UserInfo.UserVerify,
				UserNickName:v.UserInfo.UserNickName,
				UserLevel:v.UserInfo.UserLevel,
				Time:v.Time,
				id:v.UserInfo.UserID
			}
			

			//评论内容区传参
			var contentData={
				Comments:v.Comments,
			}

			//图片区传参
			var imgData={
				Is_Pic:v.Is_Pic,
				PicList:v.PicList
			}
			return(
				<div key={v.ID} className='Select' >
					<focusarea.focus id={v.ID} data={focusData} hasUser={this.showloading} Userid={v.UserInfo.UserID} IsRecommend={this.state.data[0].IsRecommend} passiveUserid={this.state.data[0].UserInfo.UserID} />
					<div className="select-title">
						<h4>
							<span>{v.teamName}</span>
							{v.Content}
						</h4>
					</div>
					<selectImg.img id={id} data={imgData} showOriginalImage='true' />
					<thumbUp.thumbUp id={id} data={thumbUpData} hasUser={this.showloading} />
					<div className="praiseNum" style={{display:(this.state.num<1?'none':'block')}} >
						<span>共 {this.state.num} 条评论</span>
					</div>
					<commentList.list data={this.state.cdata} hasUser={this.showloading} id={v.ID} refreshDiclis={this.refreshDiclis} />
					<Input.input hasUser={this.showloading} add={this.add}  id={this.state.id} />
				</div>
			)
		})
		var ajaxshow=this.state.ajaxflag?'点击加载更多':'没有更多数据';
		var ac=this.state.ajaxflag?'addajax':'addajax off';
		return(
			<div id='foundSecond'>
				<div style={{display:(this.state.loading?'none':'block')}} >
					{lis}
					<div className={ac}
					onClick={this.addajax}
					>{ajaxshow}</div>
					<div className="Return">
						<Link to='/'></Link>
					</div>

				</div>
					
				<loading.loading offload={this.offload} loading={this.state.loading} />
			</div>
		)
	}
}


module.exports={
	foundSecond:foundSecond
}
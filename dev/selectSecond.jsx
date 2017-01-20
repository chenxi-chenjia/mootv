const React=require('react');
const Footer=require('./footer.jsx');
const selectDynamic=require('./selectDynamic.jsx');
const $=require('jquery');
const pf=require('./postconfig.js');
const loading=require('./loading.jsx');
const focusBtn=require('./focusbtn.jsx');
import {Link} from 'react-router';

class SelectSecond extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[],
			show:true,
			loading:false,
			titleData:[],
			Userid:'',
			page:1,
			ajaxflag:true
		}


		this.hotMessage=this.hotMessage.bind(this);
		this.newsMessage=this.newsMessage.bind(this);
		this.offload=this.offload.bind(this);
		this.showloading=this.showloading.bind(this);
		this.addajax=this.addajax.bind(this);
	}
	componentWillMount(){
		if(localStorage.moomtvUser){
			var user=JSON.parse(localStorage.moomtvUser)
			this.setState({
				Userid:user.UserID,
				hasUser:true,
				loading:false
			})
			var Userid=user.UserID;
		}else{
			var Userid=this.state.Userid;
		}

		//数组数据
		var CateID=this.props.params.id.substring(1);
		var page=1;
		var type='topic-hot';
		var d=pf.d+',"CateID":"'+CateID+'","page":"'+page+'","type":"'+type+'","Userid":"'+Userid+'"}';
		var u=pf.u+'GetContentList/';
		var self=this;
		$.post({
			url:u,
			data:d,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					var flag=true;
					if(v.Data.length<5){
						flag=false;
					}
					self.setState({
						data:v.Data,
						ajaxflag:flag
					})
				}
			}
		})


		//主题数据
		var u2=pf.u+'GetTopicContent/';
		var ID=CateID;
		var d2=pf.d+',"ID":"'+ID+'","Userid":"'+Userid+'"}';
		$.post({
			url:u2,
			data:d2,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					self.setState({
						titleData:v.Data,
						Userid:Userid
					})
				}
			}
		})
	}

	//注册页面显示
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
	

	// 热门和最新列表
	hotMessage(){
		if(localStorage.moomtvUser){
			var user=JSON.parse(localStorage.moomtvUser)
			this.setState({
				Userid:user.UserID,
				hasUser:true,
				loading:false,
				page:1,
				ajax:'点击加载更多',
				ajaxflag:true
				
			})
			var Userid=user.UserID;
		}else{
			var Userid=this.state.Userid;
		}

		//数组数据
		var CateID=this.props.params.id.substring(1);
		var page=1;
		var type='topic-hot';
		var d=pf.d+',"CateID":"'+CateID+'","page":"'+page+'","type":"'+type+'","Userid":"'+Userid+'"}';
		var u=pf.u+'GetContentList/';
		var self=this;
		$.post({
			url:u,
			data:d,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					var flag=true;
					if(v.Data.length<5){
						flag=false;
					}
					self.setState({
						data:v.Data,
						ajaxflag:flag
					})
				}else{
					self.setState({
						data:[]
					})
				}
			}
		})


		this.setState({
			show:true
		})
	}
	newsMessage(){
		if(localStorage.moomtvUser){
			var user=JSON.parse(localStorage.moomtvUser)
			this.setState({
				Userid:user.UserID,
				hasUser:true,
				loading:false,
				page:1,
				ajax:'点击加载更多',
				ajaxflag:true
			})
			var Userid=user.UserID;
		}else{
			var Userid=this.state.Userid;
		}
		var CateID=this.props.params.id.substring(1);
		var page=1;
		var type='topic-new';
		var d=pf.d+',"CateID":"'+CateID+'","page":"'+page+'","type":"'+type+'","Userid":"'+Userid+'"}';
		var u=pf.u+'GetContentList/';
		var self=this;
		$.post({
			url:u,
			data:d,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					var flag=true;
					if(v.Data.length<5){
						flag=false;
					}
					self.setState({
						data:v.Data,
						ajaxflag:flag
					})
				}else{
					self.setState({
						data:[]
					})
				}
			}
		})
		this.setState({
			show:false
		})
	}
	

	//点击加载
	addajax(){
		if(this.state.show){
			if(this.state.ajaxflag){
				if(localStorage.moomtvUser){
					var user=JSON.parse(localStorage.moomtvUser)
					this.setState({
						Userid:user.UserID,
						hasUser:true,
						loading:false
					})
					var Userid=user.UserID;
				}else{
					var Userid=this.state.Userid;
				}
				var CateID='';
				var page=this.state.page+1;
				var type='topic-hot';
				var d=pf.d+',"CateID":"'+CateID+'","page":"'+page+'","type":"'+type+'","Userid":"'+Userid+'"}';
				var u=pf.u+'GetContentList/';
				var data=this.state.data;
				var self=this;
				$.post({
					url:u,
					data:d,
					success:function(e){
						var v=JSON.parse(e);
						if(v.ResCode==='10000'){
							v.Data.forEach((m)=>{
								data.push(m)	
							})
							var flag=true;
							if(v.Data.length<5){
								flag=false;
							}						
							self.setState({
								data:data,
								page:page,
								ajaxflag:flag
							})
						}else if(v.ResCode==='10002'){
							self.setState({
								ajaxflag:false
							})
						}else{
							self.setState({
								data:[]
							})
						}
					}
				})
			}
		}else{
			if(this.state.ajaxflag){
				if(localStorage.moomtvUser){
					var user=JSON.parse(localStorage.moomtvUser)
					this.setState({
						Userid:user.UserID,
						hasUser:true,
						loading:false
					})
					var Userid=user.UserID;
				}else{
					var Userid=this.state.Userid;
				}
				var CateID='';
				var page=this.state.page+1;
				var type='topic-new';
				var d=pf.d+',"CateID":"'+CateID+'","page":"'+page+'","type":"'+type+'","Userid":"'+Userid+'"}';
				var u=pf.u+'GetContentList/';
				var data=this.state.data;
				var self=this;
				$.post({
					url:u,
					data:d,
					success:function(e){
						var v=JSON.parse(e);
						if(v.ResCode==='10000'){
							v.Data.forEach((m)=>{
								data.push(m)	
							})
							var flag=true;
							if(v.Data.length<5){
								flag=false;
							}						
							self.setState({
								data:data,
								page:page,
								ajaxflag:flag
							})
						}else if(v.ResCode==='10002'){
							self.setState({
								ajaxflag:false
								
							})
						}else{
							self.setState({
								data:[]
							})
						}
					}
				})
			}
		}
	}

	render(){
		var n='showStyle '+ (this.state.show?'show':'');
		var f='showStyle '+ (this.state.show?'':'show');
		var Userid=this.state.Userid;
		var hand=this.state.titleData.map((v,i)=>{
			var url='url('+v.TopicPic+')';
			var fb=v.IsFocus==='1'?'':(<focusBtn.btn data={v.IsFocus} hasUser={this.showloading} to={'GetTopicFocus/'} id={v.TopicID} Userid={Userid} />);
			return(
				<div className="SelectSecondBanner" style={{background:url}} key={i} >
					<div className="mask"></div>
					<h4 className="teamName">
						#{v.TopicTitle}#
					</h4>
					<h6 className="describe">
						{v.TopicDes}
					</h6>
					<h6 className="seeNum">{v.TopicView}人关注过</h6>
					{fb}
				</div>
			)	
		})

		//判断是否可以加载
		var ac=this.state.ajaxflag?'addajax':'addajax off';
		var ajaxshow=this.state.ajaxflag?'点击加载更多':'没有更多数据';
		return(
			<div id='selectSecond'>
				{hand}
				<div className="selectSecondNav">
					<div className="nav"
					onClick={this.hotMessage}
					>
						<div className={n} >热门</div>
					</div>
					<div className="nav"
					onClick={this.newsMessage}
					>
						<div className={f} >最新</div>
					</div>
				</div>
				<div className="Return">
					<Link to='/'></Link>
				</div>
				<selectDynamic.Select  hasUser={this.showloading} data={this.state.data}  />
				<loading.loading offload={this.offload} loading={this.state.loading} />
				<div className={ac}
				onClick={this.addajax}
				>{ajaxshow}</div>
			</div>
			
		)
	}
}


module.exports={
	selectSecond:SelectSecond
}
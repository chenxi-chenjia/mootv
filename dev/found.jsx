const React=require('react');
const selectDynamic=require('./selectDynamic.jsx');
const Footer=require('./footer.jsx');
const loading=require('./loading.jsx');
const $=require('jquery');
const pf=require('./postconfig.js');


class Found extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading:false,
			selectData:[],
			show:true,
			page:1,
			ajax:'点击加载更多',
			ajaxflag:true
		}
		this.newMessage=this.newMessage.bind(this);
		this.friendsMessage=this.friendsMessage.bind(this);
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
		var CateID='';
		var page=1;
		var type='list-new';
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
					if(v.Data<5){
						flag=false;
					}
					self.setState({
						selectData:v.Data,
						ajaxflag:flag
					})
				}else{
					self.setState({
						selectData:[]
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


	newMessage(){
		this.setState({
			show:true
		})
		if(localStorage.moomtvUser){
			var user=JSON.parse(localStorage.moomtvUser)
			this.setState({
				Userid:user.UserID,
				hasUser:true,
				page:1,
				ajax:'点击加载更多',
				ajaxflag:true
			})
			var Userid=user.UserID;
		}else{
			var Userid=this.state.Userid;
		}
		var CateID='';
		var page=1;
		var type='list-new';
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
						selectData:v.Data,
						ajaxflag:flag
					})
				}else{
					self.setState({
						selectData:[]
					})
				}
			}
		})
	}
	
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
				var type='list-new';
				var d=pf.d+',"CateID":"'+CateID+'","page":"'+page+'","type":"'+type+'","Userid":"'+Userid+'"}';
				var u=pf.u+'GetContentList/';
				var data=this.state.selectData;
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
								selectData:data,
								page:page,
								ajaxflag:flag
							})
						}else if(v.ResCode==='10002'){
							self.setState({
								ajax:'没有更多数据',
								ajaxflag:false
							})
						}else{
							self.setState({
								selectData:[]
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
				var type='list-friend';
				var d=pf.d+',"CateID":"'+CateID+'","page":"'+page+'","type":"'+type+'","Userid":"'+Userid+'"}';
				var u=pf.u+'GetContentList/';
				var data=this.state.selectData;
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
								selectData:data,
								page:page,
								ajaxflag:flag
							})
						}else if(v.ResCode==='10002'){
							self.setState({
								ajax:'没有更多数据',
								ajaxflag:false
								
							})
						}else{
							self.setState({
								selectData:[]
							})
						}
					}
				})
			}
		}
	}


	friendsMessage(){
		var self=this;
		if(localStorage.moomtvUser){
			var user=JSON.parse(localStorage.moomtvUser)
			this.setState({
				Userid:user.UserID,
				hasUser:true,
				page:1,
				ajax:'点击加载更多',
				ajaxflag:true
			})
			var Userid=user.UserID;
			var CateID='';
			var page=1;
			var type='list-friend';
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
							selectData:v.Data,
							ajaxflag:flag
						})
					}else{
						self.setState({
							selectData:[]
						})
					}
				}
			})
			self.setState({
				show:false
			})
		}else{
			this.setState({
				loading:true
			})
		}
		
	}
	render(){
		var n='showStyle '+ (this.state.show?'show':'');
		var f='showStyle '+ (this.state.show?'':'show');
		var ac=this.state.ajaxflag?'addajax':'addajax off';
		var ajaxshow=this.state.ajaxflag?'点击加载更多':'没有更多数据';
		return(
			<div id='found'>
				<div className="messageDynamic">
					<div className="nav"
					onClick={this.newMessage}
					>
						<div className={n} >最新动态</div>
					</div>
					<div className="nav"
					onClick={this.friendsMessage}
					>
						<div className={f} >好友动态</div>
					</div>
				</div>
				<selectDynamic.Select  hasUser={this.showloading} data={this.state.selectData}  />
				<loading.loading offload={this.offload} loading={this.state.loading} />
				<Footer.Footer hasUser={this.showloading} />
				<div className={ac}
				onClick={this.addajax}
				>{ajaxshow}</div>
			</div>
			
		)
	}
}


module.exports={
	Found:Found
}
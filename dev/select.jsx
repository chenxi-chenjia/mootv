const React=require('react');
const Banner=require('./banner.jsx');
const Hot=require('./hotTopic.jsx');
const selectDynamic=require('./selectDynamic.jsx');
const Footer=require('./footer.jsx');
const loading=require('./loading.jsx');
const $=require('jquery');
const pf=require('./postconfig.js');




//精选组件
class Select extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading:false,
			selectData:[],
			page:1,
			Userid:'',
			ajax:'点击加载更多',
			ajaxflag:true
		}
		this.offload=this.offload.bind(this);
		this.showloading=this.showloading.bind(this);
		this.addajax=this.addajax.bind(this);
	}
	

	//列表页获取数据
	componentDidMount(){
		if(localStorage.moomtvUser){
			var user=JSON.parse(localStorage.moomtvUser)
			this.setState({
				Userid:user.UserID,
			})
			var Userid=user.UserID;
		}else{
			var Userid=this.state.Userid;
		}
		
		var CateID='';
		var page=this.state.page;
		var type='recomend';
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
				}
			}
		})
	}
	addajax(){
		if(this.state.ajaxflag){
			if(localStorage.moomtvUser){
				var user=JSON.parse(localStorage.moomtvUser)
				this.setState({
					Userid:user.UserID,
					hasUser:true
					
				})
				var Userid=user.UserID;
			}else{
				var Userid=this.state.Userid;
			}
			var CateID='';
			var page=this.state.page+1;
			var type='recomend';
			var d=pf.d+',"CateID":"'+CateID+'","page":"'+page+'","type":"'+type+'","Userid":"'+Userid+'"}';
			var u=pf.u+'GetContentList/';
			var self=this;
			var data=this.state.selectData;
			$.post({
				url:u,
				data:d,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						v.Data.forEach((m)=>{
							data.push(m);
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
					}
				}
			})
		}
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
	
	render(){
		var ajaxshow=this.state.ajaxflag?'点击加载更多':'没有更多数据';
		var ac=this.state.ajaxflag?'addajax':'addajax off';
		return(
			<div id='select'>
				<div style={{display:(this.state.loading?'none':'block')}} > 
					
				
					<Banner.Banner />
					<Hot.Hot />
					<selectDynamic.Select  hasUser={this.showloading} data={this.state.selectData}  />
					
					<Footer.Footer hasUser={this.showloading} />
					<div className={ac}
					onClick={this.addajax}
					>{ajaxshow}</div>
				</div>

				<loading.loading offload={this.offload} loading={this.state.loading} />
			</div>
		)
	}
}


module.exports={
	Select:Select
}
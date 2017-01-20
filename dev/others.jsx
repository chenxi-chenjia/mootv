const React=require('react');
const Footer=require('./footer.jsx');
const select=require('./selectDynamic.jsx')
const $=require('jquery');
const loading=require('./loading.jsx');
const pf=require('./postconfig.js');
const selectDynamic=require('./selectDynamic.jsx');
const focusbtn=require('./focusbtn.jsx');
import {Link} from 'react-router';

class other extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading:false,
			data:[],
			list:[],
			id:'',
			page:1,
			ajaxflag:true
		}

		this.offload=this.offload.bind(this);
		this.showloading=this.showloading.bind(this);
		this.addajax=this.addajax.bind(this);
	}
	componentWillMount(){
		var self=this;
		if(localStorage.moomtvUser){
			var Userid=JSON.parse(localStorage.moomtvUser).UserID;
			this.setState({
				Userid:Userid,
			})
		}else{
			this.setState({
				Userid:this.state.Userid
			})
		}

		var id=this.props.params.id.substring(1);
		this.setState({
			id:id
		})
		// ajax
		var u=pf.u+'GetUserIndex/';
		var d=pf.d+',"Uid":"'+id+'","Userid":"'+Userid+'"}';
		$.post({
			url:u,
			data:d,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					var flag=true;
					if(v.Data.length<5){
						flag=false
					}
					self.setState({
						data:v.Data,
						ajaxflag:flag
					})
				}else{
					self.setState({
						data:[],
						ajaxflag:false
					})
				}
			}
		})
		//下列表信息
		var u2=pf.u+'GetContentList/';
		var d2=pf.d+',"CateID":"'+id+'","page":"1","type":"mine","Userid":"'+Userid+'"}';
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


	//loading页面显示
	showloading(e){
		this.setState({
			loading:e
		})
	}

	offload(e){
		this.setState({
			loading:e
		})
	}
	addajax(){
		if(this.state.ajaxflag){
			var user=JSON.parse(localStorage.moomtvUser)
				this.setState({
					Userid:user.UserID,
					hasUser:true
					
				})
			var Userid=this.state.Userid;
			var page=this.state.page+1;
			var id=this.state.id;
			var d=pf.d+',"CateID":"'+id+'","page":"'+page+'","type":"mine","Userid":"'+Userid+'"}';
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
	
	render(){
		//用户信息
		var data=this.state.data;
		var id=this.state.id;
		var dl=data.map((v,i)=>{
			var bg='url('+ v.UserHeader+')';
			if(v.UserSex==1){
				var sex='男'
			} else if(v.UserSex==2){
				var sex='女'
			}else {
				var sex='保密'
			}
			return(
				<div className="mineTop" key={i} >
					<div className="mineFrist">
						
						<div className="informationBackgroued">
							<div className="myAvater" style={{backgroundImage:bg}} ></div>
							<div className="myName">{v.UserNickName}</div>
							<div className="informationbox">
								<div className="sex">  {sex} </div>
								<div className="age"> {v.UserAge}岁 </div>
								<div className="pro">  {v.UserPro} </div>
								<div className="city">  {v.UserCity} </div>
							</div>
							<focusbtn.btn data={v.IsFocus} hasUser={this.showloading} id={id} />
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
			<div id='mine' className='other'>
				{dl}
				<selectDynamic.Select  hasUser={this.showloading} data={this.state.list}  />
				<div className="Return">
					<Link to='/'></Link>
				</div>
				<loading.loading offload={this.offload} loading={this.state.loading} />
				<div className={ac}
				onClick={this.addajax}
				>{ajaxshow}</div>
			</div>
			
		)
	}
}


module.exports={
	other:other
}
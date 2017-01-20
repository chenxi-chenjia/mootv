

const React=require('react');
const pf=require('./postconfig.js');
const $=require('jquery');
const set=require('./sets.jsx');
import {Link} from 'react-router';
//基本信息页面

class basic extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:{},
			showflag:false,
			type:'',
			typedata:''
		}
		this.UserNickName=this.UserNickName.bind(this);
		this.UserBirthday=this.UserBirthday.bind(this);
		this.UserCity=this.UserCity.bind(this);
		this.UserSignature=this.UserSignature.bind(this);
		this.UserSex=this.UserSex.bind(this);
		this.closeSets=this.closeSets.bind(this);

	}

	componentWillMount(){
		var self=this;
		var Userid=JSON.parse(localStorage.getItem("moomtvUser")).UserID;
		// ajax
		$.post({
			url:pf.u+'PersonInfo/',
			data:pf.d+',"Userid":"'+Userid+'"}',
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					var data=v.Data[0];
					self.setState({
						data:data,
						Userid:Userid
					})
				}
			}
		})
		
	}

	UserNickName(){
		if(this.state.data.UserIsFrist==0){
			this.setState({
				type:'nickname',
				showflag:true
			})
		}else if(this.state.data.UserIsFrist==1){
			this.setState({
				errorFlag:true,
				error:'对不起，您已经修改过昵称'
			})
		}
			
	}

	UserBirthday(){
		this.setState({
			type:'birthday',
			showflag:true
		})
	}

	UserCity(){
		this.setState({
			type:'city',
			showflag:true
		})
	}

	UserSignature(){
		this.setState({
			type:'signature',
			showflag:true
		})
	}

	UserSex(){
		this.setState({
			type:'sex',
			showflag:true
		})
	}

	//关闭设置页面
	closeSets(e){
		this.setState({
			showflag:false
		})
		var self=this;
		var Userid=JSON.parse(localStorage.getItem("moomtvUser")).UserID;
		// ajax
		$.post({
			url:pf.u+'PersonInfo/',
			data:pf.d+',"Userid":"'+Userid+'"}',
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					var data=v.Data[0];
					self.setState({
						data:data,
						Userid:Userid
					})
				}
			}
		})
	}

	render(){
		if(this.state.data.UserSex==0){
			var sex='保密';
		}else if(this.state.data.UserSex==1){
			var sex='男';
		}else if(this.state.data.UserSex==2){
			var sex='女';
		}else if(this.state.data.UserSex==3){
			var sex='保密';
		}

		//设置页面
		if(this.state.showflag){
			var sets=<set.set  type={this.state.type} data={this.state.data} closeSets={this.closeSets} Userid={this.state.Userid}  />
		}else{
			var sets=''
		}

		return(
			<div id="basic">
				<div className="weui-cells" style={{display:(this.state.showflag?'none':'block')}} >
		            <a className="weui-cell weui-cell_access" href="javascript:;"   type='nickname' onTouchEnd={this.UserNickName} value='UserNickName'>
		                <div className="weui-cell__bd">
		                    <p>呢称</p>
		                </div>
		                <div className="weui-cell__ft">{this.state.data.UserNickName}</div>
		            </a>
		           	<a className="weui-cell weui-cell_access" href="javascript:;" type='sex' onTouchEnd={this.UserSex} value='UserSex'>
		                <div className="weui-cell__bd">
		                    <p>性别</p>
		                </div>
		                <div className="weui-cell__ft">{sex} </div>
		            </a>
		            <a className="weui-cell weui-cell_access" href="javascript:;"  type='birthday' onTouchEnd={this.UserBirthday} value='UserBirthday' >
		                <div className="weui-cell__bd">
		                    <p>生日</p>
		                </div>
		                <div className="weui-cell__ft">{this.state.data.UserBirthday}</div>
		            </a>
		            <a className="weui-cell weui-cell_access" href="javascript:;"  type='city' onTouchEnd={this.UserCity} value='UserCity' >
		                <div className="weui-cell__bd">
		                    <p>城市</p>
		                </div>
		                <div className="weui-cell__ft">{this.state.data.UserProvince+'/'+this.state.data.UserCity}</div>
		            </a>
		            <a className="weui-cell weui-cell_access" href="javascript:;"  type='signature' onTouchEnd={this.UserSignature} value='UserSignature' >
		                <div className="weui-cell__bd">
		                    <p>个性签名</p>
		                </div>
		                <div className="weui-cell__ft">{this.state.data.UserSignature}</div>
		            </a>

		        </div>
				{sets}
			</div>
		)
	}
}

module.exports={
	basic:basic
}


		
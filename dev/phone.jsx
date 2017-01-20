const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');
var b=60;
import {Link} from 'react-router';


class phone extends React.Component{
	constructor(props){
		super(props);
		this.state={
			phoneNum:'',
			Userid:'',
			data:'',
			verification:'',
			obtion:false,
			obshow:'获取验证码',
			errorFlag:false,
			error:'',
			obtion:false
		}
		this.obtionClick=this.obtionClick.bind(this);
		this.validationNum=this.validationNum.bind(this);
		this.validation=this.validation.bind(this);
		this.determine=this.determine.bind(this);
	}
	componentWillMount(){
		var self=this;
		var Userid=JSON.parse(localStorage.getItem("moomtvUser")).UserID;
		var u=pf.u+'PersonInfoPhone/';
		var d=pf.d+',"Userid":"'+Userid+'"}';
		$.post({
			data:d,
			url:u,
			success:function(e){
				var v=JSON.parse(e);
				self.setState({
					data:v.Data[0],
					Userid:Userid
				})
			}
		})
	}

	//输入手机号
	validationNum(e){
		var self=this;
		var reg=/^[1][358][0-9]{9}$/
		var v=e.target.value;
		if(reg.test(v)){
			self.setState({
				obtion:true,
				phoneNum:v
			})
		}else{
			self.setState({
				errorFlag:true,
				error:'请输入正确的手机号'
			})
			setTimeout(function(){
				self.setState({
					errorFlag:false
				})
			},2000)
		}		
	}


	//获取验证码
	obtionClick(){
		var self=this;
		function go (){
			var n=60;
			function g(){
				n--;
				if(n>=0){
					var c=n+'s';
					var flag=false;
				}else if(n<0){
					var c='获取验证码';
					var flag=true;
					clearInterval(t);
				}
				self.setState({
					obshow:c,
					obtion:flag
				})
			}
			var t=setInterval(g,1000);
		} 
		if(this.state.phoneNum){
			var p=this.state.phoneNum;
			var u=pf.u+'SendMessage/';
			var d=pf.d+',"Phone":"'+p+'"}';
			$.ajax({
				data:d,
				type:'post',
				url:u,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						self.setState({
							obshow:'60s',
							obtion:false
						})
						go();
					}
				}
			})
		}else{
			self.setState({
				errorFlag:true,
				error:'请输入正确的手机号'
			})
		}
	}

	//输入验证码
	validation(e){
		if(e.target.value.length<7){
			this.setState({
				verification:e.target.value
			})
		}
	}
	

	determine(){
		var self=this;
		if(this.state.data.UserMobile){
			this.props.closePhone();
		}else{
			var n=this.state.phoneNum;
			var s=this.state.verification;
			var Userid=JSON.parse(localStorage.getItem("moomtvUser")).UserID;
			var u=pf.u+'PersonInfoPhone/';
			var d=pf.d+',"Userid":"'+Userid+'"}';
			$.post({
				url:u,
				data:pf.d+',"Phone":"'+n+'","Code":"'+s+'"}',
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						self.props.closePhone();
					}
				}
			})
		}
	}

	render(){
		if(this.state.data.UserMobile){
			var content=(
				<div className="weui-cells">
		            <div className="weui-cell">
		                <div className="weui-cell__bd">
		                    <p>{this.state.data.UserMobile}</p>
		                </div>
		                <div className="weui-cell__ft">已绑定手机</div>
		            </div>
		        </div>
			)
		}else{
			var content=(
				<div>
					<div className="weui-cells__title">请绑定手机</div>
					<div className="weui-cells weui-cells_form">
			            <div className="weui-cell">
			                <div className="weui-cell__hd"><label className="weui-label">手机号</label></div>
			                <div className="weui-cell__bd">
			                    <input className="weui-input" type="tel" placeholder="手机号" 
								onBlur={this.validationNum}
								/>
			                </div>
			            </div>
			            <div className="weui-cell weui-cell_vcode">
			                <div className="weui-cell__hd">
			                    <label className="weui-label">验证码</label>
			                </div>
			                <div className="weui-cell__bd">
			                    <input className="weui-input" type="number" placeholder="请输入验证码"
			                    value={this.state.verification}
								onChange={this.validation} />
			                </div>
			                <div className="weui-cell__ft">
			                    <button className="weui-vcode-btn"
								onTouchEnd={this.obtionClick}
			                    >{this.state.obshow}</button>
			                </div>
			            </div>
			        </div>
				</div>
			)
		}
		return(
			<div id='phone'>
				{content}
				<div className="weui-btn-area">
					<div className="weui-btn weui-btn_primary"  id="showTooltips" onTouchEnd={this.determine} >确定</div>
		        </div>
		        <div className="weui-toptips weui-toptips_warn js_tooltips" style={{display:(this.state.errorFlag?'block':'none')}} >{this.state.error}</div>
			</div>
		)
	}
}

module.exports={
	phone:phone
}
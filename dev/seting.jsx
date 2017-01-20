const React=require('react');
const phone=require('./phone.jsx');
const certification=require('./certification.jsx');
const $=require('jquery');
const pf=require('./postconfig.js');

import {Link} from 'react-router';

class seting extends React.Component{
	constructor(props){
		super(props);
		this.state={
			phoneFlag:false ,
			avaterFlag:false,
			certificationFlag:false
		}
		this.logOut=this.logOut.bind(this);
		this.showPhone=this.showPhone.bind(this);
		this.closePhone=this.closePhone.bind(this);
		this.closeCertification=this.closeCertification.bind(this);
		this.showCertification=this.showCertification.bind(this);
	}
	

	//认证
	showCertification(){
		this.setState({
			certificationFlag:true
		})
		var self=this;
		var Userid=JSON.parse(localStorage.getItem("moomtvUser")).UserID;
		var u=pf.u+'PersonVerify/';
		var d=pf.d+',"Userid":"'+Userid+'"}'
		$.post({
			url:u,
			data:d,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					self.setState({
						certification:v.Data[0]
					})
				}
			}
		})
	}

	closeCertification(){
		this.setState({
			certificationFlag:false
		})
	}

	//退出登录
	logOut(){
		localStorage.removeItem("moomtvUser");
	}
	
	//显示手机验证页面
	showPhone(){
		this.setState({
			phoneFlag:true
		})
	}

	closePhone(){
		this.setState({
			phoneFlag:false
		})
	}


	render(){
		return(
			<div id="seting">
				<div className="set">
					<div className="basic lis">
						<Link to='basic'>
							<div className="icon"></div>
							<span className='font'>基本信息</span>
							<div className="arrow"></div>
							<div className="newshowIcon"></div>
						</Link>
					</div>
					<div className="phone lis"
					onTouchEnd={this.showPhone}
					>
						<div className="icon"></div>
						<span className='font'>手机号码</span>
						<div className="arrow"></div>
						<div className="newshowIcon"></div>
					</div>
					<div className="apply lis"
					onTouchEnd={this.showCertification}
					>
						<div className="icon"></div>
						<span className='font'>申请认证</span>
						<div className="arrow"></div>
						<div className="newshowIcon"></div>
					</div>
				</div>

				<div className="set last">
					
					<div className="about lis">
						<div className="icon"></div>
						<span className='font'>关于MOOMTV</span>
						<div className="arrow"></div>
						<div className="newshowIcon"></div>
					</div>
				</div>	
				<div className="page__bd page__bd_spacing">
					<Link to='/'>
						<div className="weui-btn weui-btn_warn"
						onTouchEnd={this.logOut}
				        >退出</div>
					</Link>
				        
			    </div>
			    <div style={{display:(this.state.phoneFlag?'block':'none')}} >
			    	<phone.phone closePhone={this.closePhone} />
			    </div>
			    <div style={{display:(this.state.certificationFlag?'block':'none')}}> 
			    	<certification.certification closeCertification={this.closeCertification} data={this.state.certification} />
			    </div>
			</div>
		)
	}
}

module.exports={
	seting:seting
}















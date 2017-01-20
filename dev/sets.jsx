const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');

class set extends React.Component{
	constructor(props){
		super(props);
		this.state={
			type:'',
			date:{},
			nickname:'',
			men:true,
			women:false,
			secret:false,
			birthday:'',
			city:'',
			province:'',
			signature:'',
			error:'',
			errorFlag:false,
			successFlag:false,
			signatureNum:0
		}
		this.changeNickname=this.changeNickname.bind(this);
		this.determine=this.determine.bind(this);
		this.sexChangemen=this.sexChangemen.bind(this);
		this.sexChangewm=this.sexChangewm.bind(this);
		this.sexChangesr=this.sexChangesr.bind(this);
		this.birthday=this.birthday.bind(this);
		this.changeProvince=this.changeProvince.bind(this);
		this.changeCity=this.changeCity.bind(this);
		this.changeSignature=this.changeSignature.bind(this);
	}


	

	componentWillMount(){
		var type=this.props.type;
		var data=this.props.data;
		var Userid=this.props.Userid;
		//性别
		if(data.UserSex==1){
			this.setState({
				men:true,
				women:false,
				secret:false
			})			
		}else if(data.UserSex==2){
			this.setState({
				men:false,
				women:true,
				secret:false
			})
		}else{
			this.setState({
				men:false,
				women:false,
				secret:true
			})
		}
		//生日
		var birthday=data.UserBirthday;
		//省市
		var city=data.UserCity?data.UserCity:'';
		var province=data.UserProvince?data.UserProvince:'';
		//个性签名
		var signature=data.UserSignature?data.UserSignature:'';
		this.setState({
			type:type,
			data:data,
			birthday:birthday,
			city:city,
			province:province,
			signature:signature,
			Userid:Userid
		})
	}

	//昵称输入框
	changeNickname(e){
		this.setState({
			nickname:e.target.value
		})
	}

	//性别输入框
	sexChangemen(e){
		this.setState({
			men:e.target.checked,
			women:false,
			secret:false
		
		})
	}
	sexChangewm(e){
		this.setState({
			men:false,
			women:e.target.checked,
			secret:false
		})
	}
	sexChangesr(e){
		this.setState({
			men:false,
			women:false,
			secret:e.target.checked
		})
	}
	
	//省份输入
	changeProvince(e){
		this.setState({
			province:e.target.value
		})
	}
	//城市输入
	changeCity(e){
		this.setState({
			city:e.target.value
		})
	}
	//个性签名输入
	changeSignature(e){
		var num=e.target.value.length;
		this.setState({
			signature:e.target.value,
			signatureNum:num
		})
	}
	
	

	//生日
	birthday(e){
		this.setState({
			birthday:e.target.value
		})
	}

	//确定
	determine(){
		var self=this;
		var type=this.props.type;
		var Userid=this.state.Userid;
		if(type=="nickname"){
			if(this.state.nickname!=''){
				var user=JSON.parse(localStorage.moomtvUser);
				user.UserHeader=src;
				var u=pf.u+'UpdatePersonInfo/';
				var d=pf.d+',"Userid":"'+Userid+'","Type":"UserNickName","UserNickName":"'+this.state.nickname+'"}';
				$.post({
					url:u,
					data:d,
					success:function(e){
						var v=JSON.parse(e);
						if(v.ResCode==='10000'){
							self.setState({
								successFlag:true
							})
							localStorage.moomtvUser=user;
							setTimeout(function(){
								self.setState({
									successFlag:false
								})
								self.props.closeSets();
							},2000);
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
			}else{
				self.setState({
					error:'请输入昵称',
					errorFlag:true
				})
				setTimeout(function(){
					self.setState({
						errorFlag:false
					})
				},2000)
			}
		}else if(type=='sex'){
			var sex=0;
			if(this.state.men){
				sex=1;
			}else if(this.state.women){
				sex=2;
			}else if(this.state.secret){
				sex=3;
			}
			var u=pf.u+'UpdatePersonInfo/';
			var d=pf.d+',"Userid":"'+Userid+'","Type":"UserSex","UserSex":"'+sex+'"}';
			$.post({
				url:u,
				data:d,
				success:function(e){
					var v =JSON.parse(e);
					if(v.ResCode==='10000'){
						self.setState({
								successFlag:true
							})
						setTimeout(function(){
							self.setState({
								successFlag:false
							})
							self.props.closeSets();
						},2000)
					}
				}
			})
		}else if(type=='birthday'){
			var u=pf.u+'UpdatePersonInfo/';
			var d=pf.d+',"Userid":"'+Userid+'","Type":"UserBirthday","UserBirthday":"'+this.state.birthday+'"}';
			$.post({
				url:u,
				data:d,
				success:function(e){
					var v =JSON.parse(e);
					if(v.ResCode==='10000'){
						self.setState({
							successFlag:true
						})
						setTimeout(function(){
							self.setState({
								successFlag:false
							})
							self.props.closeSets();
						},2000)
					}
				}
			})
		}else if(type=='city'){
			if(this.state.city!=''&&this.state.province!=''){
				var u=pf.u+'UpdatePersonInfo/';
				var d=pf.d+',"Userid":"'+Userid+'","Type":"UserProvince","UserProvince":"'+this.state.province+'","UserCity":"'+this.state.city+'"}';
				$.post({
					url:u,
					data:d,
					success:function(e){
						var v =JSON.parse(e);
						if(v.ResCode==='10000'){
							self.setState({
								successFlag:true
							})
							setTimeout(function(){
								self.setState({
									successFlag:false
								})
								self.props.closeSets()
							},2000);
						}
					}
				})
			}else if(this.state.province==''){
				self.setState({
					error:'请输入所在省份',
					errorFlag:true
				})
				setTimeout(function(){
					self.setState({
						errorFlag:false
					})
					self.props.closeSets(obj)
				},2000)
			}else if(this.state.city==''){
				self.setState({
					error:'请输入所在市',
					errorFlag:true
				})
				setTimeout(function(){
					self.setState({
						errorFlag:false
					})
				},2000)
			}
				
		}else if(type=='signature'){
			if(this.state.signature!=''){
				var u=pf.u+'UpdatePersonInfo/';
				var d=pf.d+',"Userid":"'+Userid+'","Type":"UserSignature","UserSignature":"'+self.state.signature+'"}';
				$.post({
					url:u,
					data:d,
					success:function(e){
						var v =JSON.parse(e);
						if(v.ResCode==='10000'){
							self.setState({
								successFlag:true
							})
							
							setTimeout(function(){
								self.setState({
									successFlag:false
								})
								self.props.closeSets();
							},2000)
						}
					}
				})
			}else if(this.state.signature==''){
				self.setState({
					errorFlag:true,
					error:'请输入个性签名'
				})
				setTimeout(function(){
					self.setState({
						errorFlag:false
					})
				},2000)
			}
		}
	}



	render(){
		//昵称
		if(this.state.type=='nickname'){
			var content=(
				<div>
					<div className="weui-cells__title">昵称</div>
					<div className="weui-cells">
			            <div className="weui-cell">
			                <div className="weui-cell__bd">
			                    <input className="weui-input" type="text" placeholder="请输入昵称" value={this.state.nickname} onChange={this.changeNickname} />
			                </div>
			            </div>
			        </div>
				</div>
			)
		//性别
		}else if(this.state.type=='sex'){
			var content=(
				<div className="weui-cells weui-cells_radio">
		            <label className="weui-cell weui-check__label" htmlFor="x11" >
		                <div className="weui-cell__bd">
		                    <p>男</p>
		                </div>
		                <div className="weui-cell__ft">
		                    <input type="radio" className="weui-check" name="sex" value='men' checked={this.state.men}  id="x11" onChange={this.sexChangemen} />
		                    <span className="weui-icon-checked"></span>
		                </div>
		            </label>
		            <label className="weui-cell weui-check__label" htmlFor="x12">
		                <div className="weui-cell__bd">
		                    <p>女</p>
		                </div>
		                <div className="weui-cell__ft">
		                    <input type="radio" name="sex" className="weui-check" value='women' id="x12" checked={this.state.women} onChange={this.sexChangewm}/>
		                    <span className="weui-icon-checked"></span>
		                </div>
		            </label>
		             <label className="weui-cell weui-check__label" htmlFor="x13">

		                <div className="weui-cell__bd">
		                    <p>保密</p>
		                </div>
		                <div className="weui-cell__ft">
		                    <input type="radio" name="sex" className="weui-check" value='secret' id="x13" checked={this.state.secret} onChange={this.sexChangesr}/>
		                    <span className="weui-icon-checked"></span>
		                </div>
		            </label>
		           
		        </div>


			)
		}else if(this.state.type=='birthday'){
			var content=(
				<div className="weui-cell birthdayChange">
	                <div className="weui-cell__hd"><label htmlFor="birthday" className="weui-label">出生日期</label></div>
	                <div className="weui-cell__bd">
	                    <input className="weui-input" type="date" id='birthday' value={this.state.birthday} onChange={this.birthday} />
	                </div>
	            </div>
			)
		}else if(this.state.type=='city'){
			var content=(
				<div>
					<div className="weui-cells__title">省</div>
					<div className="weui-cells">
			            <div className="weui-cell">
			                <div className="weui-cell__bd">
			                    <input className="weui-input" type="text" placeholder="请输入所在省" maxLength='5' onChange={this.changeProvince} value={this.state.province} />
			                </div>
			            </div>
			        </div>
			        <div className="weui-cells__title">市</div>
					<div className="weui-cells">
			            <div className="weui-cell">
			                <div className="weui-cell__bd">
			                    <input className="weui-input" type="text" placeholder="请输入所在市" maxLength='10' onChange={this.changeCity} value={this.state.city} />
			                </div>
			            </div>
			        </div>
			    </div>    
			)
		}else if(this.state.type=='signature'){
			var content =(
				<div>
					<div className="weui-cells__title">00后的天空，标榜一下</div>
					<div className="weui-cells weui-cells_form">
			            <div className="weui-cell">
			                <div className="weui-cell__bd">
			                    <textarea className="weui-textarea" value={this.state.signature} onChange={this.changeSignature} rows="3"  maxLength='15'></textarea>
			                    <div className="weui-textarea-counter"><span>{this.state.signatureNum}</span>/15</div>
			                </div>
			            </div>
			        </div>
			    </div>   
			)
		}else{
			var content='';
		}
		return(
			<div id="sets">
				{content}
				<div className="weui-btn-area">
		            <div className="weui-btn weui-btn_primary"  id="showTooltips" onTouchEnd={this.determine} >确定</div>
		        </div>


		        <div className="weui-toptips weui-toptips_warn js_tooltips" style={{display:(this.state.errorFlag?'block':'none')}} >{this.state.error}</div>


		        <div id="toast" style={{opacity:(this.state.successFlag?1:0),display:(this.state.successFlag?'block':'none')}}>
			        <div className="weui-mask_transparent"></div>
			        <div className="weui-toast">
			            <i className="weui-icon-success-no-circle weui-icon_toast"></i>
			            <p className="weui-toast__content">已完成</p>
			        </div>
			    </div>
			</div>
		)
	}
}

module.exports={
	set:set
}
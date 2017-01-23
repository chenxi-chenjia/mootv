const React=require('react');
const $=require('jquery');
const md5=require('md5');
var b=60;



class loading extends React.Component{
	constructor(props){
		super(props);
		this.state={
			phoneNum:'',
			verification:'',
			obtion:false,
			obshow:'获取验证码',
			phoneFlag:true,
			errorFlag:false,
			error:''
		}
		this.validation=this.validation.bind(this);
		this.validationNum=this.validationNum.bind(this);
		this.obtionClick=this.obtionClick.bind(this);
		this.loading=this.loading.bind(this);
		// this.WXload=this.WXload.bind(this);
	}
	
	//微信登陆
	// WXload(){
	// 	var self=this;
	// 	var m=md5(Math.floor(Math.random()*100000));
	// 	var c=md5('rPC1TrupTxL2M0GvTjJvmp6t0HrDex0k'+m);
	// 	var u='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef00cfee5b39055a&redirect_uri=https%3A%2F%2Fwww.moomtv.tv%2Fshequ%2F%3F%2Frequest%2FWXLogin%2F&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
	// 	var d='{"NonceStr":"'+m+'","Sign":"'+c+'"}';
	// 	$.ajax({
	// 		data:d,
	// 		url:u,
	// 		type:'post',
	// 		success:function(e){
	// 			var v=JSON.parse(e);
	// 			if(v.ResCode==='10000'){
	// 				localStorage.moomtvUser=JSON.stringify(v.Data);
	// 				self.props.offload(false);
	// 			}
	// 		}
	// 	})
	// }
	


	//登陆
	loading(){
		var self=this;
		var p=this.state.phoneNum;
		var v=this.state.verification;
		var p=this.state.phoneNum;
		var m=md5(Math.floor(Math.random()*100000));
		var c=md5('rPC1TrupTxL2M0GvTjJvmp6t0HrDex0k'+m);
		var u='https://www.moomtv.tv/shequ/?/request/UserLogin/';
		var d='{"NonceStr":"'+m+'","Sign":"'+c+'","Phone":"'+p+'","Code":"'+v+'"}';
		if(p!==''&&v!==''){
			$.ajax({
				data:d,
				url:u,
				type:'post',
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						localStorage.moomtvUser=JSON.stringify(v.Data);
						self.props.offload(false);
					}else{
						self.setState({
							errorFlag:true,
							error:'其输入正确的验证码或手机号'
						})
						setTimeout(function(){
							errorFlag:false
						})
					}
				}
			})
		}else if(v==''){
			this.setState({
				error:'请输入验证码',
				errorFlag:true
			})
			setTimeout(function(){
				self.setState({
					errorFlag:false
				})
			})
		}
	}


	validation(e){
		if(e.target.value.length<7){
			this.setState({
				verification:e.target.value
			})
		}
	}
	validationNum(e){
		var self=this;
		var reg=/^[1][358][0-9]{9}$/
		var v=e.target.value;
		$(e.target).blur(function(){
			if(reg.test(v)){
				self.setState({
					phoneFlag:true,
					obtion:true
				})
			}else{
				self.setState({
					phoneFlag:false,
					error:'请输入一个有效的手机号码',
					errorFlag:true
				})
				setTimeout(function(){
					self.setState({
						errorFlag:false
					})
				})
			}
		})
		if(v.length<12){
			this.setState({
				phoneNum:e.target.value
			})
		}
	}

	//获取验证码
	obtionClick(){
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
		if(this.state.obtion){
			var self=this;
			var p=this.state.phoneNum;
			var m=md5(Math.floor(Math.random()*100000));
			var c=md5('rPC1TrupTxL2M0GvTjJvmp6t0HrDex0k'+m);
			var u='https://www.moomtv.tv/shequ/?/request/SendMessage/';
			var d='{"NonceStr":"'+m+'","Sign":"'+c+'","Phone":"'+p+'"}';
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
		}
	}
	render(){
		var phoneClass=this.state.phoneFlag?'':'error';
		if(this.props.loading){
			$("body").on("touchmove",function(event){
				event.preventDefault;
			}, false)
		}else{
			$("body").off("touchmove");
		}
		return(
			<div id="loading" style={{display:(this.props.loading?'block':'none')}} >
				<h2>欢迎来到MOOMTV</h2>
				<div className="form">
					<div className="phone">
						<input type="number" placeholder='手机号码'
						className={phoneClass}
						value={this.state.phoneNum}
						onChange={this.validationNum} />
					</div>
					<div className="validation">
						<input type="number" placeholder='验证码'
						max='6'
						value={this.state.verification}
						onChange={this.validation} />
						<div className='obtion'
						onClick={this.obtionClick}
						>
							{this.state.obshow}
						</div>
					</div>
				</div>
				<div className="btnBox">
					<div className="weui-btn weui-btn_primary"
					onClick={this.loading}
					> 立即登录 </div>
					
				</div>
				<div className="weui-toptips weui-toptips_warn js_tooltips" style={{display:(this.state.errorFlag?'block':'none')}}>{this.state.error}</div>
			</div>
		)
	}
}









module.exports={
	loading:loading 
}
//关注按钮

const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');
 
class btn extends React.Component{
	constructor(props){
		super(props);
		this.state={
			flag:true
		}
		this.focus=this.focus.bind(this);
	}
	componentDidMount(){
		var f=this.props.data==='0'?true:false;
		this.setState({
			flag:true
		})
	}
	//关注按钮
	focus(res){
		var self=this;
		var res=res;
		if(this.props.data==='0'){
			if(localStorage.moomtvUser==undefined){
				this.props.hasUser(true);
			}else{
				var UID=self.props.id;
				var Userid=JSON.parse(localStorage.moomtvUser).UserID;
				if(this.props.to){
					var t=this.props.to;
					var u=pf.u+t;
					var d=pf.d+',"ID":"'+UID+'","Userid":"'+Userid+'"}';
					$.post({
						data:d,
						url:u,
						success:function(res){
							var v=JSON.parse(res);
							if(v.ResCode==='10000'){
								self.setState({
									flag:false
								})
							}
						}
					})
				}else {
					var t='GetFocusFans/';
					var u=pf.u+t;
					var d=pf.d+',"UID":"'+UID+'","Userid":"'+Userid+'"}';
					$.post({
						data:d,
						url:u,
						success:function(res){
							var v=JSON.parse(res);
							if(v.ResCode==='10000'){
								self.setState({
									flag:false
								})
							}
						}
					})
				}

					
			}
		}
	}
		

	render(){
		var fs=this.state.flag?'关注':'已关注';
		var c=this.state.flag?'focusOn':'focusOn off';
		return(
			<div className={c} onTouchEnd={this.focus} >
				{fs}
			</div>
		)
	}
}


module.exports={
	btn:btn
}
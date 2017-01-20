const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');


class input extends React.Component{


	constructor(props){
		super(props);
		this.state={
			data:''
		}
		this.showloading=this.showloading.bind(this);
		this.inputchange=this.inputchange.bind(this);
		this.sendcomment=this.sendcomment.bind(this);
	}
	
	//判断是否登陆
	showloading(e){
		if(localStorage.moomtvUser==undefined){
			this.props.hasUser(true);
		}
		this.setState({
			data:e.target.value
		})
	}

	
	// 绑定数据
	inputchange(e){
		this.setState({
			data:e.target.value
		})
	}
	

	//发送
	sendcomment(){
		var self=this;
		var data=this.state.data;
		if(data){
			var UserID=JSON.parse(localStorage.moomtvUser).UserID;
			var u=pf.u+'CommentSubContent/';
			var d=pf.d+',"ID":"'+this.props.id+'","Userid":"'+UserID+'","Content":"'+data+'"}';
			$.post({
				url:u,
				data:d,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						var obj={
							flag:1,
							data:data
						}
						self.setState({
							data:''
						})
						self.props.add(obj);
					}
				}
			})
		}
	}


	render(){
		return(
			<div className="praiseInput"
			onTouchEnd={this.showloading}
			>
				<input type="text" placeholder ="我也要说一句..." 
				value={this.state.data}
				onChange={this.inputchange}
				/>
				<div className="inputIcon"
				onTouchEnd={this.sendcomment}
				></div>
			</div>
		)
	}
}
module.exports={
	input:input
}
//点赞的人列表

const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');
const btn=require('./focusbtn.jsx');
const focusarea=require('./focusarea.jsx');
const loading=require('./loading.jsx');


class praisePeople extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[],
			loading:false
		}
		this.showloading=this.showloading.bind(this);
	}
	componentWillMount(){
		var self=this;
		var id=this.props.params.id.substring(1);
		var u=pf.u+'GetContentZanUserList/';
		var Userid=JSON.parse(localStorage.moomtvUser).UserID;
		var d=pf.d+',"ID":"'+id+'","Userid":"'+Userid+'","page":"1"}';
		$.post({
			url:u,
			data:d,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					self.setState({
						data:v.Data
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

	render(){
		console.log(this.state.data)
		var lis=this.state.data.map((v,i)=>{
			v.Topics=[];
			v.id=v.UserID;
			return(
				<focusarea.focus  data={v} key={i} hasUser={this.showloading}  />
			)
		})

		return(
			<div id="praisePeople">
				{lis}
				<loading.loading offload={this.offload} loading={this.state.loading} />
			</div>
		)
	}
}


module.exports={
	praisePeople:praisePeople
}
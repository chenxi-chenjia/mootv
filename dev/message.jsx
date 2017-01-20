const React=require('react');
const Footer=require('./footer.jsx');
const $=require('jquery');
const pf=require('./postconfig.js');
const loading=require('./loading.jsx');
import {Link} from 'react-router';

class Message extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[],
			loading:false,
			Userid:''
			
		}
		this.offload=this.offload.bind(this);
	}
	componentWillMount(){
		var self=this;
		if(localStorage.moomtvUser){
			var Userid=JSON.parse(localStorage.moomtvUser).UserID;
			this.setState({
				Userid:Userid
			})
		}
		//ajax
		var u=pf.u+'GetSystemMessage/';
		var d=pf.d+',"Userid":"'+Userid+'"}';
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



	offload(e){
		var self=this;
		var Userid=JSON.parse(localStorage.moomtvUser).UserID;
		this.setState({
			Userid:Userid,
			loading:e
		})
	}


	// var yc=(
	// 		<div className="comment messageLis">
	// 			<Link to={comment} >
	// 				<div className="icon"></div>
	// 				<span className='font'>评论</span>
	// 				<div className="arrow"></div>
	// 				<div className="newshowIcon"></div>
	// 			</Link>
	// 		</div>
	// 		<div className="thumb messageLis">
	// 			<Link to={mp} >
	// 				<div className="icon"></div>
	// 				<span className='font'>点赞</span>
	// 				<div className="arrow"></div>
	// 				<div className="newshowIcon"></div>
	// 			</Link>
	// 		</div>
	// 		<div className="directMessage messageLis">
	// 			<Link to={dm} >
	// 				<div className="icon"></div>
	// 				<span className='font'>私信</span>
	// 				<div className="arrow"></div>
	// 				<div className="newshowIcon"></div>
	// 			</Link>	
	// 		</div>
	// 	)

	
	render(){
		var id=this.state.Userid;
		// var comment='comment/:'+id;
		// var mp='messagePraise/:'+id;
		// var dm='directMessage/:'+id;
		var data=this.state.data;
		var lis=data.map((v,i)=>{
			var cm=v.MsgRead==='0'?'':'off';
			return(
				<li key={i} className={cm} >
					<div className="comment">
						<span className="title">
							{v.MsgTitle}
						</span>
						{v.MsgDescription}
					</div>
					<div className="time">
						{v.MsgTime}
					</div>
				</li>
			)
				
		})
		return(
			<div id='message'>
				<div>
					
					<div className="systemMessage ">
						<div className="systemMessageTop">
							<div className="icon"></div>
							<span className='font'>系统消息</span>
						</div>
						<ul className="systemMessageLis">
							{lis}
						</ul>
					</div>
				</div>
				<Footer.Footer/>
				<loading.loading offload={this.offload} loading={this.state.loading} />
			</div>
			
		)
	}
}


module.exports={
	Message:Message
}
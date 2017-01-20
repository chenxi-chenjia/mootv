//点赞区

const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');
const topic=require('./topicTitle.jsx');
import {Link} from 'react-router';

class thumbUp extends React.Component{
	constructor(props){
		super(props);
		this.state={
			num:'',
 			id:'',
 			zanAvatar:[],
 			showomit:false
		};
		this.thumbUp=this.thumbUp.bind(this);
		this.infocus=this.infocus.bind(this);
	}

	//点赞
	thumbUp(e){
		var self=this;
		var e=e;
		if(localStorage.moomtvUser==undefined){
			this.props.hasUser(true);
		}else{
			if(this.state.Is_Zan==='0'){
 				var ID=self.props.id;
 				var User=JSON.parse(localStorage.moomtvUser);
 				var Userid=User.UserID;
				var u=pf.u+'SetZanContent/';
				var d=pf.d+',"ID":"'+ID+'","Userid":"'+Userid+'"}';
				$.post({
					data:d,
					url:u,
					success:function(res){
						var v=JSON.parse(res);
						if(v.ResCode==='10000'){
							var obj={
 								Z_UserHeader:User.UserHeader,
 								Z_UserID:User.UserID
 							};
 							var arr=self.state.zanAvatar;
 							arr.push(obj);
							self.setState({
								num:self.state.num+1,
								Is_Zan:'1',
								zanAvatar:arr
							})
						}
					}
				})
				$(e.target).addClass('off');
			}
		}
	}

	//input获取焦点
	infocus(e){
		if(localStorage.moomtvUser==undefined){
			this.props.hasUser(true);
		}else{
			$(e.target).closest('.Select').find('input').focus();
		}
	}

	componentWillMount(){
		this.setState({
 			id:this.props.data.id,
			num:parseInt(this.props.data.ZanCount),
 			Is_Zan:this.props.data.Is_Zan,
 			zanAvatar:this.props.data.ZanList
 		})
	}

	render(){
		var zanAvatar=this.state.zanAvatar.map((v,i)=>{
				if(i<10){
					var url='url('+v.Z_UserHeader+')';
					return(
						<li className="every-avatar" key={i} style={{backgroundImage:url}}  ></li>
					)
				}
			})
		var thumbUpClass=this.state.Is_Zan==='0'?'thumbUp':'thumbUp off';
		var t='praisePeople/:'+this.props.id;
		return(
			<div className="select-praise">
				<div className="select-icons">
					<topic.topic data={this.props.data.Topics} />
					<div className={thumbUpClass}
					onClick={this.thumbUp}
					></div>
					<div className="comment"
					onClick={this.infocus}
					></div>
				</div>
				<div className="peoples" style={{display:(this.state.num>0?'block':'none')}} >
					<Link to={t} >
						<div className="avatars">
							<ul>
								{zanAvatar}
							</ul>
						</div>
						<div className="omit" style={{display:(this.state.num<10?'block':'none')}}></div>
						<div className="praise">{this.state.num} 赞</div>
					</Link>
				</div>
			</div>
		)
	}
}





module.exports={
	thumbUp:thumbUp
}
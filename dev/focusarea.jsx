//关注区域

const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');
const focusBtn=require('./focusbtn.jsx');
const menu=require('./menu.jsx');

import {Link} from 'react-router';
 
class focus extends React.Component{
	constructor(props){
		super(props);
		this.state={
			showDeleteFlag:false
		}
		this.showloading=this.showloading.bind(this);
		this.deleteMyComment=this.deleteMyComment.bind(this);
		this.showDelete=this.showDelete.bind(this);
		this.offDeleteFlag=this.offDeleteFlag.bind(this);
		this.hasUser=this.hasUser.bind(this);
		this.refreshDiclis=this.refreshDiclis.bind(this);
	}

	//删除评论
	refreshDiclis(){
		this.props.refreshDiclis();
	}

	//是否登录
	hasUser(e){
		this.props.hasUser(e);
	}
	
	//显示删除按钮
	showDelete(){
		this.setState({
			showDeleteFlag:true 
		})
	}
	offDeleteFlag(e){
		e.preventDefault();
		this.setState({
			showDeleteFlag:false
		})
	}

	//删除我的评论
	deleteMyComment(e){
		if(localStorage.moomtvUser){
			e.preventDefault();
			var self=this;
			var Userid=JSON.parse(localStorage.moomtvUser).UserID;
			var id=this.props.id;
			var u=pf.u+'DeleteContentByID/';
			var d=pf.d+',"Userid":"'+Userid+'","ID":"'+id+'"}';
			$.post({
				url:u,
				data:d,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						self.props.deleteMyComment(true);
					}
					
				}
			})
			this.setState({
				showDeleteFlag:false
			})
		}
			
	}


	//点赞按钮
	showloading(e){
		this.props.hasUser(true);
	}

	render(){
		var data=this.props.data;

		if(data.UserVerify==='1'){
			var icon=<div className='icon'></div>;
		}else if(data.UserVerify==='0'){
			var icon='';
		}

		var id=data.id;
		var t='others/:'+id
		if(localStorage.moomtvUser){
			var Userid=JSON.parse(localStorage.moomtvUser).UserID;
			if(id==Userid){
				t='mine';
			}
		}
			
		var dt=data.Time?data.Time:'';
		var bg='url(' +data.UserHeader+')';
		if(this.props.isDelete){
			var d=<div className="waste" onTouchEnd={this.showDelete} ></div>;
		}else{
			var d='';
		}
		return(
			<div>
				<div className="select-top">
					<div className="link">
						<div className="avatar" style={{backgroundImage:bg}} ><Link to={t}></Link></div>
						<h4 className='name'><div>{data.UserNickName} {icon}</div></h4>
						<div className="level"> {data.UserLevel} </div>
						<div className="releaseTime">{dt} </div>
						{d}
						<div style={{display:(this.props.isDelete?'none':'block')}} >
							<menu.menu id={this.props.id} iscmt={false} IsRecommend={this.props.IsRecommend} hasUser={this.hasUser} passiveUserid={this.props.passiveUserid} DeleteCommend={this.refreshDiclis} />
						</div>
					</div>
				</div>
				<div style={{display:(this.state.showDeleteFlag?'block':'none')}} >
		        <div className="weui-mask" id="iosMask" onTouchStart={this.offDeleteFlag} ></div>
			        <div className="weui-actionsheet weui-actionsheet_toggle" id="iosActionsheet">
			            <div className="weui-actionsheet__menu">
			                <div className="weui-actionsheet__cell"
							onTouchEnd={this.deleteMyComment}
			                >删除</div>
			            </div>
			            <div className="weui-actionsheet__action">
			                <div className="weui-actionsheet__cell" id="iosActionsheetCancel"
							onTouchEnd={this.offDeleteFlag}
			                >取消</div>
			            </div>
			        </div>
			    </div>
		    </div>
		)
	}
}


module.exports={
	focus:focus
}
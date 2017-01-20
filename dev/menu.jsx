const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');

import {Link, browserHistory} from 'react-router';

class menu extends React.Component{
	constructor(props){
		super(props);
		this.state={
			show:false,
			remand:'',
			remandFlag:false
		}
		this.showmenu=this.showmenu.bind(this);
		this.closemenu=this.closemenu.bind(this);
		this.deletereply=this.deletereply.bind(this);
		this.recommenddynamic=this.recommenddynamic.bind(this);
		this.toReportreply=this.toReportreply.bind(this);
		this.deletedynamic=this.deletedynamic.bind(this);
		this.toReportdynamic=this.toReportdynamic.bind(this);
	}
	
	//显示菜单栏
	showmenu(e){
		if(localStorage.moomtvUser){
			e.preventDefault();
			$("body").on("touchmove",function(event){
				event.preventDefault;
			}, false)
			this.setState({
				show:true
			})
		}else{
			this.props.hasUser(true)
		}
			
	}
	
	//关闭菜单栏
	closemenu(e){
		e.preventDefault();
		$("body").off("touchmove");
		this.setState({
			show:false
		})
	}

	//删除回复
	deletereply(e){
		if(localStorage.moomtvUser){
			var self=this;
			e.preventDefault();
			var Userid=JSON.parse(localStorage.moomtvUser).UserID;
			var cid=this.props.cid;
			var id=this.props.id;
			var u=pf.u+'DeleteCommend/';
			var d=pf.d+',"Userid":"'+Userid+'","ID":"'+id+'","CID":"'+cid+'"}';
			$.post({
				url:u,
				data:d,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						$("body").off("touchmove");
						self.setState({
							remand:'删除成功',
							remandFlag:true,
							show:false
						})
						setTimeout(function(){
							self.setState({
								remandFlag:false
							})
							self.props.DeleteCommend(id);
						},1500)
					}
				}
			})
		}
			
	}

	//推荐动态
	recommenddynamic(e){
		if(localStorage.moomtvUser){
			var self=this;
			e.preventDefault();
			var Userid=JSON.parse(localStorage.moomtvUser).UserID;
			var id=this.props.id;
			var cid=this.props.cid;
			var u=pf.u+'RecommendContent/';
			var d=pf.d+',"Userid":"'+Userid+'","ID":"'+id+'"}';
			$.post({
				url:u,
				data:d,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						$("body").off("touchmove");
						self.setState({
							remand:'推荐成功',
							remandFlag:true,
							show:false
						})
						setTimeout(function(){
							self.setState({
								remandFlag:false
							})
						},1500)
					}
				}
			})
		}
			
	}

	//举报回复
	toReportreply(e){
		if(localStorage.moomtvUser){
			var self=this;
			e.preventDefault();
			var Userid=JSON.parse(localStorage.moomtvUser).UserID;
			var id=this.props.id;
			var cid=this.props.cid;
			var u=pf.u+'ReportContent/';
			var d=pf.d+',"Userid":"'+Userid+'","ID":"'+id+'","Type":"content","CID":"'+cid+'"}';
			$.post({
				url:u,
				data:d,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						$("body").off("touchmove");
						self.setState({
							remand:'举报成功',
							remandFlag:true,
							show:false
						})
						setTimeout(function(){
							self.setState({
								remandFlag:false
							})
						},1500)
					}
				}
			})
		}
			
	}
	
	//删除动态
	deletedynamic(e){
		if(localStorage.moomtvUser){
			var self=this;
			e.preventDefault();
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
						$("body").off("touchmove");
						self.setState({
							remand:'删除成功',
							remandFlag:true,
							show:false
						})
						setTimeout(function(){
							self.setState({
								remandFlag:false
							})
							window.location='https://m.moomtv.tv/#/mine';
						},1500)
					}
				}
			})
		}
			

	}	

	//举报动态
	toReportdynamic(e){
		if(localStorage.moomtvUser){
			var self=this;
			e.preventDefault();
			var Userid=JSON.parse(localStorage.moomtvUser).UserID;
			var id=this.props.id;
			var u=pf.u+'ReportContent/';
			var d=pf.d+',"Userid":"'+Userid+'","ID":"'+id+'","Type":"content","CID":""}';
			$.post({
				url:u,
				data:d,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						$("body").off("touchmove");
						self.setState({
							remand:'举报成功',
							remandFlag:true,
							show:false
						})
						setTimeout(function(){
							self.setState({
								remandFlag:false
							})
						},1500)
					}
				}
			})
		}
			
	}

	render(){
		if(localStorage.moomtvUser){
			//逻辑判断
			var user=JSON.parse(localStorage.moomtvUser);
			var admin=user.IsAdmin;
			var Userid=user.UserID;
			// 动态id
			var id=this.props.id;
			//发布动态人id
			var passiveUserid=this.props.passiveUserid;
			var god=false;
			var isMine=false;
			var d={class:'delete',name:'删除'};
			var r={class:'recommend',name:'推荐'};
			var t={class:'toReport',name:'举报'};
			var dynamic=[];
			var reply=[];
			if(admin==1){
				god=true;
				dynamic=[d,r];
				reply=[d];
				if(Userid!=passiveUserid){
					dynamic.push(t);
					reply.push(t);
				}
			}else{
				if(Userid==passiveUserid){
					reply=[d];
					dynamic=[d];
				}else{
					reply=[t];
					dynamic=[t]
				}
			}
			
			var iscmt=this.props.iscmt;
			if(iscmt){
				var lis=reply.map((v,i)=>{
					if(v.class=='delete'){
						return <div className="weui-actionsheet__cell" key={i} onTouchEnd={this.deletereply} >{v.name} </div>
					}else if(v.class=='toReport'){
						return <div className="weui-actionsheet__cell" key={i} onTouchEnd={this.toReportreply} >{v.name} </div>
					}
				})
			}else{
				var lis=dynamic.map((v,i)=>{
					if(v.class=='delete'){
						return <div className="weui-actionsheet__cell" key={i} onTouchEnd={this.deletedynamic} > {v.name}</div>
					}else if(v.class=='recommend'){
						if(this.props.IsRecommend==0){
							return <div className="weui-actionsheet__cell" key={i} onTouchEnd={this.recommenddynamic} >{v.name} </div>
						}else{
							return <div className="weui-actionsheet__cell" key={i} onTouchEnd={this.recommenddynamic} >取消推荐</div>

						}
					}else if(v.class=='toReport'){
						return <div className="weui-actionsheet__cell" key={i} onTouchEnd={this.toReportdynamic} >{v.name} </div>
					}
				})
			}

		}
			





		return(
			<div>
				<div className='menuBtn' onTouchEnd={this.showmenu} ></div>
				<div style={{display:(this.state.show?'block':'none')}} >
			        <div className="weui-mask" id="iosMask" onTouchEnd={this.closemenu}></div>
			        <div className="weui-actionsheet weui-actionsheet_toggle" id="iosActionsheet">
			            <div className="weui-actionsheet__menu">
			                {lis}
			            </div>
			            <div className="weui-actionsheet__action">
			                <div className="weui-actionsheet__cell" id="iosActionsheetCancel" onTouchEnd={this.closemenu} >取消</div>
			            </div>
			        </div>
			    </div>
			    <div id="toast" style={{display:(this.state.remandFlag?'block':'none')}} >
			        <div className="weui-mask_transparent"></div>
			        <div className="weui-toast">
			            <i className="weui-icon-success-no-circle weui-icon_toast"></i>
			            <p className="weui-toast__content">{this.state.remand} </p>
			        </div>
			    </div>
			</div>
		)
	}
}






module.exports={
	menu:menu
}


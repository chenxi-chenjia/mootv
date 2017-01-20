//详情页评论列表

const React=require('react');
const $=require('jquery');
const focusarea=require('./focusarea.jsx');
const replay=require('./replay.jsx');
const pf=require('./postconfig.js');
const menu=require('./menu.jsx');
import {Link} from 'react-router';


class list extends React.Component{
	constructor(props){
		super(props);
		this.state={
			replay:[],
			show:true,
			data:[]
		}
		this.showloading=this.showloading.bind(this);
		this.showmenu=this.showmenu.bind(this);
		this.input=this.input.bind(this);
	}
	

	
	componentWillMount(){
		var data=this.props.data;
		this.setState({
			data:data
		})
	}
	

	//对某一条品论回复
	input(e){
		
	}

	//显示评论的评论
	showmenu(e){
		var id=$(e.target)[0].id;
		var self=this;
		this.setState({
			show:!this.state.show
		})
		if(this.state.show){
			var u=pf.u+'GetDisListByDis/';
			var d=pf.d+',"DisID":"'+id+'"}';
			$.post({
				data:d,
				url:u,
				success:function(e){
					var v=JSON.parse(e);
					console.log(v);
					if(v.ResCode==='10000'){
						self.setState({
							replay:v.Data
						})
					}
				}
			})
		}else{
			self.setState({
				replay:[]
			})
		}
	}
	showloading(e){
		this.props.hasUser(e);
	}
	render(){
		var data=this.props.data;
		var lis=data.map((v,i)=>{
			var data=v.userinfo;
			var bg='url('+ data.UserHeader+')' ;
			if(data.UserVerify==='1'){
				var icon=<div className='icon'></div>;
			}else if(data.UserVerify==='0'){
				var icon='';
			}
			var t='other/:'+data.UserID;
			return(
				<li key={i} >
					<div className="select-top">
						<div className="link">
							<div className="avatar" style={{backgroundImage:bg}} ><Link to={t}></Link></div>
							<h4 className='name'><div>{data.UserNickName} {icon}</div></h4>
							<div className="level"> {data.UserLevel} </div>
							<div className="releaseTime">{v.Dateline} </div>
							
							<div>
								<menu.menu id={this.props.id} iscmt={true} cid={v.ID}  passiveUserid={v.userinfo.UserID}/>
							</div>
							
								
							
						</div>
						<div className="comment" >{v.Content}</div>
					</div>
					<replay.replay data={this.state.replay} id={v.ID} input={this.input}  />
				</li>
			)
		})
		return(
			<div className="select-comments">
				<ul>
					{lis}
				</ul>
			</div>
		)
	}
}



module.exports={
	list:list
}
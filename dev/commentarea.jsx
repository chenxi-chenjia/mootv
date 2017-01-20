//评论区 查看评论+input框
const React=require('react');
const Input=require('./input.jsx');
const content=require('./contentarea.jsx');
import {Link} from 'react-router';

class comment extends React.Component{
	constructor(props){
		super(props);
		this.state={
			num:parseInt(this.props.zanNum),
			data:[],
			Userid:''
		};
		this.showloading=this.showloading.bind(this);
		this.add=this.add.bind(this);
	}
	
	componentDidMount(){
		if(localStorage.moomtvUser){
			
			var Userid=JSON.parse(localStorage.moomtvUser).UserID;
			this.setState({
				Userid:Userid
			})
		}
			
	}

	showloading(e){
		this.props.hasUser(true);
	}


	add(e){
		if(e.flag===1){
			var data=this.state.data;
			var userName=JSON.parse(localStorage.moomtvUser).UserNickName;
			var obj={
				C_Content:e.data,
				C_UserNicek:userName
			}
			data.unshift(obj);
			this.setState({
				num:this.state.num+1,
				data:data
			})
		}
	}
	

	render(){
		var id=this.props.id;
		var Userid=this.state.Userid;
		if(id!=Userid){
			var t='foundSecond/:'+id;
		}else{
			var t='mine'
		}
		var data=this.props.data.Comments;
		return(
			<div>
				<content.content id={id} data={data} />
				<div className="select-comments">
					<div className="praiseNum" style={{display:(this.state.num>5?'block':'none')}} >
						<Link to={t} >
							<span>查看全部 {this.state.num} 条评论</span>
						</Link>
					</div>
					<Input.input hasUser={this.showloading} add={this.add}  id={this.props.id} />
				</div>
			</div>
		)
	}
}




module.exports={
	comment:comment
}
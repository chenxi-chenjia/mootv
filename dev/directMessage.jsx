const React=require('react');
const $=require('jquery');
import {Link} from 'react-router';

class directMessage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			peopleData:[],
			value:''
		}
		this.inputReply=this.inputReply.bind(this);
		
	}

	inputReply(e){
		this.setState({
			value:e.target.value
		})
		var self=this;
		$(e.target).blur(function(){
			var v=self.state.value;
			self.setState({
				value:''
			})
		})
	}

	componentDidMount(){
		var data=[{name:'张丽',flag:false},{name:'敏敏',flag:true},{name:'张丽',flag:false},{name:'敏敏',flag:true},{name:'张丽',flag:false},{name:'敏敏',flag:true}];
		this.setState({
			peopleData:data
		})
	}
	render(){
		console.log(this.state.peopleData)
		var lis=this.state.peopleData.map((v)=>{
			if(v.flag){
				return(
					<li>
						<div className="mineDirectMessage">
							<div className="bubbleBox">
								<div className="bubble">
									<p>感动！很感人！帮推荐</p>
									<div className="releaseTime">一分钟前</div>
									<div className="delete">删除</div>
								</div>
							</div>
						</div>
					</li>
				)
			}else{
				return(
					<li className='you'>
						<Link to='others'>
							<div className="avatar"></div>
							<h4 className='name'>{v.name}</h4>
							<div className="icon"></div>
							<div className="level">Lv3</div>
							<div className="releaseTime">1分钟前</div>
							<div className="praisecontent">
							<div className="releaseMessage">
								<p>中国好节目，期待每一期</p>
							</div>
							</div>
						</Link>
					</li>	
				)
			}
		})
		return(
			<div id="directMessage">
				<ul>
					{lis}
				</ul>
				<div className="inputBox">
					<input type="text" placeholder='回复' 
					value={this.state.value}
					onChange={this.inputReply}
					/>
					<div className="inputIcon"></div>
				</div>
			</div>
		)
	}
}


module.exports={
	directMessage:directMessage
}
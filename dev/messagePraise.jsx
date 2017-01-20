const React=require('react');
const $=require('jquery');
import {Link} from 'react-router';

class messagePraise extends React.Component{
	constructor(props){
		super(props);
		this.state={
			peopleData:[],
		}
		this.addPraise=this.addPraise.bind(this);
	}
	componentDidMount(){
		var data=['张丽','张丽','张丽','张丽','张丽','张丽'];
		this.setState({
			peopleData:data
		})
	}
	addPraise(e){
		$(this).addClass('off').html('已关注');
	}
	render(){
		var lis=this.state.peopleData.map((v)=>{
			return(
			<li>
				<Link to='others'>
					<div className="avatar"></div>
					<h4 className='name'>{v}</h4>
					<div className="icon"></div>
					<div className="level">Lv3</div>
					<div className="releaseTime">1分钟前</div>
					<div className="praisecontent">
						<div>
							<div className="iconPraise"></div>
							<span className="font">赞了你的动态</span>
						</div>
					</div>
				</Link>
			</li>)
		})
		return(
			<div id="messagePraise">
				<ul>
					{lis}
				</ul>
			</div>
		)
	}
}


module.exports={
	messagePraise:messagePraise
}
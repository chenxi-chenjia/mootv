const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');
import {Link} from 'react-router';


class Hot extends React.Component{
	constructor(props){
		super(props);
		this.state={
			hotTopicData:[]
		}
	}
	componentDidMount(){
		var d=pf.d+'}';
		var u=pf.u+'GetIndexTopicList/';
		var self=this;
		$.post({
			url:u,
			data:d,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					self.setState({
						hotTopicData:v.Data
					})
				}
			}	
		})
	}
	render(){
		var hotData=this.state.hotTopicData;
		var hotlis=hotData.map((v,i)=>{
			var url='url('+v.TopicPic+')';
			var t='selectSecond/:'+v.TopicID;
			return(
				<li className="hotLi" key={i} id={v.TopicID} style={{backgroundImage:url}} >
					<Link to={t} >
						<div className="mask"></div>
						<div className="content">
							<h3 className="hotTitle"  >
								{v.TopicTitle}
							</h3>
							<div className="line"></div>
							<h5 className="describe">
								{v.TopicDes}
							</h5>
						</div>
					</Link>
				</li>
			)
		})
		var hotWidth=this.state.hotTopicData.length*3.2;
		return(
			<div id="hotTopic" >
				<h3 className="title">热门话题</h3>
				<div className="hotClass">
					<ul style={{width:hotWidth+'rem'}} >
						{hotlis}
					</ul>
				</div>
					
			</div>
		)
	}
}
module.exports={
	Hot:Hot
}
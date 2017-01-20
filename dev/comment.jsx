const React=require('react');
const $=require('jquery');
var pf=require('./postconfig.js');

import {Link} from 'react-router';

class comment extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[1,2,3,4,5]
		}
	}
	componentWillMount(){
		var Userid=this.props.params.id.substring(1);
		var CateID='';
		var page='1';
		var type='list-new';
		var d=pf.d+'","CateID":"'+CateID+'","page":"'+page+'","type":"'+type+'","Userid":"'+Userid+'"}';
		var u=pf.u+'GetContentList/';
		var self=this;
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
	render(){
		var lis=this.state.data.map((v,i)=>{
			return(
				<li key={i} >
					<Link to='others'>
						<div className="avatar">asdf</div>
						<h4 className='name'>sdfs</h4>
						<div className="icon"></div>
						<div className="level">Lv3</div>
						<div className="releaseTime">1分钟前</div>
						<div className="comments">
							中国好节目！期待每一期。
						</div>
					</Link>
				</li>
			)
		})
		return(
			<div id="comment">
				<ul>
					{lis}
				</ul>
			</div>
		)
	}
}

module.exports={
	comment:comment
}
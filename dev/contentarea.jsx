//评论列表

const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');
import {Link} from 'react-router';

class content extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
		};
	}
	

	render(){
		var data=this.props.data;
		var lis=data.map((v,i)=>{
			if(i<5){
				return(
					<li key={i} >
						<p>
							<span className="master"> <Link to='others' >{v.C_UserNicek}</Link></span>
							：{v.C_Content}
						</p>
					</li>
				)
			}
		})
		return(
			<div className="praiseComment"  >
				<ul>
					{lis}
				</ul>
			</div>
		)
	}
}





module.exports={
	content:content
}
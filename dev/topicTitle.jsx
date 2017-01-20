const React=require('react');
import {Link} from 'react-router';



class topic extends React.Component{
	render(){
		var data=this.props.data;

		var lis=data.map((v)=>{
			var t='selectSecond/:'+v.TopicID;
			return <Link to={t} key={v.TopicID}><span style={{color:v.TopicColor}} >#{v.TopicTitle}#</span></Link>
		})

		return <span className='teamName'>{lis}</span>
	}
}



module.exports={
	topic:topic
}
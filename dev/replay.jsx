const React=require('react');

class replay extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
		}
		this.input=this.input.bind(this);
	}
	input(){
		this.props.input(true);
	}
	render(){
		var data=this.props.data;
		var lis=data.map((v,i)=>{
			return(
				<li onClick={this.input} key={i}  >
					<span className="name">
						{v.UserNickName}：
					</span>
					{v.Content}
				</li>
			)
		})
		return(
			<ul className="listbydis">
				{lis}
			</ul>
		)
	}
}



module.exports={
	replay:replay
}
const React=require('react');
const Publish=require('./publish.jsx');
const $=require('jquery');

import {Link} from 'react-router';
class Footer extends React.Component{
	constructor(props){
		super(props);
		this.state={
			Userid:'',
			actionSheet:false
		};
		this.showPublish=this.showPublish.bind(this);
		this.offPublish=this.offPublish.bind(this);
	}
	showPublish(e){
		e.preventDefault();
		if(localStorage.moomtvUser==undefined){
			this.props.hasUser(true);
		}else{
			var Userid=JSON.parse(localStorage.moomtvUser).Userid;
			this.setState({
				Userid:Userid,
				actionSheet:true
			})
			$("body").on("touchmove",function(event){
				event.preventDefault;
			}, false)
		}
	}
	offPublish(flag){
		this.setState({
			actionSheet:flag
		})
		$("body").off("touchmove");
	}
	render(){
		return(
			<div>
				<div id="footer">
					<ul>
						<li className="footer-select">
							<Link to='/'>
								<div className="footer-lis">
									<div className="footer-bgm"></div>
									<span className="footer-font">
										精选
									</span>
								</div>
							</Link>
						</li>
						<li className="footer-found">
							<Link to="/Found">
								<div className=" footer-lis">
									<div className="footer-bgm"></div>
									<span className="footer-font">
										发现
									</span>
								</div>
							</Link>
						</li>
						<li className="footer-publish">
							<div className=" footer-lis"
							onClick={this.showPublish}
							>
								<div className="footer-bgm">
									
								</div>
							</div>
						</li>
						<li className="footer-message">
							<Link to='message' >
								<div className=" footer-lis">
									<div className="footer-bgm"></div>
									<span className="footer-font">
										消息
									</span>
								</div>
							</Link>
						</li>
						<li className="footer-mine">
							<Link to='mine' >
								<div className=" footer-lis">
									<div className="footer-bgm"></div>
									<span className="footer-font">
										我的
									</span>
								</div>
							</Link>
						</li>
					</ul>
				</div>
				<Publish.Publish flag={this.state.actionSheet} offPublish={this.offPublish} />
			</div>
				
			
		)
	}
}

module.exports={
	Footer:Footer
}
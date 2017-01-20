const React=require('react');
const $ = require('jquery');
const pf=require('./postconfig.js');
import ReactSwipe from 'react-swipe';

class Banner extends React.Component{
	constructor(props){
		super(props);
		this.state={
			bannerData:[]
		}		
	}
	componentDidMount(){
		var d=pf.d+'}';
		var u=pf.u+'GetIndexBannerList/';
		var self=this;
		$.post({
			url:u,
			data:d,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					self.setState({
						bannerData:v.Data
					})
				}else{
					self.setState({
						bannerData:[]
					})
				}
			}
		})
	}
	render(){
		//获取屛宽
		var screenWidth=$(window).width();
		var bannerData=this.state.bannerData;

		var bannerImgWidth=bannerData.length*screenWidth;
		var bannerBtnWidth=bannerData.length*0.3;


		
		var bannerImg=bannerData.map((v,i)=>{
			var url='url('+v.BannerPic+')';
			return(
				<div className="swiper-slide" key={i} style={{backgroundImage:url}}>
					<a href={v.BannerUrl}></a>
				</div>
			)
		})
		return(
			<div id='banner' >
				<ReactSwipe className=" bannerImg" swipeOptions={{continuous: false}} key={bannerImg.length}>
					{bannerImg}
				</ReactSwipe>
		       
		    </div>
		)
	}
}
module.exports={
	Banner:Banner
}
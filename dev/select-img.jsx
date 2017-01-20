//列表显示图片

const React=require('react');
const $=require('jquery');

class img extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}
		this.showLageImg=this.showLageImg.bind(this);
		
	}
	showLageImg(e){
		var imgsurl=[];
		this.props.data.PicList.forEach((v)=>{
			imgsurl.push(v);
		})
		var index=$(e.target).closest('li').index();
		wx.previewImage({
			current: imgsurl[index],
    		urls: imgsurl 
		})

	}
	
	render(){
		var data=this.props.data;
		//判断是否是图片
		if(data.Is_Pic==1){
			if(this.props.showOriginalImage){
				var lis=data.PicList.map((v,i)=>{
					return (
						<li className="pic_list" key={i} >
							<img src={v}/>
						</li>
					)
				})
			}else{
				var lis=data.PicList.map((v,i)=>{
					var url='url('+v+'?imageView2/1/w/200/h/200/interlace/0/q/100)';
					return (<li className='imgLi' key={i}  >
								<img src={v+'?imageView2/1/w/200/h/200/interlace/0/q/100'} onTouchEnd={this.showLageImg} style={{width:'100%',height:'100%'}} alt=""/>
							</li>)
				})
			}
			var s=<ul>{lis}</ul>
		}else if(data.Is_Pic==2){
			var lis=data.PicList.map((v,i)=>{
				return <video src={v} poster={v+'?vframe/jpg/offset/5'}  key={i} controls="controls"  preload="none" className='showVideo'></video>
			})
			var s=<div>{lis} </div>
		}
		return(
			<div className="select-imgs">
				{s}
			</div>
		)
	}
}


module.exports={
	img:img
}
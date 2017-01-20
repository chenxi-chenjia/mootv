const React=require('react');
const $=require('jquery');
const loading=require('./loading.jsx');
const thumbUp=require('./thumbUparea.jsx');
const commentarea=require('./commentarea.jsx');
const focusarea=require('./focusarea.jsx');
const pf=require('./postconfig.js');
const selectImg=require('./select-img.jsx');
const content=require('./contentarea.jsx');




import {Link} from 'react-router';

class selectDynamic extends React.Component{
	constructor(props){
		super(props);
		this.state={
			Userid:'',
			hasUser:false,
			loading:false
		};
		
		this.deleteMyComment=this.deleteMyComment.bind(this);
		this.showloading=this.showloading.bind(this);
	}
	
	//注册页面显示
	showloading(e){
		this.props.hasUser(true);
	}

	deleteMyComment(e){
		this.props.deleteMyComment(e);
		
	}


	render(){
		var data= this.props.data;
		var lis=data.map((v,i)=>{
			
			//id
			var id = v.ID;
			
			//点赞区域传参
			var thumbUpData={
				ZanList:v.ZanList,
				Is_Zan:v.Is_Zan,
				ZanCount:v.ZanCount,
				id:v.UserInfo.UserID,
				Topics:v.Topics
			}

			//关注区域传参
			var focusData={
				UserHeader:v.UserInfo.UserHeader,
				IsFocus:v.UserInfo.IsFocus,
				Topics:v.Topics,
				UserVerify:v.UserInfo.UserVerify,
				UserNickName:v.UserInfo.UserNickName,
				UserLevel:v.UserInfo.UserLevel,
				Time:v.Time,
				id:v.UserInfo.UserID
				
			}
			

			//评论内容区传参
			var contentData={
				Comments:v.Comments,
			}

			//图片区传参
			var imgData={
				Is_Pic:v.Is_Pic,
				PicList:v.PicList
			}
			

			//链接跳转
			var t='foundSecond/:'+v.ID;
			return(
				<li className="Select" key={i} >
					<focusarea.focus  data={focusData}  hasUser={this.showloading} isDelete={this.props.isDelete} id={id} deleteMyComment={this.deleteMyComment} />
					<div className='linkBox'>
						<div className="select-title">
							<h4>
								{v.Content}
							</h4>
						</div>
						<Link to={t}></Link>
						<selectImg.img id={id} data={imgData} />
					</div>
					
					<thumbUp.thumbUp id={id} data={thumbUpData} hasUser={this.showloading} />
					<commentarea.comment hasUser={this.showloading} data={contentData} zanNum={v.CommentsCount} id={id}  />
				</li>
			)
		})


		if(this.props.title=='1'){
			var title=<h3 className="title">精选动态</h3>
		}else{
			var title='';
		}
		return(
			<div>
				<div id="selectDynamic"  >
					{title}
					<ul className="selectUl">
						{lis}
					</ul>
				</div>
			</div>
				

		)
	}
}
module.exports={
	Select:selectDynamic
}
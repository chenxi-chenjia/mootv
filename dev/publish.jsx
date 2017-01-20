const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');
import {Link} from 'react-router';

class Publish extends React.Component{
	constructor(props){
		super(props);
		this.state={
			actionSheet:this.props.actionSheet,
			callMethed:'',
			photos:[],
			shownav:true,
			hasVideo:false,
			video:'',
			topic:'插入话题',
			TopicID:'',
			topics:[],
			clickTopic:false,
			photosUP:[],
			delete:false,
			content:'',
			remand:'',
			remandflag:false,
			videoUP:'',
			Waitingforloading:false
			
		};
		this.offPublish=this.offPublish.bind(this);
		this.callMethedFile=this.callMethedFile.bind(this);
		this.callMethedCamera=this.callMethedCamera.bind(this);
		this.upfile=this.upfile.bind(this);
		this.removeImg=this.removeImg.bind(this);
		this.removeVideo=this.removeVideo.bind(this);
		this.addvideo=this.addvideo.bind(this);
		this.publishOnload=this.publishOnload.bind(this);
		this.offclickTopic=this.offclickTopic.bind(this);
		this.openclickTopic=this.openclickTopic.bind(this);
		this.choseToptic=this.choseToptic.bind(this);
		this.content=this.content.bind(this);
		this.remandoff=this.remandoff.bind(this);
	}
	

	
	//关闭提醒框
	remandoff(e){
		e.preventDefault();
		this.setState({
			remand:'',
			remandflag:false
		})
	}

	//评论
	content(e){
		this.setState({
			content:e.target.value
		})
	}
	

	componentWillMount(){
		this.setState({
			actionSheet:this.props.actionSheet,
			callMethed:'',
			photos:[],
			shownav:true,
			hasVideo:false,
			video:'',
			topic:'插入话题',
			TopicID:'',
			topics:[],
			clickTopic:false,
			photosUP:[],
			delete:false,
			content:'',
			remand:'',
			remandflag:false,
			leaveflag:false
		})
	}


	//
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
					var arr=[];
					v.Data.forEach((v)=>{
						var obj={
							TopicTitle:v.TopicTitle,
							TopicID:v.TopicID
						}
						arr.push(obj)
					})
					self.setState({
						topics:arr
					})
				}
			}	
		})
	}


	//选择话题
	choseToptic(e){
		e.preventDefault();
		var index=$(e.target).index()-1;
		this.setState({
			topic:this.state.topics[index].TopicTitle,
			TopicID:this.state.topics[index].TopicID,
			clickTopic:false
		})
	}
	
	//点击插入话题开启话题选择框
	openclickTopic(){
		this.setState({
			clickTopic:true
		})
	}

	//关闭话题选择框
	offclickTopic(){
		this.setState({
			clickTopic:false
		})
	}

	//发布
	publishOnload(event){
		event.preventDefault();
		//发布图片
		var self=this;
		if(this.state.callMethed==='file'){
			var Pics=this.state.photosUP;
			var TopicID=this.state.TopicID;
			var Content=this.state.content;
			if(Pics.length&&TopicID&&Content){
				var Userid=JSON.parse(localStorage.moomtvUser).UserID;
				var TopicID=this.state.TopicID;
				var Picscontent=this.state.photosUP.join(',');
				var Videocontent='';
				var Content=this.state.content;
				var u=pf.u+'UploadContent/';
				var d=pf.d+',"Userid":"'+Userid+'","Type":"1","Topicid":"'+TopicID+'","Picscontent":"'+Picscontent+'","Videocontent":"'+Videocontent+'","Content":"'+Content+'"}';
				$.post({
					url:u,
					data:d,
					success:function(e){
						var v=JSON.parse(e);
						if(v.ResCode==='10000'){
							self.setState({
								callMethed:'',
								photos:[],
								shownav:true,
								hasVideo:false,
								video:'',
								topic:'插入话题',
								TopicID:'',
								topics:self.state.topics,
								clickTopic:false,
								photosUP:[],
								delete:false,
								content:'',
								remand:'',
								remandflag:false,
								videoUP:'',
								Waitingforloading:false
							})
							self.props.offPublish(false);
							window.location='https://m.moomtv.tv/#/mine'
						}
					}
				})
			}else if(this.state.photos.length===0){
				this.setState({
					remand:'请添加图片',
					remandflag:true
				})
				setTimeout(function () {
	               self.setState({
						remandflag:false
					})
	            }, 2000);

			}else if(TopicID===''){
				this.setState({
					remand:'请选择话题',
					remandflag:true
				})
				setTimeout(function () {
	               self.setState({
						remandflag:false
					})
	            }, 2000);
			}else if(Content===''){
				this.setState({
					remand:'请输入内容',
					remandflag:true
				})
				setTimeout(function () {
	               self.setState({
						remandflag:false
					})
	            }, 2000);
			}
		}else{
			//发布视频文件
			var video=this.state.videoUP;
			var TopicID=this.state.TopicID;
			var Content=this.state.content;
			if(video&&TopicID&&Content){
				var Userid=JSON.parse(localStorage.moomtvUser).UserID;
				var TopicID=this.state.TopicID;
				var Picscontent='';
				var Videocontent=video;
				var Content=this.state.content;
				var u=pf.u+'UploadContent/';
				var d=pf.d+',"Userid":"'+Userid+'","Type":"2","Topicid":"'+TopicID+'","Picscontent":"'+Picscontent+'","Videocontent":"'+Videocontent+'","Content":"'+Content+'"}';
				$.post({
					url:u,
					data:d,
					success:function(e){
						var v=JSON.parse(e);
						if(v.ResCode==='10000'){
							self.setState({
								callMethed:'',
								photos:[],
								shownav:true,
								hasVideo:false,
								video:'',
								topic:'插入话题',
								TopicID:'',
								topics:self.state.topics,
								clickTopic:false,
								photosUP:[],
								delete:false,
								content:'',
								remand:'',
								remandflag:false,
								videoUP:'',
								Waitingforloading:false
							})
							self.props.offPublish(false);
							window.location='https://m.moomtv.tv/#/mine'
						}
					}
				})
			}else if(this.state.video===''){
				this.setState({
					remand:'请添加视频',
					remandflag:true
				})
				setTimeout(function () {
	               self.setState({
						remandflag:false
					})
	            }, 2000);
			}else if(TopicID===''){
				this.setState({
					remand:'请选择话题',
					remandflag:true
				})
				setTimeout(function () {
	               self.setState({
						remandflag:false
					})
	            }, 2000);
			}else if(Content===''){
				this.setState({
					remand:'请输入内容',
					remandflag:true
				})
				setTimeout(function () {
	               self.setState({
						remandflag:false
					})
	            }, 2000);
			}
		}
	}

	//添加视频文件
	addvideo(e){
		e.preventDefault();
		var self=this;
		var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
		var file= files[0];

		 if (url) {
            src =url.createObjectURL(file);
        } else {
            src = e.target.result;
        }

        var videoUP = new FormData();
        //为FormData对象添加数据
        videoUP.append('file',$("#uploaderInput")[0].files[0]);

        this.setState({
        	video:src,
        	hasVideo:true,
        	Waitingforloading:true
        })
		
		var Userid=JSON.parse(localStorage.getItem('moomtvUser')).UserID;
        $.post({
			url:pf.u+'uploadfile/UploadVideo/NonceStr-'+pf.m+'__Sign-'+pf.c+'__Userid-'+Userid,
			data:videoUP,
			cache: false,
            contentType: false,       
            processData: false,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					var data=v.Data;
					self.setState({
						videoUP:data,
						delete:true,
						Waitingforloading:false
					})
				}
			}
		})
        
	}

	//移除视频文件
	removeVideo(e){
		e.preventDefault();
		this.setState({
			video:'',
			hasVideo:false
		})
	}

	//移除图片
	removeImg(e){
		e.preventDefault();
		if(this.state.delete){
			var index=$(e.target).closest('li').index();
			var photos=this.state.photos;
			var photosUP=this.state.photosUP;
			photos.splice(index,1);
			photosUP.splice(index,1);
			this.setState({
				photos:photos,
				photosUP:photosUP
			})
		}
			
	}

	//退出发表层
	offPublish(e){
		e.preventDefault();
		var flag = false;
		this.props.offPublish(flag);
	}

	//发表视频
	callMethedCamera(e){
		e.preventDefault();
		this.setState({
			callMethed:'camera',
			shownav:false
		})
	}

	//发表图片
	callMethedFile(e){
		e.preventDefault();
		this.setState({
			callMethed:'file',
			shownav:false
		})
	}

	//添加图片
	upfile(e){
		e.preventDefault();
		var self=this;
		var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files,srcs=this.state.photos;
        for (var i = 0, len = files.length; i < len; ++i) {
        	if(i<9){
        		 var file = files[i];
	            if (url) {
	                src =url.createObjectURL(file);
	            } else {
	                src = e.target.result;
	            }
	            srcs.push(src);
        	}
		}
		var photosUP = new FormData();
        //为FormData对象添加数据
        $.each($('#uploaderInput')[0].files, function(i, file) {
            photosUP.append(i, file);
        });
        this.setState({
			photos:srcs,
			Waitingforloading:true
		})
		var Userid=JSON.parse(localStorage.getItem('moomtvUser')).UserID;
		console.log(photosUP)
        $.post({
			url:pf.u+'uploadfile/UploadFile/NonceStr-'+pf.m+'__Sign-'+pf.c+'__Userid-'+Userid,
			data:photosUP,
			cache: false,
            contentType: false,       
            processData: false,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					var photosUP=self.state.photosUP;
					v.Data.forEach((v)=>{
						photosUP.push(v);
					})
					self.setState({
						photosUP:photosUP,
						delete:true,
						Waitingforloading:false
					})
				}
			}
		})
		
	}


	render(){
		
		//遍历添加图片创建dom
		if(this.state.callMethed){

			//创建话题选择框

			var topLis=this.state.topics.map((v,i)=>{
				return(
					<div className="weui-actionsheet__cell"
					key={i}
					onTouchEnd={this.choseToptic}
					>{v.TopicTitle}</div>
				)

			})
			if(this.state.callMethed=='file'){
				var upimgs=this.state.photos.map((v,i)=>{
					if(i<9){
						var url='url('+v+')'; 
						return(
							<li className="weui-uploader__file" key={i} style={{backgroundImage:url}} >
								<div className="delete"
								style={{display:(this.state.delete?'block':'none')}}
								id={i}
								onTouchEnd={this.removeImg}
								></div>
							</li>
						)
					}
				})
		

				//创建发表图片dom
				var pictureup=(
					
					<div className="pictureup">
						
						<div className="upCell">
							
							<div className="youSpeack">
								
								<textarea type="text" placeholder='这一刻你想说...'
								onChange={this.content}
								value={this.state.content}

								 />
							
							</div>
							
							<div className="weui-cell" >
								
								<div className="weui-cell__bd">
									
									<ul className="weui-uploader__files" id='uploaderFiles' >
										{upimgs}
									
									</ul>
									
									<div className="weui-uploader__input-box">
										
										<input type="file" id='uploaderInput' className='weui-uploader__input' accept='image/*'  multiple
										max='9' min='0' capture="camera"
										onChange={this.upfile}
										/>
									
									</div>
								
								</div>
								
							
							</div>
							
							<div className="insertTopic"
							onTouchEnd={this.openclickTopic}
							>
								
								<span>{this.state.topic}</span>
								
								<div className="icon"></div>
							
							</div>
					
						</div>
						
						<div className="btnBox">
							
							<div className="weui-btn weui-btn_disabled weui-btn_primary" 
							style={{display:(this.state.Waitingforloading?'block':'none')}}
							>图片正在上传</div>
							<Link to='mine'>
								<div className="weui-btn weui-btn_primary"
								style={{display:(this.state.Waitingforloading?'none':'block')}}
								onTouchEnd={this.publishOnload}
								>发布
									</div>
							</Link>
						</div>
						
						<div id="actionSheet_wrap" style={{display:(this.state.clickTopic?'block':'none')}} >

						    <div className="weui-mask" id="iosMask" onTouchEnd={this.offclickTopic} ></div>

						    <div className="weui-actionsheet weui-actionsheet_toggle" id="iosActionsheet">

						        <div className="weui-actionsheet__menu">
									<div className="clickTopic">
										<div className="title">热门话题</div>
									</div>

									{topLis}
						            
						        </div>


						    </div>

						</div>
					</div>
				)

				//创建小视屏dom
			}else if(this.state.callMethed=='camera'){
				var pictureup=(
					
					<div className="pictureup">
						
						<div className="upCell">
							
							<div className="youSpeack">
								
								<textarea type="text" placeholder='这一刻你想说...' 
								onChange={this.content}
								value={this.state.content}
								/>
							
							</div>
							
							<div className="weui-cell" >
							
								<div className="weui-cell__bd">
									
									<div className="cameraUpBox" 
									style={{display:(this.state.hasVideo?'block':'none')}}
									>
										<video src={this.state.video} controls="controls"  preload="auto" className='publishVideo' ></video>
										<div className="delete"
										style={{display:(this.state.delete?'block':'none')}}
										onTouchEnd={this.removeVideo}
										></div>
									
									</div>
									
									<div className="weui-uploader__input-box"
									style={{display:(this.state.hasVideo?'none':'block')}}
									>
									
										<input type="file" id='uploaderInput' className='weui-uploader__input' 
										capture="camcorder" 
										onChange={this.addvideo}
										/>
									
									</div>
								
								</div>
							
							</div>
							
							<div className="insertTopic"
							onTouchEnd={this.openclickTopic}
							>
								
								<span>{this.state.topic}</span>
								
								<div className="icon"></div>
							
							</div>
						
						</div>
						
						<div className="btnBox">

							<div className="weui-btn weui-btn_disabled weui-btn_primary" 
							style={{display:(this.state.Waitingforloading?'block':'none')}}
							>视频正在上传</div>
							<Link to='mine'>
							<div className="weui-btn weui-btn_primary"
							style={{display:(this.state.Waitingforloading?'none':'block')}}
							onTouchEnd={this.publishOnload}
							>
								<Link to='mine'>
									发布
								</Link>
								
							</div>
							</Link>
						</div>
						
						<div id="actionSheet_wrap" style={{display:(this.state.clickTopic?'block':'none')}} >

						    <div className="weui-mask" id="iosMask" onTouchEnd={this.offclickTopic} ></div>

						    <div className="weui-actionsheet weui-actionsheet_toggle" id="iosActionsheet">

						        <div className="weui-actionsheet__menu">
									<div className="clickTopic">
										<div className="title">热门话题</div>
									</div>
						            {topLis}

						        </div>


						    </div>

						</div>

					</div>

				)
			}
		}else{
			var pictureup='';
		}
		var style=this.props.flag?'block':'none';
		
		var remandstyle=this.state.remandflag?'block':'none';
		return(

			//判断是否点击发表按钮
			<div id='publish' style={{display:style}}>

				<div id="actionSheet_wrap" style={{display:(this.state.shownav?'block':'none')}} >

				    <div className="weui-mask" id="iosMask" onTouchEnd={this.offPublish} ></div>

				    <div className="weui-actionsheet weui-actionsheet_toggle" id="iosActionsheet">

				        <div className="weui-actionsheet__menu">

				            <div className="weui-actionsheet__cell"
							onTouchEnd={this.callMethedFile}
				            >照片</div>

				            <div className="weui-actionsheet__cell"
							onTouchEnd={this.callMethedCamera}
				            >视频</div>

				        </div>

				        <div className="weui-actionsheet__action">

				            <div className="weui-actionsheet__cell" id="iosActionsheet"
							onTouchEnd={this.offPublish}
				            >取消</div>

				        </div>

				    </div>

				</div>

				{pictureup}
				<div className="weui-toptips weui-toptips_warn js_tooltips" style={{display:(this.state.remandflag?'block':'none')}}>{this.state.remand}</div>
			</div>
		)
	}
}


module.exports={
	Publish:Publish
}


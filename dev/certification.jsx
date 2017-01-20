const React=require('react');
const $=require('jquery');
const pf=require('./postconfig.js');

class certification extends React.Component{
	constructor(props){
		super(props);
		this.state={
			falseFlag:true,
			UserName:'',
			UserReason:'',
			UserIDCode:'',
			UserContact:'',
			photos:[],
			photosUP:[],
			Userid:'',
			error:'',
			errorFlag:false,
			picnum:0
		}
		this.closeCertification=this.closeCertification.bind(this);
		this.UserName=this.UserName.bind(this);
		this.UserReason=this.UserReason.bind(this);
		this.UserIDCode=this.UserIDCode.bind(this);
		this.UserContact=this.UserContact.bind(this);
		this.recertification=this.recertification.bind(this);
		this.imageUp=this.imageUp.bind(this);
		this.determineUpload=this.determineUpload.bind(this);
	}
	componentWillMount(){
		var Userid=JSON.parse(localStorage.getItem("moomtvUser")).UserID;
		this.setState({
			Userid:Userid
		})
		
	}

	//重新认证
	recertification(e){
		this.setState({
			falseFlag:false
		})
	}

	//认证名称
	UserName(e){
		this.setState({
			UserName:e.target.value
		})
	}
	//认证理由
	UserReason(e){
		this.setState({
			UserReason:e.target.value
		})
	}
	//身份证
	UserIDCode(e){
		this.setState({
			UserIDCode:e.target.value
		})
	}
	//联系方式
	UserContact(e){
		this.setState({
			UserContact:e.target.value
		})
	}
	//添加图片
	imageUp(e){
		var self=this;
		var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files,srcs=this.state.photos;
        for (var i = 0, len = files.length; i < len; ++i) {
        	if(i<3){
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
			picnum:srcs.length,
			Waitingforloading:true
		})
		var Userid=this.state.Userid;
        $.post({
			url:pf.u+'uploadfile/UploadVerifyFile/NonceStr-'+pf.m+'__Sign-'+pf.c+'__Userid-'+Userid,
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
	

	//认证上传
	determineUpload(){
		var self=this;
		var f1=this.state.UserName,f2=this.state.UserReason,f3=this.state.UserIDCode,f4=this.state.UserContact,f5=this.state.photosUP;
		if(f1&&f2&&f3&&f4&&f5){
			var Userid=this.state.Userid;
			var u=pf.u+'PersonVerifySet/';
			var d=pf.d+',"Userid":"'+Userid+'","UserName":"'+f1+'","UserReason":"'+f2+'","UserIDCode":"'+f3+'","UserContact":"'+f4+'","UserPics":"'+f5+'"}';
			$.post({
				url:u,
				data:d,
				success:function(e){
					var v=JSON.parse(e);
					if(v.ResCode==='10000'){
						self.props.closeCertification();
					}
				}
			})
		}
		
	}



	//关闭
	closeCertification(){
		this.props.closeCertification();
	}

	render(){
		var data=this.props.data;
		var content='';
		if(data){
			var certification='';
			var num=0;
			if(data.UserStatus==0){
				num=0;
			}else if(data.UserStatus==1){
				num=1;
			}else if(data.UserStatus==2){
				num=2;
			}else if(data.UserStatus==3){
				num=3;
			}


			if(num==0){
				var imgs=this.state.photos.map((v,i)=>{
					var url='url('+v+')';
					 return <li className="weui-uploader__file" key={i} style={{backgroundImage:url}} ></li>
				})
				content=(
					<div id='certificate'>
						<div className="weui-cells__title">认证名称</div>
						<div className="weui-cells">
				            <div className="weui-cell">
				                <div className="weui-cell__bd">
				                    <input className="weui-input" type="text" onChange={this.UserName} value={this.state.UserName} placeholder="请输入认证名称" />
				                </div>
				            </div>
				        </div>
				        <div className="weui-cells__title">认证理由</div>
						<div className="weui-cells">
				            <div className="weui-cell">
				                <div className="weui-cell__bd">
				                    <input className="weui-input" type="text" onChange={this.UserReason} value={this.state.UserReason} placeholder="请输入认证理由" />
				                </div>
				            </div>
				        </div>
				        <div className="weui-cells__title">身份证</div>
						<div className="weui-cells">
				            <div className="weui-cell">
				                <div className="weui-cell__bd">
				                    <input className="weui-input" type="number" onChange={this.UserIDCode} value={this.state.UserIDCode} placeholder="请输入身份证号码" />
				                </div>
				            </div>
				        </div>
				        <div className="weui-cells__title">联系方式</div>
						<div className="weui-cells">
				            <div className="weui-cell">
				                <div className="weui-cell__bd">
				                    <input className="weui-input" type="number" onChange={this.UserContact} value={this.state.UserContact}  placeholder="请输入手机号" />
				                </div>
				            </div>
				        </div>
				        <div className="page__bd">
					        <div className="weui-gallery" id="gallery">
					            <span className="weui-gallery__img" id="galleryImg"></span>
					            <div className="weui-gallery__opr">
					                <a href="javascript:" className="weui-gallery__del">
					                    <i className="weui-icon-delete weui-icon_gallery-delete"></i>
					                </a>
					            </div>
					        </div>

					        <div className="weui-cells weui-cells_form">
					            <div className="weui-cell">
					                <div className="weui-cell__bd">
					                    <div className="weui-uploader">
					                        <div className="weui-uploader__hd">
					                            <p className="weui-uploader__title">申请认证上传图片</p>
					                            <div className="weui-uploader__info">{this.state.picnum}/2</div>
					                        </div>
					                        <div className="weui-uploader__bd">
					                            <ul className="weui-uploader__files" id="uploaderFiles">
					                               {imgs}
					                            </ul>
					                            <div className="weui-uploader__input-box">
					                                <input id="uploaderInput" className="weui-uploader__input" onChange={this.imageUp} type="file" accept="image/*" multiple />
					                            </div>
					                        </div>
					                    </div>
					                </div>
					            </div>
					        </div>
					    </div>
						<div className="page__bd page__bd_spacing">
					        <a href="javascript:;" className="weui-btn weui-btn_primary" onTouchEnd={this.determineUpload} >确定</a>
					    </div>
					</div>
				)
			}else if(num==1){
				content=(
					<div className="icon-box">
		            <i className="weui-icon-success weui-icon_msg"></i>
		            <div className="icon-box__ctn">
		                <h3 className="icon-box__title">认证成功</h3>
		            </div>
						<div className="page__bd page__bd_spacing" onTouchEnd={this.closeCertification} >
					        <a href="javascript:;" className="weui-btn weui-btn_primary" >确定</a>
					    </div>
		        </div>
				)
			}else if(num==2){
				content=(
					<div className="icon-box">
		            <i className="weui-icon-waiting weui-icon_msg"></i>
		            <div className="icon-box__ctn">
		                <h3 className="icon-box__title">正在认证中</h3>
		            </div>
						<div className="page__bd page__bd_spacing" onTouchEnd={this.closeCertification} >
					        <a href="javascript:;" className="weui-btn weui-btn_primary" >确定</a>
					    </div>
		        </div>
				)
			}else if(num==3){
				if(this.state.falseFlag){
					content=(
						<div>
							<div className="icon-box">
					            <i className="weui-icon-warn weui-icon_msg"></i>
					            <div className="icon-box__ctn">
					                <h3 className="icon-box__title">认证失败</h3>
					            </div>
					        </div>
					        <div className="page__bd page__bd_spacing special">
						        <a href="javascript:;" className="weui-btn weui-btn_primary" onTouchEnd={this.recertification}>重新认证</a>
						    </div>
						</div>
							
					)
				}else{

				}
			}


		}	
		return(
			<div id="certification">
				{content}
				
			</div>
		)
	}
}


module.exports={
	certification:certification
}
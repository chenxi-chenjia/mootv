const React=require('react');
const pf=require('./postconfig.js');
const $=require('jquery');


class avater extends React.Component{
	constructor(props){
		super(props);
		this.state={
			changeFlag:false,
			data:'',
			user:'',
			exitFlag:false
		}
	}
	componentWillMount(){
		var user=JSON.parse(localStorage.getItem("moomtvUser"));
		console.log(user)
		this.setState({
			user:user
		})
	}

	//修改头像
	changeAvater(){
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
        	}
		}
		self.setState({
			data:src
		})
		var photosUP = new FormData();
        //为FormData对象添加数据
        $.each($('#uploaderInput')[0].files, function(i, file) {
            photosUP.append(i, file);
        });
        this.setState({
			photos:srcs,
			Waitingforloading:true
		})
		var Userid=this.state.user.UserID;
        $.post({
			url:pf.u+'uploadfile/UploadFile/NonceStr-'+pf.m+'__Sign-'+pf.c+'__Userid-'+Userid,
			data:photosUP,
			cache: false,
            contentType: false,       
            processData: false,
			success:function(e){
				var v=JSON.parse(e);
				if(v.ResCode==='10000'){
					self.setState({
						photosUP:photosUP,
						exitFlag:true
					})
				}
			}
		})
		
	}

	render(){
		var url=this.state.changeFlag?'url('+this.state.user.UserHeader+')':'url('+this.state.data+')';
		return(
			<div className="weui-cells weui-cells_form">
	            <div className="weui-cell">
	                <div className="weui-cell__bd">
	                    <div className="weui-uploader">
	                        <div className="weui-uploader__hd">
	                            <p className="weui-uploader__title">选择图片</p>
	                        </div>
	                        <div className="weui-uploader__bd">
	                            <div className="weui-uploader__files" id="uploaderFiles">
	                                <div className="weui-uploader__file" style={{backgroundImage:url}}></div>
	                            </div>
	                            <div className="weui-uploader__input-box">
	                                <input id="uploaderInput" className="weui-uploader__input" type="file" accept="image/*" />
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
		)
	}
}

module.exports={
	avater:avater
}
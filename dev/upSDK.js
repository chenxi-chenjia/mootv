const uploader =Qiniu.uploader({
    runtimes:'html5,flash,html4',
    browse_button:'pickfiles',
    container:'container',
    max_file_size:'200mb',
    dragdrop:false,
    uptoken_url:'https://resource.moomtv.tv/contents/',
    domain:'resources',
    get_new_uptoken: false,
    auto_start:true,
    max_retries: 3,   
    init:{
        
    }  

})



module.exports={
    sdk:uploader
}
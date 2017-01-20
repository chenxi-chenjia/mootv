const express=require('express');
const app=express();
app.listen(3000);
app.get('/',function(req,res){
	res.sendFile(__dirname+'/site/public/index.html')
})    
app.use(express.static(__dirname+'/site/public'))
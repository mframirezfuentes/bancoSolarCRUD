const http= require('http')
const url=require('url')


http.createServer(async(req,res)=>{

    if(req.url=='/'&&req.method =='GET'){

    }
}

).listen(3000,()=>console.log('Servidor encendido'))
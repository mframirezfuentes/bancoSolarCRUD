const http= require('http')
const fs=require('fs')
const url=require('url')


http.createServer(async(req,res)=>{

    if(req.url=='/'&&req.method =='GET'){
        res.setHeader('content-type','text,html')
        const html=fs.readFileSync('index.html','utf8')
        res.end(html)

    }
}

).listen(3000,()=>console.log('Servidor encendido'))
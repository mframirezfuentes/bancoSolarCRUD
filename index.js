const http = require('http')
const fs = require('fs')
const url = require('url')
const {
    insertar,consultar
} = require('./conexion')


http.createServer(async (req, res) => {

    if (req.url == '/' && req.method == 'GET') {
        res.setHeader('content-type', 'text,html')
        const html = fs.readFileSync('index.html', 'utf8')
        res.end(html)

    }
    if (req.url == "/usuario" && req.method == 'POST') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk

        })
        req.on('end', async () => {
            const datos = Object.values(JSON.parse(body))
            const respuesta = await insertar(datos)
            res.end(JSON.stringify(respuesta))
        })

    }
    if (req.url == "/usuarios" && req.method === 'GET') {
        const registros= await consultar()
        console.log("registros:",registros)
        res.end(JSON.stringify(registros))
    }
}).listen(3000, () => console.log('Servidor encendido'))
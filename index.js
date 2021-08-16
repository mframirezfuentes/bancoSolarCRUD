const http = require('http')
const fs = require('fs')
const url = require('url')
const {
    insertar,
    consultar,
    editar
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
        const registros = await consultar()
        res.end(JSON.stringify(registros))
    }
    if (req.url == '/usuario' && req.method == 'PUT') {
        let body = "";
        console.log('body', body)
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', async () => {
            const datos = Object.values(JSON.parse(body))
            console.log(datos)
            const respuesta = await editar(datos)
            res.end(JSON.stringify(respuesta))
        })
    }
}).listen(3000, () => console.log('Servidor encendido'))
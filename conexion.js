const {
    Pool
} = require('pg')

const config = {
    user: 'postgres',
    password: '1234',
    port: 5432,
    host: 'localhost',
    database: 'bancosolar',
    max: 20,
    min: 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}

const pool= new Pool(config)

const insertar= async(datos)=>{
    pool.connect((error_conexion,client,release)=>{
        if(error_conexion)return console.log(error_conexion.code)
        try {
            const consulta={
                text:`INSERT INTO usuarios values((select max(id)+1 from usuarios),$1,)`,
                value: datos

            }
            
        } catch (error) {
            console.log(error.code)
            return error
            
        }

    })
}
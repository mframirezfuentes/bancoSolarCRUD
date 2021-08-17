const {
    Pool
} = require('pg')

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    port: 5432,
    database: "bancosolar"

})

const insertar = async (datos) => {
    const consulta = {
        text: `INSERT INTO usuarios(nombre,balance) values($1,$2)`,
        values: datos,
    }
    try {
        const result = await pool.query(consulta)
        return result
    } catch (error) {
        console.log(error.code)
        return error
    }

}
const consultar = async () => {
    try {
        const result = (await pool.query("select * from usuarios order by id asc")).rows;
        return result;
    } catch (error) {
        console.log(error.code)
        return error
    }
}
const editar = async (datos) => {
    const consulta = {
        text: `UPDATE usuarios SET nombre=$2, balance=$3 where id=$1 RETURNING *;`,
        values: datos,
    }
    try {
        const result = await pool.query(consulta)
        return result

    } catch (error) {
        console.log(error.code)
        return error
    }
}
const eliminar = async (id) => {
    try {

        const result = await pool.query(`DELETE FROM usuarios where id=${id}`)
        return result

    } catch (error) {
        console.log(error.code)
        return error
    }

}
const transferencia = async (datos) => {

    const consulta = {
        text: "INSERT INTO transferencias(emisor,receptor,monto,fecha) values((select id from usuarios where nombre =$1),(select id from usuarios where nombre =$2),$3,CURRENT_TIMESTAMP)",
        values: [datos[0],datos[1],Number(datos[2])]
    }
    const acreditar={
        text: `UPDATE usuarios SET balance= balance -$3 where nombre=(select id from usuarios where nombre =$1)`,
        values:[datos[0],datos[1],Number(datos[2])]
    }
    try {
        await pool.query('BEGIN')
        const result= await pool.query(consulta) 
        const acreditarFinal= await pool.query(acreditar)         
        return acreditarFinal

    } catch (error) {
        console.log(error.code)
        return error
    }

}
 const consultarTransferencia= async()=>{

    const consulta={
        text: `select t.fecha, u.nombre as emisor,u2.nombre as receptor,t.monto
        from transferencias as t
        INNER join usuarios as u on t.emisor=u.id  
        inner join usuarios as u2 on t.receptor=u2.id`,
        rowMode:"array"
    }    
     try {
        
         const result = (await pool.query(consulta))
    
         return result
     } catch (error) {
         console.log(error.code)
         return error
     }
 }
module.exports = {
    insertar,
    consultar,
    editar,
    eliminar,
    transferencia,
    consultarTransferencia
    
}
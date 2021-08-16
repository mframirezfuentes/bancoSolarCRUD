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
        const result = await (await pool.query("select * from usuarios order by id asc")).rows;
        return result;
    } catch (error) {
        console.log(error.code)
        return error
    }
}

module.exports = {
    insertar,consultar
}
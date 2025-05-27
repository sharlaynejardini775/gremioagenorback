const { poolPromise, sql } = require('../config/db');

async function obterResultados() {
const pool = await poolPromise;
const result = await pool.request().query( 'SELECT C.numero AS chapaNumero, C.nome AS nomeChapa, COUNT(V.id) AS totalVotos FROM Chapa C LEFT JOIN Voto V ON C.numero = V.chapaNumero GROUP BY C.numero, C.nome ORDER BY totalVotos DESC' );

return result.recordset;
}

module.exports = {
obterResultados
};
const { poolPromise, sql } = require('../config/db');

async function listarTodasChapas() {
try {
const pool = await poolPromise;
const result = await pool.request().query( 'SELECT * from Chapa');
return result.recordset;
} catch (err) {
throw new Error('Erro ao listar chapas: ' + err.message);
}
}

async function buscarChapaPorNumero(numero) {
try {
const pool = await poolPromise;
const result = await pool.request()
.input('numero', sql.Int, numero)
.query( 'SELECT c.numero, c.nome, c.imagemUrl, a1.nome AS aluno1, a2.nome AS aluno2, a3.nome AS aluno3, a4.nome AS aluno4, a5.nome AS aluno5, a6.nome AS aluno6, a7.nome AS aluno7 FROM Chapa c LEFT JOIN Aluno a1 ON a1.id = c.aluno1Id LEFT JOIN Aluno a2 ON a2.id = c.aluno2Id LEFT JOIN Aluno a3 ON a3.id = c.aluno3Id LEFT JOIN Aluno a4 ON a4.id = c.aluno4Id LEFT JOIN Aluno a5 ON a5.id = c.aluno5Id LEFT JOIN Aluno a6 ON a6.id = c.aluno6Id LEFT JOIN Aluno a7 ON a7.id = c.aluno7Id WHERE c.numero = @numero ');
return result.recordset[0]; // Retorna apenas 1
} catch (err) {
throw new Error('Erro ao buscar chapa: ' + err.message);
}
}
//teste teste teste
module.exports = {
listarTodasChapas,
buscarChapaPorNumero
};
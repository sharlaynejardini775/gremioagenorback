const { poolPromise, sql } = require('../config/db');

// Listar todos os alunos
async function listarAlunos() {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Aluno');
  return result.recordset;
}

// Listar alunos por ano
async function listarAlunosPorAno(ano) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('ano', sql.VarChar, ano)
    .query('SELECT * FROM Aluno WHERE ano = @ano');
  return result.recordset;
}

// Buscar aluno por ID
async function buscarAlunoPorId(id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM Aluno WHERE id = @id');
  return result.recordset[0];
}

// Registrar voto
async function registrarVoto(alunoId, numeroChapa) {
  const pool = await poolPromise;

  try {
    console.log('Registrando voto para aluno:', alunoId, 'chapa:', numeroChapa);
    
    const transaction = await pool.transaction();
    await transaction.begin();

    // Atualizar o campo jaVotou
    const updateResult = await transaction.request()
      .input('alunoId', sql.Int, alunoId)
      .query(`
        UPDATE Aluno SET jaVotou = 1
        WHERE id = @alunoId AND (jaVotou IS NULL OR jaVotou = 0)
      `);

    if (updateResult.rowsAffected[0] === 0) {
      await transaction.rollback();
      throw new Error('Aluno já votou ou não encontrado');
    }

    // Inserir o voto na tabela Voto
    await transaction.request()
      .input('alunoId', sql.Int, alunoId)
      .input('chapaNumero', sql.Int, numeroChapa)
      .input('dataHora', sql.DateTime, new Date())
      .query(`
        INSERT INTO Voto (alunoId, chapaNumero, dataHora)
        VALUES (@alunoId, @chapaNumero, @dataHora)
      `);

    await transaction.commit();
  } catch (err) {
    console.error('Erro ao registrar voto:', err);
    throw err;
  }
}

module.exports = {
  listarAlunos,
  listarAlunosPorAno,
  buscarAlunoPorId,
  registrarVoto
};

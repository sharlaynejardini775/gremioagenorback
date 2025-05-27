const AlunoModel = require('../models/alunoModel');

async function getTodosAlunos(req, res) {
try {
const alunos = await AlunoModel.listarAlunos();
res.json(alunos);
} catch (err) {
res.status(500).json({ erro: 'Erro ao buscar alunos' });
}
}

async function getAlunosPorAno(req, res) {
const ano = req.params.ano;

if (!ano || typeof ano !== 'string') {
return res.status(400).json({ erro: 'Ano inválido' });
}

try {
const alunos = await AlunoModel.listarAlunosPorAno(ano);
res.json(alunos);
} catch (err) {
res.status(500).json({ erro: 'Erro ao buscar alunos por ano' });
}
}

async function getAlunoPorId(req, res) {
const id = parseInt(req.params.id);
if (isNaN(id)) return res.status(400).json({ erro: 'ID inválido' });

try {
const aluno = await AlunoModel.buscarAlunoPorId(id);
if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
res.json(aluno);
} catch (err) {
res.status(500).json({ erro: 'Erro ao buscar aluno' });
}
}

async function registrarVoto(req, res) {
const id = parseInt(req.params.id);
const { numeroChapa } = req.body;

if (isNaN(id) || isNaN(numeroChapa)) {
return res.status(400).json({ erro: 'Dados inválidos' });
}

try {
const aluno = await AlunoModel.buscarAlunoPorId(id);
if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
if (aluno.votou) return res.status(400).json({ erro: 'Aluno já votou' });


await AlunoModel.registrarVoto(id, numeroChapa);
res.status(200).json({ sucesso: true, mensagem: 'Voto registrado com sucesso' });
} catch (err) {
res.status(500).json({ erro: 'Erro ao registrar voto' });
}
}

module.exports = {
getTodosAlunos,
getAlunosPorAno,
getAlunoPorId,
registrarVoto
};
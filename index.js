const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware de CORS (permitir todas as origens — recomendado apenas em desenvolvimento)
app.use(cors());

// Middleware para requisições JSON
app.use(express.json());

// Conexão com o banco de dados
const { poolPromise } = require('./config/db');

// Importação de rotas
const alunoRoutes = require('./routes/alunoRoutes');
const chapaRoutes = require('./routes/chapaRoutes');
const votoRoutes = require('./routes/votoRoutes');

// Teste de conexão com o banco de dados
app.get('/teste-db', async (req, res) => {
try {
const pool = await poolPromise;
const result = await pool.request().query('SELECT GETDATE() AS dataHora');
res.json({ conectado: true, dataHora: result.recordset[0].dataHora });
} catch (err) {
console.error('Erro na conexão com o banco:', err);
res.status(500).json({ conectado: false, erro: err.message });
}
});

// Rota raiz para verificação da API
app.get('/', (req, res) => {
res.send('🚀 API do Grêmio funcionando!');
});

// Registro das rotas
app.use('/alunos', alunoRoutes);
app.use('/chapas', chapaRoutes);
app.use('/votos', votoRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
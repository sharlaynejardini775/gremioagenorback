// config/db.js
const sql = require('mssql');

const dbConfig = {
user: 'sharlaynejardini',
password: 'Angel775!', // considere mover isso para uma variável de ambiente (.env)
server: 'shaybd.database.windows.net',
database: 'shayGremio',
options: {
encrypt: true,
trustServerCertificate: false
}
};

// Cria e exporta a função de conexão
const poolPromise = new sql.ConnectionPool(dbConfig)
.connect()
.then(pool => {
console.log('✅ Conectado ao SQL Server (Azure)');
return pool;
})
.catch(err => {
console.error('❌ Falha na conexão com o banco de dados:', err);
throw err;
});

module.exports = {
sql,
poolPromise
};
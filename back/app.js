const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    port: 5432,
});

app.use(cors());
app.use(express.json());

function criptografarSenha(senha) {
    if (typeof senha !== 'string') {
        throw new TypeError('A senha deve ser uma string');
    }
    return crypto.createHash('sha256').update(senha).digest('hex');
}

app.post('/register', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        res.status(400).json({ message: 'Email e senha são obrigatórios' });
        return;
    }

    const senhaCriptografada = criptografarSenha(senha);
    console.log(email, senhaCriptografada);
    
    pool.query('INSERT INTO usuarios (email, password, created_at) VALUES ($1, $2, NOW())', [email, senhaCriptografada], (error, results) => {
        if (error) {
            console.error('Erro ao adicionar usuário:', error);
            res.status(500).json({ message: 'Erro ao adicionar usuário' });
            return;
        }
        res.status(201).json({ message: 'Usuário adicionado com sucesso' });
    });
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    console.log(email, senha);
    if (!email || !senha) {
        res.status(400).json({ message: 'Email e senha são obrigatórios' });
        return;
    }

    const senhaCriptografada = criptografarSenha(senha);
    console.log(email, senhaCriptografada);
    
    pool.query('SELECT * FROM usuarios WHERE email = $1 AND password = $2', [email, senhaCriptografada], (error, results) => {
        if (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({ message: 'Erro ao buscar usuário' });
            return;
        }
        if (results.rowCount === 0) {
            res.status(401).json({ message: 'Usuário não encontrado' });
            return;
        }
        const user = results.rows[0];
        res.status(200).json({ user, token: 'seu_token_aqui' });
    });
});

app.listen(3001, () => { 
    console.log('Servidor rodando na porta 3001');
});
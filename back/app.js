const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: '',
    port: 5432,
});

app.use(cors());
app.use(express.json());

const SECRET_KEY = 'segredo';

function criptografarSenha(senha) {
    if (typeof senha !== 'string') {
        throw new TypeError('A senha deve ser uma string');
    }
    return crypto.createHash('sha256').update(senha).digest('hex');
}

// Rota de registro de usuários
app.post('/register', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        res.status(400).json({ message: 'Email e senha são obrigatórios' });
        return;
    }

    const senhaCriptografada = criptografarSenha(senha);
   
    
    pool.query('INSERT INTO usuarios (email, senha, data_registro) VALUES ($1, $2, NOW())', [email, senhaCriptografada], (error, results) => {
        if (error) {
            console.error('Erro ao adicionar usuário:', error);
            res.status(500).json({ message: 'Erro ao adicionar usuário' });
            return;
        }
        res.status(201).json({ message: 'Usuário adicionado com sucesso' });
    });
});

// Rota de login de usuários
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        res.status(400).json({ message: 'Email e senha são obrigatórios' });
        return;
    }

    const senhaCriptografada = criptografarSenha(senha);
    
    pool.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senhaCriptografada], (error, results) => {
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
        
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        // Retorna o usuário e o token JWT
        res.status(200).json({ user, token });
    });
});

// Middleware para verificar o token JWT
function verificarToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    console.log("...");
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.userId = decoded.id; // Armazena o ID do usuário no request
        next();
    });
}

// Exemplo de rota protegida
app.get('/perfil', verificarToken, (req, res) => {
    res.status(200).json({ message: `Bem-vindo, usuário com ID: ${req.userId}` });
});

app.listen(3001, () => { 
    console.log('Servidor rodando na porta 3001');
});


module.exports = {pool, app, criptografarSenha};
const express = require('express');
const app = express(); 
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

app.use(express.json())
app.use(cors());

const pool = new Pool({
    localhost: 'localhost',
    user: 'postgres',
    password: '', 
    database: 'ecommerce',
    port: 5432
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Conectado ao banco de dados');
    }
});

function criptografarSenha(senha) {
    return crypto.createHash('sha256').update(senha).digest('hex');
}

function criptografarSenhaBcrypt(senha) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(senha, salt);
}

app.post('/register', (req, res) => {
    const { email, senha } = req.body;
    const senhaCriptografada = criptografarSenhaBcrypt(senha);
    console.log(email, senhaCriptografada);

    pool.query('INSERT INTO users (email, password_hash, created_at) VALUES ($1, $2, NOW() )', [email, senhaCriptografada], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send('Erro ao cadastrar usuário');
        } else {
            // Gerar um token JWT
            const token = jwt.sign({ email }, 'chave_secreta', { expiresIn: '1h' });
            res.status(201).json({ message: 'Usuário cadastrado com sucesso', token });
        }
    });
});


app.post('/login', async (req, res) => {
    const { email, password, token } = req.body;

    try {
        if (token) {
            // Verificar o token JWT
            jwt.verify(token, 'seu_segredo_jwt', async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Token inválido' });
                }

                // Token válido, autenticar o usuário com base no token
                const result = await pool.query('SELECT * FROM users WHERE email = $1', [decoded.email]);
                if (result.rows.length === 0) {
                    return res.status(400).send('Usuário não encontrado');
                }

                const user = result.rows[0];
                res.status(200).json({ message: 'Autenticação via token bem-sucedida', user });
            });
        } else {
            // Autenticar o usuário com base no email e senha
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

            if (result.rows.length === 0) {
                return res.status(400).send('Usuário não encontrado');
            }

            const user = result.rows[0];
            if (bcrypt.compareSync(password, user.password_hash)) {
                // Gerar um novo token JWT
                const newToken = jwt.sign({ email: user.email }, 'seu_segredo_jwt', { expiresIn: '1h' });
                res.status(200).json({ message: 'Usuário logado com sucesso', token: newToken });
            } else {
                res.status(400).send('Usuário ou senha incorretos');
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

app.on('exit', () => {
    pool.end();
});
app.listen(3001, () => { 
    console.log('Servidor rodando na porta 3001');
})
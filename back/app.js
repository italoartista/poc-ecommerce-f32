const express = require('express');
const app = express(); 
const cors = require('cors');
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const { Pool } = require('pg');

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
            res.status(201).send('Usuário cadastrado com sucesso');
        }
    }); 
   
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    console.log(email, password)
    // ver se o usuário existe
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    // console.log(result.rows);
    console.log(result)
   
    if(result.rows.length === 0) {
        return res.status(400).send('Usuário não encontrado');
    } else { 
        const user = result.rows[0];
        if(bcrypt.compareSync(password, user.password_hash)) {
            res.status(200).send('Usuário logado com sucesso');
        } else {
            res.status(400).send('Usuário ou senha incorretos');
        }
    }
});




app.on('exit', () => {
    pool.end();
});
app.listen(3001, () => { 
    console.log('Servidor rodando na porta 3001');
})
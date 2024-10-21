const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

app.use(express.json())
app.use(cors());
app.use(express.json());


function criptografarSenha(senha) {
    if (typeof senha !== 'string') {
        throw new TypeError('A senha deve ser uma string');
    }
    return crypto.createHash('sha256').update(senha).digest('hex');
}


function criptografarSenhaBcrypt(senha) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(senha, salt);
}

// Rota de registro de usuários
app.post('/register', (req, res) => {
    const { email, senha } = req.body;
    const senhaCriptografada = criptografarSenha(senha);
    console.log(email, senhaCriptografada);
    // Aqui você pode continuar com o processamento dos dados, como salvar no banco de dados
    res.send('Registro recebido');
});


app.listen(3001, () => { 
    console.log('Servidor rodando na porta 3001');
});


module.exports = {pool, app, criptografarSenha};
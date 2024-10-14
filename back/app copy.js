const express = require('express');
const app = express(); 
const cors = require('cors');
const crypto = require('crypto');

app.use(express.json())
app.use(cors());


function criptografarSenha(senha) {
    return crypto.createHash('sha256').update(senha).digest('hex');
}

app.post('/register', (req, res) => {
    const { email, senha } = req.body;
    const senhaCriptografada = criptografarSenha(senha);
    console.log(email, senhaCriptografada);
    // Aqui você pode continuar com o processamento dos dados, como salvar no banco de dados
    res.send('Registro recebido');
});


app.listen(3001, () => { 
    console.log('Servidor rodando na porta 3001');
})
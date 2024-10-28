const bcrypt = require('bcrypt');
const { criptografarSenhaBcrypt } = require('./app'); // Ajuste o caminho conforme necessário


const request = require('supertest');

const jwt = require('jsonwebtoken');

describe('POST /register', () => {
    it('deve registrar um novo usuário e retornar um token JWT', async () => {
        const response = await request('http://localhost:3001')
            .post('/register')
            .send({
                email: 'test@example.com',
                senha: '123456'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Usuário cadastrado com sucesso');
        expect(response.body).toHaveProperty('token');

        // Verificar se o token JWT é válido
        const decoded = jwt.verify(response.body.token, 'minhachave');
        expect(decoded).toHaveProperty('email', 'test@example.com');
    });
});



describe('criptografarSenhaBcrypt', () => {
    it('deve criptografar a senha corretamente', () => {
        const senha = '123456';
        const senhaCriptografada = criptografarSenhaBcrypt(senha);

        // Verificar se a senha criptografada não é igual à senha original
        expect(senhaCriptografada).not.toBe(senha);

        // Verificar se a senha criptografada é válida
        const isMatch = bcrypt.compareSync(senha, senhaCriptografada);
        expect(isMatch).toBe(true);
    });
});
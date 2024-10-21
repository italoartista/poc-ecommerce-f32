// tests/auth.test.js
const request = require('supertest');
const app = require('express'); // Importa sua aplicação Express
const {pool} = require('./app.js'); // Importa a conexão com o banco de dados

describe('Auth Endpoints', () => {

    // Antes de rodar qualquer teste, limpar a tabela de usuários para começar do zero
    beforeAll(async () => {
        await pool.query('DELETE FROM usuarios');
    });

    // Testando o registro de usuário
    it('Deve registrar um novo usuário', async () => {
        const res = await request("http://localhost:3001")
            .post('/register')
            .send({
                email: 'teste@example.com',
                senha: 'senhaSegura123'
            });
        expect(res.statusCode).toEqual(201); // Espera que a resposta seja 201
        expect(res.body).toHaveProperty('message', 'Usuário adicionado com sucesso');
    });

    // Testando o login de usuário
    it('Deve fazer login do usuário e retornar um token JWT', async () => {
        const res = await request("http://localhost:3001")
            .post('/login')
            .send({
                email: 'teste@example.com',
                senha: 'senhaSegura123'
            });
        expect(res.statusCode).toEqual(200); // Espera que a resposta seja 200
        expect(res.body).toHaveProperty('token'); // Espera que a resposta tenha um token
    });

    // Testando uma rota protegida
    it('Deve falhar ao acessar uma rota protegida sem um token JWT', async () => {
        const res = await request("http://localhost:3001")
            .get('/perfil'); // Tentando acessar a rota protegida sem token
        expect(res.statusCode).toEqual(401); // Espera que a resposta seja 401
        expect(res.body).toHaveProperty('message', 'Token não fornecido');
    });

    // Testando uma rota protegida com token JWT
    it('Deve acessar a rota protegida com um token JWT válido', async () => {
        // Primeiro, faz login para obter o token
        const loginRes = await request("http://localhost:3001")
            .post('/login')
            .send({
                email: 'teste@example.com',
                senha: 'senhaSegura123'
            });

        const token = loginRes.body.token; // Extrai o token da resposta
        console.log(token);

        // Agora acessa a rota protegida usando o token
        const res = await request("http://localhost:3001")
            .get('/perfil')
            .set('Authorization', `Bearer ${token}`); // Envia o token no header

        expect(res.statusCode).toEqual(200); // Espera que a resposta seja 200
        expect(res.body).toHaveProperty('message');
    });
});

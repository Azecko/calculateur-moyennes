const server = require('./app.js');
const mysql = require('mysql2');
const supertest = require('supertest');
const request = supertest(server);
const { describe, it, expect } = require('@jest/globals');

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'secret',
    database: 'calculateur_moyennes'
  });

describe('Subject Endpoints', () => {
    it('PUT /subject should save in DB & return object with name', async () => {
        const name = 'Test Subject';
        const res = await request.put('/subject').send({name});

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('name');
        expect(res.body.name).toEqual(name);

        connection.query(
            'SELECT * from subject WHERE name = ?', [name],
            function(err, results) {
                expect(results[0].name).toEqual(name);
            }
        );
    });

    it('PUT /subject should return an error if subject name is too long and must not be saved in DB', async () => {
        const name = 'Test Subject Who Is Very Too Long So The Test Should Fail Because The Name Is Too Long To Be Saved In The Database';
        const res = await request.put('/subject').send({name});

        expect(res.status).toEqual(400);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('The value must be at most 64 characters long');

        connection.query(
            'SELECT * from subject WHERE name = ?', [name],
            function(err, results) {
                expect(results.length).toEqual(0);
            }
        );
    });
});

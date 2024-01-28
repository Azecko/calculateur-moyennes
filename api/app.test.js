const { app, connection} = require('./app.js');
const supertest = require('supertest');
const request = supertest(app);

const { describe, it, expect } = require('@jest/globals');

const ERROR_NAME = 'The value must be at most 64 characters long';

function testResponse(res, statusCode, propertyName, property) {
    expect(res.status).toEqual(statusCode);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty(propertyName);
    expect(res.body[propertyName]).toEqual(property);
}

function isNotSavedInDB(name) {
    connection.query(
        'SELECT * from subject WHERE id = ?', [1],
        function(err, results) {
            expect(results.name).not.toEqual(name);
        }
    );
}

describe('Subject Endpoints', () => {
    it('PUT /subject should save in DB & return object with name', async () => {
        const name = 'Test Subject';
        const res = await request.put('/subject').send({name});

        testResponse(res, 200, 'name', name);

        connection.query(
            'SELECT * from subject WHERE name = ?', [name],
            function(err, results) {
                expect(results[0].name).toEqual(name);
            }
        );
    });

    it('PUT /subject should return an error if subject name is too long and must not be saved in DB', async () => {
        const name = 'Test Subject Who Is Very Too Long So The Test Should Fail' +
            'Because The Name Is Too Long To Be Saved In The Database';
        const res = await request.put('/subject').send({name});

        testResponse(res,
            400,
            'message',
            ERROR_NAME
        );

        isNotSavedInDB(name);
    });

    it('PUT /subject should return an error if subject name is empty and must not be saved in DB', async () => {
        const name = '';
        const res = await request.put('/subject').send({name});

        testResponse(res,
            400,
            'message',
            ERROR_NAME
        );

        isNotSavedInDB(name);
    });

    it('PUT /subject should return an error if body is empty', async () => {
        const res = await request.put('/subject').send();

        testResponse(res,
            400,
            'message',
            'Body must not be empty'
        );
    });

    it('PUT /subject should return an error if subject name contains non ASCII characters and must not save in DB', async () => {
        const name = 'Test Subject 😊';
        const res = await request.put('/subject').send({name});

        testResponse(res,
            400,
            'message',
            'The value must be only ASCII characters'
        );

        isNotSavedInDB(name);
    });

    it('PUT /subject should return an error if body contains additional properties and must not save in DB', async () => {
        const name = 'Test Subject With Additional Properties';
        const res = await request.put('/subject').send({name, additional: 'property'});

        testResponse(res,
            400,
            'message',
            'Body must not contain additional properties'
        );

        isNotSavedInDB(name);
    });

    it('GET /subject should return subject name and must be the same in DB', async () => {
        const name = 'Test Subject';
        const res = await request.get('/subject');

        testResponse(res, 200, 'name', name);

        connection.query(
            'SELECT * from subject WHERE name = ?', [name],
            function(err, results) {
                expect(results[0].name).toEqual(name);
            }
        );
    });
});

afterAll(() => {
    connection.end();
});

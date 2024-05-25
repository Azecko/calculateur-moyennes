const { app, connection, calculateAverage } = require('./app.js');
const supertest = require('supertest');
const request = supertest(app);

const { describe, it, expect, beforeAll, beforeEach, afterAll } = require('@jest/globals');

const ERROR_NAME = 'The value must be at most 64 characters long';

function testResponse(res, statusCode, propertyName, property) {
    expect(res.status).toEqual(statusCode);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty(propertyName);
    expect(res.body[propertyName]).toEqual(property);
}

function isNotSavedInDB(name) {
    // Check in DB if the name is not saved
    connection.query(
        'SELECT * from subject WHERE id = ?', [1],
        function(err, results) {
            expect(results.name).not.toEqual(name);
        }
    );
}

describe('API Endpoints', () => {
    beforeAll((done) => {
        process.env.DB_NAME += '_test';

        // use the test database (or create it if it does not exist)
        connection.query('CREATE DATABASE IF NOT EXISTS ' + process.env.DB_NAME,  function (err) {
            if (err) throw err;
            connection.changeUser({ database: process.env.DB_NAME }, function (err) {
                if (err) throw err;
                // create the table if it does not exist
                connection.query('CREATE TABLE IF NOT EXISTS subject (id INT PRIMARY KEY, name VARCHAR(64))', function (err) {
                    if (err) throw err;
                    connection.query('CREATE TABLE IF NOT EXISTS grades (id INT PRIMARY KEY, name VARCHAR(64), grade FLOAT)', function (err) {
                        if (err) throw err;
                        done();
                    });
                });
            });
        });
    })

    beforeEach((done) => {
        // reset DB before each test
        connection.query('TRUNCATE TABLE subject',
            function(err, results) {
                if (err) throw err;
                connection.query('TRUNCATE TABLE grades',
                    function(err, results) {
                        if (err) throw err;
                        connection.query('INSERT INTO grades (id, name, grade) VALUES (1, "Geometry", 6), (2, "Algebra", 3.5), (3, "Trigonometry", 4.5), (4, "Statistics", 5.5), (5, "Linear Algebra", 4), (6, "Differential Equations", 5)',
                            function(err, results) {
                                if (err) throw err;
                                connection.query('INSERT INTO subject (id, name) VALUES (1, "Math")'
                                    , function(err, results) {
                                        if (err) throw err;
                                        done();
                                    });
                            });
                    }
                );
        });
    });

    it('PUT /subject should save in DB & return object with name', async () => {
        // Arrange
        const name = 'Test Subject';

        // Act
        const res = await request.put('/subject').send({name});


        // Assert
        // Check if the response is correct
        testResponse(res, 200, 'name', name);

        // Check in DB if the name is saved
        connection.query(
            'SELECT * from subject WHERE name = ?', [name],
            function(err, results) {
                expect(results[0].name).toEqual(name);
            }
        );
    });

    it('PUT /subject should return an error if subject name is too long and must not be saved in DB', async () => {
        // Arrange
        const name = 'Test Subject Who Is Very Too Long So The Test Should Fail' +
            'Because The Name Is Too Long To Be Saved In The Database';

        // Act
        const res = await request.put('/subject').send({name});

        // Assert
        // Check if the response is correct
        testResponse(res,
            400,
            'message',
            ERROR_NAME
        );

        // Check in DB if the name is not saved
        isNotSavedInDB(name);
    });

    it('PUT /subject should return an error if subject name is empty and must not be saved in DB', async () => {
        // Arrange
        const name = '';

        // Act
        const res = await request.put('/subject').send({name});

        // Assert
        // Check if the response is correct
        testResponse(res,
            400,
            'message',
            ERROR_NAME
        );

        // Check in DB if the name is not saved
        isNotSavedInDB(name);
    });

    it('PUT /subject should return an error if body is empty', async () => {
        // Arrange
        const name = null;

        // Act
        const res = await request.put('/subject').send(name);

        // Assert
        testResponse(res,
            400,
            'message',
            'Body must not be empty'
        );
    });

    it('PUT /subject should return an error if subject name contains non ASCII characters and must not save in DB', async () => {
        // Arrange
        const name = 'Test Subject 😊';

        // Act
        const res = await request.put('/subject').send({name});

        // Assert
        // Check if the response is correct
        testResponse(res,
            400,
            'message',
            'The value must be only ASCII characters'
        );

        // Check in DB if the name is not saved
        isNotSavedInDB(name);
    });

    it('PUT /subject should return an error if body contains additional properties and must not save in DB', async () => {
        // Arrange
        const name = 'Test Subject With Additional Properties';

        // Act
        const res = await request.put('/subject').send({name, additional: 'property'});

        // Assert
        // Check if the response is correct
        testResponse(res,
            400,
            'message',
            'Body must not contain additional properties'
        );

        // Check in DB if the name is not saved
        isNotSavedInDB(name);
    });

    it('GET /subject should return subject name and must be the same in DB', async () => {
        // Arrange
        const name = 'Math';

        // Act
        const res = await request.get('/subject');

        // Assert
        // Check if the response is correct
        testResponse(res, 200, 'name', name);

        // Check in DB if the name is the same
        connection.query(
            'SELECT * from subject WHERE name = ?', [name],
            function(err, results) {
                expect(results[0].name).toEqual(name);
            }
        );
    });

    it('Function calculateAverage should return the average of grades', () => {
        // Arrange
        const grades = [
            { id: 1, name: 'Geometry', grade: 6 },
            { id: 2, name: 'Algebra', grade: 3.5 },
            { id: 3, name: 'Trigonometry', grade: 4.5 },
            { id: 4, name: 'Statistics', grade: 5.5 },
            { id: 5, name: 'Linear Algebra', grade: 4 },
            { id: 6, name: 'Differential Equations', grade: 5 }
        ];

        // Act
        const average = calculateAverage(grades);

        // Assert
        const expectedAverage = 5;
        expect(average).toEqual(expectedAverage);
    });

    afterAll((done) => {
        connection.end(function(err) {
                if (err) throw err;
                done();
        });
    });
});

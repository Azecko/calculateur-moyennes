const server = require('./app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
const { describe, it, expect } = require('@jest/globals');

describe('Grades Endpoints', () => {
    it('GET /grades should show all grades', async () => {
        const res = await requestWithSupertest.get('/grades');

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('grades')
    });
});

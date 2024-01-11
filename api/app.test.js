const server = require('./app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);
const { describe, it, expect } = require('@jest/globals');

describe('Grades Endpoints', () => {
    it('GET /grades should show all grades & average', async () => {
        const res = await requestWithSupertest.get('/grades');

        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('grades')
        expect(res.body).toHaveProperty('average')

        const grades = res.body.grades;
        const average = grades.reduce((acc, grade) => {
            return acc + grade.grade
        }, 0) / grades.length;

        expect(res.body.average).toEqual(average);
    });
});

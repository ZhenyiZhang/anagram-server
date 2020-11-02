import app from '../../app';
import supertest from 'supertest';
const request = supertest(app);

describe('get', () => {
    test('gets initial', async done => {
        const response = await request.get('/api/anagrams');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual([]);
        done()
    });

    test('invalid wordA', async done => {
        const wordA = await request
            .post('/api/anagrams')
            .send({wordA: '', wordB: 'abc'});
        expect(wordA.status).toEqual(400);
        done()
    });

    test('invalid wordB', async done => {
        const wordB = await request
            .post('/api/anagrams')
            .send({wordA: 'abc', wordB: '123'});
        expect(wordB.status).toEqual(400);
        done();
    });

    test('empty words', async done => {
        const emptyWord = await request
            .post('/api/anagrams')
            .send({wordA: '', wordB: ''});
        expect(emptyWord.status).toEqual(400);
        done();
    });

    test('not anagram error', async done => {
        const response = await request
            .post('/api/anagrams')
            .send({wordA: 'b', wordB: 'a'});
        expect(response.status).toEqual(400);
        done()
    });
});
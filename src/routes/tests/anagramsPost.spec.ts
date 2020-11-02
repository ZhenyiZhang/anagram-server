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

    test('post anagram', async done => {
        const response = await request
            .post('/api/anagrams')
            .send({wordA: 'a', wordB: 'a'});
        expect(response.status).toEqual(200);
        const getTopTen = await request.get('/api/anagrams');
        expect(getTopTen.status).toEqual(200);
        expect(getTopTen.body).toEqual([{word: 'a', times: 1}]);
        done()
    });

    test('update anagram', async done => {
        const response = await request
            .post('/api/anagrams')
            .send({wordA: 'a', wordB: 'a'});
        expect(response.status).toEqual(200);
        const getTopTen = await request.get('/api/anagrams');
        expect(getTopTen.status).toEqual(200);
        expect(getTopTen.body).toEqual([{word: 'a', times: 2}]);
        done()
    });

    test('add anagram', async done => {
        const response = await request
            .post('/api/anagrams')
            .send({wordA: 'b', wordB: 'b'});
        expect(response.status).toEqual(200);
        const getTopTen = await request.get('/api/anagrams');
        expect(getTopTen.status).toEqual(200);
        expect(getTopTen.body).toEqual([
            {word: 'a', times: 2},
            {word: 'b', times: 1}
        ]);
        done()
    });

    test('add anagrams to ten', async done => {
        await request
            .post('/api/anagrams')
            .send({wordA: 'b', wordB: 'b'});
        await request
            .post('/api/anagrams')
            .send({wordA: 'c', wordB: 'c'});
        await request
            .post('/api/anagrams')
            .send({wordA: 'd', wordB: 'd'});
        await request
            .post('/api/anagrams')
            .send({wordA: 'e', wordB: 'e'});
        await request
            .post('/api/anagrams')
            .send({wordA: 'f', wordB: 'f'});
        await request
            .post('/api/anagrams')
            .send({wordA: 'g', wordB: 'g'});
        await request
            .post('/api/anagrams')
            .send({wordA: 'h', wordB: 'h'});
        await request
            .post('/api/anagrams')
            .send({wordA: 'i', wordB: 'i'});
        await request
            .post('/api/anagrams')
            .send({wordA: 'j', wordB: 'j'});
        const response = await request.get('/api/anagrams');
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(10);
        done()
    });

    test('add anagrams to eleven', async done => {
        await request
            .post('/api/anagrams')
            .send({wordA: 'aa', wordB: 'aa'});
        const response = await request.get('/api/anagrams');
        expect(response.status).toEqual(200);
        expect(response.body[response.body.length - 1]).toEqual({
            word: 'j',
            times: 1
        });
        done()
    });

    test('update to the first', async done => {
        await request
            .post('/api/anagrams')
            .send({wordA: 'aa', wordB: 'aa'});
        await request
            .post('/api/anagrams')
            .send({wordA: 'aa', wordB: 'aa'});
        await request
            .post('/api/anagrams')
            .send({wordA: 'aa', wordB: 'aa'});
        const response = await request.get('/api/anagrams');
        expect(response.status).toEqual(200);
        expect(response.body[0]).toEqual({
            word: 'aa',
            times: 4
        });
        done()
    });
});
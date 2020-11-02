import app from '../../app';
import axios from 'axios';
import AnagramRequest from '../../classes/AnagramRequest';
import EventSource from 'eventsource';

let server: any;
beforeEach(done => {server = app.listen(3001, done)});

const eventSource = new EventSource('http://localhost:3001/api/anagrams/live');
let TopTen: AnagramRequest[] = [];

eventSource.onmessage = (msg) => {
    TopTen = JSON.parse(msg.data);
};


describe('get', () => {
    test('gets initial', async done => {
        const response = await axios.get('http://localhost:3001/api/anagrams');
        expect(response.status).toEqual(200);
        done()
    });

    test('get live initial', async done => {
        setTimeout(() => {
            expect(TopTen).toEqual([]);
        }, 1000);
        done()
    });

    test('add anagrams', async done => {
        await axios.post('http://localhost:3001/api/anagrams', {
            wordA: 'a', wordB: 'a'
        });
        setTimeout(async() => {
            expect(TopTen).toEqual([{word: 'a', times: 1}]);
            await axios.post('http://localhost:3001/api/anagrams', {
                wordA: 'a', wordB: 'a'
            });
            setTimeout(() => {
                expect(TopTen).toEqual([{word: 'a', times: 2}]);
            }, 500)
        }, 1000);
        done()
    });
});

afterEach((done) => {
    eventSource.close();
    server.close(done);
});
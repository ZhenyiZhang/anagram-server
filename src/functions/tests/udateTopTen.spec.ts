import AnagramRequest from "../../classes/AnagramRequest";
import updateTopTen from "../updateTopTen";

const anagrams: AnagramRequest[] = [
    {word: 'a', times: 10},
    {word: 'b', times: 9},
    {word: 'c', times: 8},
    {word: 'd', times: 7}
];

describe('updateTopTen', () => {
    test('Less than 10', () => {
        updateTopTen({word: 'e', times: 6}, anagrams);

        expect(anagrams.length).toEqual(5);
        expect(anagrams[anagrams.length - 1]).toEqual({word: 'e', times: 6});
    });

    test('add to ten', () => {
        updateTopTen({word: 'f', times: 5}, anagrams);
        expect(anagrams.length).toEqual(6);
        updateTopTen({word: 'g', times: 4}, anagrams);
        expect(anagrams.length).toEqual(7);
        updateTopTen({word: 'h', times: 3}, anagrams);
        expect(anagrams.length).toEqual(8);
        updateTopTen({word: 'i', times: 2}, anagrams);
        expect(anagrams.length).toEqual(9);
        updateTopTen({word: 'i', times: 3}, anagrams);
        expect(anagrams.length).toEqual(9);
        updateTopTen({word: 'j', times: 2}, anagrams);
        expect(anagrams.length).toEqual(10);
    });

    test('not in the top ten', () => {
        updateTopTen({word: 'k', times: 1}, anagrams);
        expect(anagrams.length).toEqual(10);
        expect(anagrams[anagrams.length - 1]).toEqual({word: 'j', times: 2});
    });

    test('not in the top ten', () => {
        updateTopTen({word: 'k', times: 11}, anagrams);
        expect(anagrams.length).toEqual(10);
        expect(anagrams[0]).toEqual({word: 'k', times: 11});
    });
});
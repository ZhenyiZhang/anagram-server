import isAnagram from '../isAnagram';

describe('anagram', () => {
    test('anagram', () => {
       expect(
           isAnagram('anagram', 'margana')
       ).toEqual(true);
    });
    test('not a anagram', () => {
        expect(
            isAnagram('anagram', 'marganaa')
        ).toEqual(false);
    });
});
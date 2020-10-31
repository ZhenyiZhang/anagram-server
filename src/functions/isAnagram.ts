/*check if two words are anagram, words must be all in lowercase*/
const isAnagram = (wordA: string, wordB: string): boolean => {
    return wordA.split('').reverse().join('') === wordB;
};

export default isAnagram;
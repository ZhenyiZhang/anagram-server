const checkWord = (word: string): boolean => {
    if(word.length === 0) {
        return false;
    }
    if(!/^[a-zA-Z]+$/.test(word)) {
        return false;
    }
    return true;
};

export default checkWord;
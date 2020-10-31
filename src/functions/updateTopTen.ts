import AnagramRequest from "../classes/AnagramRequest";

const updateTopTen = (anagram: AnagramRequest, AnagramsTopTen: AnagramRequest[]) => {
    for(const a of AnagramsTopTen) {
        /*if the anagram is already in the top ten*/
        if(a.word === anagram.word) {
            a.times = anagram.times;
            AnagramsTopTen.sort(compareAnagrams);
            return;
        }
    }
    /*if there are less then 10 anagrams*/
    if(AnagramsTopTen.length < 10) {
        AnagramsTopTen.push(anagram);
        AnagramsTopTen.sort(compareAnagrams);
    } else {
        /*if the anagram is not in top ten*/
        if(anagram.times > AnagramsTopTen[AnagramsTopTen.length - 1].times) {
            AnagramsTopTen.push(anagram);
            AnagramsTopTen.sort(compareAnagrams);
            AnagramsTopTen.pop();
        }
    }
};

const compareAnagrams = (a: AnagramRequest, b: AnagramRequest) => {
    return b.times - a.times;
};

export default updateTopTen;

// 문제 설명
// 단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

// 재한사항
// s는 길이가 1 이상, 100이하인 스트링입니다.
// 입출력 예
// s	return
// abcde	c
// qwer	we

function solution(s) {
    var midIndex = Math.ceil(s.length/2) - 1;
    return s.substr(midIndex, Math.abs((s.length%2) - 2));
}

console.log(solution('abcde'));
console.log(solution('qwer'));

// 1등 답안

// function solution(s) {
//     return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
// }
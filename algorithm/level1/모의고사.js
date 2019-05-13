// 문제 설명
// 수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

// 1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
// 2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
// 3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

// 1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

// 제한 조건
// 시험은 최대 10,000 문제로 구성되어있습니다.
// 문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
// 가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.
// 입출력 예
// answers	return
// [1,2,3,4,5]	[1]
// [1,3,2,4,2]	[1,2,3]
// 입출력 예 설명
// 입출력 예 #1

// 수포자 1은 모든 문제를 맞혔습니다.
// 수포자 2는 모든 문제를 틀렸습니다.
// 수포자 3은 모든 문제를 틀렸습니다.
// 따라서 가장 문제를 많이 맞힌 사람은 수포자 1입니다.

// 입출력 예 #2

// 모든 사람이 2문제씩을 맞췄습니다.

// function solution(answers) {
//     var winer = [];
//     var first = 0;
//     var second = 0;
//     var third = 0;
//     var ans1 = 1;
//     var ans2 = 1;
//     for(var i = 0; i < answers.length; i++){
//         if(answers[i] === ans1)first += 1;
//         if(ans1 === 5) ans1 = 0;
//         ans1++;
//     }

//     for(var i = 0; i < answers.length; i++){
//         if(i%2 === 0) if(answers[i] === 2) {
//             second += 1;
//             continue;
//         }
//         if(answers[i] === ans2) second += 1;
//         if(ans2 === 5)var ans2 = 0;
//         ans2++;
//     }

//     for(var i = 0; i < answers.length; i++){

//     }

//     return winer;
// }

function solution(answers) {
    var winer = [];
    var firstMan = [1,2,3,4,5];
    var secondMan = [2, 1, 2, 3, 2, 4, 2, 5];
    var thirdMan = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    var answerslength = answers.length;
    var testpaper = [];

    function repeat(arr){
        var score = 0;

        for(var i = 0; i < Math.ceil(answerslength/arr.length); i++){
            testpaper = testpaper.concat(arr);
        }

        var j = 0;
        answers.forEach(element => {
            if(element === testpaper[j]){
                score = score + 1;
            }
            j++;
        });

        testpaper = [];
        return score;
    }

    var fScore = repeat(firstMan);
    var sScore = repeat(secondMan);
    var tScore = repeat(thirdMan);
    var maxScore = Math.max(fScore, sScore, tScore);
    if (fScore === maxScore)winer.push(1);
    if (sScore === maxScore)winer.push(2);
    if (tScore === maxScore)winer.push(3);
    return winer;
}
console.log(solution([1,2,3,4,5]));
console.log(solution([1,3,2,4,2]));

// 1등 답안

// function solution(answers) {
//     var answer = [];
//     var a1 = [1, 2, 3, 4, 5];
//     var a2 = [2, 1, 2, 3, 2, 4, 2, 5]
//     var a3 = [ 3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

//     var a1c = answers.filter((a,i)=> a === a1[i%a1.length]).length;
//     var a2c = answers.filter((a,i)=> a === a2[i%a2.length]).length;
//     var a3c = answers.filter((a,i)=> a === a3[i%a3.length]).length;
//     var max = Math.max(a1c,a2c,a3c);

//     if (a1c === max) {answer.push(1)};
//     if (a2c === max) {answer.push(2)};
//     if (a3c === max) {answer.push(3)};


//     return answer;
// }
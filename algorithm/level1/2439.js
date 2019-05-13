// 문제
// 첫째 줄에는 별 1개, 둘째 줄에는 별 2개, N번째 줄에는 별 N개를 찍는 문제

// 하지만, 오른쪽을 기준으로 정렬한 별(예제 참고)을 출력하시오.

// 입력
// 첫째 줄에 N(1 ≤ N ≤ 100)이 주어진다.

// 출력
// 첫째 줄부터 N번째 줄까지 차례대로 별을 출력한다.

// 예제 입력 1 
// 5
// 예제 출력 1 
//     *
//    **
//   ***
//  ****
// *****

var fs = require('fs');
var input = fs.readFileSync('/dev/stdin');
var number = parseInt(input);

function blank(blankNum){
    if(blankNum === 0) return answer;
    answer += " ";
    blank(blankNum - 1);
}
function star(i){
    if(i === 0) return;
    answer += "*";
    star(i - 1);
}

for (var i = 1; i <= number; i++){
    var blankNum = number - i;
    var answer = "";
    blank(blankNum);
    star(i);

    console.log(answer);
}
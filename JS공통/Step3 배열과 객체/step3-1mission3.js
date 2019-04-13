// const myReduce = (arr, callback, initialValue) => {
//     var reducer = callback;
// }

// const result = myReduce(arr, (next,prev) => {...}, []);

// const myReduce = (arr, callback, initialValue) => {
//     var result = arr.forEach(callback);
//     console.log(result);
// }

// const result = myReduce(arr, (next,prev) => {...}, []);

const myReduce = (arr, callback, initialValue) => {
    if (initialValue === undefined) {
        var initialValue = arr.shift();
    }
    var result = callback(initialValue, arr.shift());
    if(arr.length === 0){
        return result;
    }
    return myReduce(arr, callback, result);
}

var plus = myReduce([1,2,3,4,5], (next,prev) => {return next + prev}, 10);
console.log(plus);
var plusWithoutInit = myReduce([1,2,3,4,5], (next,prev) => {return next + prev});
console.log(plusWithoutInit);
var division = myReduce([1,2,5,2], (next,prev) => {return next / prev}, 100);
console.log(division);
var findMaxNumber = myReduce([1,2,3,4,5], (next,prev) => {return Math.max(next, prev)}, 2);
console.log(findMaxNumber);
var greetingMention = myReduce(["하세요? ", "오늘은 ", "날씨가 ", "좋아요."], (next,prev) => {return next + "" + prev}, "안녕"); // 문자 합치기
console.log(greetingMention);
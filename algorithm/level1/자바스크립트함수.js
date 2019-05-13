배열.sort(); // 배열안의 요소들을 정렬해준다.
// 배열안의 요소들이 숫자일 경우 순서대로 정렬할시
sort((a,b) => {return a-b;}) // 역순은 b-a
// 문자열과 문자열 비교 (sort와 함께쓰면 좋다. 참고> '문자열 내마음대로 정렬하기')
console.log('a'.localeCompare('b')) // -1
console.log('b'.localeCompare('a')) // 1
console.log('c'.localeCompare('c')) // 0

isNaN() // 관호안이 문자면 true 숫자면 false("1234"도 false다)
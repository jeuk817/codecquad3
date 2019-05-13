참조 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Working_with_Objects#%EA%B0%9D%EC%B2%B4_%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0  
  
자바스크립트는 간단한 객체기반 패러다임 상에서 만들어졌다. 객체는 속성(property)의 모음이며, property는 "이름"(name 또는 Key)과 "값"(value)의 연결로 이루어진다. 브라우저 안에 미리 정의 된 객체뿐 아니라 사용자들이 직접 자신만의 객체를 정의 할 수 도 있다.  

# 객체 생성하기
자바스크립트에는 미리 정의된 객체가 몇 개 존재한다. 사용자는 여기에 추가적으로 자신의 객체를 생성할 수 있다. 자바스크립트 1.2 부터는 객체 이니셜라이저(initializer)를 이용하여 객체를 생성할 수 있다. 또 다른 방법으로는 먼저 생성자 함수를 정의한 후 이 함수와 new 연산자를 이용하여 인스턴스를 만들 수 있다.

## 객체 이니셜라이저 (initializer)
생성자 함수를 사용하는 방법 대신, 객체 이니셜라이저를 사용하여 객체를 생성할 수 있다. 이 방식은 때때로 "리터럴 표기에 의한 객체 생성"(creating objects with literal notation)이라고도 불린다. 객체 이니셜라이저라는 단어는 C++에서도 비슷한 의미로 사용된다.  

예제 : 객체 이니셜라이저를 이용한 객체  생성의 문법  
var obj = { property_1:   value_1,   // property_# may be an identifier...  
            2:            value_2,   // or a number...  
            // ...,  
            "property n": value_n }; // or a string   

- obj는 새로 만들어질 객체 이름이고, property_i 는 식별자, value_i 는 수식인데 이 값이 property_i 에 할당 된다.
- obj 변수에 할당하는것은 선택사항이다. 생성된 객체를 다른 곳에서 참조할 필요가 없다면 변수에 할당하지 않아도 된다.(만약 생성된 객체를 변수를 사용하지 않고 구문 안에서 바로 사용하려면 블럭구문과 혼돈되지 않도록 리터널을 괄호로 감싸줄 필요가 있다.)  

- 객체 이니셜라이저는 수식이고, 각각의 이니셜라이저가 포함된 구문이 실행될 때 마다 이니셜라이저 수식에 의해 새로운 객체가 하나씩 생성이 된다.
- 똑같은 이니셜라이저에 의해 생성된 객체라도 서로 별개이며 비교 걸과는 동일하지 않음이 된다.
- 객체는 마치 new Object() 호출이 실행된 것처럼 생성이 된다. 즉, 객체 이니셜라이저 수식에 의해 만들어진 객체들은 Object의 인스턴스들이 된다.  

예제  
var myHonda = {color: "red", wheels: 4, engine: {cylinder: 4, size: 2.2}};  

## 리터럴
참조 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Values%2C_variables%2C_and_literals#Array_literals  

- 자바스크립트에서 값을 나타내기 위해 리터럴을 사용한다.
- 이는 말 그대로 스크립트에 부여한 고정값으로, 변수가 아니다.

### 배열 리터럴
- 배열 리터럴은 0개 이상의 식(expression) 목록이다. 
- 각 식은 배열 요소를 나타내고 대괄호 [] 로 묶인다.
- 배열 리터럴을 사용하여 배열을 만들 때, 그 요소로 지정된 값으로 초기화되고, 그 길이는 지정된 인수의 갯수로 설정된다.

### 배열 객체
참조 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Indexed_collections  

배열은 이름과 인덱스로 참조되는 정렬된 값들의 집합이다.  

- 자바스크립트는 명시적인 배열 데이터 형식을 가지고 있지 않는다.
- 그러나 미리 정의된 배열객체를 사용할 수 있고 배열 객체의 메서드를 개발하는 어플리케이션에서 사용되는 배열에 사용할 수 있다.

#### 배열 생성
var arr = new Array(element0, element1, ..., elementN);  
var arr = Array(element0, element1, ..., elementN);  
var arr = [element0, element1, ..., elementN];  

- 대괄호 문법은 일명 "배열 문자" 혹은 "배열 초기화"라고 한다.
- 대괄호 문법은 다른 배열 생성표기법 보다 짧고 일반적으로 선호하는 문법이다.

- 새로이 정의된 혹은 이미 존재하는 객체 변수의 속성으로 배열을 할당 할 수 있다.  
var obj = {};  
// ...  
obj.prop = [element0, element1, ..., elementN];  
  
// OR  
var obj = {prop: [element0, element1, ...., elementN]}  

#### 배열요소를 반복처리하기
- forEach() 메서드
var colors = ['red', 'green', 'blue'];  
colors.forEach(function(color) {  
  console.log(color);  
});  f
// red  
// green  
// blue  
  
color.forEach(color => console.log(color));  
// red  
// green  
// blue  

- forEach 에 인자로 주어진 함수는 배열의 각 요소에 대해 한번씩 실행이 되고 배열의 각 요소는 인자로 주어진 함수의 인자로 주어지게 된다.
- forEach 반복문으로 배열의 요소를 반복처리할 때, 배열을 정의할 때 생략된 요소는 처리대상이 되지 않는다.
- 하지만 undefined을 생략된 요소에 할당하게 되면 undefined로 처리된다.

- 자바스크립트 요소는 표준 객체 속성으로 저장되므로 for ... in 루프를 사용하여 자바스크립트 배열을 반복하는 것은 바람직하지 않다.
- 왜냐면 일반 요소들과 그리고 모든 열거할 수 있는 속성들이 나열되기 때문이다.

#### 배열 객체의 메서드
- concat() 메서드는 두개의 배열을 합쳐 새로운 배열을 반환한다.
var myArray = new Array('1', '2', '3');  
myArray = myArray.concat('a', 'b', 'c');   
// myArray is now ["1", "2", "3", "a", "b", "c"]  

- slice(start_index, upto_index) 메서드는 배열의 특정 부분을 추출하여 그 추출된 부분을 포함하는 새로운 배열을 반환한다.  
(upto_index에 해당하는 요소는 포함되지 않는다.)  
var myArray = new Array('a', 'b', 'c', 'd', 'e');  
myArray = myArray.slice(1, 4); // starts at index 1 and extracts all elements  
                               // until index 3, returning [ "b", "c", "d"]  

- splice ...... // 여기 넘어감.

- reverse() 첫 번째 배열 요소가 마지막 요소가되고 마지막 요소가 첫 번째 요소가 된다.
var myArray = new Array('1', '2', '3');  
myArray.reverse();   
// transposes the array so that myArray = ["3", "2", "1"]  

- sort() // 넘어감..

- forEach(callback[, thisObject]) 메서드는 배열의 모든 요소에 대해 반복적으로 주어진 callback 함수를 실행한다. 반환값이 undefined
var a = ['a', 'b', 'c'];    
a.forEach(function(element) { console.log(element);} );   
// logs each item in turn  

- map(callback[, thisObject]) 메서드는 배열의 모든 요소에 대해 콜백함수를 실행하고 콜백함수의 실행결과를 새로운 배열에 담아 반환한다.
var a1 = ['a', 'b', 'c'];  
var a2 = a1.map(function(item) { return item.toUpperCase(); });  
console.log(a2); // logs ['A', 'B', 'C']  

- filter(callback[, thisObject]) 메서드는 배열의 모든 요소에 대해 콜백 함수가 true를 반환하는 요소를 새로운 배열에 담아 반환한다.
var a1 = ['a', 10, 'b', 20, 'c', 30];  
var a2 = a1.filter(function(item) { return typeof item == 'number'; });  
console.log(a2); // logs ['10', '20', '30']  

#### reduce()
참조 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce  
reduce() 메서드는 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환한다.  
const array1 = [1, 2, 3, 4];  
const reducer = (accumulator, currentValue) => accumulator + currentValue;  
  
// 1 + 2 + 3 + 4   
console.log(array1.reduce(reducer));  
// expected output: 10  
  
// 5 + 1 + 2 + 3 + 4  
console.log(array1.reduce(reducer, 5));  
// expected output: 15  

- 매개변수
    * callback : 배열의 각 요소에 대해 실행할 함수. 다음 네 가지 인수를 받는다.
        - accumulator : accumulator는 콜백의 반환값을 누적한다. 콜백의 이전 반환값 또는, 콜백의 첫 번째 호출이면서 initialValue를 제공한 경우에는 initialValue의 값이다.
        - currentValue : 처리할 현재 요소
        - currentIndex : 처리할 현재 요소의 인덱스. initialValue를 제공한 경우 0, 아니면 1부터 시작한다.
        - array : reduce()를 호출한 배열
    * initialValue : callback의 최초 호출에서 첫 번째 인수에 제공하는 값. 초기값을 제공하지 않으면 배열의 첫 번째 요소를 사용한다. 빈 배열에서 초기값없이 reduce()를 호출하면 오류가 발생한다.
- 반환값
누적 계산의 결과 값.  

reduce() 는 빈 요소를 제외하고 배열 내에 존재하는 각 요소에 대해 callback 함수를 한 번씩 실행하는데, 콜백 함수는 다음의 네 인수를 받는다.
    * accumulator
    * currentValue
    * currentIndex
    * array
- 만약 reduce() 함수 호출에서 initialValue를 제공한 경우, accumulator는 initialValue와 같고 currentValue는 배열의 첫 번째 값과 같다.
- initialValue를 제공하지 않았다면, accumulator는 배열의 첫 번째 값과 같고 currentValue는 두 번째와 같다.

- reduce() 작동 방식
1| [0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {  
2|   return accumulator + currentValue;  
3| }); // 반환값 10  

1| [0, 1, 2, 3, 4].reduce( (prev, curr) => prev + curr ); // 반환값 10  

콜백은 4번 호출된다.  

    - reduce()의 두 번째 인수로 초기값을 제공하는 경우, 결과는 다음과 같다.  
1| [0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {  
2|   return accumulator + currentValue;  
3| }, 10); // 반환값 20  


==========

## 객체 탐색하기

### Object.keys()
참조 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/keys  

- Object.keys() 메소드는 객체 고유의 열거형 속성들을 for ... in 루프에 의해 제공되는 순서와 동일한 순서로 return한다.
- object에서 직접 검색된 열거형 속성들에 대응하는 문자열들을 요소로 갖는 배열을 반환한다.

예제  
var arr = ['a', 'b', 'c'];  
console.log(Object.keys(arr)); // console: ['0', '1', '2']  
  
// array like object  
var obj = { 0: 'a', 1: 'b', 2: 'c' };  
console.log(Object.keys(obj)); // console: ['0', '1', '2']  
  
// array like object with random key ordering  
var anObj = { 100: 'a', 2: 'b', 7: 'c' };  
console.log(Object.keys(anObj)); // ['2', '7', '100']  

### Object.values()
참조 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/values  

- Object.values() 메소드는 전달된 파라미터 객체가 가지는 (열거 가능한) 속성의 값들로 이루어진 배열을 리턴한다.
- for ... in 구문과 동일한 순서를 가진다.

예제  
const object1 = {  
  a: 'somestring',  
  b: 42,  
  c: false  
};  
  
console.log(Object.values(object1));  
// expected output: Array ["somestring", 42, false]  

### Object.entries()
참조 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/entries  

- Object.entries() 메서드는 for ... in 와 같은 순서로 주어진 객체 자체의 enumerable 속성 [key, value] 쌍의 배열을 반환한다.

예제  
const object1 = { foo: 'bar', baz: 42 };  
console.log(Object.entries(object1)[1]);  
// expected output: Array ["baz", 42]  
  
const object2 = { 0: 'a', 1: 'b', 2: 'c' };  
console.log(Object.entries(object2)[2]);  
// expected output: Array ["2", "c"]  


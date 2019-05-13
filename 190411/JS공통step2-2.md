# var, const, let의 hoisting

## Hoisting
참조 : https://developer.mozilla.org/ko/docs/Glossary/Hoisting  
호이스팅은 자바스크립트에서 콘텍스트(특히 생성 및 실행단계)가 어떻게 동작하는가에 대한 생각.  
예를 들어, 호이스팅을 변수 및 함수 선언이 물리적으로 작성한 코드의 상단으로 옮겨지는 것으로 가르치지만, 실제로는 그렇지 않다.  
변수 및 함수 선언은 컴파일 단계에서 메모리에 저장되지만, 코드에서 입력한 위치와 정확히 일치한 곳에 있다.  

예제  
name(); // i'm Circus  
  
function name(){  
    console.log("i'm Circus");  
}  
  
- 함수를 작성하기 전에 함수를 호출했지만, 잘 동작한다.  

예제  
num = 6;  
num + 7;  
var num;  

- JavaScript는 초기화가 아닌 선언만 끌어올린다(hoist). 만약 변수를 선언한 뒤 나중에 초기화시켜 사용한다면, 그 값은 undefined로 지정된다. 아래 두 예제는 같은 동작을 보여준다.  

예제  
var x = 1; // x 초기화  
console.log(x + " " + y); // '1 undefined'  
var y = 2; // y 초기화  
  
var x = 1; // x 초기화  
var y; // y 선언  
console.log(x + " " + y); // '1 undefined'  
y = 2; // y 초기화  

# binary search 알고리즘(이진 탐색)